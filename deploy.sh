#!/bin/bash
# deploy.sh — 构建并部署到 GitHub Pages
# 用法: ./deploy.sh "提交信息"

set -e
cd "$(dirname "$0")"

MSG="${1:-更新内容}"

echo "📦 添加变更..."
git add -A

echo "📝 提交: $MSG"
git commit -m "$MSG" || { echo "✅ 没有变更需要提交"; exit 0; }

echo "🚀 推送到 GitHub..."
git push origin main

echo "✅ 部署完成！GitHub Actions 会自动构建 Pages"
echo "   访问: https://$(git remote get-url origin | sed 's/.*github.com[:/]\([^/]*\).*/\1/').github.io/jiangsir-notes/"
