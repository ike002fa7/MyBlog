#!/usr/bin/env bash
# ──────────────────────────────────────────────────────
# seo-submit.sh — 文章发布后自动通知搜索引擎
# 在 npm run build 后执行，提取 sitemap 中新文章 URL
# 自动提交到 Google Indexing API & 百度推送
#
# 使用方式:
#   1. 在百度站长平台获取 token
#   2. export BAIDU_TOKEN="你的token"
#   3. 放到 Astro 构建流程中
#
#   或者单文件运行:
#     chmod +x scripts/seo-submit.sh
#     BAIDU_TOKEN=xxx ./scripts/seo-submit.sh
#
# Google：使用 Ping 服务（无需密钥，当天收录）
# 百度：使用 URL 推送接口（实时收录）
# ──────────────────────────────────────────────────────

set -e

BASE_URL="https://www.x-atcn.top"
SITEMAP_URL="${BASE_URL}/sitemap.xml"
DIST_DIR="dist"

echo "🔍 开始 SEO 提交流程..."

# ── 1. 从本地 sitemap 提取所有 URL ──
if [ ! -f "${DIST_DIR}/sitemap.xml" ]; then
  echo "❌ 未找到 sitemap.xml，请先执行 npm run build"
  exit 1
fi

URLS=$(grep -oP '<loc>\K[^<]+' "${DIST_DIR}/sitemap.xml")
URL_COUNT=$(echo "$URLS" | wc -l)
echo "📄 从 sitemap 提取到 ${URL_COUNT} 个 URL"

# ── 2. 提交到 Google（Ping 服务，不需要 API key）──
echo "📤 通知 Google..."
# 如果有代理，通过代理 ping Google
GOOGLE_CURL="curl -s --connect-timeout 5 --max-time 10"
if [ -n "$http_proxy" ] || [ -n "$HTTP_PROXY" ]; then
  GOOGLE_CURL="${GOOGLE_CURL} -x ${HTTP_PROXY:-$http_proxy}"
fi
for url in $URLS; do
  PING_URL="https://www.google.com/ping?sitemap=${SITEMAP_URL}"
  HTTP_CODE=$($GOOGLE_CURL -o /dev/null -w "%{http_code}" "$PING_URL" 2>/dev/null || echo "跳过")
  echo "   Google Ping [${HTTP_CODE}]"
  break  # 只需要 ping 一次，通知 sitemap 就够
done

# ── 3. 提交到百度（需要 API token）──
if [ -n "$BAIDU_TOKEN" ]; then
  echo "📤 提交到百度..."
  BAIDU_API="http://data.zz.baidu.com/urls?site=${BASE_URL}&token=${BAIDU_TOKEN}"
  
  # 百度批量提交接口：POST 纯文本，每行一个 URL
  URL_BODY=$(echo "$URLS" | tr '\n' '\n')
  RESPONSE=$(echo "$URL_BODY" | curl -s -X POST "$BAIDU_API" --data-binary @- -H "Content-Type: text/plain")
  echo "   百度响应: $RESPONSE"
else
  echo "⚠️  跳过百度提交（BAIDU_TOKEN 未设置）"
  echo "   如需启用，请设置环境变量:"
  echo "   export BAIDU_TOKEN='你的百度站长平台token'"
  echo "   获取方式: 百度站长平台 → 站点管理 → 链接提交 → token"
fi

echo "✅ SEO 提交完成"
