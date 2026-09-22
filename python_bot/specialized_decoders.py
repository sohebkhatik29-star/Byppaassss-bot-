"""
Specialized Decoders for High-Profile Shortener Frameworks
Supports: AdLinkFly (vplink, earnlinks, tnlink, etc.), GPLinks, Droplink, Rocklinks,
Linkvertise, AdFly, Sub2Unlock, Boost.ink, Shorte.st, Ouo.io, Bc.vc, Mdisk, Shareus.
"""

import re
import base64
import json
import urllib.parse
from typing import Optional, Dict, Any, List

try:
    import requests
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False

try:
    import cloudscraper
    HAS_CLOUDSCRAPER = True
except ImportError:
    HAS_CLOUDSCRAPER = False

try:
    from bs4 import BeautifulSoup
    HAS_BS4 = True
except ImportError:
    HAS_BS4 = False

def decode_adlinkfly(url: str, html: str, session: Any = None) -> Optional[str]:
    """
    AdLinkFly Engine Decoder.
    Powers vplink.in, earnlinks.in, droplink.co, tnlink.in, rocklinks.net, shrinkme.io, etc.
    Extracts CSRF tokens, session cookies, and form payloads to trigger /links/go AJAX endpoint.
    """
    if not session or not HAS_REQUESTS:
        return None
    try:
        parsed = urllib.parse.urlparse(url)
        base_url = f"{parsed.scheme}://{parsed.netloc}"
        
        # 1. Search for form parameters
        csrf_token = None
        ad_form_data = None
        token_fields = None
        token_unlocked = None
        
        m_csrf = (
            re.search(r'name=["\']_csrfToken["\']\s+value=["\']([^"\']+)["\']', html) or
            re.search(r'value=["\']([^"\']+)["\']\s+name=["\']_csrfToken["\']', html) or
            re.search(r'["\']csrfToken["\']\s*:\s*["\']([^"\']+)["\']', html) or
            re.search(r'var\s+csrfToken\s*=\s*["\']([^"\']+)["\']', html)
        )
        if m_csrf:
            csrf_token = m_csrf.group(1)
            
        m_ad = (
            re.search(r'name=["\']ad_form_data["\']\s+value=["\']([^"\']+)["\']', html) or
            re.search(r'value=["\']([^"\']+)["\']\s+name=["\']ad_form_data["\']', html)
        )
        if m_ad:
            ad_form_data = m_ad.group(1)
            
        m_fields = re.search(r'name=["\']_Token\[fields\]["\']\s+value=["\']([^"\']+)["\']', html)
        if m_fields:
            token_fields = m_fields.group(1)
            
        m_unlocked = re.search(r'name=["\']_Token\[unlocked\]["\']\s+value=["\']([^"\']+)["\']', html)
        if m_unlocked:
            token_unlocked = m_unlocked.group(1)

        # Check session cookies if csrf token not in DOM
        if not csrf_token and hasattr(session, 'cookies'):
            for cookie in session.cookies:
                if 'csrf' in cookie.name.lower():
                    csrf_token = cookie.value
                    break
                    
        # Extract alias from path
        path_parts = [p for p in parsed.path.split('/') if p]
        alias = path_parts[-1] if path_parts else ""

        # Construct POST data
        post_data: Dict[str, str] = {}
        if csrf_token:
            post_data['_csrfToken'] = csrf_token
        if ad_form_data:
            post_data['ad_form_data'] = ad_form_data
        if token_fields:
            post_data['_Token[fields]'] = token_fields
        if token_unlocked:
            post_data['_Token[unlocked]'] = token_unlocked
        if alias:
            post_data['alias'] = alias

        post_endpoints = [
            f"{base_url}/links/go",
            f"{base_url}/links/bypass",
            f"{base_url}/fly/api",
            urllib.parse.urljoin(url, "/links/go")
        ]

        post_headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Referer": url,
            "Origin": base_url,
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
        if csrf_token:
            post_headers["X-CSRF-Token"] = csrf_token

        # Add domain variants if it's vplink or gplink
        extra_domains = []
        if "vplink" in parsed.netloc:
            extra_domains = ["https://vplink.in", "https://vplinks.in", "https://vplink.co"]
        elif "gplink" in parsed.netloc:
            extra_domains = ["https://gplinks.co", "https://gplinks.in"]

        for d in extra_domains:
            post_endpoints.append(f"{d}/links/go")

        for endpoint in post_endpoints:
            for payload in [post_data, {"alias": alias} if alias else post_data]:
                try:
                    resp = session.post(endpoint, data=payload, headers=post_headers, timeout=8)
                    if resp.status_code == 200:
                        try:
                            res_json = resp.json()
                            if isinstance(res_json, dict):
                                for key in ["url", "dest", "destination", "link", "target"]:
                                    if key in res_json and isinstance(res_json[key], str) and res_json[key].startswith(('http://', 'https://')):
                                        return res_json[key]
                        except Exception:
                            pass
                except Exception:
                    continue
    except Exception:
        pass
    return None

def decode_gplinks(url: str, html: str, session: Any = None) -> Optional[str]:
    """GPLinks handshake solver."""
    if not session or not HAS_REQUESTS:
        return None
    try:
        parsed = urllib.parse.urlparse(url)
        base_url = f"{parsed.scheme}://{parsed.netloc}"
        
        # Check for vid or token
        vid_match = re.search(r'name=["\']vid["\']\s+value=["\']([^"\']+)["\']', html)
        token_match = re.search(r'name=["\']token["\']\s+value=["\']([^"\']+)["\']', html)
        
        data = {}
        if vid_match:
            data['vid'] = vid_match.group(1)
        if token_match:
            data['token'] = token_match.group(1)
            
        if data:
            resp = session.post(f"{base_url}/links/go", data=data, headers={
                "X-Requested-With": "XMLHttpRequest",
                "Referer": url
            }, timeout=8)
            if resp.status_code == 200:
                res_json = resp.json()
                if "url" in res_json and res_json["url"].startswith("http"):
                    return res_json["url"]
    except Exception:
        pass
    return None

def decode_linkvertise(url: str, session: Any = None) -> Optional[str]:
    """Linkvertise static and API extractor."""
    try:
        parsed = urllib.parse.urlparse(url)
        query_params = urllib.parse.parse_qs(parsed.query)
        if "r" in query_params:
            decoded = base64.b64decode(query_params["r"][0]).decode("utf-8", errors="ignore")
            if decoded.startswith(("http://", "https://")):
                return decoded
        
        if session and HAS_REQUESTS:
            resp = session.get(url, timeout=10)
            if resp.status_code == 200:
                match = re.search(r'target_url\s*=\s*["\'](https?://[^"\']+)["\']', resp.text)
                if match:
                    return match.group(1)
                b64_match = re.search(r'data-target=["\']([A-Za-z0-9+/=]+)["\']', resp.text)
                if b64_match:
                    decoded = base64.b64decode(b64_match.group(1)).decode("utf-8", errors="ignore")
                    if decoded.startswith(("http://", "https://")):
                        return decoded
    except Exception:
        pass
    return None

def decode_sub2unlock(html: str) -> Optional[str]:
    """Sub2Unlock / Sub4Unlock target link extractor."""
    try:
        m = re.search(r'(?:link|target_link|destinationUrl|dest_link|unlocked_url)\s*=\s*["\'](https?://[^"\']+)["\']', html)
        if m:
            return m.group(1)

        m_data = re.search(r'data-url=["\']([^"\']+)["\']', html)
        if m_data:
            data_url = m_data.group(1)
            if data_url.startswith(("http://", "https://")):
                return data_url
            try:
                dec = base64.b64decode(data_url).decode("utf-8", errors="ignore")
                if dec.startswith(("http://", "https://")):
                    return dec
            except Exception:
                pass

        if HAS_BS4:
            soup = BeautifulSoup(html, "html.parser")
            for a in soup.find_all("a", href=True):
                href = a["href"]
                if href.startswith(("http://", "https://")) and not any(k in href for k in ["sub2unlock", "youtube.com/channel", "instagram.com", "discord.gg"]):
                    return href
    except Exception:
        pass
    return None

def decode_ouo(html: str, session: Any, current_url: str) -> Optional[str]:
    """Ouo.io form extractor."""
    if not session or not HAS_REQUESTS:
        return None
    try:
        if HAS_BS4:
            soup = BeautifulSoup(html, "html.parser")
            form = soup.find("form")
            if form:
                action = form.get("action")
                inputs = {inp.get("name"): inp.get("value") for inp in form.find_all("input") if inp.get("name")}
                if "_token" in inputs:
                    target_action = urllib.parse.urljoin(current_url, action) if action else current_url
                    resp = session.post(target_action, data=inputs, allow_redirects=True, timeout=10)
                    if resp.url != current_url:
                        return resp.url
    except Exception:
        pass
    return None

def decode_short_est(html: str) -> Optional[str]:
    """Shorte.st / sh.st JSON config extractor."""
    try:
        m = re.search(r'sessionId:\s*["\']([^"\']+)["\'].*?destinationUrl:\s*["\']([^"\']+)["\']', html, re.DOTALL)
        if m:
            return m.group(2)
        m2 = re.search(r'callbackUrl:\s*["\']([^"\']+)["\']', html)
        if m2 and m2.group(1).startswith("http"):
            return m2.group(1)
    except Exception:
        pass
    return None

def query_upstream_bypass_apis(url: str, session: Any = None) -> Optional[str]:
    """
    Queries upstream public bypass solver networks for high-security / zero-day shortlinks.
    Used by top Telegram bots for instant sub-second resolution of Indian shorteners.
    """
    if not session or not HAS_REQUESTS:
        return None
        
    encoded_url = urllib.parse.quote(url, safe='')
    
    endpoints = [
        f"https://unshorten.me/json/{url}",
        f"https://bypass-api.vercel.app/api?url={encoded_url}",
        f"https://free-bypass.vercel.app/api?url={encoded_url}",
        f"https://bypass.city/api/bypass?url={encoded_url}",
    ]
    
    for ep in endpoints:
        try:
            resp = session.get(ep, timeout=5)
            if resp.status_code == 200:
                try:
                    data = resp.json()
                    if isinstance(data, dict):
                        for k in ["resolved_url", "destination", "url", "result", "bypassed_url", "target"]:
                            if k in data and isinstance(data[k], str) and data[k].startswith(('http://', 'https://')):
                                parsed_dest = urllib.parse.urlparse(data[k])
                                parsed_orig = urllib.parse.urlparse(url)
                                # Ensure it's not returning the same shortener domain
                                if parsed_dest.hostname != parsed_orig.hostname:
                                    return data[k]
                except Exception:
                    pass
        except Exception:
            continue
            
    return None
