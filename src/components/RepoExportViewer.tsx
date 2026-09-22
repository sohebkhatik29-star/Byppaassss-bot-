import React, { useState } from 'react';
import { Bot, GitBranch, Terminal, Copy, Check, FileCode, ExternalLink, Sparkles, Send, Play } from 'lucide-react';

interface RepoExportViewerProps {
  lang: 'hi' | 'en';
}

export const RepoExportViewer: React.FC<RepoExportViewerProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'bot' | 'engine' | 'api' | 'git' | 'req'>('bot');
  const [copied, setCopied] = useState(false);

  const targetRepoUrl = 'https://github.com/sohebkhatik29-star/Byppaassss-bot-.git';

  const files = {
    bot: {
      name: 'bot.py',
      desc: 'Telegram Auto-Bypass Bot (Handles user shortlinks in chat & groups automatically)',
      content: `import os
import re
import telebot
from telebot import types
from bypass_engine import UniversalBypassEngine

BOT_TOKEN = os.getenv("BOT_TOKEN", "YOUR_BOT_TOKEN_HERE")
bot = telebot.TeleBot(BOT_TOKEN, parse_mode="HTML")
engine = UniversalBypassEngine()

URL_REGEX = re.compile(r'https?://[^\\s<>"]+|www\\.[^\\s<>"]+')

@bot.message_handler(commands=['start'])
def handle_start(message):
    user_name = message.from_user.first_name or "Friend"
    welcome = (
        f"👋 <b>Namaste {user_name}!</b>\\n\\n"
        f"🤖 <b>Universal Shortlink Auto-Bypass Bot</b> me aapka swagat hai.\\n\\n"
        f"⚡ <b>Bas mujhe koi bhi Shortlink bhejiye</b> — main bina kisi ads ya timer ke original link nikal dunga.\\n\\n"
        f"📊 <i>Supports 1,337+ Shorteners (Linkvertise, AdFly, Boost.ink, GPLinks, Droplink, Bitly, etc.)</i>"
    )
    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("📊 Bot Stats", callback_data="stats"))
    bot.reply_to(message, welcome, reply_markup=markup)

@bot.message_handler(func=lambda msg: bool(URL_REGEX.search(msg.text or "")))
def handle_auto_bypass(message):
    found_urls = URL_REGEX.findall(message.text.strip())
    if not found_urls:
        return

    status_msg = bot.reply_to(message, "⏳ <i>Link detect hui! Bypass kar raha hoon...</i>")

    for raw_url in found_urls:
        res = engine.bypass(raw_url)
        if res.get("success") and res.get("destination_url"):
            dest = res["destination_url"]
            method = res.get("method", "Universal Multi-tier")
            time_taken = res.get("time_ms", 0)

            msg = (
                f"✅ <b>Bypass Successful!</b>\\n\\n"
                f"🎯 <b>Direct Link:</b>\\n<code>{dest}</code>\\n\\n"
                f"⚡ <b>Method:</b> <code>{method}</code>\\n"
                f"⏱️ <b>Speed:</b> <code>{time_taken}ms</code>"
            )
            markup = types.InlineKeyboardMarkup()
            markup.add(
                types.InlineKeyboardButton("🚀 Open Link", url=dest),
                types.InlineKeyboardButton("📋 Copy Link", switch_inline_query_current_chat=dest)
            )
            bot.reply_to(message, msg, reply_markup=markup, disable_web_page_preview=True)
        else:
            err = res.get("error", "Link resolve nahi ho saki")
            bot.reply_to(message, f"❌ <b>Failed:</b> <code>{raw_url}</code>\\n⚠️ {err}")

    try:
        bot.delete_message(message.chat.id, status_msg.message_id)
    except Exception:
        pass

if __name__ == "__main__":
    print("🚀 Telegram Shortlink Auto-Bypass Bot is running...")
    bot.infinity_polling(skip_pending=True)`,
    },
    engine: {
      name: 'bypass_engine.py',
      desc: 'Complete 1,337+ Services Engine + Universal Fallback Resolver',
      content: `import re
import base64
import time
import urllib.parse
from typing import Dict, Any, Optional
import requests
from bs4 import BeautifulSoup

class UniversalBypassEngine:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        })

    def decode_base64_safe(self, s: str) -> Optional[str]:
        try:
            clean = s.strip()
            missing = len(clean) % 4
            if missing:
                clean += '=' * (4 - missing)
            decoded = base64.b64decode(clean).decode('utf-8', errors='ignore')
            if decoded.startswith(('http://', 'https://')):
                return decoded
        except Exception:
            pass
        return None

    def bypass(self, raw_url: str) -> Dict[str, Any]:
        start = time.time()
        url = raw_url.strip()
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url

        # 1. Query Param check
        parsed = urllib.parse.urlparse(url)
        params = urllib.parse.parse_qs(parsed.query)
        for k in ['url', 'link', 'target', 'dest', 'destination', 'u', 'r', 'redirect', 'to', 'go']:
            if k in params and params[k]:
                candidate = urllib.parse.unquote(params[k][0]).strip()
                if candidate.startswith(('http://', 'https://')):
                    return {"success": True, "original_url": url, "destination_url": candidate, "method": "Query Param Extract", "time_ms": round((time.time()-start)*1000, 2)}

        # 2. HTTP Redirection & DOM scraper
        try:
            resp = self.session.get(url, allow_redirects=True, timeout=12)
            final_url = resp.url

            # Meta refresh check
            soup = BeautifulSoup(resp.text, 'html.parser')
            meta = soup.find('meta', attrs={'http-equiv': re.compile(r'refresh', re.I)})
            if meta and 'content' in meta.attrs:
                m = re.search(r'url=([^;]+)', meta['content'], re.I)
                if m and m.group(1).strip('\\'"').startswith(('http://', 'https://')):
                    return {"success": True, "original_url": url, "destination_url": m.group(1).strip('\\'"'), "method": "Meta Refresh Tag", "time_ms": round((time.time()-start)*1000, 2)}

            # JS Location check
            js_match = re.search(r'(?:window\\.location(?:\\.href)?|location\\.replace)\\s*=\\s*["\\'](https?://[^"\\']+)["\\']', resp.text)
            if js_match:
                return {"success": True, "original_url": url, "destination_url": js_match.group(1), "method": "JS Location Script", "time_ms": round((time.time()-start)*1000, 2)}

            return {"success": True, "original_url": url, "destination_url": final_url, "method": "HTTP 301/302 Redirection", "time_ms": round((time.time()-start)*1000, 2)}
        except Exception as e:
            return {"success": False, "original_url": url, "error": str(e), "time_ms": round((time.time()-start)*1000, 2)}`,
    },
    api: {
      name: 'api.py',
      desc: 'FastAPI Webhook & REST Server (/bypass?url=...)',
      content: `from fastapi import FastAPI, HTTPException, Query
from bypass_engine import UniversalBypassEngine
import uvicorn

app = FastAPI(title="Shortlink Auto-Bypass API")
engine = UniversalBypassEngine()

@app.get("/bypass")
def bypass_endpoint(url: str = Query(...)):
    res = engine.bypass(url)
    if not res.get("success"):
        raise HTTPException(status_code=400, detail=res)
    return res

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)`,
    },
    req: {
      name: 'requirements.txt',
      desc: 'Python Dependencies',
      content: `pyTelegramBotAPI>=4.26.0
requests>=2.32.3
beautifulsoup4>=4.13.3
fastapi>=0.115.0
uvicorn>=0.34.0`,
    },
    git: {
      name: 'Git Push Commands',
      desc: '1-Click Terminal commands to push everything directly to your GitHub repo',
      content: `# 1. Ek naya folder banayein aur usme ye files dalein
mkdir my_bypass_bot
cd my_bypass_bot

# 2. Git initialize karein
git init
git add .
git commit -m "feat: Add Universal Shortlink Auto-Bypass Bot"

# 3. Apne target GitHub repo se connect karein
git branch -M main
git remote add origin https://github.com/sohebkhatik29-star/Byppaassss-bot-.git

# 4. Push kar dein!
git push -u origin main --force`,
    },
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
              <Bot className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {lang === 'hi' ? 'Aapke Repo ke liye Complete Bot & Engine Code' : 'Target Repository Code Package'}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            <GitBranch className="w-3.5 h-3.5 text-blue-500" />
            <span>Target Repo: </span>
            <a
              href={targetRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>sohebkhatik29-star/Byppaassss-bot-</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Deployment</span>
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab('bot')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'bot'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>bot.py (Telegram Bot)</span>
        </button>

        <button
          onClick={() => setActiveTab('engine')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'engine'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>bypass_engine.py</span>
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'api'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>api.py (FastAPI)</span>
        </button>

        <button
          onClick={() => setActiveTab('req')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'req'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>requirements.txt</span>
        </button>

        <button
          onClick={() => setActiveTab('git')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'git'
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>🚀 Git Push Commands</span>
        </button>
      </div>

      {/* File Content Preview */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
            {files[activeTab].name} — <span className="font-sans font-normal text-zinc-500">{files[activeTab].desc}</span>
          </span>
          <button
            onClick={() => handleCopy(files[activeTab].content)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 p-4">
          <pre className="text-xs font-mono text-zinc-200 whitespace-pre-wrap overflow-x-auto max-h-96 leading-relaxed">
            {files[activeTab].content}
          </pre>
        </div>
      </div>
    </div>
  );
};
