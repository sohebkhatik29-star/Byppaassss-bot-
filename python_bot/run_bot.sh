#!/usr/bin/env bash
set -e

echo "🚀 Initializing Universal Autonomous Shortlink Auto-Bypass Bot..."

# Check Python version
python3 -c "import sys; print(f'🐍 Python {sys.version.split()[0]} Detected')"

# Run Test Suite first
echo "🧪 Running Engine Test Suite..."
python3 test_engine.py

# Launch Bot
if [ -z "$BOT_TOKEN" ] || [ "$BOT_TOKEN" = "YOUR_BOT_TOKEN_HERE" ]; then
    echo "⚠️  WARNING: BOT_TOKEN is not set!"
    echo "👉 Run with: BOT_TOKEN='your_token' ./run_bot.sh"
    echo "Or start API mode: python3 api.py"
fi

echo "✨ Starting Bot..."
python3 bot.py
