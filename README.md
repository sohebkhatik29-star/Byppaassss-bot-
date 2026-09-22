# ⚡ Universal Shortlink Auto-Bypass Bot & Web Platform

> A comprehensive, production-ready system for bypassing **1,337+ shortlink services** (Linkvertise, AdFly, Boost.ink, GPLinks, Droplink, Rocklinks, Bitly, TinyURL, Cuttly, etc.) with automated direct-link resolution, zero-ad navigation, Telegram Bot, FastAPI backend, and React interactive dashboard.

---

## 🌟 Key Features

1. 🤖 **Telegram Auto-Bypass Bot (`python_bot/bot.py`)**:
   - Send any shortlink in chat or groups, and the bot immediately returns the clean, direct download URL with interactive **"Open Link"** and **"Copy Link"** buttons.
   - Millisecond-accurate latency & speed tracking.
   - Batch link resolution (send multiple shortlinks in a single message).

2. ⚡ **Universal 4-Layer Bypass Engine (`python_bot/bypass_engine.py`)**:
   - **Layer 1: URL/Query String Unpacker:** Base64 & recursive URI query extraction.
   - **Layer 2: Obfuscation & Signature Decoders:** AdF.ly ysmm XOR, Boost.ink kekw attribute decoder, and more.
   - **Layer 3: DOM & Script Analyzers:** HTML Meta Refresh parser and inline `window.location` redirect extraction.
   - **Layer 4: Multi-hop HTTP Tracer:** Resolves 301/302 HTTP chains down to the final target.

3. 🌐 **REST API & Webhook (`python_bot/api.py`)**:
   - FastAPI microservice with `/bypass?url=...` and `/api/bypass` endpoints.

4. 💻 **Full-Stack Web Dashboard (`src/`)**:
   - React 18, Vite, and Tailwind CSS.
   - Live bypass testing console, 1,337+ services explorer, and interactive engine diagram.

---

## 🚀 Telegram Bot Quickstart

### 1. Install Dependencies
```bash
cd python_bot
pip install -r requirements.txt
```

### 2. Set Telegram Bot Token & Run
```bash
export BOT_TOKEN="YOUR_TELEGRAM_BOT_TOKEN_FROM_BOTFATHER"
python bot.py
```

---

## 🌐 Web Platform & Server Quickstart

```bash
# Install node dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

---

## 📁 Repository Structure

```
.
├── python_bot/
│   ├── bot.py                # Telegram Bot handler
│   ├── bypass_engine.py      # Core 1,337+ bypass resolver engine
│   ├── api.py                # FastAPI REST endpoint
│   ├── requirements.txt      # Python dependencies
│   └── README.md             # Python bot documentation
├── src/
│   ├── components/           # UI Components (Live bypasser, diagrams, explorer)
│   ├── data/                 # 1,337+ Supported Shortlink Domains catalog
│   ├── App.tsx               # Main Dashboard Application
│   └── main.tsx              # React Entry point
├── server.ts                 # Express/Vite Backend server
├── package.json              # Web dependencies & scripts
└── README.md                 # Main Project Documentation
```
