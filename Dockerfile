# Frontend Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# Build Next.js
RUN npm run build

EXPOSE 3000

# Start Next.js server in production
CMD ["npm", "start"]
