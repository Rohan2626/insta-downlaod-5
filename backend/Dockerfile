# Use Node.js as base
FROM node:18-slim

# Install Python3, pip, and ffmpeg (required for yt-dlp)
RUN apt-get update && apt-get install -y python3 python3-pip ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install yt-dlp via pip to ensure latest version
RUN pip3 install yt-dlp

# Create app directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy generated prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY . .

# Expose port (Render sets PORT env var)
EXPOSE 5000

# Start command
CMD ["npm", "start"]
