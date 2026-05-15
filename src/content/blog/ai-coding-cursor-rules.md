---
title: "Cursor Rules：用规则驱动 AI 编码的最佳实践"
date: 2026-05-10
excerpt: "深入解析 Cursor Rules 机制，从基础配置到高级规则模板，让你的 AI 编程助手真正理解项目上下文。"
category: "nod"
tags: ["AI", "编程", "Cursor", "效率"]
---

## 为什么你的 AI 写代码总是差一点？

相信很多开发者都有这样的体验：让 AI 帮你写一段代码，功能是对了，但——命名风格不一致、用了你不喜欢的库、缺少错误处理、甚至忽略了项目已有的工具函数。你不得不花大量时间在 Prompt 里反复强调："请用 TypeScript 严格模式"、"别用 any"、"错误要用 Result 类型返回"……

这些"重复的唠叨"正是 **Cursor Rules** 要解决的问题。

## Cursor Rules 是什么？

Cursor Rules 是 Cursor 编辑器提供的一套**项目级 AI 行为配置机制**。通过在项目根目录创建规则文件，你可以为 AI 编码助手预设编码规范、技术栈偏好、项目约定等上下文信息。AI 在生成代码时，会始终遵循这些规则。

简单来说：**把"每次都要解释一遍的东西"写进规则文件，一劳永逸。**

从 Cursor 0.45+ 版本开始，有两种规则配置方式：

| 方式 | 文件 | 特点 |
|------|------|------|
| 传统模式 | `.cursorrules` | 单文件，所有规则集中管理 |
| 新模式 (推荐) | `.cursor/rules/*.mdc` | 多文件，按场景分组，支持 glob 匹配 |

## 快速上手：创建你的第一个规则文件

### 基础版本 — .cursorrules

在项目根目录创建 `.cursorrules` 文件：

```markdown
## 项目概述
这是一个 Next.js 14 + TypeScript 的全栈博客项目，使用 Prisma 作为 ORM，
Tailwind CSS 作为样式方案。

## 编码规范
- 使用 TypeScript 严格模式，禁止使用 `any` 类型
- 函数必须显式声明返回类型
- 使用 `async/await` 而非 Promise 链式调用
- 命名规范：组件用 PascalCase，函数用 camelCase，常量用 UPPER_SNAKE_CASE

## 项目约定
- API 路由放在 `app/api/` 下，使用 Next.js Route Handlers
- 数据库查询统一通过 `lib/db.ts` 中的 Prisma 客户端
- 所有 API 返回值使用 `{ success: boolean, data?: T, error?: string }` 格式
- 错误处理使用 `lib/errors.ts` 中的自定义错误类

## 偏好
- 状态管理优先使用 React Context + useReducer，避免引入 Redux
- 日期处理使用 `date-fns`，不要使用 moment.js
- 测试使用 Vitest + React Testing Library
```

保存后，Cursor Agent 在所有对话中都会遵循这些约定。例如，当你请求"创建一个用户登录 API"时，AI 会自动使用 Next.js Route Handlers、Prisma 查询、并返回项目标准格式的响应。

### 进阶版本 — .cursor/rules/ 目录

新版本推荐使用多文件结构，每个规则文件可以用 **frontmatter** 控制生效条件：

```
.cursor/rules/
├── global.mdc          # 全局规则，始终生效
├── react-components.mdc # React 组件规范
├── api-routes.mdc      # API 路由规范
├── testing.mdc         # 测试规范
└── database.mdc        # 数据库查询规范
```

每个 `.mdc` 文件支持 frontmatter 元数据：

```markdown
---
description: React 组件编码规范
globs: ["**/*.tsx", "**/*.jsx"]
alwaysApply: true
---

## React 组件规范
- 优先使用函数组件 + Hooks
- Props 类型必须独立定义 interface，命名为 `ComponentNameProps`
- 组件导出使用 named export，避免 default export
- 使用 `clsx` 或 `cn()` 工具函数拼接 className
- 条件渲染优先使用三元运算符或 `&&`，复杂逻辑提取为变量
```

关键字段说明：
- **`globs`**：指定规则适用的文件类型，AI 编辑匹配文件时自动激活
- **`alwaysApply`**：设为 `true` 时规则始终生效
- **`description`**：描述规则用途，方便团队理解

## 不同项目类型的最佳规则示例

### 1. 前端 React 项目

```markdown
---
globs: ["**/*.tsx", "**/*.ts"]
alwaysApply: false
---

## React + TypeScript 规范
- 状态管理：简单状态用 `useState`，复杂状态用 `useReducer`
- 服务端数据获取统一使用 TanStack Query (React Query)
- 表单处理使用 React Hook Form + Zod 校验
- 组件拆分原则：单一职责，超过 150 行考虑拆分
- CSS 方案：Tailwind CSS，复杂样式提取为 `@apply` 或 CSS Module
- 避免在 `useEffect` 中直接调用异步函数，封装为命名函数
- 图片使用 Next.js `Image` 组件，设置合理的 width/height
```

### 2. Node.js 后端项目

```markdown
---
globs: ["**/*.ts"]
alwaysApply: true
---

## Node.js 后端规范
- 使用 Fastify 作为 HTTP 框架
- 所有路由处理函数必须包含 try-catch 错误处理
- 敏感信息通过环境变量读取，使用 `env.ts` 统一导出
- API 响应格式：`{ code: number, message: string, data: T | null }`
- 日志使用 `pino`，不要使用 `console.log`
- 数据库迁移使用 Drizzle ORM，迁移文件纳入版本控制
- 所有外部 API 调用设置 10 秒超时
```

### 3. Python 数据科学项目

```markdown
---
globs: ["**/*.py"]
alwaysApply: true
---

## Python 数据科学规范
- 类型注解：所有公共函数必须包含完整类型注解
- 数据处理：Pandas DataFrame 操作优先使用链式调用
- 可视化：统一使用 Plotly Express，不用 matplotlib.pyplot
- 实验管理：使用 MLflow 记录参数、指标和模型
- 代码格式：遵循 Black 格式化规则，行宽 100
- 导入顺序：标准库 → 第三方库 → 本地模块
- Notebook 开发后必须提取为 `.py` 模块
```

### 4. 全栈 T3 项目

```markdown
---
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: true
---

## T3 Stack 规范
- 数据库操作统一放在 `server/api/routers/` 下的 tRPC router 中
- 前端使用 tRPC 的 typed client，禁止直接 fetch API
- 认证使用 NextAuth.js，通过 `getServerAuthSession` 获取会话
- 环境变量校验使用 `@t3-oss/env-nextjs`
- Prisma schema 变更后运行 `npx prisma generate`
- 文件上传使用 UploadThing
- 全局类型定义放在 `src/types/` 目录
```

## 提升 AI 代码质量的进阶技巧

### 1. 给出反例

不只说"要做什么"，也要说"不要做什么"：

```markdown
## 禁止事项
- ❌ 不要在组件中直接操作 DOM（使用 React ref 代替）
- ❌ 不要使用 `@ts-ignore` 或 `@ts-expect-error`（修复类型错误）
- ❌ 不要在 useEffect 中忘记清理副作用
- ❌ 不要使用 `index` 作为 React key
```

### 2. 提供代码模板

给出项目中的常用模式，AI 会自动套用：

```markdown
## API Handler 模板

所有 API 路由按以下模板编写：

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { AppError } from "@/lib/errors";
import { getServerSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    // 业务逻辑...

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      );
    }
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
```
```

### 3. 利用 Glob 模式精细控制

```markdown
# 仅对 API 路由文件生效
---
globs: ["app/api/**/*.ts"]
---

# 仅对测试文件生效
---
globs: ["**/*.test.ts", "**/*.spec.ts"]
---
```

### 4. 链接项目文档

在规则中引用项目的重要文档：

```markdown
## 重要参考
- 架构设计：参见 `docs/ARCHITECTURE.md`
- API 文档：参见 `docs/API.md`
- 数据库 Schema：参见 `prisma/schema.prisma`
- 组件库：参见 `docs/COMPONENTS.md`
```

## 常见问题与陷阱

### Q: 规则太长会影响 AI 性能吗？

会的。建议单个规则文件控制在 **300-500 行以内**。如果项目约定很多，拆分为多个 `.mdc` 文件，通过 glob 匹配按需加载。AI 的上下文窗口虽大，但精简的指令能获得更精准的响应。

### Q: 规则之间冲突了怎么办？

如果有多个规则同时匹配一个文件，AI 会合并所有规则。冲突时，通常**后加载的规则优先级更高**。建议避免在多个文件中定义矛盾的指令。

### Q: 规则对 Cursor Tab（自动补全）也生效吗？

Rules 主要影响 Chat 和 Agent 模式的生成结果，对 Tab 内联补全的影响有限。Tab 补全更多依赖上下文窗口中的代码模式。

### Q: 团队共享规则如何管理？

将 `.cursorrules` 或 `.cursor/rules/` 目录纳入 Git 版本控制，团队成员 clone 项目后自动生效。可以在 `README.md` 中说明规则文件的作用，帮助新成员理解。

## 总结

Cursor Rules 本质上是**将隐式的开发约定显式化**。一个好的规则文件能带来：

1. **一致性** — 团队所有成员 + AI 遵循同一套标准
2. **效率** — 减少反复纠正 AI 的时间，一次配置持续生效
3. **质量** — AI 生成的代码更贴近项目实际需求
4. **可维护性** — 项目约定集中管理，新人上手更快

建议从一个小而精的 `.cursorrules` 开始，随着项目发展逐步补充。**好的规则不是写得越多越好，而是写得越对越好。**

> 延伸阅读：[Cursor Rules 官方文档](https://docs.cursor.com/context/rules-for-ai)
