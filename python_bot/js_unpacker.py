"""
JavaScript Dean Edwards (p,a,c,k,e,r) & Obfuscated JS Unpacker
Extracts hidden URLs and redirect targets from packed JavaScript code.
"""

import re

def unpack_packer(packed_js: str) -> str:
    """
    Unpacks eval(function(p,a,c,k,e,d)...) obfuscated code.
    """
    pattern = r"\}\s*\(\s*['\"](.*?)['\"]\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*['\"](.*?)['\"]\.split\(['\"]\|['\"]\)"
    match = re.search(pattern, packed_js)
    if not match:
        # Alternative pattern with array or different spacing
        pattern_alt = r"return p\}\s*\(\s*(['\"].*?['\"])\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*['\"](.*?)['\"]\s*\.split"
        match = re.search(pattern_alt, packed_js)
        if not match:
            return packed_js

    try:
        payload = match.group(1)
        radix = int(match.group(2))
        count = int(match.group(3))
        dictionary = match.group(4).split("|")

        def itob(num, base):
            digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            if num < base:
                return digits[num]
            return itob(num // base, base) + digits[num % base]

        def get_word(w):
            idx = 0
            if radix <= 10:
                idx = int(w) if w.isdigit() else -1
            elif radix <= 36:
                idx = int(w, radix) if re.match(r'^[0-9a-z]+$', w, re.I) else -1
            elif radix <= 62:
                # Base62 lookup
                digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
                idx = 0
                for char in w:
                    idx = idx * 62 + digits.index(char)
            
            if 0 <= idx < len(dictionary) and dictionary[idx]:
                return dictionary[idx]
            return w

        unpacked = re.sub(r'\b\w+\b', lambda m: get_word(m.group(0)), payload)
        return unpacked
    except Exception:
        return packed_js

def extract_urls_from_js(script_text: str) -> list[str]:
    """Finds all valid HTTP/HTTPS URLs inside JavaScript code."""
    unpacked = unpack_packer(script_text)
    urls = re.findall(r'https?://[a-zA-Z0-9_\-\./\?=%&#~+:;@]+', unpacked)
    cleaned = []
    for u in urls:
        u_clean = u.rstrip('\\\'"')
        if not any(ign in u_clean.lower() for ign in ['w3.org', 'schema.org', 'google-analytics.com', 'googletagmanager.com', 'cloudflare.com', 'polyfill.io', '.js', '.css', '.png', '.jpg', '.svg']):
            cleaned.append(u_clean)
    return cleaned
