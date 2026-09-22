"""
Unified 24/7 Runner for Render Free Web Service Tier.
Runs FastAPI HTTP Server (port $PORT) and Telegram Bot Polling concurrently.
100% Free - No credit card / paid plan required!
"""

import os
import threading
import time
import uvicorn
from api import app
from bot import bot, stats
from config import BOT_TOKEN

def run_telegram_bot():
    if not BOT_TOKEN or BOT_TOKEN == "YOUR_TELEGRAM_BOT_TOKEN":
        print("⚠️ BOT_TOKEN not set or using placeholder. Telegram bot polling skipped.")
        return
    print("🤖 Starting Telegram Auto-Bypass Bot background worker...")
    try:
        # Delete active webhook to prevent Error 409 Conflict
        bot.remove_webhook()
        time.sleep(1)
    except Exception as e:
        print(f"Webhook reset note: {e}")

    while True:
        try:
            bot.infinity_polling(skip_pending=True, timeout=20, long_polling_timeout=20)
        except Exception as e:
            print(f"⚠️ Telegram Bot polling error: {e}. Retrying in 5 seconds...")
            time.sleep(5)

if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    
    # 1. Start Telegram Bot in a dedicated background daemon thread
    bot_thread = threading.Thread(target=run_telegram_bot, daemon=True)
    bot_thread.start()
    
    # 2. Run FastAPI Web Service (keeps Render Free tier alive & active)
    print(f"🚀 Universal Bypass Web Service starting on 0.0.0.0:{port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
