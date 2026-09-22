import { BypassService, CategorySummary } from '../types';

export const REPO_STATS = {
  totalServices: 1337,
  bypassableServices: 1306,
  fallbackTracked: 31,
  nativeHandlersCount: 23,
  formServicesCount: 43,
  redirectFollowCount: 1240,
  repoUrl: "https://github.com/KaramelliS/shortlink-bypass.git",
  pypiPackage: "shortlink-bypass",
  dependencies: "Python 3.8+ & curl (Zero external pip dependencies required)",
  author: "KaramelliS",
  license: "MIT",
};

export const CATEGORY_SUMMARIES: CategorySummary[] = [
  {
    category: 'native',
    title: 'Specific Native Handlers',
    titleHindi: 'कस्टम नेटिव बायपास हैंडल्स (23)',
    count: 23,
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    iconName: 'Zap',
    description: 'Custom reverse-engineered algorithmic flows (JS session tokens, GraphQL APIs, XOR ysmm decoding, Base64 unpacking, and HTML attribute scrapers).',
    examples: ['aylink.co', 'cpmlink.co', 'linkvertise.com', 'adf.ly', 'boost.ink', 'ouo.io', 'gplinks.co', 'try2link.com', 'shareus.in', 'pkin.me']
  },
  {
    category: 'form',
    title: 'Form-Based Shorteners (Type 1 & 2)',
    titleHindi: 'फॉर्म-बेस्ड एड शॉर्टनर्स (43)',
    count: 43,
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    iconName: 'FileText',
    description: 'Bypasses Indian and international ad-shortener scripts by parsing hidden form inputs, simulating referrers & anti-bot sleep delays, and POSTing to /links/go.',
    examples: ['droplink.co', 'rocklinks.net', 'tnlink.in', 'ez4short.com', 'xpshort.com', 'open2get.in', 'linkbnao.com', 'techymozo.com', 'bitshorten.com', 'za.uy']
  },
  {
    category: 'redirect',
    title: 'Redirect-Follow Shorteners',
    titleHindi: 'रीडायरेक्ट-फॉलो शॉर्टनर्स (1,240)',
    count: 1240,
    badgeColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
    iconName: 'Compass',
    description: '1,240 verified standard URL shortener domains followed directly via HTTP 301/302/307 header location chains using realistic browser User-Agents.',
    examples: ['bit.ly', 'tinyurl.com', 'cutt.ly', 'is.gd', 'v.gd', 'shorte.st', 'rebrand.ly', 't.co', 'ow.ly', 'buff.ly', 'shorturl.at', 'clck.ru']
  },
  {
    category: 'social',
    title: 'Fallback Tracked (Social Locks)',
    titleHindi: 'सोशल गेट / टास्क अनलॉकर्स (31)',
    count: 31,
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    iconName: 'Lock',
    description: 'Sub-to-unlock, Discord joins, and social engagement lock gateways tracked in the repository with diagnostic fallback warnings.',
    examples: ['work.ink', 'rekonise.com', 'lootlabs.com', 'lootlinks.com', 'sub2unlock.com', 'sub4unlock.com', 'social-unlock.com', 'lockr.social', 'shrinkme.io']
  }
];

export const NATIVE_SERVICES: BypassService[] = [
  {
    id: 'aylink',
    domain: 'aylink.co',
    name: 'Aylink / Ay.live',
    category: 'native',
    categoryLabel: 'Specific Native Handler',
    bypassMethod: 'JS Token Flow + CSRF Session Key',
    technicalMechanism: 'Fetches landing page -> extracts _a, _t, _d tokens + CSRF -> POST /get/tk -> POST /links/go2 with fake browser signal -> resolves bildirim.online destination.',
    difficulty: 'Advanced',
    isActive: true,
    sampleUrl: 'https://ay.live/EXAMPLE',
    antiBotTiming: '0s (Token Handshake)',
    codeSnippet: `curl -c cookie.txt -b cookie.txt "https://aylink.co/..."
curl -X POST "https://aylink.co/get/tk" -d "_a=...&_t=..."
curl -X POST "https://aylink.co/links/go2" -d "token=..."`,
    notes: 'Handles aylink.co and ay.live aliases.'
  },
  {
    id: 'cpmlink',
    domain: 'cpmlink.co',
    name: 'CpmLink',
    category: 'native',
    categoryLabel: 'Specific Native Handler',
    bypassMethod: 'Session Token + Multi-Step POST',
    technicalMechanism: 'Replicates aylink token extraction pipeline with custom headers and intermediate domain resolution.',
    difficulty: 'Advanced',
    isActive: true,
    sampleUrl: 'https://cpmlink.co/SAMPLE',
    antiBotTiming: '0s',
    notes: 'Supports cpmlink.co and cpmlink.pro.'
  },
  {
    id: 'linkvertise',
    domain: 'linkvertise.com',
    name: 'Linkvertise & Aliases',
    category: 'native',
    categoryLabel: 'Specific Native Handler',
    bypassMethod: 'Internal GraphQL API Querying',
    technicalMechanism: 'Calls getDetailPageContent to retrieve access token -> completeDetailPageContent to simulate task completions -> getDetailPageTarget to retrieve direct link.',
    difficulty: 'Advanced',
    isActive: true,
    sampleUrl: 'https://linkvertise.com/12345/download',
    antiBotTiming: 'Direct API',
    notes: 'Covers linkvertise.com, link-target.net, link-center.net, link-hub.net, direct-link.net.'
  },
  {
    id: 'adfly',
    domain: 'adf.ly',
    name: 'AdF.ly',
    category: 'native',
    categoryLabel: 'Specific Native Handler',
    bypassMethod: 'XOR Decode (ysmm Algorithm)',
    technicalMechanism: 'Scrapes ysmm JavaScript variable -> splits into even & odd indices -> XOR digit pairs -> decodes Base64 -> strips 16-character noise prefix.',
    difficulty: 'Medium',
    isActive: true,
    sampleUrl: 'https://adf.ly/123456',
    antiBotTiming: 'Instant',
    notes: 'Classic XOR algorithmic bypass without needing browser rendering.'
  },
  {
    id: 'boostink',
    domain: 'boost.ink',
    name: 'Boost.ink & Mboost',
    category: 'native',
    categoryLabel: 'Specific Native Handler',
    bypassMethod: 'Base64 HTML Attribute Extraction',
    technicalMechanism: 'Scrapes page HTML and unpacks base64 encoded URL stored inside kekw attribute / data-url container directly.',
    difficulty: 'Easy',
    isActive: true,
    sampleUrl: 'https://boost.ink/sample',
    antiBotTiming: 'Instant',
    notes: 'Works on boost.ink and mboost.me.'
  },
  {
    id: 'ouo',
    domain: 'ouo.io',
    name: 'Ouo.io / Ouo.press',
    category: 'native',
    categoryLabel: 'Specific Native Handler',
    bypassMethod: 'Cookie Token Scrape & Form POST',
    technicalMechanism: 'Acquires session cookie, extracts hidden _token input and captcha tokens, and simulates next-hop verification.',
    difficulty: 'Medium',
    isActive: true,
    sampleUrl: 'https://ouo.io/SAMPLE',
    antiBotTiming: '1-2s',
    notes: 'Handles ouo.io and ouo.press.'
  },
  {
    id: 'try2link',
    domain: 'try2link.com',
    name: 'Try2Link',
    category: 'native',
    categoryLabel: 'Specific Native Handler',
    bypassMethod: 'Form Bypass with Dynamic Timestamps',
    technicalMechanism: 'Extracts dynamic form parameters, attaches cryptographic timestamp token, and submits to intermediary gateway.',
    difficulty: 'Medium',
    isActive: true,
    sampleUrl: 'https://try2link.com/SAMPLE',
    antiBotTiming: '3s',
  },
  {
    id: 'gplinks',
    domain: 'gplinks.co',
    name: 'GPLinks',
    category: 'native',
    categoryLabel: 'Specific Native Handler',
    bypassMethod: 'Multi-hop Form Extraction + Referer Spoof',
    technicalMechanism: 'Emulates Android mobile User-Agent, handles intermediary verification gate, extracts token payload, and fetches final redirect.',
    difficulty: 'Advanced',
    isActive: true,
    sampleUrl: 'https://gplinks.co/SAMPLE',
    antiBotTiming: '5s',
    notes: 'Supports gplinks.co and gplinks.in.'
  },
  {
    id: 'pkin',
    domain: 'pkin.me',
    name: 'Pkin.me',
    category: 'native',
    categoryLabel: 'Specific Native Handler',
    bypassMethod: 'Mobile User-Agent Form Bypass',
    technicalMechanism: 'Sends custom Android mobile client signature to trigger direct form generation and avoids desktop interstitial ads.',
    difficulty: 'Medium',
    isActive: true,
    sampleUrl: 'https://pkin.me/SAMPLE',
    antiBotTiming: '5s'
  },
  {
    id: 'shareus',
    domain: 'shareus.in',
    name: 'ShareUs',
    category: 'native',
    categoryLabel: 'Specific Native Handler',
    bypassMethod: 'Firebase Cloud Function Endpoint Query',
    technicalMechanism: 'Communicates with the backend Firebase serverless endpoint with the link identifier to extract payload without viewing ads.',
    difficulty: 'Advanced',
    isActive: true,
    sampleUrl: 'https://shareus.in/?shortid=SAMPLE',
    antiBotTiming: 'Direct API'
  },
  {
    id: 'anonymto',
    domain: 'anonym.to',
    name: 'Anonym.to & Anonymz',
    category: 'native',
    categoryLabel: 'Specific Native Handler',
    bypassMethod: 'URL Query / Base64 Param Extraction',
    technicalMechanism: 'Extracts destination directly from query string (e.g., anonym.to/?https://destination.com) or decodes Base64 parameter instantly.',
    difficulty: 'Easy',
    isActive: true,
    sampleUrl: 'https://anonym.to/?https://example.com',
    antiBotTiming: 'Instant'
  },
  {
    id: 'hidereferrer',
    domain: 'hidereferrer.com',
    name: 'HideReferrer & Leechall',
    category: 'native',
    categoryLabel: 'Specific Native Handler',
    bypassMethod: 'Base64 Parameter Decoder',
    technicalMechanism: 'Decodes Base64 encoded target parameter from the query string without executing client scripts.',
    difficulty: 'Easy',
    isActive: true,
    sampleUrl: 'https://hidereferrer.com/?aHR0cHM6Ly9leGFtcGxlLmNvbQ==',
    antiBotTiming: 'Instant'
  }
];

export const FORM_SERVICES: BypassService[] = [
  { id: 'rocklinks', domain: 'rocklinks.net', name: 'RockLinks', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Extracts hidden inputs, sleeps 7s anti-bot delay, POSTs with X-Requested-With header.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'droplink', domain: 'droplink.co', name: 'DropLink', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Spoofs yoshare.net referer, parses form tokens, waits 5s delay, fetches destination URL.', difficulty: 'Medium', isActive: true, antiBotTiming: '5s' },
  { id: 'tnlink', domain: 'tnlink.in', name: 'TNLink', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Extracts form inputs with usanewstoday referrer, waits 7s anti-bot timer.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'ez4short', domain: 'ez4short.com', name: 'EZ4Short', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Techmody referer spoofing with 7s anti-bot delay to receive JSON payload.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'xpshort', domain: 'xpshort.com', name: 'XPShort', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Targeted intermediate landing page form parse with veganho referrer.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'vearnl', domain: 'vearnl.in', name: 'VEarnL', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Urlearn / Modmakers proxy form extraction.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'adrinolinks', domain: 'adrinolinks.in', name: 'AdrinoLinks', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Wikitraveltips referrer with 7s delay.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'techymozo', domain: 'techymozo.com', name: 'TechyMozo', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Automated CSRF form resolution.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'linkbnao', domain: 'linkbnao.com', name: 'LinkBnao', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Doibihar referer with 5s delay.', difficulty: 'Medium', isActive: true, antiBotTiming: '5s' },
  { id: 'linksxyz', domain: 'linksxyz.in', name: 'LinksXYZ', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Cypherroot referrer with 7s anti-bot sleep.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'shortjambo', domain: 'short-jambo.com', name: 'ShortJambo', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Aghtas referer form extraction.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'linkpays', domain: 'linkpays.in', name: 'LinkPays', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Filmypoints referer spoof with 7s timer.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'pilink', domain: 'pi-l.ink', name: 'PiLinks', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Pilinks gateway token extraction with 7s delay.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'open2get', domain: 'open2get.in', name: 'Open2Get', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Ezeviral referer with 5s delay.', difficulty: 'Medium', isActive: true, antiBotTiming: '5s' },
  { id: 'earn4link', domain: 'earn4link.in', name: 'Earn4Link', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Extracts session tokens, posts via XMLHttpRequest.', difficulty: 'Medium', isActive: true, antiBotTiming: '5s' },
  { id: 'mdiskshortner', domain: 'mdiskshortner.link', name: 'MDisk Shortener', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Direct form parse and 7s delay.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'pdiskshortener', domain: 'pdiskshortener.com', name: 'PDisk Shortener', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Direct form parse with session tokens.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'indianshortner', domain: 'indianshortner.in', name: 'IndianShortner', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Parses CSRF form and extracts final URL.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'bitshorten', domain: 'bitshorten.com', name: 'BitShorten', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Standard script token extraction with 7s delay.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'dulink', domain: 'dulink.in', name: 'DuLink', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Tekcrypt 10s delay form bypass.', difficulty: 'Medium', isActive: true, antiBotTiming: '10s' },
  { id: 'zauy', domain: 'za.uy', name: 'Za.uy', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Parses inputs and calls /links/go.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'gtlinks', domain: 'gtlinks.me', name: 'GTLinks', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Standard 7s timer bypass.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'thinfi', domain: 'thinfi.com', name: 'Thinfi', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: 'Form-based password / click-through unlock.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'shortlyxyz', domain: 'shortly.xyz', name: 'Shortly.xyz', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: '7s anti-bot delay bypass.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' },
  { id: 'hypershort', domain: 'hypershort.com', name: 'HyperShort', category: 'form', categoryLabel: 'Form-Based (Type 1)', bypassMethod: 'Form Extract -> POST /links/go', technicalMechanism: '7s anti-bot delay form handler.', difficulty: 'Medium', isActive: true, antiBotTiming: '7s' }
];

export const SOCIAL_SERVICES: BypassService[] = [
  { id: 'workink', domain: 'work.ink', name: 'Work.ink', category: 'social', categoryLabel: 'Fallback Tracked', bypassMethod: 'Social Task Lock Gate', technicalMechanism: 'Browser task completion required (Sub, Click, Extension). Tracked for warning.', difficulty: 'Social Lock', isActive: true },
  { id: 'rekonise', domain: 'rekonise.com', name: 'Rekonise', category: 'social', categoryLabel: 'Fallback Tracked', bypassMethod: 'Social Task Lock Gate', technicalMechanism: 'Requires YouTube subscribe or Spotify follow verification in browser.', difficulty: 'Social Lock', isActive: true },
  { id: 'lootlabs', domain: 'lootlabs.com', name: 'LootLabs', category: 'social', categoryLabel: 'Fallback Tracked', bypassMethod: 'Ad & Task Gateway', technicalMechanism: 'Monetized multi-task gateway tracked as fallback.', difficulty: 'Social Lock', isActive: true },
  { id: 'sub2unlock', domain: 'sub2unlock.com', name: 'Sub2Unlock', category: 'social', categoryLabel: 'Fallback Tracked', bypassMethod: 'YouTube Subscription Lock', technicalMechanism: 'Detects channel subscription callbacks.', difficulty: 'Social Lock', isActive: true },
  { id: 'lockrsocial', domain: 'lockr.social', name: 'Lockr.Social', category: 'social', categoryLabel: 'Fallback Tracked', bypassMethod: 'Social Task Gate', technicalMechanism: 'Social action verification gate.', difficulty: 'Social Lock', isActive: true },
  { id: 'shrinkme', domain: 'shrinkme.io', name: 'ShrinkMe.io', category: 'social', categoryLabel: 'Fallback Tracked', bypassMethod: 'Heavy Captcha Ad Gate', technicalMechanism: 'Requires Cloudflare Turnstile / hCaptcha solver.', difficulty: 'Social Lock', isActive: true }
];

export const REDIRECT_SAMPLE_SERVICES: BypassService[] = [
  { id: 'bitly', domain: 'bit.ly', name: 'Bit.ly', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Follows HTTP Location header chain directly.', difficulty: 'Easy', isActive: true },
  { id: 'tinyurl', domain: 'tinyurl.com', name: 'TinyURL', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Direct 301 redirect chain follower.', difficulty: 'Easy', isActive: true },
  { id: 'cuttly', domain: 'cutt.ly', name: 'Cutt.ly', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Header redirect resolution.', difficulty: 'Easy', isActive: true },
  { id: 'isgd', domain: 'is.gd', name: 'Is.gd', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Follows 301 permanent redirect.', difficulty: 'Easy', isActive: true },
  { id: 'vgd', domain: 'v.gd', name: 'V.gd', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Standard URL shortener redirect.', difficulty: 'Easy', isActive: true },
  { id: 'shortest', domain: 'shorte.st', name: 'Shorte.st', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Header redirect follow with User-Agent.', difficulty: 'Easy', isActive: true },
  { id: 'tco', domain: 't.co', name: 'Twitter / X Shortener (t.co)', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Twitter redirect link unwrapper.', difficulty: 'Easy', isActive: true },
  { id: 'rebrandly', domain: 'rebrand.ly', name: 'Rebrandly', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Branded short link redirect chain.', difficulty: 'Easy', isActive: true },
  { id: 'clckru', domain: 'clck.ru', name: 'Clck.ru', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Yandex Click shortener resolver.', difficulty: 'Easy', isActive: true },
  { id: 'shorturlat', domain: 'shorturl.at', name: 'ShortURL.at', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Follows HTTP Location header.', difficulty: 'Easy', isActive: true },
  { id: '0x0st', domain: '0x0.st', name: '0x0.st', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Null pointer redirect tracker.', difficulty: 'Easy', isActive: true },
  { id: 'tinycc', domain: 'tiny.cc', name: 'Tiny.cc', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Standard shortlink redirect chain.', difficulty: 'Easy', isActive: true },
  { id: 'festyy', domain: 'festyy.com', name: 'Festyy / Gestyy', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Intermediary location header follow.', difficulty: 'Easy', isActive: true },
  { id: 'pagelink', domain: 'page.link', name: 'Firebase Dynamic Links (page.link)', category: 'redirect', categoryLabel: 'Redirect-Follow (1,240 Total)', bypassMethod: 'HTTP 301/302 Follow', technicalMechanism: 'Google Firebase dynamic deep link redirect.', difficulty: 'Easy', isActive: true }
];

export const ALL_SERVICES: BypassService[] = [
  ...NATIVE_SERVICES,
  ...FORM_SERVICES,
  ...SOCIAL_SERVICES,
  ...REDIRECT_SAMPLE_SERVICES
];
