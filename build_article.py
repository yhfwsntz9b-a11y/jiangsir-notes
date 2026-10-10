import re, html, pathlib

SRC = pathlib.Path("/Users/jiangyunchao/daliy_new/enterprise_knowledge_base_guide.md")
OUT = pathlib.Path("/Users/jiangyunchao/jiangsir-notes/article.html")
text = SRC.read_text(encoding="utf-8")

STAGES = {0: "01 · 准备阶段", 2: "02 · 数据处理", 7: "03 · 检索与生成", 11: "04 · 上线运营", 15: "05 · 开发细节"}
CN = "〇一二三四五六七八九十"

def cn2int(s):
    if s == "十": return 10
    if s.startswith("十"): return 10 + CN.index(s[1])
    if s.endswith("十"): return CN.index(s[0]) * 10
    if "十" in s: a, b = s.split("十"); return CN.index(a) * 10 + CN.index(b)
    return CN.index(s)

def inline(s):
    s = html.escape(s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    return s

EXTRA = {
    3: '''<div class="code"><div class="code-head"><span>chunking.py</span><button>复制</button></div><pre><span class="k">from</span> langchain.text_splitter <span class="k">import</span> RecursiveCharacterTextSplitter

<span class="c"># 通用文档：800 tokens，overlap 100</span>
splitter = <span class="f">RecursiveCharacterTextSplitter</span>(
    chunk_size=<span class="n">800</span>,
    chunk_overlap=<span class="n">100</span>,
    separators=[<span class="s">"\\n\\n"</span>, <span class="s">"\\n"</span>, <span class="s">"。"</span>, <span class="s">"；"</span>],
)</pre></div>''',
    6: '''<div class="table-wrap"><table><thead><tr><th>方案</th><th>适用规模</th><th>特点</th></tr></thead><tbody>
<tr><td><strong>Chroma</strong></td><td>原型验证</td><td>pip 安装即用，嵌入式</td></tr>
<tr><td><strong>Qdrant</strong></td><td>&lt; 50 万</td><td>Rust 编写，单二进制部署</td></tr>
<tr><td><strong>Milvus</strong></td><td>&gt; 50 万</td><td>分布式，性能天花板高</td></tr>
<tr><td><strong>Pinecone / Zilliz</strong></td><td>不想运维</td><td>全托管云服务</td></tr></tbody></table></div>''',
}

steps = []
for block in re.split(r"\n---\n", text):
    m = re.search(r"^## 第(.+?)步：(.+)$", block, re.M)
    if not m: continue
    n = cn2int(m.group(1)); q = m.group(2).strip()
    body = block[m.end():].strip()
    tip = ""
    tm = re.search(r"\*\*经验之谈：\*\*\s*(.+)", body, re.S)
    if tm:
        tip = tm.group(1).strip(); body = body[:tm.start()].strip()
    paras = [p.strip() for p in body.split("\n\n") if p.strip()]
    steps.append((n, q, paras, tip))

ICON_BULB = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>'
prose, side, toc = [], [], []
for n, q, paras, tip in steps:
    if n in STAGES:
        prose.append(f'<div class="stage">{STAGES[n]}</div>')
    prose.append(f'<h2 id="s{n}"><span class="num">{n:02d}</span><span>{inline(q)}</span></h2>')
    prose += [f"<p>{inline(p)}</p>" for p in paras]
    if n in EXTRA: prose.append(EXTRA[n])
    if tip:
        prose.append(f'<div class="callout"><div class="ci">{ICON_BULB}</div><div><b>经验之谈</b><p>{inline(tip)}</p></div></div>')
    short = re.sub(r"[？?].*$", "", q)
    side.append(f'<a href="#s{n}"><em>{n:02d}</em><span>{html.escape(short)}</span></a>')
    toc.append(f'<a href="#s{n}">{n:02d} · {html.escape(short)}</a>')

ending = re.search(r"\*\*最后：(.+?)\*\*", text)
closing = f'<div class="summary-box" style="margin-top:40px"><h4>写在最后</h4><p style="margin:0;color:var(--text-2)">{inline(ending.group(1))}</p></div>' if ending else ""

tpl = OUT.with_name("article.tpl.html").read_text(encoding="utf-8")
words = len(re.sub(r"\s", "", text))
out = (tpl.replace("{{PROSE}}", "\n".join(prose) + closing)
          .replace("{{SIDE}}", "\n".join(side))
          .replace("{{TOC}}", "\n".join(toc))
          .replace("{{WORDS}}", f"{words:,}")
          .replace("{{STEPS}}", str(len(steps))))
OUT.write_text(out, encoding="utf-8")
print("steps:", len(steps), "words:", words)
