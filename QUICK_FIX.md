# 🔧 Quick Fix - npm start Error

## সমস্যা:
```
[TypeError: routesManifest.dataRoutes is not iterable]
```

## ✅ সমাধান করা হয়েছে:

`output: 'standalone'` remove করা হয়েছে `next.config.ts` থেকে।

---

## 🚀 এখন করুন:

### Step 1: Rebuild করুন
```bash
npm run build
```

### Step 2: Start করুন
```bash
npm start
```

### Step 3: Test করুন
Browser এ যান: `http://localhost:3000`

---

## ✅ এখন কাজ করবে!

`standalone` mode শুধুমাত্র Docker deployment এর জন্য লাগে। 
Standard AWS deployment এর জন্য এটা লাগে না।

---

## 📝 Final Configuration:

`next.config.ts` এ এখন আছে:
- ✅ `reactStrictMode: false` - Duplicate API calls বন্ধ
- ✅ Image optimization - WebP/AVIF support
- ✅ Compression enabled
- ✅ Production source maps disabled

এটাই যথেষ্ট AWS deployment এর জন্য!

---

## 🚀 Deploy করুন:

```bash
# 1. Build
npm run build

# 2. Test locally
npm start

# 3. AWS এ deploy
git push origin main
# Then on AWS server:
git pull && npm ci && npm run build && pm2 restart faberge-client
```

---

**সব ঠিক হয়ে যাবে! 🎉**
