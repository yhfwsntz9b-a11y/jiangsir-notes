window.SITE = {
  categories: [
    { id: "ai", name: "AI 应用", color: "blue", icon: "spark", subs: ["RAG 知识库", "Agent 开发", "模型微调", "论文解读"] },
    { id: "data", name: "数据采集", color: "green", icon: "spider", subs: ["爬虫框架", "公众号采集", "反爬对抗"] },
    { id: "eng", name: "工程实践", color: "violet", icon: "tool", subs: ["自动化 RPA", "部署运维", "可视化看板"] },
    { id: "essay", name: "随笔", color: "warm", icon: "pen", subs: ["技术思考", "读书笔记", "哲学与 AI"] }
  ],
  posts: [
    { id: "enterprise-kb", title: "企业知识库搭建踩坑全记录：20 个灵魂拷问", summary: "从“需不需要 RAG”到灰度上线，把两年企业知识库经验浓缩成 20 个问题，每个问题一句经验之谈。", cat: "ai", sub: "RAG 知识库", tags: ["RAG", "向量数据库", "Embedding", "Rerank"], date: "2026-10-10", read: 18, featured: true },
    { id: "langgraph-agent", title: "LangGraph 定时 Agent 从零到一：31 章完整教程", summary: "用 LangGraph 编排一个每天定时运行的情报 Agent：状态图、工具调用、记忆、失败重试与部署。", cat: "ai", sub: "Agent 开发", tags: ["LangGraph", "Agent", "定时任务"], date: "2026-09-26", read: 45, featured: true },
    { id: "agent-arch", title: "六种 Agent 架构怎么选：从 ReAct 到 Supervisor", summary: "ReAct、Workflow、Planner-Executor、Multi-Agent、Supervisor、Reflection 的适用场景与代价对比。", cat: "ai", sub: "Agent 开发", tags: ["Agent", "架构设计", "LangChain"], date: "2026-09-12", read: 14 },
    { id: "faiss", title: "FAISS 向量检索原理：IVF、PQ 与 HNSW 一次讲清", summary: "为什么暴力检索扛不住百万向量？倒排、乘积量化、图索引各自用什么换来了速度。", cat: "ai", sub: "RAG 知识库", tags: ["FAISS", "向量数据库", "ANN"], date: "2026-08-21", read: 16 },
    { id: "lora", title: "从 LoRA 到 QLoRA：大模型微调为什么只训 1% 参数", summary: "低秩分解的直觉、4-bit 量化的代价，以及什么时候该微调、什么时候用 RAG 就够了。", cat: "ai", sub: "模型微调", tags: ["LoRA", "QLoRA", "微调"], date: "2026-08-06", read: 12 },
    { id: "ai-scientist", title: "AI Scientist：当 AI 开始自己做科研", summary: "从选题、实验到写论文全自动的系统是怎么搭的？它离真正的科研还差什么。", cat: "ai", sub: "论文解读", tags: ["论文", "AI Scientist", "Agent"], date: "2026-07-18", read: 15 },
    { id: "wechat-5paths", title: "公众号文章采集的五条路径与工程权衡", summary: "profile_ext 关闭之后，UI 自动化、微信读书接口、商业 API 各自的速度、成本与封号风险。", cat: "data", sub: "公众号采集", tags: ["微信", "爬虫", "架构设计"], date: "2026-09-03", read: 13, featured: true },
    { id: "anti-crawl", title: "反爬四件套：UA 轮换、代理池、Cookie 持久化与延迟抖动", summary: "单一手段都会被识别，四者如何协同才能让请求看起来像真人。", cat: "data", sub: "反爬对抗", tags: ["爬虫", "反爬", "代理池"], date: "2026-08-28", read: 11 },
    { id: "tls-fp", title: "被 TLS 指纹封了？curl_cffi 一行代码绕过", summary: "requests 为什么一请求就 403：JA3 指纹识别原理与 curl_cffi 浏览器指纹模拟。", cat: "data", sub: "反爬对抗", tags: ["TLS 指纹", "curl_cffi", "爬虫"], date: "2026-09-01", read: 8 },
    { id: "crawler-framework", title: "从零写一个企业级爬虫框架：core / spiders / middleware 分层", summary: "调度、去重、中间件、存储四层解耦，像 Scrapy 一样可扩展，但更轻。", cat: "data", sub: "爬虫框架", tags: ["爬虫", "架构设计", "Python"], date: "2026-07-30", read: 20 },
    { id: "rpa-retina", title: "macOS 微信 RPA：Retina 坐标为什么要除以 2", summary: "截图坐标和点击坐标不在一个尺度，以及 Quartz CGEvent 替代 pyautogui 滚动的经验。", cat: "eng", sub: "自动化 RPA", tags: ["RPA", "macOS", "Python"], date: "2026-08-14", read: 9 },
    { id: "jsonl-dashboard", title: "实时看板的状态为什么会“冻住”：JSONL 追加日志方案", summary: "内存列表截断后没有重新赋值，导致历史永远停在某一刻。追加式日志一劳永逸。", cat: "eng", sub: "可视化看板", tags: ["看板", "日志", "Python"], date: "2026-09-17", read: 7 },
    { id: "hf-upload", title: "Hugging Face 大数据集上传卡死排查", summary: "服务端隐式的 commit 大小限制，以及基于文件级 SHA256 的断点续传。", cat: "eng", sub: "部署运维", tags: ["Hugging Face", "部署", "排障"], date: "2026-08-25", read: 8 },
    { id: "agent-bottleneck", title: "AI Agent 的瓶颈，到底卡在哪？", summary: "不是模型不够聪明，而是上下文、工具可靠性和评估体系。一篇从知乎讨论延伸出的思考。", cat: "essay", sub: "技术思考", tags: ["Agent", "思考"], date: "2026-09-08", read: 10 },
    { id: "obsidian", title: "用 Obsidian 搭第二大脑：我的知识管理系统", summary: "收集、整理、输出三段式，以及为什么最后还是决定把笔记公开成网站。", cat: "essay", sub: "读书笔记", tags: ["知识管理", "Obsidian"], date: "2026-07-05", read: 9 },
    { id: "philosophy-ai", title: "如果苏格拉底遇到 ChatGPT", summary: "用哲学家的视角追问：会回答问题的机器，懂得“知道自己不知道”吗？", cat: "essay", sub: "哲学与 AI", tags: ["哲学", "思考"], date: "2026-06-20", read: 6 }
  ],
  dailies: [
    { date: "2026-10-13", hl: ["storytold/wordcraft：纯 Rust 重写 Microsoft Word，GitHub 最高星", "Anatomy：AI Agent 生成等距机械插画技能"] },
    { date: "2026-10-12", hl: ["Karpathy：LLM 能力认知鸿沟正在扩大，业界与学界严重脱节", "morluto/rea：AI Agent 逆向工程工具单日 25,599 星，GitHub 现象级"] },
    { date: "2026-10-10", hl: ["Cloudflare 收购 Deno，边缘计算吞下服务端运行时", "3A 级扫雷游戏 Triple-A Minesweeper"] },
    { date: "2026-10-09", hl: ["Whistle：16.9 MB 的超轻量语音转文字模型", "行业为何对 DeepSeek 4.1 Flash 如此淡定？"] },
    { date: "2026-10-08", hl: ["Apollo 软件先驱 Margaret Hamilton 逝世", "Claude Haiku 5.5 发布：$0.10 输入的性价比模型"] },
    { date: "2026-09-30", hl: ["GPT 6.1 Sol：五分之一价格的近 Astra 智能", "德里如何把电网损耗从 50% 降到 5%"] },
    { date: "2026-09-29", hl: ["Anthropic 发布新一代 Sonnet 5.5", "MUBI 经典电影海盗史"] },
    { date: "2026-09-28", hl: ["Google 是从什么时候开始变得这么怪的？", "Fireworks 发布 Ember-1：专为省 Token 而生"] },
    { date: "2026-09-24", hl: ["GPT-6 Sol and Luna 登顶 HN：双模型战略铺开", "意大利议会投票通过重返核电"] },
    { date: "2026-09-23", hl: ["Claude Opus 5.5 发布", "GPT-6 Sol and Luna 发布"] },
    { date: "2026-09-22", hl: ["Exfiltrate your Weights：GET 请求窃取模型权重", "用俄罗斯方块理解注意力机制"] },
    { date: "2026-09-21", hl: ["AI 模型权重可被提取", "ChatGPT 通过广告收集器获取浏览行为"] },
    { date: "2026-09-20", hl: ["AI 生成的海报不一定糟糕", "用强化学习构建非自回归决策模型"] },
    { date: "2026-09-18", hl: ["富士通发布日本国产下一代 CPU MONAKA", "Hister：访问页面与文件的私有搜索引擎"] },
    { date: "2026-09-17", hl: ["编程小技巧的深远影响", "4B 模型生成比 Postgres 快 81% 的查询计划"] },
    { date: "2026-09-16", hl: ["电子墨水画框：听见鸟鸣，绘出 1800 年代插图", "System One Models 与新模型 Jev 发布"] },
    { date: "2026-09-15", hl: ["XCancel 服务无限期停摆", "OpenAI 机器人早已知晓 RubyGems 缓存漏洞"] },
    { date: "2026-09-14", hl: ["Google 为何仍在投放可疑广告？", "Fable 5.1 破解 370 年未解密码"] },
    { date: "2026-09-11", hl: ["Shopify 从 React Native 回归原生开发", "研究人员能否信任 OpenAI 处理未发表数学成果"] },
    { date: "2026-09-10", hl: ["Shopify 收购 Tailwind CSS", "Apple 发布双屏 iPhone Duo"] }
  ]
};
