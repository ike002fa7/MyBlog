---
title: "AI Coding Agent 工作流：从 Prompt 到生产的自动化实践"
date: 2026-05-10
excerpt: "对比 Claude Code、Codex CLI、OpenCode 三大 AI 编程智能体，深入解析自主编码模式与多智能体协作技巧。"
category: "nod"
tags: ["AI", "编程", "Agent", "自动化"]
---

## 从 Copilot 到 Agent：编程范式的跃迁

2025 年被称为"AI Coding Agent 元年"。短短一年间，编程助手完成了从"代码补全工具"到"自主编程智能体"的进化。它们不再是坐在副驾驶位置给出建议，而是可以直接握住方向盘——读取文件、执行命令、运行测试、提交代码。

本文将深入对比目前最受关注的三款 AI Coding Agent，分析它们的工作流设计、MCP 集成能力和多智能体协作模式，帮助你选择最适合自己团队的方案。

## 三大 Agent 横向对比

| 特性 | Claude Code | Codex CLI | OpenCode |
|------|------------|-----------|----------|
| 开发商 | Anthropic | OpenAI | anomalyco (社区) |
| 开源 | ❌ 闭源 | ✅ Apache 2.0 | ✅ 100% 开源 |
| 运行环境 | 终端 / IDE / GitHub | 终端 / IDE / 桌面 App / Web | 终端 / 桌面 App |
| 模型绑定 | Claude 系列 | GPT 系列 | 不绑定（支持 Claude/GPT/Google/本地模型） |
| MCP 支持 | ✅ 完整支持 | ✅ 支持 | ✅ 支持 |
| LSP 集成 | ❌ | ❌ | ✅ 内置可选 |
| 安装方式 | `curl -fsSL https://claude.ai/install.sh \| bash` | `npm i -g @openai/codex` | `npm i -g opencode-ai` |
| 扩展机制 | Plugins + Hooks | Extensions | Agents + Provider API |

### Claude Code — 企业级可靠之选

Claude Code 是 Anthropic 推出的终端 AI 编程智能体，定位为"你的终端里的 AI 工程师"。它能理解整个代码库的上下文，处理 Git 操作、执行 shell 命令、编辑文件。

**核心工作流：**

```
用户输入自然语言指令
    ↓
Claude Code 分析代码库上下文（自动索引文件）
    ↓
制定执行计划（可选的 Plan Mode）
    ↓
逐步执行：读文件 → 编写/修改代码 → 运行测试 → 验证结果
    ↓
询问用户确认关键操作（可配置自主级别）
    ↓
完成后生成摘要
```

**亮点特性：**

- **Slash Commands**：`/bug` 提交 Bug、`/review` 代码审查、`/commit` 自动生成 commit message
- **权限分级**：可配置允许/询问/拒绝的操作（如网络请求、文件写入、shell 执行）
- **Hook 系统**：在特定事件（PreToolUse、PostToolUse）触发自定义脚本
- **IDE 集成**：可在 VS Code、JetBrains 中作为插件使用

```bash
# Claude Code 典型使用流程
$ claude
> 帮我把用户认证模块从 JWT 迁移到 OAuth 2.0，更新相关测试

# Claude Code 会：
# 1. 搜索项目中的认证相关文件
# 2. 读取现有 JWT 实现
# 3. 制定迁移计划
# 4. 逐步修改代码
# 5. 更新测试
# 6. 运行测试套件验证
```

### Codex CLI — OpenAI 的全平台编程助手

Codex CLI 于 2025 年 4 月发布，是 OpenAI 对 Claude Code 的回应。它的最大亮点是**多端统一体验**——同一套 Codex 引擎，可以选择在终端、IDE、桌面 App 或 Web 端使用。

**架构特色：**

```
Codex 多端架构:
┌─────────────┐  ┌──────────┐  ┌───────────┐  ┌──────────┐
│ Codex CLI    │  │ VS Code  │  │ Desktop   │  │ Codex Web │
│ (终端)       │  │ Extension│  │ App       │  │ (云端)    │
└──────┬───────┘  └────┬─────┘  └─────┬─────┘  └────┬─────┘
       └───────────────┴──────────────┴───────────────┘
                           │
                    ┌──────┴──────┐
                    │  Codex Core │
                    │  (同一引擎)  │
                    └─────────────┘
```

**与 ChatGPT 深度集成：**

Codex CLI 最大的差异化优势是与 ChatGPT 订阅计划的深度绑定。Plus/Pro/Team 用户可以直接用量额内的 Codex，无需额外付费。API Key 用户也可使用。

**典型使用示例：**

```bash
# 从零搭建完整项目
$ codex
> 用 Next.js 创建一个博客应用，包含：
  - Markdown 文章渲染
  - 标签和分类系统
  - RSS 订阅生成
  - 暗色模式切换

# Codex 会：
# 1. 运行 `npx create-next-app` 初始化项目
# 2. 安装所需依赖
# 3. 创建文件结构
# 4. 编写所有组件和页面
# 5. 配置构建流程
# 6. 运行开发服务器验证
```

### OpenCode — 开源社区的黑马

OpenCode 由 anomalyco 团队开发，前身是 SST 框架团队内部工具。它是三者中**唯一 100% 开源且不绑定任何模型提供商**的 Agent。其终端 TUI 设计尤为出色，由 terminal.shop 的创造者打造。

**独特的 Client/Server 架构：**

```
OpenCode 架构:
┌──────────────────┐
│  TUI Client       │  ← 终端用户界面 (你看到的)
│  (React + Ink)    │
└────────┬─────────┘
         │ WebSocket
┌────────┴─────────┐
│  OpenCode Server  │  ← 核心引擎
│  - Agent 调度     │
│  - 工具执行       │
│  - 模型调用       │
└────────┬─────────┘
         │
    ┌────┴────┐
    │ LLM API │  ← 可切换任意模型
    └─────────┘
```

这种架构意味着你可以远程操控 OpenCode——比如在服务器上运行 Agent，通过手机或浏览器客户端连接操作。

**内置 Agent 系统：**

OpenCode 内置两种 Agent，按 `Tab` 键切换：

| Agent | 权限 | 适用场景 |
|-------|------|----------|
| **build** | 完整读写 + 命令执行 | 日常开发、功能实现 |
| **plan** | 只读分析 + 命令需确认 | 代码探索、变更规划 |
| **general** | 子代理（内部使用） | 复杂搜索、多步骤任务 |

## MCP 集成：让 Agent 连接世界

**Model Context Protocol (MCP)** 是 AI Coding Agent 生态的关键基础设施。它标准化了 LLM 与外部工具的交互方式，让 Agent 可以：

- 查询数据库（PostgreSQL MCP Server）
- 操作云资源（Azure MCP Server、AWS MCP Server）
- 管理 GitHub 仓库（GitHub MCP Server）
- 读写文件系统（Filesystem MCP Server）
- 搜索网页（Brave Search MCP Server）

### MCP 工作原理

```
┌─────────┐     MCP Protocol     ┌──────────────┐
│  Agent   │ ←────────────────→  │  MCP Server   │ → 外部服务
│ (Client) │    JSON-RPC 2.0     │  (Tool/Resource)│   (API/DB/FS)
└─────────┘                      └──────────────┘
```

以 Claude Code + GitHub MCP 为例：

```json
// claude_desktop_config.json (或项目级 .mcp.json)
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<your-token>"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://localhost/mydb"
      }
    }
  }
}
```

配置后，Agent 可以直接：
- 创建 Issue / PR
- 查询数据库 Schema
- 执行 SQL 查询
- 读取和修改仓库文件

### 实战场景：全自动 Bug 修复流水线

```
1. 用户: "fix issue #42"
        ↓
2. Agent 通过 GitHub MCP 读取 Issue 描述
        ↓
3. Agent 搜索代码库定位问题
        ↓
4. Agent 编写修复代码
        ↓
5. Agent 运行测试验证
        ↓
6. Agent 通过 GitHub MCP 创建 PR，引用 Issue #42
        ↓
7. Agent 在 PR 中附上修复说明和测试结果
```

整个过程无需开发者手动操作 GitHub 网页。

## 自主编码模式：从监督到信任

### 四种自主级别

| 级别 | 描述 | 适用场景 |
|------|------|----------|
| **L1: 建议模式** | Agent 只提建议，所有修改由用户确认 | 学习阶段、关键业务代码 |
| **L2: 编辑确认** | Agent 自动编辑，但每次修改前询问 | 常规开发 |
| **L3: 任务确认** | 只在任务开始前确认，中途自主执行 | 熟悉项目后的日常开发 |
| **L4: 全自主** | Agent 自主规划、执行、提交 | CI/CD 流水线、非关键任务 |

```bash
# Claude Code 权限配置示例 (.claude/settings.json)
{
  "permissions": {
    "allow": [
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(git diff:*)",
      "Bash(git status:*)"
    ],
    "ask": [
      "Bash(git push:*)",
      "Bash(npm run deploy:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl:*)"
    ]
  }
}
```

### 最佳实践：渐进式信任

不要一开始就给 Agent 全自主权限。推荐分阶段：

1. **第一周**：L1 模式，观察 Agent 的代码风格和质量
2. **第二周**：L2 模式，信任编辑能力但保持审查
3. **一个月后**：L3 模式，在熟悉的技术栈上放权
4. **生产环境**：始终保持在 L2 以上需要人工确认

## 多智能体协作技巧

### 模式一：主从协作 (Orchestrator-Worker)

一个主 Agent 分解任务，派发给多个子 Agent 并行执行：

```
用户: "重构用户系统，拆分为 auth、profile、settings 三个微服务"

主 Agent (Orchestrator):
  ├── Worker 1: 创建 auth 微服务
  ├── Worker 2: 创建 profile 微服务
  └── Worker 3: 创建 settings 微服务
       ↓
主 Agent: 合并结果，更新网关配置，运行集成测试
```

OpenCode 的 `@general` 子代理就是这种模式的体现。

### 模式二：审阅者模式 (Reviewer)

两个 Agent 轮流工作——一个写代码，一个审阅：

```bash
# Agent A 编写代码
> 实现用户注册 API

# Agent B 审阅
> review 刚才的改动，检查安全性和边界条件

# Agent A 修复问题
> 根据审阅意见修复
```

Claude Code 的 `/review` 命令天然支持这种模式。

### 模式三：专业化分工

为不同技术领域配置专门的 Agent：

- **前端 Agent**：专注 React/Vue 组件开发
- **后端 Agent**：专注 API 和数据库
- **DevOps Agent**：专注 CI/CD 和部署
- **测试 Agent**：专注测试用例编写

每个 Agent 有独立的 Rules 配置，术业有专攻。

### 模式四：人机结对编程

```
人类开发者               AI Agent
    │                        │
    ├─ 定义架构方向          │
    │                        ├─ 实现模板代码
    ├─ 审查关键逻辑          │
    │                        ├─ 编写测试
    ├─ 处理复杂业务规则      │
    │                        ├─ 处理样式和布局
    ├─ 决策和权衡            │
    │                        ├─ 文档生成
    └────────────────────────┘
           最终交付
```

## 选择建议

| 你的需求 | 推荐选择 |
|----------|----------|
| 追求稳定性和企业支持 | Claude Code |
| 已订阅 ChatGPT Plus/Pro | Codex CLI |
| 需要完全开源 + 模型自由 | OpenCode |
| 终端 TUI 体验至上 | OpenCode |
| 多端统一体验 | Codex CLI |
| 深度 Claude 生态 | Claude Code |

## 展望：Agent 编程的下一个阶段

2026 年，AI Coding Agent 正在向几个方向演进：

1. **Agent-to-Agent 通信**：不同 Agent 之间通过标准化协议协作
2. **持续学习**：Agent 从人工反馈中学习项目偏好
3. **自主运维**：Agent 不仅能写代码，还能监控、告警、自动回滚
4. **规约驱动开发**：先写 Spec，Agent 自动生成代码 + 测试 + 文档

未来的开发者可能不再"写代码"，而是"定义意图"。Agent 负责将意图转化为可工作的软件——而我们负责把控方向、做关键决策。

> **延伸阅读：**
> - [Claude Code 官方文档](https://code.claude.com/docs)
> - [Codex CLI GitHub](https://github.com/openai/codex)
> - [OpenCode 官网](https://opencode.ai)
> - [MCP 协议规范](https://modelcontextprotocol.io)
