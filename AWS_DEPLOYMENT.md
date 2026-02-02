# AWS Deployment Configuration

## Environment Variables (AWS)

আপনার AWS environment এ এই variables set করুন:

```bash
NEXT_PUBLIC_SERVER_URL=https://api.inhomebeautyservices.com
NODE_ENV=production
```

## Nginx Configuration (যদি Nginx ব্যবহার করেন)

```nginx
server {
    listen 80;
    server_name inhomebeautyservices.com www.inhomebeautyservices.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name inhomebeautyservices.com www.inhomebeautyservices.com;

    # SSL Configuration
    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # Client body size limit (for file uploads)
    client_max_body_size 50M;

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Cache static assets
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Cache images
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp|avif)$ {
        proxy_pass http://localhost:3000;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }
}
```

## PM2 Configuration (Process Manager)

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'faberge-client',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 2, // Use 2 instances for load balancing
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G', // Restart if memory exceeds 1GB
    autorestart: true,
    watch: false
  }]
}
```

Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Docker Configuration (Optional)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SERVER_URL=https://api.inhomebeautyservices.com
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
```

## Deployment Steps

### 1. Build Production Version

```bash
# Install dependencies
npm ci --production=false

# Build
npm run build

# Test production build locally
npm start
```

### 2. Deploy to AWS

```bash
# SSH to your AWS server
ssh user@your-aws-server

# Navigate to project directory
cd /path/to/faberge1-client

# Pull latest code
git pull origin main

# Install dependencies
npm ci --production=false

# Build
npm run build

# Restart PM2 (if using PM2)
pm2 restart faberge-client

# Or restart Docker (if using Docker)
docker-compose down
docker-compose up -d --build
```

### 3. Verify Deployment

```bash
# Check if app is running
pm2 status

# Check logs
pm2 logs faberge-client

# Monitor performance
pm2 monit
```

## Troubleshooting

### If site crashes after deployment:

1. **Check PM2 logs:**
```bash
pm2 logs faberge-client --lines 100
```

2. **Check memory usage:**
```bash
pm2 monit
```

3. **Restart application:**
```bash
pm2 restart faberge-client
```

4. **Clear cache and rebuild:**
```bash
rm -rf .next
npm run build
pm2 restart faberge-client
```

### If ERR_TOO_MANY_REDIRECTS persists:

1. **Clear browser cache completely**
2. **Check Nginx configuration** - ensure no redirect loops
3. **Verify SSL certificate** is properly configured
4. **Check CloudFlare settings** (if using CloudFlare)

### If API calls are still high:

1. **Check RTK Query cache** - verify baseApi.ts settings
2. **Monitor with browser DevTools** - Network tab
3. **Check for duplicate components** - ensure no multiple renders
4. **Verify React Strict Mode is disabled** in next.config.ts

## Performance Monitoring

### Server-side monitoring:

```bash
# CPU and Memory
top

# Network traffic
iftop

# Disk usage
df -h

# PM2 monitoring
pm2 monit
```

### Client-side monitoring:

1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload page
4. Check:
   - Request count (should be < 50)
   - Data transferred (should be < 10 MB)
   - Load time (should be < 5 seconds)

## Health Check Endpoint

Add to `src/app/api/health/route.ts`:

```typescript
export async function GET() {
  return Response.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
}
```

Monitor: `https://inhomebeautyservices.com/api/health`

---

**Last Updated:** 2026-02-02
