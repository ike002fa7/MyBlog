---
title: "你好，克莱因蓝"
date: 2026-05-10
excerpt: "这是我的第一篇博客文章。基于 Astro + GitHub Pages 搭建的极简科技风个人博客，以克莱因蓝为主色调。"
tags: ["博客", "技术"]
---

## 关于这个博客

这是一个基于 **Astro** 静态站点生成器构建的个人博客，托管在 **GitHub Pages** 上。

### 技术栈

| 功能 | 方案 |
|------|------|
| 框架 | Astro (SSG) |
| 样式 | Tailwind CSS |
| 评论 | Giscus (GitHub Discussions) |
| 统计 | Supabase (Serverless) |
| 部署 | GitHub Pages + Actions |

### 克莱因蓝

伊夫·克莱因 (Yves Klein) 曾说：

> 「蓝色没有维度，它超越维度。」

`#002FA7` — 这就是克莱因蓝，深邃、纯粹、无限。

### 代码示例

```typescript
interface BlogStats {
  slug: string;
  views: number;
  likes: number;
}

async function incrementViews(slug: string): Promise<number> {
  const { data } = await supabase
    .rpc('increment_views', { p_slug: slug });
  return data ?? 0;
}
```

---

这就是开始。更多内容，敬请期待。
