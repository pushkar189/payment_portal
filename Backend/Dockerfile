FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies for build
COPY package*.json ./
RUN npm ci

# Copy sources and build
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

# Only production dependencies in final image
COPY package*.json ./
RUN npm ci --only=production

# Copy built files
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
