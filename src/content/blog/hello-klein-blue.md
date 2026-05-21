---
title: "你好，克莱因蓝"
date: 2026-05-10
category: "ovf"
categoryName: "溢出"
excerpt: "这是 X-ATCN 的首篇博文。以克莱因蓝为灵魂色调，讲述这个站点的设计理念、技术栈与架构选择。从零搭建，独立部署，碎片沉淀为代码，思想蒸发成像素。"
tags: ["博客", "Astro", "克莱因蓝", "前端架构"]
---

## 起因

一直以来需要一个属于自己的数字空间。不是为了流量，不是为了展示，而是为了**沉淀**。

代码写多了，发现最珍贵的东西往往是那些散落在各种笔记软件、本地 Markdown、甚至 Twitter 碎片里的思考片段。需要一个容器，把它们重新连接起来。

于是有了这个博客。

## 设计语言

### 克莱因蓝

伊夫·克莱因（Yves Klein）曾说：

> 「蓝色没有维度，它超越维度。」

`#002FA7` — 这就是克莱因蓝。深邃、纯粹、无限。

蓝色是这个站点唯一的强调色。没有多色混杂，没有渐变泛滥。一个色相，撑起整套视觉体系。

这种极端的**色相克制**是我想要的设计哲学：把所有的视觉能量集中在一个点上，其他的全部退后，交给留白、灰度层级和字体节奏。

### 终端美学

网站融入了一定程度的终端 / CLI 元素：

- 关于页面的个人简介以 `whoami` / `cat ~/bio.txt` 的命令行风格呈现，躺在全屏克莱因蓝背景上的终端窗口里
- 空状态组件使用 SQL 查询和 `System.out.println` 的代码风格替代传统的"暂无文章"
- 分类标签使用 `节点 / nod`、`终端 / ter` 的双语命名法

这不是为了装酷，而是因为**终端本身的交互逻辑**与我写作的方式天然契合——线性的、命令驱动的、输出即记录。

### 粒子系统

首页 Hero 区域的粒子网络使用 Canvas 实现，约 50 个粒子在 130px 范围内相互连线，鼠标划过时产生微弱的吸附效果。粒子颜色跟随主题自动切换深浅。

这个粒子系统的代码就在首页的 `<script>` 块中——如果你想在项目中复现类似效果，可以借鉴那里实现的 `Particle` 类，核心只有 50 行。

## 技术架构

博客基于 **Astro** 静态站点生成器构建，核心架构如下：

| 功能 | 方案 | 说明 |
|------|------|------|
| 框架 | Astro (SSG) | 零 JS 输出，按需水合 |
| 样式 | Tailwind CSS | 自定义 `klein` 色系扩展 |
| 评论 | Giscus | 基于 GitHub Discussions，无需自建数据库 |
| 统计 | Supabase | 浏览量、点赞、评论数，Serverless + PostgreSQL |
| 搜索 | Astro 构建时生成 | `search-index.json.ts` 在构建时从所有文章提取标题、正文、分类、标签 |
| 部署 | Cloudflare Pages | GitHub Push 自动构建，全球 CDN 分发 |
| 域名 | Cloudflare DNS | `kleinblue.top`，Zone ID 托管 |

### 为什么是 Astro？

我喜欢 Astro 的一点是：**默认不输出 JavaScript**。对于内容型站点来说这是天然的优势——页面加载就是纯粹的 HTML + CSS，没有框架运行时、没有水合开销、没有闪烁。

同时它的 Content Collections 提供了类型安全的 frontmatter 校验，用 Zod 定义文章 Schema，构建时自动校验字段完整性：

```typescript
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string().optional(),
    category: z.string().optional().default('ovf'),
    tags: z.array(z.string()).optional(),
  }),
});
```

### 搜索索引：构建时预生成

搜索没有引入任何第三方服务（Algolia / Meilisearch），而是利用 Astro 的构建时 `getCollection` API 生成一个 `search-index.json`：

```typescript
// src/pages/search-index.json.ts
const posts = await getCollection('blog');
const searchIndex = posts.map(p => ({
  slug: p.slug,
  title: p.data.title,
  excerpt: p.data.excerpt || '',
  body: p.body,                   // 正文全文索引
  category: p.data.category,
  categoryName: p.data.categoryName || '',
  tags: p.data.tags || [],
  date: p.data.date.toISOString(),
}));
```

前端搜索逻辑使用 `indexOf` / `includes` 做模糊匹配，同时查询标题、正文、标签和分类中文名。对于这个体量的博客来说，无需网络请求的本地搜索已经足够快。

### 统计系统

页面底部的浏览量、点赞、评论数通过 **Supabase** 的 PostgreSQL RPC 实现原子递增：

```sql
-- increment_views RPC
CREATE OR REPLACE FUNCTION increment_views(p_slug TEXT)
RETURNS INT AS $$
  UPDATE blog_stats
  SET views = views + 1
  WHERE slug = p_slug
  RETURNING views;
$$ LANGUAGE sql;
```

前端通过 `fetch` + `apikey` 调用 REST API，使用 `sb_publishable` 级别的匿名密钥，配合 Row Level Security 确保安全。总统计量在博客页遍历所有行求和展示。

### 评论区

评论区使用 **Giscus**，以 GitHub Discussions 为数据后端。每篇文章的评论线程自动关联到该文章的 URL pathname。主题跟随站点暗色模式，通过 `postMessage` 与 Giscus iframe 同步。

Giscus 的配置逻辑在文章详情页的 `<script>` 中动态创建：

```javascript
var gs = document.createElement('script');
gs.src = 'https://giscus.app/client.js';
gs.setAttribute('data-repo', 'jynight/MyBlog');
gs.setAttribute('data-repo-id', 'R_kgDOSZJ6kg');
gs.setAttribute('data-mapping', 'pathname');
// ...
```

## 项目结构概览

```
MyBlog/
├── src/
│   ├── components/
│   │   ├── Header.astro        # 全局导航栏 + 搜索弹窗
│   │   ├── Footer.astro        # 页脚：Logo/运行天数/设计署名
│   │   ├── CategoryBar.astro   # 分类导航栏（含 HUD 悬浮提示）
│   │   └── EmptyState.astro    # 空状态占位组件
│   ├── content/
│   │   ├── config.ts           # Content Collections Schema
│   │   └── blog/               # 文章源文件（.md）
│   ├── layouts/
│   │   └── BaseLayout.astro    # 全局布局：SEO/OG/主题切换/滚动进度条
│   └── pages/
│       ├── index.astro         # 首页 Hero + 粒子动画 + 文章列表
│       ├── about.astro         # 关于页：终端风格简介
│       ├── search-index.json.ts # 构建时搜索索引生成器
│       └── blog/
│           ├── index.astro     # 博客列表页
│           └── [...slug].astro # 文章详情页
└── public/
    └── favicon.svg
```

## 一些设计细节

- **滚动进度条**：页面顶部一条克莱因蓝的细线，实时反映阅读进度，用纯 CSS `transition-[width]` 实现
- **空状态组件**：分类过滤没有文章时，底部使用终端风格的 SQL 查询结果 + `System.out.println("暂无数据输入...")` 替代空白页面，视觉上保持 40vh 的最小高度防止布局塌陷
- **分类导航 HUD**：鼠标悬浮分类按钮时浮出简短的描述提示（"构成数字世界的底层基础设施与计算力"），左侧带有克莱因蓝竖线装饰
- **暗色模式**：完整个性化适配，重点保持阅读区域的对比度，标题白色、正文高对比灰、辅助文字低对比灰，符合 WCAG AA 标准
- **滚动条稳定**：`scrollbar-gutter: stable` 确保内容切换时主内容宽度不变

## 从零到一

项目的完整代码托管在 GitHub：

👉 **[github.com/jynight/MyBlog](https://github.com/jynight/MyBlog)**

欢迎 Fork、Issue 或 PR。如果你觉得这个设计风格有趣，可以随意参考项目的组件实现——特别是 `EmptyState.astro` 和 `CategoryBar.astro` 中的交互逻辑。

博客使用 MIT 协议开源。想自己搭建一个类似的站点，只需要：

```bash
git clone https://github.com/jynight/MyBlog.git
cd MyBlog
npm install
npm run dev
```

然后修改 `src/content/config.ts` 的文章 Schema、替换 `BaseLayout.astro` 中的个人信息，就可以开始写作了。

## 写在最后

> 碎片终将沉淀，代码终成像素。

这不是一个普通的技术博客。这里会写代码、写硬件、写终端、写一切值得被记录的东西。不讲空洞的"改变世界"，只记录真实的思考轨迹。

这就是开始。更多内容，敬请期待。
