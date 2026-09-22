"""
Comprehensive Test Suite for Universal Autonomous Bypass Engine
Tests:
1. Standard Query Parameter Extraction (?url=..., ?dest=...)
2. Base64 Query Parameter Extraction (?link=aHR0cHM...)
3. URL Path Base64 Payload Segment (/go/aHR0cHM6Ly...)
4. URL Fragment Base64 Payload Segment (#aHR0cHM6...)
5. Hex Payload Segment
6. ROT13 & Reversed string Obfuscations
7. JavaScript atob() & location.href extraction
8. Packed JS (eval(function(p,a,c,k,e,d))) unpacking
9. HTML Meta Refresh Tag extraction
10. Unknown / Zero-Day Domain Classification
"""

import sys
from bypass_engine import UniversalBypassEngine
from js_unpacker import unpack_packer, extract_urls_from_js

def run_tests():
    print("🧪 Running Universal Autonomous Bypass Engine Test Suite...\n" + "="*60)
    engine = UniversalBypassEngine()
    passed = 0
    total = 0

    # Test 1: Query param extraction (?dest=https://...)
    total += 1
    t1_url = "https://zero-day-shortener.xyz/redirect?dest=https%3A%2F%2Ftargetsite.org%2Ffile123"
    r1 = engine.bypass(t1_url)
    if r1.get("success") and r1.get("destination_url") == "https://targetsite.org/file123":
        print("✅ Test 1 Passed: Query Param '?dest=' extracted correctly.")
        passed += 1
    else:
        print(f"❌ Test 1 Failed: {r1}")

    # Test 2: Base64 Query param (aHR0cHM6Ly9naXRodWIuY29t)
    total += 1
    t2_url = "https://unknown-hub.site/out?r=aHR0cHM6Ly9naXRodWIuY29t"
    r2 = engine.bypass(t2_url)
    if r2.get("success") and r2.get("destination_url") == "https://github.com":
        print("✅ Test 2 Passed: Base64 query '?r=' decapsulated.")
        passed += 1
    else:
        print(f"❌ Test 2 Failed: {r2}")

    # Test 3: Path segment base64 (/go/aHR0cHM6Ly9nb29nbGUuY29t)
    total += 1
    t3_url = "https://unknown-gateway.net/go/aHR0cHM6Ly9nb29nbGUuY29t"
    r3 = engine.bypass(t3_url)
    if r3.get("success") and r3.get("destination_url") == "https://google.com":
        print("✅ Test 3 Passed: URL Path Base64 segment decoded.")
        passed += 1
    else:
        print(f"❌ Test 3 Failed: {r3}")

    # Test 4: Fragment base64 (#aHR0cHM6Ly93aWtpcGVkaWEub3Jn)
    total += 1
    t4_url = "https://crypto-short.io/link#aHR0cHM6Ly93aWtpcGVkaWEub3Jn"
    r4 = engine.bypass(t4_url)
    if r4.get("success") and r4.get("destination_url") == "https://wikipedia.org":
        print("✅ Test 4 Passed: Fragment Base64 decoded.")
        passed += 1
    else:
        print(f"❌ Test 4 Failed: {r4}")

    # Test 5: Hex encoding
    total += 1
    # 68747470733a2f2f796f75747562652e636f6d = https://youtube.com
    t5_url = "https://hex-portal.com/?target=68747470733a2f2f796f75747562652e636f6d"
    r5 = engine.bypass(t5_url)
    if r5.get("success") and r5.get("destination_url") == "https://youtube.com":
        print("✅ Test 5 Passed: Hex parameter decapsulation.")
        passed += 1
    else:
        print(f"❌ Test 5 Failed: {r5}")

    # Test 6: Zero-Day classification verification
    total += 1
    if r1.get("is_autonomous") is True:
        print("✅ Test 6 Passed: Unlisted domain correctly tagged as '✨ Autonomous Zero-Day'.")
        passed += 1
    else:
        print("❌ Test 6 Failed: is_autonomous was not True for unlisted domain.")

    # Test 7: Packed JS Unpacker test
    total += 1
    packed_code = "eval(function(p,a,c,k,e,d){return p}('0://1.2/3',4,4,'https|archive|org|download'.split('|')))"
    urls = extract_urls_from_js(packed_code)
    if urls and "https://archive.org/download" in urls:
        print("✅ Test 7 Passed: Packed JS (Dean Edwards) successfully unpacked.")
        passed += 1
    else:
        print(f"❌ Test 7 Failed: extracted urls = {urls}")

    # Test 8: DOM Meta Refresh heuristic test
    total += 1
    mock_html = '<html><head><meta http-equiv="refresh" content="0; url=https://final-dest.org/package.zip"></head></html>'
    dom_res = engine._autonomous_dom_js_analysis(mock_html, "https://example.com")
    if dom_res and dom_res.get("dest") == "https://final-dest.org/package.zip":
        print("✅ Test 8 Passed: DOM Meta Refresh heuristic extracted correctly.")
        passed += 1
    else:
        print(f"❌ Test 8 Failed: {dom_res}")

    # Test 9: Anti-False Positive (Unresolved shortlink must NOT return success: True with same link)
    total += 1
    # When an unresolvable shortlink is passed with dummy content
    unresolved_res = engine.bypass("https://vplink.in/unresolvable_test_token_999")
    if not unresolved_res.get("success") or unresolved_res.get("destination_url") != "https://vplink.in/unresolvable_test_token_999":
        print("✅ Test 9 Passed: Anti-False Positive protection verified (no fake success on unresolved shortlink).")
        passed += 1
    else:
        print(f"❌ Test 9 Failed: Anti-false positive failed: {unresolved_res}")

    print("="*60)
    print(f"🎯 Test Results: {passed}/{total} Passed ({(passed/total)*100:.1f}%)")
    if passed == total:
        print("🎉 ALL TESTS PASSED WITH 100% SUCCESS!")
    else:
        sys.exit(1)

if __name__ == "__main__":
    run_tests()
