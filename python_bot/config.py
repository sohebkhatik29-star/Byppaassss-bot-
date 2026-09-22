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
import re

raw_proxy = os.getenv("PROXY_URL", os.getenv("HTTPS_PROXY", os.getenv("HTTP_PROXY", ""))).strip()

# Automatically clean if user pasted 'curl --proxy "http://..."' or quotes
match = re.search(r'(https?://[^\s"\'\\]+)', raw_proxy)
if match:
    clean_proxy = match.group(1).rstrip('/')
else:
    clean_proxy = raw_proxy.strip('\'"')

# Auto-fix webshare username if -rotate was omitted on p.webshare.io
if 'webshare.io' in clean_proxy and '@' in clean_proxy:
    # check if user:pass before @ has -rotate
    user_part = clean_proxy.split('@')[0].split('//')[-1]
    if ':' in user_part:
        uname, pwd = user_part.split(':', 1)
        if not uname.endswith('-rotate') and not uname.endswith('-direct'):
            clean_proxy = clean_proxy.replace(f"{uname}:{pwd}@", f"{uname}-rotate:{pwd}@")

PROXY_URL = clean_proxy

