# 使用官方Node.js镜像作为基础镜像
FROM node:18-alpine AS base

# 设置工作目录
WORKDIR /app

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建阶段
FROM base AS build

# 设置环境变量
ENV NODE_ENV=production

# 构建应用
RUN pnpm build

# 生产阶段
FROM node:18-alpine AS production

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S astro -u 1001

# 设置工作目录
WORKDIR /app

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装pnpm
RUN npm install -g pnpm

# 安装生产依赖
RUN pnpm install --frozen-lockfile --prod

# 从构建阶段复制构建产物
COPY --from=build --chown=astro:nodejs /app/dist ./dist

# 切换到非root用户
USER astro

# 暴露端口
EXPOSE 4321

# 设置环境变量
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# 启动应用
CMD ["node", "./dist/server/entry.mjs"]
