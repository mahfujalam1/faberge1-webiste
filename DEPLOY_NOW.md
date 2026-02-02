# 🚨 IMMEDIATE FIX - AWS Deployment Crash

## সমস্যা:
- ✅ Locally ঠিক আছে
- ❌ AWS এ deploy করলে crash হচ্ছে
- ❌ Login করার পর বেশি load নিচ্ছে
- ❌ Duplicate API calls হচ্ছে

## ✅ সমাধান করা হয়েছে:

### 1. **React Strict Mode Disabled**
- **File**: `next.config.ts`
- **কেন**: Strict Mode development এ 2x API calls করে
- **ফলাফল**: Production এ duplicate calls বন্ধ হবে

### 2. **Standalone Output Mode**
- **File**: `next.config.ts`
- **কেন**: AWS deployment এর জন্য optimized
- **ফলাফল**: Smaller bundle, faster startup

### 3. **Console Logs Removed**
- **File**: `src/components/service/Service.tsx`
- **কেন**: Production এ console.log performance কমায়
- **ফলাফল**: Cleaner, faster execution

---

## 🎯 এখনই Deploy করুন (3 Steps)

### Step 1: Build করুন

```bash
# Terminal এ run করুন:
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

### Step 2: Local Test করুন

```bash
# Production mode এ test করুন:
npm start
```

Browser এ যান: `http://localhost:3000`

**Check করুন:**
- ✅ Page load হচ্ছে কিনা
- ✅ Login করতে পারছেন কিনা
- ✅ F12 → Network tab এ requests < 50
- ✅ কোন error নেই

### Step 3: AWS এ Deploy করুন

#### Option A: Manual Deployment

```bash
# 1. SSH to AWS server
ssh user@your-aws-server

# 2. Navigate to project
cd /path/to/faberge1-client

# 3. Pull latest code
git pull origin main

# 4. Install dependencies
npm ci --production=false

# 5. Build
npm run build

# 6. Restart (choose one):

# If using PM2:
pm2 restart faberge-client

# If using systemd:
sudo systemctl restart faberge-client

# If using Docker:
docker-compose restart
```

#### Option B: Using Deploy Script

```bash
# On AWS server, run:
chmod +x deploy.sh
./deploy.sh
```

---

## 🔍 Verify Deployment

### 1. Check Application Status

```bash
# If using PM2:
pm2 status
pm2 logs faberge-client --lines 50

# If using systemd:
sudo systemctl status faberge-client
sudo journalctl -u faberge-client -n 50
```

### 2. Test Website

Open: `https://inhomebeautyservices.com`

**Browser DevTools (F12):**
- Network tab → Reload page
- Check: Requests, Data transferred, Load time

**Expected:**
- ✅ Requests: 30-50 (not 285!)
- ✅ Data: 5-10 MB (not 110 MB!)
- ✅ Load time: 3-5 seconds
- ✅ No ERR_TOO_MANY_REDIRECTS

### 3. Test Login Flow

1. Go to Sign In page
2. Login with credentials
3. Check if redirects properly
4. Check Network tab for API calls

**Expected:**
- ✅ Login successful
- ✅ Redirects to home
- ✅ No infinite redirects
- ✅ API calls reasonable

---

## 🆘 If Still Having Issues

### Issue 1: Still Too Many Requests

**Check:**
```bash
# On AWS server, check if build is using new config:
cat next.config.ts | grep "reactStrictMode"
```

**Should show:**
```
reactStrictMode: false,
```

**Fix:**
```bash
# Rebuild completely:
rm -rf .next
npm run build
pm2 restart faberge-client
```

### Issue 2: ERR_TOO_MANY_REDIRECTS

**Check middleware:**
```bash
cat src/middleware.ts
```

**Should have:**
```typescript
if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url))
}
```

**NOT:**
```typescript
if (token && isPublicRoute) { // ❌ WRONG!
```

**Fix:**
```bash
# Ensure middleware.ts is correct
git pull origin main
npm run build
pm2 restart faberge-client
```

### Issue 3: Site Still Crashes

**Check memory:**
```bash
# On AWS server:
free -h
pm2 monit
```

**If memory is low:**

Update `ecosystem.config.js`:
```javascript
instances: 1, // Reduce from 2 to 1
max_memory_restart: '512M', // Reduce from 1G
```

Then:
```bash
pm2 delete faberge-client
pm2 start ecosystem.config.js
pm2 save
```

### Issue 4: Slow API Responses

**This is a BACKEND issue, not frontend!**

**Check backend:**
```bash
# On backend server:
# Check API response times
curl -w "@curl-format.txt" -o /dev/null -s https://api.inhomebeautyservices.com/photo/get-all-dynamic-photo
```

**Backend optimizations needed:**
1. Add database indexing
2. Enable GZIP compression
3. Implement caching (Redis)
4. Add CDN for images
5. Optimize database queries

---

## 📊 Performance Checklist

After deployment, verify:

- [ ] Homepage loads in < 5 seconds
- [ ] Login works without errors
- [ ] No ERR_TOO_MANY_REDIRECTS
- [ ] Requests < 50 per page
- [ ] Data transfer < 10 MB per page
- [ ] No console errors
- [ ] Images load properly
- [ ] Video plays smoothly
- [ ] Mobile responsive works
- [ ] All pages accessible

---

## 🎯 Critical Files Changed

1. ✅ `next.config.ts` - **MOST IMPORTANT**
   - `reactStrictMode: false`
   - `output: 'standalone'`

2. ✅ `src/middleware.ts` - **CRITICAL**
   - Fixed redirect loop
   - Proper auth logic

3. ✅ `src/redux/api/baseApi.ts`
   - Caching enabled
   - Refetch throttling

4. ✅ `src/components/Banner/Banner.tsx`
   - Video optimization

5. ✅ `src/components/service/Service.tsx`
   - Removed console.logs

---

## 📞 Emergency Rollback

If deployment fails completely:

```bash
# On AWS server:

# 1. Stop current version
pm2 stop faberge-client

# 2. Checkout previous version
git log --oneline -5  # Find previous commit
git checkout <previous-commit-hash>

# 3. Rebuild
npm ci --production=false
npm run build

# 4. Restart
pm2 restart faberge-client
```

---

## ✅ Success Indicators

You'll know it's working when:

1. **Browser Network Tab:**
   - Requests: 30-50 ✅
   - Data: 5-10 MB ✅
   - Load: 3-5 sec ✅

2. **PM2 Status:**
   - Status: online ✅
   - Restarts: 0 ✅
   - Memory: < 500 MB ✅

3. **User Experience:**
   - Fast page loads ✅
   - Smooth navigation ✅
   - No errors ✅
   - Login works ✅

---

**Deploy করুন এবং test করুন! 🚀**

যদি এখনও সমস্যা হয়, screenshots সহ জানান:
1. PM2 status
2. Browser Network tab
3. Console errors
4. Specific error messages
