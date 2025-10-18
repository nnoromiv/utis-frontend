# Frontend Dockerfile

# Use Node 20 Alpine
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Build-time arguments for env variables
ARG NEXT_PUBLIC_MAPBOX_API
ARG NEXT_PUBLIC_API_URL

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Set environment variables for build
ENV NEXT_PUBLIC_MAPBOX_API=$NEXT_PUBLIC_MAPBOX_API
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build Next.js (env vars are inlined at build time)
RUN npm run build

# Expose port
EXPOSE 3000

# Run Next.js in production mode
CMD ["npm", "start"]
