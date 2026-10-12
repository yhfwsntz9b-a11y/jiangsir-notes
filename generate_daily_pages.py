#!/usr/bin/env python3
"""Generate standalone HTML pages for daily tech reports."""
import re
import os
import json

SITE_ROOT = "/Users/jiangyunchao/jiangsir-notes"
DAILY_DIR = os.path.join(SITE_ROOT, "daily")
DALIY_NEW = "/Users/jiangyunchao/daliy_new"

os.makedirs(DAILY_DIR, exist_ok=True)

PAGE_HEAD = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>科技日报 {date} · 姜sir笔记</title>
<link rel="stylesheet" href="../assets/style.css">
<style>
.daily-report {{ max-width: 780px; margin: 0 auto; padding: 32px 20px 80px; }}
.daily-report .cover {{ text-align: center; margin: 32px 0; }}
.daily-report .cover img {{ max-width: 100%; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,.12); }}
.daily-report .project-card {{ margin: 40px 0; padding: 28px; background: var(--card); border: 1px solid var(--border); border-radius: 16px; }}
.daily-report .project-card img {{ width: 100%; border-radius: 10px; margin: 16px 0; }}
.daily-report h1 {{ font-size: 28px; font-weight: 800; margin: 0 0 8px; letter-spacing: -.02em; }}
.daily-report h2 {{ font-size: 22px; font-weight: 700; margin: 48px 0 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border); }}
.daily-report h3 {{ font-size: 18px; font-weight: 700; margin: 24px 0 8px; color: var(--brand); }}
.daily-report h4 {{ font-size: 15px; font-weight: 600; margin: 16px 0 6px; }}
.daily-report p {{ font-size: 15px; line-height: 1.75; color: var(--text-2); margin: 8px 0; }}
.daily-report blockquote {{ margin: 16px 0; padding: 12px 20px; background: var(--bg); border-left: 4px solid var(--brand); border-radius: 0 10px 10px 0; color: var(--text-2); font-size: 14.5px; }}
.daily-report ul, .daily-report ol {{ padding-left: 24px; }}
.daily-report li {{ font-size: 14.5px; line-height: 1.7; color: var(--text-2); margin: 4px 0; }}
.daily-report li strong {{ color: var(--text); }}
.daily-report hr {{ border: none; border-top: 1px dashed var(--border); margin: 32px 0; }}
.daily-report table {{ width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }}
.daily-report th {{ background: var(--bg); padding: 10px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid var(--border); }}
.daily-report td {{ padding: 10px 12px; border-bottom: 1px solid var(--border); color: var(--text-2); }}
.daily-report a {{ color: var(--brand); text-decoration: none; }}
.daily-report a:hover {{ text-decoration: underline; }}
.daily-report .subtitle {{ font-size: 15px; color: var(--muted); margin-bottom: 24px; }}
.daily-report .meta-row {{ display: flex; gap: 8px; margin: 16px 0; flex-wrap: wrap; }}
.daily-report .pill {{ display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }}
.daily-report .pill-blue {{ background: rgba(0,122,255,.1); color: #007aff; }}
.daily-report .pill-warm {{ background: rgba(255,149,0,.1); color: #ff9500; }}
.daily-report .pill-green {{ background: rgba(40,205,65,.1); color: #28cd41; }}
.daily-nav {{ text-align: center; padding: 24px; }}
.daily-nav a {{ color: var(--brand); text-decoration: none; font-weight: 600; }}
.daily-nav a:hover {{ text-decoration: underline; }}
@media (max-width: 768px) {{
  .daily-report {{ padding: 20px 16px 60px; }}
  .daily-report .project-card {{ padding: 20px 16px; }}
  .daily-report h1 {{ font-size: 24px; }}
  .daily-report h2 {{ font-size: 20px; }}
}}
</style>
</head>
<body data-page="daily">
"""

PAGE_FOOT = """
<nav class="daily-nav">
  <a href="../daily.html">← 返回科技日报列表</a>
</nav>
<script src="../assets/layout.js"></script>
<script>document.querySelectorAll(".bc-chev").forEach(e => e.outerHTML = ICON.chev);</script>
</body>
</html>
"""

BREADCRUMB = """
<nav class="breadcrumb" style="max-width:780px;margin:0 auto;padding:20px 20px 0">
  <a href="../index.html">首页</a><span class="bc-chev"></span>
  <a href="../daily.html">科技日报</a><span class="bc-chev"></span>
  <span>{date}</span>
</nav>
"""


def md_to_html(md_text, skip_first_h1=True):
    """Convert markdown to HTML with basic formatting."""
    lines = md_text.split('\n')
    html_lines = []
    in_list = False
    in_table = False
    table_rows = []
    in_blockquote = False
    first_h1_skipped = False

    i = 0
    while i < len(lines):
        line = lines[i]

        # Table detection
        if '|' in line and line.strip().startswith('|'):
            if not in_table:
                in_table = True
                table_rows = []
            table_rows.append(line.strip())
            i += 1
            continue
        elif in_table:
            html_lines.append(render_table(table_rows))
            in_table = False
            table_rows = []

        # Horizontal rule
        if re.match(r'^---+\s*$', line.strip()):
            if in_list:
                html_lines.append('</ul>')
                in_list = False
            html_lines.append('<hr>')
            i += 1
            continue

        # Headings
        m = re.match(r'^(#{1,6})\s+(.+)$', line)
        if m:
            if in_list:
                html_lines.append('</ul>')
                in_list = False
            level = len(m.group(1))
            text = inline_format(m.group(2))
            # Skip first h1 from MD since template provides the title
            if skip_first_h1 and level == 1 and not first_h1_skipped:
                first_h1_skipped = True
                i += 1
                continue
            html_lines.append(f'<h{level}>{text}</h{level}>')
            i += 1
            continue

        # Blockquote
        if line.strip().startswith('>'):
            if in_list:
                html_lines.append('</ul>')
                in_list = False
            text = inline_format(re.sub(r'^>\s*', '', line.strip()))
            html_lines.append(f'<blockquote><p>{text}</p></blockquote>')
            i += 1
            continue

        # Image
        m = re.match(r'^!\[([^\]]*)\]\(([^)]+)\)\s*$', line.strip())
        if m:
            if in_list:
                html_lines.append('</ul>')
                in_list = False
            alt, src = m.group(1), m.group(2)
            if 'cover' in alt.lower() or '封面' in alt:
                html_lines.append(f'<div class="cover"><img src="{src}" alt="{alt}"></div>')
            else:
                html_lines.append(f'<img src="{src}" alt="{alt}" style="width:100%;border-radius:10px;margin:12px 0">')
            i += 1
            continue

        # Unordered list
        m = re.match(r'^[-*]\s+(.+)$', line.strip())
        if m:
            if not in_list:
                html_lines.append('<ul>')
                in_list = True
            html_lines.append(f'<li>{inline_format(m.group(1))}</li>')
            i += 1
            continue

        # Empty line
        if not line.strip():
            if in_list:
                html_lines.append('</ul>')
                in_list = False
            i += 1
            continue

        # Regular paragraph
        if in_list:
            html_lines.append('</ul>')
            in_list = False
        html_lines.append(f'<p>{inline_format(line.strip())}</p>')
        i += 1

    if in_list:
        html_lines.append('</ul>')
    if in_table:
        html_lines.append(render_table(table_rows))

    return '\n'.join(html_lines)


def render_table(rows):
    """Render markdown table rows to HTML table."""
    if len(rows) < 2:
        return ''
    html = ['<table>']

    # Header
    header_cells = [c.strip() for c in rows[0].strip('|').split('|')]
    html.append('<thead><tr>')
    for cell in header_cells:
        html.append(f'<th>{inline_format(cell)}</th>')
    html.append('</tr></thead>')

    # Body (skip separator row)
    html.append('<tbody>')
    for row in rows[2:] if len(rows) > 2 else rows[1:]:
        cells = [c.strip() for c in row.strip('|').split('|')]
        html.append('<tr>')
        for cell in cells:
            html.append(f'<td>{inline_format(cell)}</td>')
        html.append('</tr>')
    html.append('</tbody></table>')
    return '\n'.join(html)


def inline_format(text):
    """Handle inline markdown formatting."""
    # Images inline
    text = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', r'<img src="\2" alt="\1" style="max-width:100%;border-radius:8px">', text)
    # Links
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2" target="_blank">\1</a>', text)
    # Bold
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    # Italic
    text = re.sub(r'\*(.+?)\*', r'<em>\1</em>', text)
    # Code
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    return text


def get_date_info(date_str):
    """Get display info for a date."""
    from datetime import datetime
    d = datetime.strptime(date_str, "%Y-%m-%d")
    weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
    return {
        'year': d.year,
        'month': d.month,
        'day': d.day,
        'weekday': weekdays[d.weekday()],
        'display': f"{d.year} 年 {d.month} 月 {d.day} 日 {weekdays[d.weekday()]}"
    }


def generate_from_md(date_str, md_path):
    """Generate HTML page from a WeChat markdown file."""
    with open(md_path, 'r', encoding='utf-8') as f:
        md_content = f.read()

    info = get_date_info(date_str)
    content_html = md_to_html(md_content)

    html = PAGE_HEAD.format(date=date_str)
    html += BREADCRUMB.format(date=date_str)
    html += '<div class="daily-report">\n'
    html += f'<h1>科技日报 | {date_str}</h1>\n'
    html += f'<p class="subtitle">{info["display"]} · GitHub Trending + Hacker News</p>\n'
    html += '<div class="meta-row">\n'
    html += '  <span class="pill pill-warm">HN Top 10</span>\n'
    html += '  <span class="pill pill-blue">GitHub Trending</span>\n'
    html += '</div>\n'
    html += content_html
    html += '\n</div>\n'
    html += PAGE_FOOT

    out_path = os.path.join(DAILY_DIR, f"{date_str}.html")
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated: {out_path}")


def generate_placeholder(date_str, highlights):
    """Generate a simple page for dates without full MD."""
    info = get_date_info(date_str)

    html = PAGE_HEAD.format(date=date_str)
    html += BREADCRUMB.format(date=date_str)
    html += '<div class="daily-report">\n'
    html += f'<h1>科技日报 | {date_str}</h1>\n'
    html += f'<p class="subtitle">{info["display"]} · GitHub Trending + Hacker News</p>\n'
    html += '<div class="meta-row">\n'
    html += '  <span class="pill pill-warm">HN Top 10</span>\n'
    html += '  <span class="pill pill-blue">GitHub Trending</span>\n'
    html += '</div>\n'
    html += '<h2>今日亮点</h2>\n'
    for i, hl in enumerate(highlights, 1):
        html += f'<div class="project-card">\n'
        html += f'<h3>亮点 {i}</h3>\n'
        html += f'<p>{hl}</p>\n'
        html += f'</div>\n'
    html += '<blockquote><p>完整微信版日报内容正在整理中，敬请期待。</p></blockquote>\n'
    html += '\n</div>\n'
    html += PAGE_FOOT

    out_path = os.path.join(DAILY_DIR, f"{date_str}.html")
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated placeholder: {out_path}")


# Auto-discover all WeChat MD files from daliy_new
MD_MAP = {}
if os.path.exists(DALIY_NEW):
    for fname in sorted(os.listdir(DALIY_NEW)):
        if fname.endswith('_wechat.md'):
            date_str = fname.replace('_wechat.md', '')
            MD_MAP[date_str] = os.path.join(DALIY_NEW, fname)

# Highlights for dates without MD files (from data.js)
HIGHLIGHTS = {
    "2026-10-12": ["Karpathy：LLM 能力认知鸿沟正在扩大，业界与学界严重脱节", "morluto/rea：AI Agent 逆向工程工具单日 25,599 星，GitHub 现象级"],
}


if __name__ == "__main__":
    # Generate from existing MD files
    for date_str, md_path in sorted(MD_MAP.items()):
        if os.path.exists(md_path):
            generate_from_md(date_str, md_path)
        else:
            print(f"MD not found: {md_path}")

    # Generate placeholders for dates without MD (only those in HIGHLIGHTS)
    for date_str, hls in HIGHLIGHTS.items():
        if date_str not in MD_MAP:
            generate_placeholder(date_str, hls)

    print(f"\nDone! Generated {len(MD_MAP)} full pages + {len([d for d in HIGHLIGHTS if d not in MD_MAP])} placeholders in {DAILY_DIR}")
