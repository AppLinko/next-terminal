# 使用Node.js 16作为基础镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json到工作目录
COPY package*.json ./ 

# 安装构建时依赖的系统库（新增libstdc++和libcrypto1.0-compat）
RUN apk add --no-cache python3 make g++ libc6-compat libstdc++ libcrypto1.0-compat

# 安装依赖
RUN npm install --production

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]