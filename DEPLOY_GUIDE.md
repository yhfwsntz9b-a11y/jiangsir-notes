# 姜sir笔记 - Markdown 文章部署工具

## 快速开始

将写好的 Markdown 文章一键部署到网站，自动生成网页、处理图片、更新索引。

### 1. 准备 Markdown 文件

在任意位置创建 `.md` 文件，格式要求：

```markdown
# 文章标题

第一段文字会自动作为摘要显示在列表中。

## 章节标题

正文内容...

![图片描述](path/to/image.png)

支持本地图片和网络图片。
```

### 2. 运行部署命令

```bash
cd /Users/jiangyunchao/jiangsir-notes

python3 deploy_md.py <文章ID> <MD文件路径> [选项]
```

**示例：**

```bash
# 基础用法
python3 deploy_md.py my-article /path/to/article.md

# 完整选项
python3 deploy_md.py ai-agent-tutorial \
  /Users/jiangyunchao/2-微信图文/AI教程/article.md \
  --category ai \
  --sub "Agent 开发" \
  --tags "Agent,教程,LangGraph" \
  --featured \
  --read-time 15
```

### 3. 参数说明

| 参数 | 缩写 | 说明 | 默认值 |
|------|------|------|--------|
| `article_id` | - | 文章ID（英文，用于URL） | 必填 |
| `md_file` | - | Markdown 文件路径 | 必填 |
| `--category` | `-c` | 分类：ai/data/eng/essay | ai |
| `--sub` | `-s` | 子分类 | 未分类 |
| `--tags` | `-t` | 标签，逗号分隔 | 空 |
| `--featured` | `-f` | 标记为精选文章 | false |
| `--read-time` | `-r` | 阅读时间（分钟） | 10 |

### 4. 部署到网站

脚本会自动：
- ✅ 提取标题和摘要
- ✅ 转换 Markdown 为 HTML
- ✅ 复制本地图片到 `images/<article_id>/`
- ✅ 更新图片路径为网站相对路径
- ✅ 添加文章元数据到 `data.js`
- ✅ 添加文章内容到 `articles.js`
- ✅ 更新所有页面的缓存版本号

然后手动推送：

```bash
./deploy.sh "添加文章：<标题>"
```

等待 1-2 分钟后访问：
```
https://yhfwsntz9b-a11y.github.io/jiangsir-notes/article.html?id=<article_id>
```

## 分类说明

| 分类ID | 名称 | 子分类示例 |
|--------|------|------------|
| `ai` | AI 应用 | RAG 知识库、Agent 开发、模型动态、模型微调、论文解读 |
| `data` | 数据采集 | 爬虫框架、公众号采集、反爬对抗 |
| `eng` | 工程实践 | 自动化 RPA、部署运维、可视化看板 |
| `essay` | 随笔 | 技术思考、读书笔记、哲学与 AI |

## 图片处理

### 本地图片
脚本会自动复制并更新路径：

```markdown
![架构图](./diagrams/arch.png)
→ 复制到 images/<article_id>/arch.png
→ 更新为 images/<article_id>/arch.png
```

### 网络图片
保持原样，不处理：

```markdown
![论文图](https://arxiv.org/figure1.png)
→ 保持不变
```

## 完整工作流示例

### 场景：部署一篇 AI Agent 教程

**1. 准备文件结构**
```
/Users/jiangyunchao/2-微信图文/AI教程/
├── article.md          # 文章正文
└── diagrams/
    ├── arch.png        # 架构图
    ├── flow.png        # 流程图
    └── benchmark.png   # 对比图
```

**2. 运行部署**
```bash
cd /Users/jiangyunchao/jiangsir-notes

python3 deploy_md.py ai-agent-tutorial \
  /Users/jiangyunchao/2-微信图文/AI教程/article.md \
  --category ai \
  --sub "Agent 开发" \
  --tags "Agent,教程,LangGraph,入门" \
  --featured \
  --read-time 20
```

**3. 推送到网站**
```bash
./deploy.sh "添加文章：AI Agent 教程"
```

**4. 验证**
- 访问：https://yhfwsntz9b-a11y.github.io/jiangsir-notes/article.html?id=ai-agent-tutorial
- 检查：图片加载、文章列表、分类筛选

## 常见问题

### Q: 文章ID用什么？
A: 使用英文短横线命名，如 `ai-agent-tutorial`、`rag-best-practices`。会用在 URL 中。

### Q: 图片没显示？
A: 检查 MD 中的图片路径是否正确。脚本只会处理存在的本地文件。

### Q: 可以修改已部署的文章吗？
A: 可以。修改原 MD 文件后重新运行部署命令，会覆盖更新。

### Q: 如何删除文章？
A: 手动编辑 `assets/data.js` 和 `assets/articles.js`，删除对应条目。

### Q: 精选文章有什么效果？
A: 会在首页"精选专题"区域展示，增加曝光。

## 技术细节

### Markdown 转换
脚本使用简单的正则转换，支持：
- 标题（# ## ###）
- 图片（![]()）
- 链接（[]()）
- 粗体（**text**）
- 斜体（*text*）
- 列表（* -）
- 引用（>）
- 分隔线（---）

如需更复杂的 Markdown 功能，可以安装 `markdown` 库：
```bash
pip3 install markdown
```

然后修改 `deploy_md.py` 中的 `md_to_html()` 函数使用 `markdown.markdown()`。

### 文件位置
- 文章元数据：`assets/data.js` → `posts[]` 数组
- 文章内容：`assets/articles.js` → `ARTICLE_CONTENT{}` 对象
- 文章图片：`images/<article_id>/`
- 缓存版本：所有 `.html` 文件的 `?v=YYYYMMDD` 参数

### 缓存机制
GitHub Pages 静态资源缓存顽固，每次部署必须更新版本号。脚本会自动处理。

## 对比其他部署方式

| 方式 | 适用场景 | 优点 | 缺点 |
|------|----------|------|------|
| `deploy_md.py` | 新文章部署 | 一键完成，自动处理图片 | 简单 MD 转换 |
| 手动编辑 JS | 修改已有文章 | 完全控制 | 容易出错 |
| `deploy_article.py` | 旧版工具 | 功能类似 | 已废弃 |

**推荐：** 新文章统一使用 `deploy_md.py`。

## 更新日志

### 2026-10-30
- ✅ 初始版本
- ✅ 支持图片自动处理
- ✅ 支持元数据提取
- ✅ 支持缓存版本更新
- ✅ 修复 data.js 中文引号问题
