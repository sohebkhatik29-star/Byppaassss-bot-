"""
Telegram Shortlink Auto-Bypass Bot
Powered by Universal Autonomous AI Heuristic Engine (Auto-Bypasses Unknown & Zero-Day Domains)
Supports: Direct Messages, Groups, Channels, Inline Queries, and Batch Mode.
"""

import os
import re
import time
import telebot
from telebot import types
from bypass_engine import UniversalBypassEngine
from config import BOT_TOKEN

bot = telebot.TeleBot(BOT_TOKEN, parse_mode="HTML")
engine = UniversalBypassEngine()

# In-memory performance metrics & user settings
stats = {
    "total_processed": 0,
    "success_count": 0,
    "fail_count": 0,
    "autonomous_zero_day_bypassed": 0,
    "start_time": time.time()
}

user_lang_pref = {}  # {user_id: "hi" | "en"}

URL_REGEX = re.compile(r'https?://[^\s<>"]+|www\.[^\s<>"]+')

def get_text(user_id: int, key: str, **kwargs) -> str:
    lang = user_lang_pref.get(user_id, "hi")
    
    texts = {
        "welcome": {
            "hi": (
                "👋 <b>Namaste {name}!</b>\n\n"
                "🤖 <b>Universal Autonomous Auto-Bypass Bot</b> me aapka swagat hai!\n\n"
                "⚡ <b>Special Auto-Feature:</b>\n"
                "Aap koi bhi link bhej sakte hain—chahe wo <b>purani ho ya bilkul nayi (Unknown / Zero-Day Domain)</b> jiska naam code me na ho! Bot apne aap link ka structure samjhkar usko <b>Automatically Bypass</b> kar dega.\n\n"
                "🎯 <b>Kaise use karein?</b>\n"
                "Bas chat me koi bhi shortlink paste karke send karein.\n\n"
                "📊 <i>Engine: 1,337+ Known Services + Autonomous Deep Heuristics Scanner</i>"
            ),
            "en": (
                "👋 <b>Hello {name}!</b>\n\n"
                "🤖 Welcome to the <b>Universal Autonomous Shortlink Auto-Bypass Bot</b>!\n\n"
                "⚡ <b>Special Feature:</b>\n"
                "Send any link—whether it's a <b>known shortener or an unknown zero-day domain</b> not present in the code! The bot will automatically inspect the link and bypass it in milliseconds.\n\n"
                "🎯 <b>How to use?</b>\n"
                "Just paste and send any shortlink here in the chat.\n\n"
                "📊 <i>Engine: 1,337+ Known Services + Autonomous Deep Heuristics Scanner</i>"
            )
        },
        "help": {
            "hi": (
                "📖 <b>Bot Commands & Automatic Bypass Guide:</b>\n\n"
                "• <b>Single Link:</b> Bas chat me link paste karein (e.g. <code>https://unknown-shortener.com/r/xyz</code>)\n"
                "• <b>Unknown Domains:</b> Agar link kisi nayi website ki hai, tab bhi bot automatically deep scripts, meta redirects & base64 unwrap karke direct link nikalega!\n"
                "• <b>Batch Mode:</b> Ek sath multiple links ek hi message me paste karke bhejein.\n"
                "• <b>Inline Mode:</b> Kisi bhi chat me <code>@{bot_name} link</code> likhein direct destination link share karne ke liye.\n"
                "• <b>/stats:</b> Check karein kitni links aur kitne Unknown Domains bypass hue hain.\n"
                "• <b>/ping:</b> Bot response speed test karein.\n"
                "• <b>/lang:</b> Change language (Hindi / English)."
            ),
            "en": (
                "📖 <b>Bot Commands & Guide:</b>\n\n"
                "• <b>Single Link:</b> Just paste the link in chat.\n"
                "• <b>Unknown Domains:</b> The bot automatically analyzes DOM scripts, meta tags, and headers to extract the target destination.\n"
                "• <b>Batch Mode:</b> Send multiple links in one message.\n"
                "• <b>Inline Mode:</b> Type <code>@{bot_name} link</code> in any chat to share bypassed links directly.\n"
                "• <b>/stats:</b> View engine performance metrics.\n"
                "• <b>/ping:</b> Check latency.\n"
                "• <b>/lang:</b> Switch language."
            )
        }
    }
    
    template = texts.get(key, {}).get(lang, "")
    return template.format(**kwargs)

@bot.message_handler(commands=['start'])
def handle_start(message):
    user_name = message.from_user.first_name or "Friend"
    text = get_text(message.from_user.id, "welcome", name=user_name)
    
    markup = types.InlineKeyboardMarkup()
    btn1 = types.InlineKeyboardButton("ℹ️ Help & Guide", callback_data="cmd_help")
    btn2 = types.InlineKeyboardButton("📊 Bot Stats", callback_data="cmd_stats")
    btn3 = types.InlineKeyboardButton("🌐 Language / भाषा", callback_data="cmd_lang")
    markup.row(btn1, btn2)
    markup.row(btn3)

    bot.reply_to(message, text, reply_markup=markup)

@bot.message_handler(commands=['help'])
def handle_help(message):
    bot_info = bot.get_me()
    text = get_text(message.from_user.id, "help", bot_name=bot_info.username or "bypass_bot")
    bot.reply_to(message, text)

@bot.message_handler(commands=['lang'])
def handle_lang(message):
    curr = user_lang_pref.get(message.from_user.id, "hi")
    new_lang = "en" if curr == "hi" else "hi"
    user_lang_pref[message.from_user.id] = new_lang
    msg = "✅ Language changed to **English**!" if new_lang == "en" else "✅ भाषा बदलकर **हिन्दी (Hindi)** कर दी गई है!"
    bot.reply_to(message, msg)

@bot.message_handler(commands=['stats'])
def handle_stats(message):
    uptime_sec = int(time.time() - stats["start_time"])
    hours, rem = divmod(uptime_sec, 3600)
    minutes, seconds = divmod(rem, 60)
    uptime_str = f"{hours}h {minutes}m {seconds}s"

    stats_text = (
        "📊 <b>Bot Performance & Autonomous Engine Stats:</b>\n\n"
        f"• Total Links Processed: <b>{stats['total_processed']}</b>\n"
        f"• ✅ Successful Bypasses: <b>{stats['success_count']}</b>\n"
        f"• ✨ Unknown / Zero-Day Domains Auto-Cracked: <b>{stats['autonomous_zero_day_bypassed']}</b>\n"
        f"• ❌ Failed: <b>{stats['fail_count']}</b>\n"
        f"• ⏱️ Bot Uptime: <b>{uptime_str}</b>\n"
        f"• ⚡ Engine: <b>Universal 1,337+ + Autonomous AI Heuristics</b>"
    )
    bot.reply_to(message, stats_text)

@bot.message_handler(commands=['ping'])
def handle_ping(message):
    t0 = time.time()
    msg = bot.reply_to(message, "🏓 <i>Pinging...</i>")
    latency = round((time.time() - t0) * 1000, 2)
    bot.edit_message_text(
        f"🏓 <b>Pong!</b> <code>{latency}ms</code>\n⚡ Autonomous Bypass Engine active & running at ultra-high speed!",
        chat_id=message.chat.id,
        message_id=msg.message_id
    )

@bot.callback_query_handler(func=lambda call: True)
def handle_callbacks(call):
    if call.data == "cmd_help":
        bot_info = bot.get_me()
        text = get_text(call.from_user.id, "help", bot_name=bot_info.username or "bypass_bot")
        bot.send_message(call.message.chat.id, text)
    elif call.data == "cmd_stats":
        handle_stats(call.message)
    elif call.data == "cmd_lang":
        curr = user_lang_pref.get(call.from_user.id, "hi")
        new_lang = "en" if curr == "hi" else "hi"
        user_lang_pref[call.from_user.id] = new_lang
        bot.send_message(call.message.chat.id, f"✅ Language changed to: {'English' if new_lang == 'en' else 'हिन्दी'}")
    bot.answer_callback_query(call.id)

# Inline Query Handler (@yourbot <url>)
@bot.inline_handler(lambda query: len(query.query.strip()) > 0)
def handle_inline_query(inline_query):
    try:
        raw_text = inline_query.query.strip()
        found_urls = URL_REGEX.findall(raw_text)
        if not found_urls:
            return

        target_url = found_urls[0]
        res = engine.bypass(target_url)

        if res.get("success") and res.get("destination_url"):
            dest = res["destination_url"]
            method = res.get("method", "Universal Heuristics")
            is_auto = res.get("is_autonomous", False)
            title = "✨ Auto-Bypassed (Zero-Day)" if is_auto else "✅ Bypassed Destination URL"

            article = types.InlineQueryResultArticle(
                id="bypass-1",
                title=title,
                description=f"Destination: {dest[:60]}...",
                input_message_content=types.InputTextMessageContent(
                    f"🎯 <b>Direct Bypassed URL:</b>\n<code>{dest}</code>\n\n"
                    f"🔗 <b>Original:</b> <code>{target_url}</code>\n"
                    f"⚡ <b>Method:</b> <code>{method}</code>",
                    parse_mode="HTML",
                    disable_web_page_preview=True
                )
            )
            bot.answer_inline_query(inline_query.id, [article], cache_time=10)
    except Exception:
        pass

# Universal message listener for any shortlink
@bot.message_handler(func=lambda msg: bool(URL_REGEX.search(msg.text or "")))
def handle_auto_bypass(message):
    text = message.text.strip()
    found_urls = URL_REGEX.findall(text)

    if not found_urls:
        return

    # Send temporary status indicator
    status_msg = bot.reply_to(message, "⏳ <i>Link detect hui! Autonomous Engine inspect aur bypass kar raha hai...</i>")

    for idx, raw_url in enumerate(found_urls):
        stats["total_processed"] += 1
        res = engine.bypass(raw_url)

        if res.get("success") and res.get("destination_url"):
            stats["success_count"] += 1
            if res.get("is_autonomous"):
                stats["autonomous_zero_day_bypassed"] += 1

            dest = res["destination_url"]
            method = res.get("method", "Universal Autonomous Heuristics")
            time_taken = res.get("time_ms", 0)
            hops_count = res.get("total_hops", 1)
            is_auto = res.get("is_autonomous", False)

            auto_badge = "✨ <b>Autonomous Auto-Bypass</b> <i>(Unknown Domain Auto-Resolved!)</i>\n\n" if is_auto else ""

            msg_part = (
                f"✅ <b>Bypass Successful!</b> (#{idx+1})\n"
                f"{auto_badge}"
                f"🔗 <b>Original Shortlink:</b>\n<code>{res['original_url']}</code>\n\n"
                f"🎯 <b>Direct Destination URL:</b>\n<code>{dest}</code>\n\n"
                f"⚡ <b>Layer/Method:</b> <code>{method}</code>\n"
                f"🔄 <b>Redirect Hops:</b> <code>{hops_count}</code>\n"
                f"⏱️ <b>Speed:</b> <code>{time_taken}ms</code>"
            )

            markup = types.InlineKeyboardMarkup()
            btn_list = []
            if dest.startswith(('http://', 'https://', 'tg://')):
                btn_list.append(types.InlineKeyboardButton("🚀 Open Link", url=dest))
            btn_list.append(types.InlineKeyboardButton("📋 Share Link", switch_inline_query_current_chat=dest))
            markup.row(*btn_list)

            bot.reply_to(message, msg_part, reply_markup=markup, disable_web_page_preview=True)
        else:
            stats["fail_count"] += 1
            err = res.get("error", "Link could not be resolved automatically")
            fail_part = (
                f"❌ <b>Bypass Failed</b> for <code>{raw_url}</code>\n"
                f"⚠️ <i>Reason: {err}</i>"
            )
            bot.reply_to(message, fail_part, disable_web_page_preview=True)

    # Clean up temporary status message
    try:
        bot.delete_message(message.chat.id, status_msg.message_id)
    except Exception:
        pass

if __name__ == "__main__":
    print("🚀 Universal Autonomous Shortlink Auto-Bypass Bot started successfully!")
    print("✨ Autonomous Zero-Day link resolution engine is ONLINE!")
    print("👉 Send any shortlink in Telegram to bypass...")
    try:
        # Delete any active webhook to prevent Telegram 409 Conflict error
        bot.remove_webhook()
        time.sleep(1)
    except Exception as e:
        print(f"Webhook reset note: {e}")
    bot.infinity_polling(skip_pending=True)
