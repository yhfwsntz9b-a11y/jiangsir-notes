#!/usr/bin/env python3
"""
将 Markdown 文章部署到姜sir笔记网站
用法：python3 deploy_md.py <article_id> <md_file> [--category ai|data|eng|essay] [--sub "子类"] [--tags "tag1,tag2"] [--featured]
"""

import argparse
import os
import re
import shutil
import sys
from datetime import datetime
from pathlib import Path

# 网站根目录
SITE_ROOT = Path(__file__).parent
ASSETS_DIR = SITE_ROOT / "assets"
IMAGES_DIR = SITE_ROOT / "images"

def read_md_file(md_path):
    """读取 Markdown 文件"""
    with open(md_path, 'r', encoding='utf-8') as f:
        return f.read()

def extract_metadata(md_content):
    """从 MD 提取标题和摘要"""
    # 提取第一个 # 标题
    title_match = re.search(r'^#\s+(.+)$', md_content, re.MULTILINE)
    title = title_match.group(1) if title_match else "未命名文章"
    
    # 提取第一段非标题文本作为摘要
    lines = md_content.split('\n')
    summary = ""
    for line in lines:
        line = line.strip()
        if line and not line.startswith('#') and not line.startswith('!') and not line.startswith('---'):
            summary = line[:150] + "..." if len(line) > 150 else line
            break
    
    return title, summary

def md_to_html(md_content):
    """简单的 MD 转 HTML（保留基本格式）"""
    # 这里应该用 markdown 库，但为了零依赖，做简单转换
    html = md_content
    
    # 转换标题
    html = re.sub(r'^###\s+(.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^##\s+(.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^#\s+(.+)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    
    # 转换图片
    html = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', r'<figure class="art-fig"><img src="\2" alt="\1" loading="lazy"></figure>', html)
    
    # 转换链接
    html = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2" target="_blank">\1</a>', html)
    
    # 转换粗体
    html = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', html)
    
    # 转换斜体
    html = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', html)
    
    # 转换列表
    html = re.sub(r'^\*\s+(.+)$', r'<li>\1</li>', html, flags=re.MULTILINE)
    html = re.sub(r'^-\s+(.+)$', r'<li>\1</li>', html, flags=re.MULTILINE)
    
    # 转换引用
    html = re.sub(r'^>\s+(.+)$', r'<blockquote>\1</blockquote>', html, flags=re.MULTILINE)
    
    # 转换分隔线
    html = re.sub(r'^---+$', r'<hr>', html, flags=re.MULTILINE)
    
    # 包裹段落
    lines = html.split('\n')
    result = []
    in_list = False
    
    for line in lines:
        stripped = line.strip()
        if not stripped:
            if in_list:
                result.append('</ul>')
                in_list = False
            result.append('')
            continue
        
        if stripped.startswith('<li>'):
            if not in_list:
                result.append('<ul>')
                in_list = True
            result.append(stripped)
        elif stripped.startswith('<h') or stripped.startswith('<figure') or stripped.startswith('<blockquote') or stripped.startswith('<hr'):
            if in_list:
                result.append('</ul>')
                in_list = False
            result.append(stripped)
        else:
            if in_list:
                result.append('</ul>')
                in_list = False
            result.append(f'<p>{stripped}</p>')
    
    if in_list:
        result.append('</ul>')
    
    html = '\n'.join(result)
    
    # 添加摘要框
    summary_box = '<div class="summary-box"><h4><span data-i2="bulb"></span>摘要</h4><p style="margin:0;color:var(--text)">请在 data.js 中填写文章摘要</p></div>\n'
    
    return summary_box + '<div class="prose">' + html + '</div>'

def process_images(md_content, article_id):
    """处理文章中的图片引用"""
    # 查找所有本地图片引用
    img_pattern = r'!\[[^\]]*\]\(([^)]+)\)'
    images = re.findall(img_pattern, md_content)
    
    local_images = [img for img in images if not img.startswith('http')]
    
    if not local_images:
        return md_content, []
    
    # 创建图片目录
    img_dir = IMAGES_DIR / article_id
    img_dir.mkdir(parents=True, exist_ok=True)
    
    # 复制图片并更新引用
    copied_images = []
    new_content = md_content
    
    for img_path in local_images:
        src = Path(img_path)
        if not src.exists():
            # 尝试相对路径
            src = Path.cwd() / img_path
        
        if src.exists():
            dst = img_dir / src.name
            shutil.copy2(src, dst)
            copied_images.append(dst.name)
            
            # 更新 MD 中的图片路径
            new_content = new_content.replace(img_path, f'images/{article_id}/{dst.name}')
    
    return new_content, copied_images

def update_data_js(article_id, title, summary, category, sub, tags, read_time, featured):
    """更新 data.js 添加新文章"""
    data_file = ASSETS_DIR / "data.js"
    content = data_file.read_text(encoding='utf-8')
    
    # 构造新文章条目
    tags_str = ', '.join([f'"{t}"' for t in tags])
    featured_str = ', featured: true' if featured else ''
    date_str = datetime.now().strftime('%Y-%m-%d')
    
    new_entry = f'    {{ id: "{article_id}", title: "{title}", summary: "{summary}", cat: "{category}", sub: "{sub}", tags: [{tags_str}], date: "{date_str}", read: {read_time}{featured_str} }},'
    
    # 插入到 posts 数组开头
    posts_pattern = r'(posts:\s*\[\n)'
    content = re.sub(posts_pattern, f'\\1{new_entry}\n', content, count=1)
    
    data_file.write_text(content, encoding='utf-8')
    print(f"✓ 已添加文章元数据到 data.js")

def update_articles_js(article_id, html_content):
    """更新 articles.js 添加文章内容"""
    articles_file = ASSETS_DIR / "articles.js"
    content = articles_file.read_text(encoding='utf-8')
    
    # 转义 HTML 中的特殊字符
    escaped = html_content.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    
    # 构造新条目
    new_entry = f'  "{article_id}": "{escaped}",\n'
    
    # 插入到 ARTICLE_CONTENT 对象开头
    pattern = r'(window\.ARTICLE_CONTENT\s*=\s*\{\n)'
    content = re.sub(pattern, f'\\1{new_entry}', content, count=1)
    
    articles_file.write_text(content, encoding='utf-8')
    print(f"✓ 已添加文章内容到 articles.js")

def update_cache_versions():
    """更新所有 HTML 文件的缓存版本号"""
    version = datetime.now().strftime('%Y%m%d')
    
    html_files = list(SITE_ROOT.glob('*.html'))
    for html_file in html_files:
        content = html_file.read_text(encoding='utf-8')
        # 更新 data.js 版本
        content = re.sub(r'assets/data\.js\?v=\d+', f'assets/data.js?v={version}', content)
        # 更新 articles.js 版本
        content = re.sub(r'assets/articles\.js\?v=\d+', f'assets/articles.js?v={version}', content)
        html_file.write_text(content, encoding='utf-8')
    
    print(f"✓ 已更新缓存版本号为 {version}")

def main():
    parser = argparse.ArgumentParser(description='部署 Markdown 文章到姜sir笔记')
    parser.add_argument('article_id', help='文章ID（英文，如 my-article）')
    parser.add_argument('md_file', help='Markdown 文件路径')
    parser.add_argument('--category', '-c', default='ai', choices=['ai', 'data', 'eng', 'essay'],
                       help='文章分类（默认：ai）')
    parser.add_argument('--sub', '-s', default='未分类', help='子分类（默认：未分类）')
    parser.add_argument('--tags', '-t', default='', help='标签，逗号分隔（如：Agent,教程）')
    parser.add_argument('--featured', '-f', action='store_true', help='标记为精选文章')
    parser.add_argument('--read-time', '-r', type=int, default=10, help='阅读时间（分钟，默认：10）')
    
    args = parser.parse_args()
    
    # 读取 MD 文件
    if not os.path.exists(args.md_file):
        print(f"错误：文件不存在 {args.md_file}")
        sys.exit(1)
    
    print(f"正在部署文章：{args.article_id}")
    md_content = read_md_file(args.md_file)
    
    # 提取元数据
    title, summary = extract_metadata(md_content)
    print(f"标题：{title}")
    print(f"摘要：{summary}")
    
    # 处理图片
    md_content, images = process_images(md_content, args.article_id)
    if images:
        print(f"✓ 已处理 {len(images)} 张图片：{', '.join(images)}")
    
    # 转换为 HTML
    html_content = md_to_html(md_content)
    
    # 解析标签
    tags = [t.strip() for t in args.tags.split(',') if t.strip()] if args.tags else []
    
    # 更新 data.js
    update_data_js(args.article_id, title, summary, args.category, args.sub, 
                  tags, args.read_time, args.featured)
    
    # 更新 articles.js
    update_articles_js(args.article_id, html_content)
    
    # 更新缓存版本
    update_cache_versions()
    
    print("\n✅ 部署完成！")
    print(f"文章链接：https://yhfwsntz9b-a11y.github.io/jiangsir-notes/article.html?id={args.article_id}")
    print("\n下一步：")
    print("1. 运行 ./deploy.sh '添加文章：<标题>'")
    print("2. 等待 1-2 分钟让 GitHub Pages 构建")
    print("3. 访问链接查看文章")

if __name__ == '__main__':
    main()
