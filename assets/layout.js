(function () {
  const S = window.SITE;
  const I = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    sun: '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
    chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/></svg>',
    spider: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    tool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
    news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>',
    graph: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="8" r="2.5"/><circle cx="9" cy="18" r="2.5"/><path d="M8.2 7.2 15.6 7.7M7 8.3l1.4 7.3M16.5 10l-5.6 6.4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    rss: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
    top: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-9-1 2-2 3-4 3 0-2 0-4-1-6-3 3-5 7-5 12 0 4 3 7 7 7z"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="8" cy="8" r="1.5"/></svg>'
  };
  window.ICON = I;

  const colorOf = { blue: "c-blue", green: "c-green", violet: "c-violet", warm: "c-warm", rose: "c-rose" };
  window.catOf = id => S.categories.find(c => c.id === id);
  window.catPill = id => { const c = catOf(id); return `<span class="pill ${colorOf[c.color]}">${c.name}</span>`; };
  window.colorClass = c => colorOf[c];
  const WEEK = ["日", "一", "二", "三", "四", "五", "六"];
  window.fmtDate = d => { const [y, m, dd] = d.split("-"); return `${y}年${+m}月${+dd}日`; };
  window.weekday = d => "周" + WEEK[new Date(d + "T00:00:00").getDay()];

  // Theme: set before paint
  const saved = localStorage.getItem("theme");
  const sys = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const qsTheme = new URLSearchParams(location.search).get("theme");
  document.documentElement.dataset.theme = qsTheme || saved || sys;

  const page = document.body.dataset.page;
  const navs = [["index", "首页", "index.html"], ["notes", "知识库", "notes.html"], ["daily", "科技日报", "daily.html"], ["graph", "知识图谱", "graph.html"], ["about", "关于", "about.html"]];
  const navHtml = navs.map(([k, t, h]) => `<a href="${h}" class="${k === page ? "active" : ""}">${t}</a>`).join("");

  document.body.insertAdjacentHTML("afterbegin", `
  <header class="site-header"><div class="container header-inner">
    <a class="logo" href="index.html"><span class="logo-mark">姜</span><span class="logo-text">姜sir笔记</span></a>
    <nav class="nav">${navHtml}</nav>
    <div class="header-actions">
      <button class="search-trigger" data-open-search>${I.search}<span>搜索笔记、日报…</span><kbd>⌘ K</kbd></button>
      <button class="icon-btn theme-btn" title="切换主题">${I.sun}${I.moon}</button>
      <a class="icon-btn" href="https://github.com/" target="_blank" rel="noopener" title="GitHub">${I.github}</a>
      <button class="icon-btn menu-btn" title="菜单">${I.menu}</button>
    </div>
  </div></header>
  <div class="drawer">${navHtml}</div>`);

  document.body.insertAdjacentHTML("beforeend", `
  <footer class="site-footer">
    <div class="container footer-inner">
      <div><a class="logo" href="index.html"><span class="logo-mark">姜</span><span class="logo-text">姜sir笔记</span></a>
        <p>把踩过的坑，写成能复用的经验。专注 AI 应用落地、数据采集与工程自动化。</p></div>
      <div><h6>内容</h6><ul><li><a href="notes.html">知识库</a></li><li><a href="daily.html">科技日报</a></li><li><a href="notes.html?cat=essay">随笔</a></li></ul></div>
      <div><h6>探索</h6><ul><li><a href="graph.html">知识图谱</a></li><li><a href="graph.html#stats">数据看板</a></li><li><a href="#">RSS 订阅</a></li></ul></div>
      <div><h6>关于</h6><ul><li><a href="about.html">关于我</a></li><li><a href="https://github.com/">GitHub</a></li><li><a href="about.html#contact">联系方式</a></li></ul></div>
    </div>
    <div class="container footer-bottom"><span>© 2026 姜sir笔记 · 内容采用 CC BY-NC 4.0 许可</span><span>Hosted on GitHub Pages</span></div>
  </footer>
  <div class="modal" id="search-modal">
    <div class="modal-mask" data-close></div>
    <div class="modal-box">
      <div class="modal-input">${I.search}<input id="search-input" placeholder="搜索标题、标签、日报关键词…" autocomplete="off"><kbd>ESC</kbd></div>
      <div class="modal-body" id="search-results"></div>
      <div class="modal-foot"><span><kbd>↑</kbd><kbd>↓</kbd> 选择</span><span><kbd>↵</kbd> 打开</span><span><kbd>ESC</kbd> 关闭</span></div>
    </div>
  </div>
  <div class="tooltip" id="tooltip"></div>`);

  // Header behaviors
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  document.querySelector(".theme-btn").onclick = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next; localStorage.setItem("theme", next);
  };
  document.querySelector(".menu-btn").onclick = () => document.querySelector(".drawer").classList.toggle("open");

  // Search modal
  const modal = document.getElementById("search-modal");
  const input = document.getElementById("search-input");
  const box = document.getElementById("search-results");
  let sel = 0, items = [];
  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const hl = (s, q) => q ? esc(s).replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), m => `<mark>${m}</mark>`) : esc(s);
  function renderSearch() {
    const q = input.value.trim().toLowerCase();
    const posts = S.posts.filter(p => !q || (p.title + p.summary + p.tags.join(" ") + p.sub).toLowerCase().includes(q)).slice(0, 6);
    const days = S.dailies.filter(d => !q || (d.date + d.hl.join(" ")).toLowerCase().includes(q)).slice(0, q ? 5 : 3);
    items = [];
    let html = "";
    if (posts.length) {
      html += `<div class="modal-group">${q ? "笔记" : "推荐阅读"}</div>`;
      posts.forEach(p => { const c = catOf(p.cat); items.push(`article.html?id=${p.id}`); html += `<a class="modal-item" href="article.html?id=${p.id}"><div class="ico ${colorOf[c.color]}">${I.doc}</div><div><b>${hl(p.title, q)}</b><span>${c.name} / ${p.sub} · ${p.read} 分钟</span></div><kbd class="enter">↵</kbd></a>`; });
    }
    if (days.length) {
      html += `<div class="modal-group">科技日报</div>`;
      days.forEach(d => { items.push("daily.html"); html += `<a class="modal-item" href="daily.html"><div class="ico c-warm">${I.news}</div><div><b>${hl(d.hl[0], q)}</b><span>${fmtDate(d.date)} · ${weekday(d.date)}</span></div><kbd class="enter">↵</kbd></a>`; });
    }
    box.innerHTML = html || `<div class="empty-state">没有找到 “${esc(q)}” 相关内容</div>`;
    sel = 0; mark();
  }
  function mark() { box.querySelectorAll(".modal-item").forEach((el, i) => el.classList.toggle("sel", i === sel)); }
  window.openSearch = (q = "") => { modal.classList.add("open"); input.value = q; renderSearch(); setTimeout(() => input.focus(), 10); };
  const closeSearch = () => modal.classList.remove("open");
  document.querySelectorAll("[data-open-search]").forEach(b => b.onclick = () => openSearch());
  modal.querySelector("[data-close]").onclick = closeSearch;
  input.oninput = renderSearch;
  addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); modal.classList.contains("open") ? closeSearch() : openSearch(); }
    if (!modal.classList.contains("open")) return;
    const n = box.querySelectorAll(".modal-item").length;
    if (e.key === "Escape") closeSearch();
    if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % n; mark(); }
    if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + n) % n; mark(); }
    if (e.key === "Enter") { const a = box.querySelectorAll(".modal-item")[sel]; if (a) location.href = a.getAttribute("href"); }
  });

  // Tooltip
  const tip = document.getElementById("tooltip");
  window.showTip = (e, text) => { tip.textContent = text; tip.classList.add("show"); const r = e.target.getBoundingClientRect(); tip.style.left = Math.min(innerWidth - tip.offsetWidth - 8, r.left + r.width / 2 - tip.offsetWidth / 2) + "px"; tip.style.top = r.top - tip.offsetHeight - 8 + "px"; };
  window.hideTip = () => tip.classList.remove("show");

  // Activity data from real content dates
  window.activityMap = () => {
    const m = {};
    S.posts.forEach(p => m[p.date] = (m[p.date] || 0) + 2);
    S.dailies.forEach(d => m[d.date] = (m[d.date] || 0) + 1);
    return m;
  };
  window.renderHeatmap = (el, weeks, endStr = "2026-10-10") => {
    const m = activityMap();
    const end = new Date(endStr + "T00:00:00");
    const start = new Date(end); start.setDate(end.getDate() - end.getDay() - (weeks - 1) * 7);
    let html = "";
    for (let d = new Date(start); d <= end || d.getDay() !== 0; d.setDate(d.getDate() + 1)) {
      if (d > end) { html += '<i class="empty"></i>'; continue; }
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const v = m[k] || 0;
      const l = v === 0 ? 0 : v === 1 ? 2 : v === 2 ? 3 : 4;
      html += `<i data-l="${l}" data-tip="${fmtDate(k)} · ${v ? (v >= 2 ? "发布笔记" : "") + (v % 2 ? (v >= 2 ? " + " : "") + "科技日报" : "") : "无更新"}"></i>`;
    }
    el.innerHTML = html;
    el.style.gridTemplateColumns = el.closest(".heat-row") && innerWidth > 1180 ? `repeat(${weeks}, 19px)` : `repeat(${weeks}, 1fr)`;
    el.querySelectorAll("i[data-tip]").forEach(i => { i.onmouseenter = e => showTip(e, i.dataset.tip); i.onmouseleave = hideTip; });
  };

  // Reveal on scroll
  window.initReveal = () => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach((el, i) => { el.style.transitionDelay = (el.dataset.delay || 0) + "ms"; io.observe(el); });
  };
  window.tagCounts = () => { const t = {}; S.posts.forEach(p => p.tags.forEach(x => t[x] = (t[x] || 0) + 1)); return Object.entries(t).sort((a, b) => b[1] - a[1]); };
})();
