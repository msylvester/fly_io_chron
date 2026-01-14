# 🚀 Fly.io Cron Email Microservice

A self-running cron job that sends test emails every 10 seconds on Fly.io.

![Architecture](./architecture.svg)

---

## ⚡ What Was Changed to Make the Cron Job Work

### 🔧 Files Added/Modified

| File | Change |
|------|--------|
| `src/services/CronJob.ts` | ✨ **NEW** - `node-cron` scheduler (every 10s) |
| `src/routes/send.ts` | 📬 POST `/send` triggers email dispatch |
| `src/services/SendMail.ts` | 📧 Postmark API wrapper |
| `fly.toml` | ⚠️ **CRITICAL** - Machine persistence settings |

### 🎯 Critical `fly.toml` Changes

```toml
auto_stop_machines = 'off'   # ⬅️ REQUIRED: Prevents Fly from killing idle machine
min_machines_running = 1      # ⬅️ REQUIRED: Keeps at least 1 instance alive
```

> 🚨 **Without these settings, Fly.io auto-stops idle machines and the cron job dies.**

---

## 🔄 System Flow

```
┌─────────────────┐    HTTP POST     ┌─────────────────┐
│   node-cron     │ ──────────────▶  │  Express /send  │
│  */10 * * * * * │                  │    endpoint     │
└─────────────────┘                  └────────┬────────┘
        │                                     │
        │ generates                           │ calls
        ▼                                     ▼
┌─────────────────┐                  ┌─────────────────┐
│  random email   │                  │   Postmark API  │
│ bob42@test.com  │                  │   sends email   │
└─────────────────┘                  └─────────────────┘
```

1. ⏰ **Scheduler fires** every 10 seconds
2. 🎲 **Generates** random email (e.g., `alice789@demo.org`)
3. 📡 **POSTs** to internal `/send` endpoint
4. 📧 **Postmark** delivers the email

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `node-cron` | 3.0.3 | ⏰ Cron scheduling |
| `express` | 4.18.2 | 🌐 HTTP server |
| `postmark` | 3.1.1 | 📧 Email delivery |

---

## 🔐 Environment Variables

| Variable | Required |
|----------|----------|
| `POSTMARK_API_TOKEN` | ✅ |
| `POSTMARK_FROM_EMAIL` | ✅ |
| `PORT` | ❌ (default: 3000) |

---

## 🏃 Deploy

```bash
fly secrets set POSTMARK_API_TOKEN="xxx" POSTMARK_FROM_EMAIL="you@domain.com"
fly deploy
```

Runs 24/7 in `sjc` region • 1GB RAM • Shared CPU
