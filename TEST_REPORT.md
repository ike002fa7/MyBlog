# MyBlog 验证报告

最后更新：2026-07-28

## 当前基线

- Astro 7 + Tailwind CSS 4
- 2 篇文章
- 5 个 HTML 页面，以及动态生成的 robots、搜索索引和 sitemap
- 部署目标：GitHub Pages
- 生产域名：https://kleinblue.top

## 自动验证

每次推送到 `main` 时，GitHub Actions 执行：

```bash
npm ci
npm test
```

`npm test` 包含 Astro 类型与内容检查，以及完整静态构建。本文档只记录验证范围，不手工保存容易过期的页面数量或统计数据；构建日志是最终依据。

## 安全基线

- 搜索结果使用 DOM API 和 `textContent` 渲染，不拼接文章内容到 `innerHTML`
- Supabase 匿名角色只能读取统计表并调用受限的计数 RPC，不能直接插入、更新或删除行
- Giscus 消息仅接受 `https://giscus.app` 来源
- 依赖通过 `npm audit` 检查
