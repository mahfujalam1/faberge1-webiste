#!/bin/bash

# Faberge Client Deployment Script
# This script automates the deployment process

set -e  # Exit on error

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Are you in the right directory?${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found package.json${NC}"

# Step 2: Pull latest code (if using git)
if [ -d ".git" ]; then
    echo -e "${YELLOW}📥 Pulling latest code from git...${NC}"
    git pull origin main || git pull origin master
    echo -e "${GREEN}✅ Code updated${NC}"
fi

# Step 3: Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci --production=false
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Step 4: Build the application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build
echo -e "${GREEN}✅ Build completed${NC}"

# Step 5: Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${RED}❌ PM2 is not installed. Installing PM2...${NC}"
    npm install -g pm2
fi

# Step 6: Create logs directory if it doesn't exist
mkdir -p logs

# Step 7: Stop existing PM2 process (if running)
if pm2 list | grep -q "faberge-client"; then
    echo -e "${YELLOW}🛑 Stopping existing process...${NC}"
    pm2 stop faberge-client
    pm2 delete faberge-client
    echo -e "${GREEN}✅ Existing process stopped${NC}"
fi

# Step 8: Start the application with PM2
echo -e "${YELLOW}🚀 Starting application with PM2...${NC}"
pm2 start ecosystem.config.js
echo -e "${GREEN}✅ Application started${NC}"

# Step 9: Save PM2 configuration
pm2 save

# Step 10: Show status
echo -e "${YELLOW}📊 Application status:${NC}"
pm2 status

# Step 11: Show logs
echo -e "${YELLOW}📝 Recent logs:${NC}"
pm2 logs faberge-client --lines 20 --nostream

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${YELLOW}💡 Useful commands:${NC}"
echo -e "  - View logs: ${GREEN}pm2 logs faberge-client${NC}"
echo -e "  - Monitor: ${GREEN}pm2 monit${NC}"
echo -e "  - Restart: ${GREEN}pm2 restart faberge-client${NC}"
echo -e "  - Stop: ${GREEN}pm2 stop faberge-client${NC}"
