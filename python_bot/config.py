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
    "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.6778.200 Mobile Safari/537.36"
)

# Optional HTTP/SOCKS5 Proxy or Residential Proxy (e.g. Webshare / BrightData)
PROXY_URL = os.getenv("PROXY_URL", os.getenv("HTTPS_PROXY", os.getenv("HTTP_PROXY", "")))
