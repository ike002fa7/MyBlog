# MyBlog

极简科技风个人博客 — 克莱因蓝 · 无服务器 · GitHub Pages

**https://kleinblue.top**

## 技术栈

| 层 | 方案 |
|---|---|
| 框架 | [Astro 7](https://astro.build) SSG |
| 样式 | [Tailwind CSS 4](https://tailwindcss.com) + `@tailwindcss/typography` |
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
└── package.json
```

## 本地开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # 类型与内容检查
npm test         # 检查并构建
npm run build    # 输出到 dist/
```

## 发布文章

在 `src/content/blog/` 下创建 `.md` 文件：

```md
---
title: 文章标题
date: 2026-05-10
updatedDate: 2026-05-12       # 可选
excerpt: 摘要
category: nod                 # nod / ter / wrk / ker / ovf
tags: [标签1, 标签2]
draft: false                  # 草稿不会构建
featured: false               # 首页精选标记
cover: /images/example.png    # 可选社交分享图
series: 系列名称              # 可选
references:                   # 可选资料来源
  - title: 资料标题
    url: https://example.com
---

正文内容...
```

推送 `main` 分支自动部署。

站点会自动生成阅读时间、上一篇/下一篇、同分类延伸阅读、站点地图与搜索索引。当前内容体系为节点、终端、工作台、内核、溢出五个分类，每类保留 4 篇文章。

## 数据库

Supabase 初始化脚本：`scripts/supabase-migration.sql`

表结构：
- `blog_stats` — slug, views, likes, comments

匿名访问只允许读取统计数据并调用受限的浏览/点赞计数函数，不能直接写表。修改迁移脚本后需要在 Supabase SQL Editor 中重新执行一次，使策略和函数更新生效。

## 许可证

[MIT](LICENSE)
