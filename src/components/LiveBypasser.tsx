import React, { useState } from 'react';
import { 
  Play, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle, 
  Sparkles, 
  Layers, 
  Clock, 
  Download, 
  FileSpreadsheet, 
  FileJson 
} from 'lucide-react';
import { BypassResult } from '../types';
import { exportResultsToCsv, exportResultsToJson } from '../utils/exportUtils';

interface LiveBypasserProps {
  lang: 'hi' | 'en';
  onSelectServiceSample?: (url: string) => void;
  initialUrl?: string;
}

const SAMPLE_TEST_LINKS = [
  { label: '✨ Zero-Day Unknown Domain', url: 'https://unknown-link-gateway.xyz/r?dest=https://google.com' },
  { label: '✨ Unknown Base64 Path', url: 'https://new-shortener-2026.io/go/aHR0cHM6Ly9naXRodWIuY29t' },
  { label: 'anonym.to (Base64 Param)', url: 'https://anonym.to/?https://google.com' },
  { label: 'boost.ink (HTML Extract)', url: 'https://boost.ink/sample-demo' },
  { label: 'bit.ly (301 Redirect)', url: 'https://bit.ly/3xSample' },
  { label: 'tinyurl.com (Redirect)', url: 'https://tinyurl.com/sample' },
  { label: 'gplinks.co (Form Token)', url: 'https://gplinks.co/demo-slug' },
];

export const LiveBypasser: React.FC<LiveBypasserProps> = ({ lang, initialUrl }) => {
  const [inputUrl, setInputUrl] = useState(initialUrl || '');

  React.useEffect(() => {
    if (initialUrl) {
      setInputUrl(initialUrl);
      handleBypass(initialUrl);
    }
  }, [initialUrl]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BypassResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [exportedType, setExportedType] = useState<'csv' | 'json' | null>(null);
  const [activeMode, setActiveMode] = useState<'single' | 'batch'>('single');
  const [batchInput, setBatchInput] = useState('');
  const [batchResults, setBatchResults] = useState<BypassResult[]>([]);
  const [batchLoading, setBatchLoading] = useState(false);

  const handleBypass = async (urlToTest?: string) => {
    const target = urlToTest || inputUrl;
    if (!target.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/bypass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target.trim() })
      });
      const data: BypassResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({
        success: false,
        originalUrl: target,
        error: err.message || 'Failed to connect to backend bypass engine'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBatchBypass = async () => {
    const lines = batchInput.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    setBatchLoading(true);
    setBatchResults([]);

    const results: BypassResult[] = [];
    for (const url of lines) {
      try {
        const res = await fetch('/api/bypass', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });
        const data: BypassResult = await res.json();
        results.push(data);
        setBatchResults([...results]);
      } catch (err: any) {
        results.push({
          success: false,
          originalUrl: url,
          error: err.message || 'Network error'
        });
        setBatchResults([...results]);
      }
    }
    setBatchLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportSingle = (format: 'csv' | 'json') => {
    if (!result) return;
    if (format === 'csv') {
      exportResultsToCsv(result);
    } else {
      exportResultsToJson(result);
    }
    setExportedType(format);
    setTimeout(() => setExportedType(null), 2500);
  };

  const handleExportBatch = (format: 'csv' | 'json') => {
    if (batchResults.length === 0) return;
    if (format === 'csv') {
      exportResultsToCsv(batchResults);
    } else {
      exportResultsToJson(batchResults);
    }
    setExportedType(format);
    setTimeout(() => setExportedType(null), 2500);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {lang === 'hi' ? 'लाइव लिंक बायपास टेस्टर (Live Bypass Engine)' : 'Interactive Link Bypass Engine'}
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {lang === 'hi'
              ? 'कोई भी शॉर्टलिंक डालकर टेस्ट करें व रिपोर्ट CSV/JSON में एक्सपोर्ट करें'
              : 'Test any shortlink live against our layered algorithmic resolver and export offline reports'}
          </p>
        </div>

        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700 self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveMode('single')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeMode === 'single'
                ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            {lang === 'hi' ? 'सिंगल लिंक' : 'Single URL'}
          </button>
          <button
            onClick={() => setActiveMode('batch')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeMode === 'batch'
                ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            {lang === 'hi' ? 'बैच मोड (Batch Mode)' : 'Batch Resolver'}
          </button>
        </div>
      </div>

      {activeMode === 'single' ? (
        <div>
          {/* Preset Samples */}
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-zinc-400 mr-1">
              {lang === 'hi' ? 'नमूना लिंक:' : 'Sample links:'}
            </span>
            {SAMPLE_TEST_LINKS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputUrl(sample.url);
                  handleBypass(sample.url);
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors font-medium border border-zinc-200 dark:border-zinc-700/60"
              >
                {sample.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleBypass()}
                placeholder={lang === 'hi' ? 'यहाँ शॉर्टलिंक डालें (उदा. https://bit.ly/..., anonym.to/...)' : 'Enter shortlink URL (e.g., https://bit.ly/..., anonym.to/...)'}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => handleBypass()}
              disabled={loading || !inputUrl.trim()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{lang === 'hi' ? 'बायपास हो रहा है...' : 'Bypassing...'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{lang === 'hi' ? 'बायपास करें (Bypass Link)' : 'Bypass Link'}</span>
                </>
              )}
            </button>
          </div>

          {/* Result Card */}
          {result && (
            <div className="mt-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200/80 dark:border-zinc-700/60">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      result.success
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {result.success
                      ? lang === 'hi' ? '✓ बायपास सफल (Success)' : '✓ Bypass Success'
                      : lang === 'hi' ? '✕ विफलता (Error)' : '✕ Failed'}
                  </span>
                  {result.isAutonomous && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 animate-pulse">
                      <Sparkles className="w-3 h-3" />
                      {lang === 'hi' ? '✨ ऑटो-डिटेक्टेड अननोन डोमेन (Zero-Day)' : '✨ Autonomous Auto-Bypass'}
                    </span>
                  )}
                  {result.method && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      {result.method}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {result.timeMs !== undefined && (
                    <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 mr-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{result.timeMs}ms</span>
                    </div>
                  )}

                  {/* Export Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleExportSingle('csv')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 transition-colors shadow-2xs"
                      title="Export analysis to CSV"
                    >
                      {exportedType === 'csv' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      )}
                      <span>CSV</span>
                    </button>

                    <button
                      onClick={() => handleExportSingle('json')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 transition-colors shadow-2xs"
                      title="Export analysis to JSON"
                    >
                      {exportedType === 'json' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <FileJson className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      )}
                      <span>JSON</span>
                    </button>
                  </div>
                </div>
              </div>

              {result.success && result.destinationUrl ? (
                <div className="mt-3 space-y-2.5">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-400">
                      {lang === 'hi' ? 'अंतिम वास्तविक URL (Destination Link)' : 'Destination URL'}
                    </label>
                    <div className="mt-1 flex items-center gap-2 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                      <a
                        href={result.destinationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-blue-600 dark:text-blue-400 hover:underline break-all flex-1"
                      >
                        {result.destinationUrl}
                      </a>
                      <button
                        onClick={() => copyToClipboard(result.destinationUrl!)}
                        className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <a
                        href={result.destinationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {result.hops && result.hops.length > 0 && (
                    <div>
                      <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        {lang === 'hi' ? 'रीडायरेक्ट स्टेप्स (Hops Trace):' : 'Redirect Chain (Hops):'}
                      </span>
                      <div className="mt-1.5 space-y-1">
                        {result.hops.map((hop, idx) => (
                          <div
                            key={idx}
                            className="text-xs font-mono bg-white/70 dark:bg-zinc-900/60 px-2.5 py-1.5 rounded-md border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between gap-2"
                          >
                            <span className="truncate text-zinc-700 dark:text-zinc-300">
                              <span className="text-zinc-400 mr-2">#{idx + 1}</span>
                              {hop.url}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-zinc-400 shrink-0">
                              {hop.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-3 flex items-start gap-2 text-rose-600 dark:text-rose-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    {result.error ||
                      (lang === 'hi'
                        ? 'इस लिंक को हल नहीं किया जा सका। कृपया URL की जांच करें।'
                        : 'Could not resolve URL. Please check formatting.')}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
            {lang === 'hi'
              ? 'प्रति पंक्ति एक URL डालें (Batch processing like python3 bypass.py --batch file.txt)'
              : 'Paste multiple URLs (one per line) to resolve simultaneously:'}
          </div>
          <textarea
            rows={4}
            value={batchInput}
            onChange={(e) => setBatchInput(e.target.value)}
            placeholder={"https://anonym.to/?https://example.com\nhttps://bit.ly/demo\nhttps://tinyurl.com/demo"}
            className="w-full p-3 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-mono text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30"
          />

          <div className="mt-2 flex justify-end">
            <button
              onClick={handleBatchBypass}
              disabled={batchLoading || !batchInput.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
            >
              {batchLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{lang === 'hi' ? 'बैच प्रोसेस हो रहा है...' : 'Processing Batch...'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{lang === 'hi' ? 'सभी लिंक्स बायपास करें' : 'Process All URLs'}</span>
                </>
              )}
            </button>
          </div>

          {batchResults.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  {lang === 'hi' ? `परिणाम (${batchResults.length})` : `Batch Results (${batchResults.length})`}
                </h4>
                
                {/* Batch Export Options */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-zinc-400 mr-1 flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    {lang === 'hi' ? 'एक्सपोर्ट:' : 'Export:'}
                  </span>
                  <button
                    onClick={() => handleExportBatch('csv')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors shadow-2xs"
                    title="Export batch results to CSV"
                  >
                    {exportedType === 'csv' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    )}
                    <span>CSV</span>
                  </button>
                  <button
                    onClick={() => handleExportBatch('json')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors shadow-2xs"
                    title="Export batch results to JSON"
                  >
                    {exportedType === 'json' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <FileJson className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    )}
                    <span>JSON</span>
                  </button>
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
                {batchResults.map((res, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono flex flex-col gap-1"
                  >
                    <div className="text-zinc-400 truncate">
                      <span className="font-semibold text-zinc-500">IN: </span>{res.originalUrl}
                    </div>
                    {res.success && res.destinationUrl ? (
                      <div className="text-emerald-600 dark:text-emerald-400 font-medium truncate flex items-center justify-between">
                        <span className="truncate"><span className="font-semibold text-emerald-700 dark:text-emerald-300">OUT: </span>{res.destinationUrl}</span>
                        <a href={res.destinationUrl} target="_blank" rel="noopener noreferrer" className="ml-2 underline text-blue-500 text-[11px]">Open</a>
                      </div>
                    ) : (
                      <div className="text-rose-500 text-[11px]">
                        FAIL: {res.error || 'Unknown error'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
