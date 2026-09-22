# 🤖 Universal Autonomous Shortlink Auto-Bypass Bot & API

> **Cracks 1,337+ Known Services AND Autonomously Resolves ANY Unknown / Zero-Day Shortlink Domain!**
> Even if a user sends a brand new shortlink whose domain name is NOT in the code, the bot automatically analyzes DOM tags, scripts, parameters, and network redirects to extract the original destination URL instantly.

---

## 🌟 Autonomous Features & Architecture

```
                  ┌──────────────────────────────────────────────┐
                  │   User Sends Any Unknown Shortlink to Bot    │
                  └──────────────────────┬───────────────────────┘
                                         ▼
   ┌───────────────────────────────────────────────────────────────────────────┐
   │ 1. Deep Query & Base64/Hex/ROT13/Reverse Unpacker:                        │
   │    • '?url=', '?dest=', '?target=', '?link=', '?redirect=', etc. scan     │
   │    • Multi-tier URL unquoting, Base64 payload decode, Hex & JSON scan     │
   │    • URL Path segments (e.g. /go/aHR0cHM6Ly...) & Fragment (#...) decode  │
   └─────────────────────────────────────┬─────────────────────────────────────┘
                                         ▼
   ┌───────────────────────────────────────────────────────────────────────────┐
   │ 2. Deep DOM, Packed JS (p,a,c,k,e,r) & Script Heuristics:                 │
   │    • HTML `<meta http-equiv="refresh" content="...">` detect karta hai    │
   │    • `window.location = "..."`, `location.replace()`, `atob()` bypass     │
   │    • Dean Edwards `eval(function(p,a,c,k,e,d)...)` automatic JS unpacker  │
   │    • Download buttons (`<a class="download|get-link|continue">`) scan    │
   │    • Hidden Form input targets auto-extract                               │
   └─────────────────────────────────────┬─────────────────────────────────────┘
                                         ▼
   ┌───────────────────────────────────────────────────────────────────────────┐
   │ 3. Multi-Hop HTTP Network Follower:                                       │
   │    • Browser User-Agent emulation ke sath 301, 302, 307, 308 follow       │
   │    • Location & Refresh headers trace karke final destination URL nikalna │
   └─────────────────────────────────────┬─────────────────────────────────────┘
                                         ▼
   ┌───────────────────────────────────────────────────────────────────────────┐
   │ 4. Recursive Multi-Tier Deep Resolver:                                    │
   │    • Chained links resolver (shortlink -> shortlink -> direct link)       │
   │    • Terminal Target Protection (Instant clean link extraction)           │
   └─────────────────────────────────────┬─────────────────────────────────────┘
                                         ▼
      🎯 Instant Direct Destination Link + "🚀 Open Link" & "📋 Copy Link" Buttons
```

---

## ⚡ Bot Commands

| Command | Description |
| :--- | :--- |
| **Direct Message / Paste** | Send any shortlink URL to bypass automatically |
| **/start** | Welcome screen with quick actions and stats |
| **/help** | Interactive user guide and usage examples |
| **/stats** | Real-time performance, uptime & Zero-Day bypass count |
| **/ping** | Response latency and server health check |
| **/lang** | Toggle language between **हिन्दी (Hindi)** & **English** |
| **@bot &lt;link&gt;** | Inline Query Mode: Share bypassed links in any group chat |

---

## 📦 Run Guide

### 1. Requirements Install:
```bash
pip install -r requirements.txt
```

### 2. Run Test Suite:
```bash
python test_engine.py
```

### 3. Set Telegram Bot Token & Run:
```bash
export BOT_TOKEN="YOUR_TELEGRAM_BOT_TOKEN_FROM_BOTFATHER"
python bot.py
```

### 4. (Optional) Run FastAPI REST API:
```bash
python api.py
# API live on http://localhost:8000/docs
```

### 5. Docker 1-Click Deployment:
```bash
docker-compose up -d --build
```
