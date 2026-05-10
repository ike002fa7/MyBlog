---
title: "Raycast：Mac 效率工具的终极形态"
date: 2026-05-10
excerpt: "从启动器到效率平台，全面解析 Raycast 的扩展生态、剪贴板历史、窗口管理、AI 功能，以及与 Alfred 的深度对比。"
category: "工具"
tags: ["效率"]
---

## 从 Spotlight 替代品到效率中枢

每个 Mac 用户都经历过这个阶段：用 Spotlight（`Cmd+Space`）搜索文件、启动应用，然后发现它能做的事情太少了。于是你找到了 Alfred，用 Workflow 实现了各种自动化，觉得已经足够好了。

直到你遇到 **Raycast**。

Raycast 最早也是以「更好的 Spotlight」的定位出现，但如今它早已超越了启动器的范畴。它是一个**效率中枢平台**——集应用启动、剪贴板管理、窗口管理、代码片段、AI 对话、快捷搜索于一体，通过一个统一的命令面板完成几乎所有操作。

用了三年 Raycast 后，我的结论是：**它是 Mac 上为数不多真正改变了工作方式的应用**。

## 核心功能深度解析

### 1. 命令面板：一切操作的入口

按 `Option+Space`（我的自定义快捷键），一个简洁的悬浮输入框出现。从这里你可以：

- 启动任意应用：输入 `Chrome` 直接回车
- 计算器：输入 `(1024 * 3) / 7` 直接得到结果，按回车自动复制
- 文件搜索：输入文件名直接定位
- 系统命令：锁屏、清空废纸篓、切换暗色模式、管理蓝牙设备
- 搜索菜单栏项目：输入「暗色」自动找到系统设置中的相关选项

关键是，所有这些操作**不需要切换上下文**——一个输入框解决一切。这种「无摩擦」的体验，用习惯后就再也回不去了。

### 2. 剪贴板历史：你的第二大脑

macOS 原生不支持剪贴板历史，这是我认为 Raycast 最实用的内置功能。

- 自动记录所有复制过的文本、图片、文件路径
- 按 `Cmd+Shift+V` 调出历史面板，搜索关键词快速定位
- 支持排除特定应用的复制记录（比如 1Password）
- 可以固定常用片段，或一键将历史记录保存为 Snippet

实际使用中，我最常用的是「三天前复制过的那段 SQL 查询」——搜索几个关键词就找回来了，比翻聊天记录快 10 倍。

### 3. 窗口管理：告别鼠标拖拽

Raycast 内置的窗口管理让我彻底卸载了 Magnet 和 Rectangle：

| 快捷键 | 功能 |
|--------|------|
| `Option+Ctrl+←` | 窗口占左半屏 |
| `Option+Ctrl+→` | 窗口占右半屏 |
| `Option+Ctrl+↑` | 窗口最大化 |
| `Option+Ctrl+F` | 窗口全屏 |
| `Option+Ctrl+1/2/3/4` | 窗口占四分之一屏（角落） |

在超宽屏幕上，四分之一屏的布局简直是效率神器——左侧编辑器、右侧浏览器、左下终端、右下开发文档，完全不用碰鼠标。

### 4. Snippets：重复输入的终结者

Snippets 让你创建可自动展开的文本模板。输入关键词后，Raycast 自动替换为完整内容。

我日常使用的 Snippets 示例：

```
;email → 我的邮箱地址
;date → 2026-05-10（自动插入当天日期）
;phone → 我的手机号
;addr → 公司地址（多行）
;gac → git add . && git commit -m "$cursor"
;pr  → ## Description\n\n$cursor\n\n## Test Plan\n\n- [ ] Unit tests\n- [ ] Manual testing
```

Snippets 支持动态占位符（日期、时间、剪贴板内容），也支持光标定位（`$cursor`）。写周报、回复重复邮件、甚至写代码时的模板注释，都能大幅减少重复劳动。

### 5. Quicklinks：在 Raycast 中打开任意网页

Quicklinks 让你直接在 Raycast 中搜索并打开特定网站，而不是「打开浏览器 → 进入网站 → 搜索」。

配置示例：

```
Google 搜索：https://www.google.com/search?q={Query}
GitHub 搜索：https://github.com/search?q={Query}
NPM 搜索：https://www.npmjs.com/search?q={Query}
翻译：https://translate.google.com/?text={Query}
```

输入 `gh react hooks`，回车，直接跳转到 GitHub 搜索结果页——中间没有任何多余步骤。

## 扩展生态：Raycast 的真正护城河

如果核心功能让 Raycast 「好用」，那扩展生态就是让它「不可替代」的原因。Raycast Store 拥有超过 1500 个扩展，以下是我认为开发者必备的：

### 开发工具类

| 扩展 | 功能 | 推荐理由 |
|------|------|----------|
| **GitHub** | 搜索仓库、查看 PR、管理 Issues | 不需要离开编辑器就能处理 GitHub 通知 |
| **VS Code Recent Projects** | 快速打开最近项目 | 比 VS Code 自带的快得多 |
| **Kill Process** | 搜索并终止进程 | 比 `lsof` + `kill` 快 100 倍 |
| **Color Picker** | 取色器 + 颜色格式转换 | 前端开发必备，支持 HEX/RGB/HSL |
| **Tailwind CSS** | 搜索 Tailwind 类名和文档 | 不需要去官网查文档 |

### 日常效率类

| 扩展 | 功能 |
|------|------|
| **1Password** | 在 Raycast 中搜索并复制密码 |
| **Notion** | 快速搜索页面、创建数据库条目 |
| **Linear / Jira** | 管理任务，查看 Sprint 进度 |
| **Slack** | 设置状态、快速跳转频道 |
| **Spotify** | 控制播放、搜索歌曲 |

### 实用工具类

| 扩展 | 功能 | 亮点 |
|------|------|------|
| **Google Translate** | 即时翻译 | 选中文本后一键翻译并复制 |
| **Brew** | 管理 Homebrew 包 | 搜索、安装、更新，全在 Raycast 内 |
| **Lorem Ipsum** | 生成占位文本 | 支持自定义长度和格式 |
| **Unix Timestamp** | 时间戳转换 | 支持秒/毫秒双向转换 |

### 一个鲜为人知但巨好用的扩展：Quick Event

这个扩展让你用自然语言创建日历事件：
```
明天下午3点 团队周会 /zoom
```
自动解析时间、创建日历事件，并附带 Zoom 链接——比打开日历应用快 5 倍。

## AI 功能：Raycast Pro

Raycast 的基础功能完全免费，但 Pro 订阅（$8/月）解锁了 AI 功能，包括：

### AI Chat
在任何应用中选中文本，按快捷键呼出 AI Chat，直接提问。支持 GPT-4、Claude 3.5 Sonnet 等多个模型。特别适合：
- 解释一段代码
- 翻译并润色文本
- 快速回答技术问题（不用切换到浏览器）

### AI Presets
你可以创建预设的 AI 行为模板，例如：
- 「翻译为英文并保持技术文档风格」
- 「总结这段会议记录为三个要点」
- 「将以下代码从 JavaScript 转换为 TypeScript」

Presets 支持社区共享，在 [presets.ray.so](https://presets.ray.so) 可以浏览和下载。

### AI 驱动的 Emoji 搜索
输入自然语言描述找到合适的 emoji：
- 输入「开心的猫」→ 🐱
- 输入「写代码」→ 👨‍💻

比在 emoji 选择器中翻页快得多。

> 注意：AI 功能需要订阅 Raycast Pro（$8/月）。基础用户可以选择只使用本地功能，核心效率体验不受影响。

## Raycast vs Alfred：全面对比

这是 Mac 效率工具圈永恒的争论。作为一个从 Alfred Powerpack 迁移过来的用户，我的感受是：

### Alfred 的优势（目前仍然成立）

| 项目 | 说明 |
|------|------|
| **Workflow 灵活性** | Alfred Workflow 更自由，可以调用任意脚本和系统 API |
| **成熟稳定** | 发展十余年，社区 Workflow 资源丰富 |
| **系统资源** | 占用更少（虽然差距在缩小） |
| **文件操作** | 文件导航和操作更强大（File Filter、Buffer） |

### Raycast 的优势

| 项目 | 说明 |
|------|------|
| **开箱即用** | 内置剪贴板历史、窗口管理、Snippets，不需要额外配置 |
| **扩展生态** | 统一的应用商店，发现和安装扩展只需点一下 |
| **UI/UX 设计** | 更现代、更美观，面板交互细腻流畅 |
| **开发者友好** | 用 React + TypeScript 编写扩展，学习成本低 |
| **更新频率** | 几乎每周都有新功能发布 |
| **AI 集成** | 原生 AI 功能（Pro），与系统深度融合 |
| **团队协作** | 可以分享扩展配置供团队使用（Teams 功能） |

### 我个人为什么选择 Raycast

Alfred 更强大吗？在某些方面是的——Workflow 的自由度无人能及。但 Raycast 的「开箱即用」和「持续进化」更契合我的需求：

1. **我不需要配置**：剪贴板历史、窗口管理、Snippets 都是内置的，不需要像 Alfred 那样找 Workflow
2. **扩展发现成本低**：在 Store 里浏览就能发现新扩展，不需要去 GitHub 搜索
3. **AI 原生支持**：虽然 Alfred 也能通过 Workflow 接入 ChatGPT，但 Raycast 的 AI 集成更无缝

## 开发者专属配置：我的 Raycast 设置

分享我的日常设置，供参考：

```bash
# 快捷键映射（避免与 VS Code / Terminal 冲突）
Raycast Hotkey: Option+Space（替代默认的 Cmd+Space）
Clipboard History: Cmd+Shift+V
AI Chat: Hyper+C（Hyper = Cmd+Option+Ctrl+Shift）
Snippets搜索: Cmd+Shift+S

# 已启用扩展（开发相关）
- GitHub
- VS Code Recent Projects  
- Kill Process
- Color Picker
- Brew
- Docker
- Tailwind CSS
- NPM Search
```

### 自定义脚本：一键启动开发环境

我最常用的自定义功能是通过 Raycast 脚本一键启动某个项目的完整开发环境：

```bash
#!/bin/bash
# 保存为 Raycast Script Command
# 一键启动 Next.js 项目的开发环境

# 打开 VS Code
open -a "Visual Studio Code" ~/projects/my-app

# 等待 VS Code 加载
sleep 2

# 启动 Docker 服务
open -a Docker

# 启动开发服务器
cd ~/projects/my-app && code --goto package.json

echo "开发环境已就绪 🚀"
```

## 进阶技巧

掌握这些技巧后，你的 Raycast 使用体验将再上一个台阶：

1. **Fallback Commands**：当输入没有匹配到任何命令时，自动触发 Google 搜索或其他操作
2. **别名（Alias）**：为常用命令设置缩写，比如 `gh` → `Search GitHub`
3. **Quicklink + 参数**：输入 `npm react` 自动在 npmjs.com 搜索「react」
4. **文件搜索过滤**：`/documents *.pdf` 只在 Documents 目录搜索 PDF 文件
5. **Search Menu Items**：搜索当前应用的菜单栏命令，告别「这个功能在哪个菜单下」的烦恼

## 总结

Raycast 真正的价值不在于它能做什么（Alfred 理论上也能做到大部分），而在于它让你**自然地去做**。

当你不需要思考「我该怎么完成这个操作」时，效率才真正被释放。Raycast 的统一命令面板消除了操作之间的边界——启动应用、查询信息、管理代码片段、翻译文本、执行命令……这些原本分散在不同工具中的操作，现在在一个地方完成。

如果你还没试过，下载免费版就足够体验核心功能了。如果觉得好用，Pro 订阅的 AI 功能也值得一试。

> 下载链接：[raycast.com](https://raycast.com)
> 扩展商店：[raycast.com/store](https://raycast.com/store)
> 官方文档：[manual.raycast.com](https://manual.raycast.com)

---

**附：三个值得关注的开源替代品**

如果你在找跨平台或开源的 Raycast 替代品：
- **[Albert](https://albertlauncher.github.io/)**：Linux 原生启动器，插件机制灵活
- **[Ueli](https://ueli.app/)**：跨平台（Windows/macOS/Linux），支持自定义插件
- **[Flow Launcher](https://www.flowlauncher.com/)**：Windows 平台最佳 Raycast 替代方案
