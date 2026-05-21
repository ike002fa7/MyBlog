# MyBlog

极简科技风个人博客 — 克莱因蓝 · 无服务器 · GitHub Pages

**https://kleinblue.top**

## 技术栈

| 层 | 方案 |
|---|---|
| 框架 | [Astro](https://astro.build) SSG |
| 样式 | [Tailwind CSS](https://tailwindcss.com) + `@tailwindcss/typography` |
| 评论 | [Giscus](https://giscus.app) (GitHub Discussions) |
| 统计 | [Supabase](https://supabase.com) REST API |
| 部署 | GitHub Pages + GitHub Actions |
| 域名 | kleinblue.top (Cloudflare) |

## 项目结构

```
MyBlog/
├── .github/workflows/deploy.yml  # CI/CD
├── public/
│   ├── CNAME                     # 自定义域名
│   ├── favicon.svg
│   └── js/blog-stats.js          # 统计脚本 (共享)
├── scripts/
│   └── supabase-migration.sql    # 数据库建表
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── content/blog/             # Markdown 文章
│   ├── layouts/BaseLayout.astro
│   └── pages/
│       ├── index.astro           # 首页
│       └── blog/
│           ├── index.astro       # 文章列表
│           └── [...slug].astro   # 文章详情
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 本地开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/
```

## 发布文章

在 `src/content/blog/` 下创建 `.md` 文件：

```md
---
title: 文章标题
date: 2026-05-10
excerpt: 摘要
tags: [标签1, 标签2]
---

正文内容...
```

推送 `main` 分支自动部署。

## 数据库

Supabase 初始化脚本：`scripts/supabase-migration.sql`

表结构：
- `blog_stats` — slug, views, likes, comments
