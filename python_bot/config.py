"""
Configuration and Environment Settings for Bypass Engine and Telegram Bot
"""

import os

BOT_TOKEN = os.getenv("BOT_TOKEN", "YOUR_BOT_TOKEN_HERE")
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("PORT", os.getenv("API_PORT", 8000)))
DEFAULT_TIMEOUT = int(os.getenv("REQUEST_TIMEOUT", 12))
MAX_REDIRECT_DEPTH = int(os.getenv("MAX_REDIRECT_DEPTH", 6))

DEFAULT_USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)
