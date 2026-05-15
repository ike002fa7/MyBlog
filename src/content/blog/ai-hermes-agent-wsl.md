---
title: "Hermes Agent 在 WSL 中的部署与配置指南"
date: 2026-05-10
excerpt: "在 WSL2 中从零部署 Nous Research 的 Hermes Agent，接入 QQ Bot 实现智能对话"
category: "nod"
tags: ["AI", "WSL", "Hermes Agent", "部署", "QQ Bot"]
---

## 引言

[Hermes Agent](https://github.com/NousResearch/hermes-agent) 是 Nous Research 开源的个人 AI Agent 框架。它支持多模型、多平台接入、技能系统、定时任务、记忆管理等强大功能。本文将详细介绍如何在 WSL2 环境中从零部署 Hermes Agent，并接入 QQ Bot。

## 环境准备

### WSL2 基础环境

```bash
# 确认 WSL 版本
wsl --version

# 推荐使用 Ubuntu 24.04
wsl --install -d Ubuntu-24.04
```

### 安装依赖

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js（推荐 20.x LTS）
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 pnpm
npm install -g pnpm

# 安装 Python 3.11+
sudo apt install -y python3 python3-pip python3-venv

# 安装 Git
sudo apt install -y git
```

验证安装：

```bash
node --version   # v20.x.x
pnpm --version   # 9.x.x
python3 --version # 3.11+
```

## 克隆与安装

```bash
# 克隆仓库
git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent

# 安装依赖
pnpm install
```

> **注意**：如果遇到网络问题，可以使用 npmmirror 镜像：
> ```bash
> pnpm config set registry https://registry.npmmirror.com
> pnpm install
> ```

## 配置文件详解

安装完成后，需要配置 `config.yaml`。核心配置结构如下：

```yaml
# 模型配置
model:
  provider: deepseek           # 可选: openai, anthropic, deepseek, openrouter 等
  model: deepseek-chat         # 模型名称
  api_key: ${DEEPSEEK_API_KEY} # 从环境变量读取

# QQ Bot 配置
platforms:
  qqbot:
    enabled: true
    app_id: "your_qq_app_id"
    token: "your_qq_token"
    secret: "your_qq_secret"

# 技能系统
skills:
  enabled: true
  path: ~/.hermes/skills/

# 记忆管理
memory:
  enabled: true
  max_tokens: 2200

# 工具配置
tools:
  terminal:
    enabled: true
  web_search:
    enabled: true
  browser:
    enabled: true
```

> **安全提示**：API Key 和 QQ Bot 密钥建议使用环境变量，不要硬编码在配置文件中。

## 运行 Hermes Agent

### 前台运行（调试模式）

```bash
cd hermes-agent
pnpm start
```

首次运行会创建 `~/.hermes/` 目录，包含配置文件、记忆存储、技能目录等。

### 配置为 systemd 服务

创建服务文件：

```bash
sudo nano /etc/systemd/system/hermes-agent.service
```

```ini
[Unit]
Description=Hermes Agent
After=network.target

[Service]
Type=simple
User=your_username
WorkingDirectory=/home/your_username/hermes-agent
Environment="DEEPSEEK_API_KEY=sk-xxx"
Environment="NODE_ENV=production"
ExecStart=/usr/bin/pnpm start
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启动服务：

```bash
sudo systemctl daemon-reload
sudo systemctl enable hermes-agent
sudo systemctl start hermes-agent
sudo systemctl status hermes-agent
```

## 接入 QQ Bot

### 1. 注册 QQ 开放平台应用

前往 [QQ 开放平台](https://q.qq.com/) 创建机器人应用，获取：
- `AppID`
- `Token`
- `Secret`

### 2. 配置权限

在 QQ 开放平台中开启机器人需要的权限：
- 消息收发
- 群聊消息
- 私聊消息

### 3. 更新 config.yaml

```yaml
platforms:
  qqbot:
    enabled: true
    app_id: "你的AppID"
    token: "你的Token"
    secret: "你的Secret"
```

### 4. 重启服务

```bash
sudo systemctl restart hermes-agent
```

查看日志确认连接状态：

```bash
journalctl -u hermes-agent -f
```

看到 `qqbot: Connected ✓` 即表示接入成功。

## WSL 特定注意事项

### 网络问题

WSL2 使用 NAT 网络，部分境外 API 可能访问缓慢：

```bash
# 测试 API 连通性
curl -I https://api.deepseek.com

# 如果超时，配置代理
export HTTP_PROXY=http://host_ip:port
export HTTPS_PROXY=http://host_ip:port
```

### 文件权限

WSL 中 `/mnt/c/` 挂载的 Windows 文件系统权限不同：

```bash
# 所有项目文件放在 WSL 原生文件系统中
# 推荐位置：~/hermes-agent
# 避免使用：/mnt/c/Users/xxx/hermes-agent

# 如果必须跨文件系统，重新挂载：
sudo umount /mnt/c
sudo mount -t drvfs C: /mnt/c -o metadata
```

### 端口访问

从 Windows 访问 WSL 中的服务：

```powershell
# 在 PowerShell（管理员）中设置端口转发
netsh interface portproxy add v4tov4 listenport=3001 connectaddress=127.0.0.1 connectport=3001
```

## 调试技巧

### 查看详细日志

```bash
# 开发模式下增加日志级别
DEBUG=* pnpm start

# 或修改 config.yaml
logging:
  level: debug
```

### 测试模型连接

```bash
# 使用 hermes CLI 测试
pnpm hermes chat --message "Hello, are you working?"
```

### 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| `Module not found` | 依赖未安装 | `pnpm install` |
| `API key invalid` | Key 错误或过期 | 检查环境变量 |
| QQ Bot 无法连接 | Token 或网络问题 | 检查防火墙和 AppID |
| 内存不足 | WSL 默认内存限制 | 创建 `.wslconfig` 增加内存 |

### WSL 内存优化

在 Windows 用户目录创建 `.wslconfig`：

```ini
[wsl2]
memory=8GB
processors=4
swap=4GB
```

## 技能系统

Hermes Agent 的强大之处在于技能（Skills）系统。技能是 YAML + Markdown 格式的指导文件，存放在 `~/.hermes/skills/` 目录。

### 创建自定义技能

```bash
mkdir -p ~/.hermes/skills/my-skill
cat > ~/.hermes/skills/my-skill/SKILL.md << 'EOF'
---
name: my-skill
description: 我的自定义技能
---

## 触发条件
当用户提到 XXX 时触发

## 执行步骤
1. 第一步
2. 第二步

## 注意事项
- 注意点 1
EOF
```

### 从社区安装技能

```bash
# 列出可用技能
hermes skills list

# 安装技能
hermes skills install <skill-name>
```

## 生产环境建议

1. **使用 systemd**：确保进程崩溃后自动重启
2. **日志轮转**：配置 `journalctl` 日志大小限制
3. **定期备份**：备份 `~/.hermes/` 目录（记忆 + 技能 + 配置）
4. **监控**：设置心跳检查，Agent 离线时告警
5. **安全**：API Key 使用环境变量，限制文件权限

```bash
# 备份脚本示例
#!/bin/bash
tar -czf hermes-backup-$(date +%Y%m%d).tar.gz ~/.hermes/
```

## 总结

在 WSL2 中部署 Hermes Agent 整体流程顺畅，主要步骤包括：

1. 安装 Node.js / pnpm / Python 依赖
2. 克隆仓库并安装
3. 配置模型和平台连接
4. 设置 systemd 自动启动
5. 调试和优化

Hermes Agent 的技能系统和记忆管理使其成为强大的个人 AI 助手。结合 QQ Bot，可以让它随时随地为你服务。

---

> **参考链接**：
> - [Hermes Agent GitHub](https://github.com/NousResearch/hermes-agent)
> - [Hermes Agent 文档](https://hermes-agent.nousresearch.com/docs)
> - [QQ 开放平台](https://q.qq.com/)
