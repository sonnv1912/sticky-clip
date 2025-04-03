#!/bin/sh

echo "🧹 Đang dọn dẹp node_modules và dist..."

# Xóa tất cả thư mục node_modules và dist
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
find . -name "dist" -type d -prune -exec rm -rf '{}' +

echo "✅ Đã xóa xong, đang cài đặt lại dependencies..."

# Xóa cache của yarn và cài lại package
yarn cache clean
yarn install

echo "🎉 Hoàn tất!"
