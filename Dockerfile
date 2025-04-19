# 使用 Node.js 官方镜像作为基础镜像
FROM node:16-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install --legacy-peer-deps
RUN npm install vite-plugin-node-polyfills
RUN npm install crypto-browserify stream-browserify buffer --legacy-peer-deps

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build

# 使用更小的基础镜像运行生产环境
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 复制构建结果和依赖
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# 暴露端口
EXPOSE 3000

# 启动项目
CMD ["npm", "start"]