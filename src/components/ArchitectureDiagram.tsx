import React from 'react';
import { Layers, ArrowDown, Cpu, Terminal, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ArchitectureDiagramProps {
  lang: 'hi' | 'en';
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ lang }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const codeExamples = [
    {
      title: lang === 'hi' ? '1. Pip द्वारा इंस्टॉल और चलाना' : '1. Run via Pip package',
      code: `pip install shortlink-bypass\n\n# Single URL bypass\nshortlink-bypass https://ay.live/EXAMPLE\n\n# Batch mode\nshortlink-bypass --batch links.txt`,
    },
    {
      title: lang === 'hi' ? '2. Python लाइब्रेरी के रूप में उपयोग' : '2. Use as Python library',
      code: `from shortlink_bypass import bypass\n\n# Direct function call\nfinal_url = bypass("https://ay.live/EXAMPLE")\nprint("Target URL:", final_url)\n\n# Multiple links\nurls = ["https://ay.live/A", "https://bit.ly/B"]\nresults = [bypass(u) for u in urls]`,
    },
    {
      title: lang === 'hi' ? '3. One-Liner Curl निष्पादन' : '3. Standalone Curl executable',
      code: `curl -sL https://raw.githubusercontent.com/KaramelliS/shortlink-bypass/master/bypass.py > shortlink-bypass\nchmod +x shortlink-bypass\n./shortlink-bypass https://boost.ink/sample`,
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs">
      <div className="flex items-center gap-2 mb-4">
        <span className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
          <Layers className="w-4 h-4" />
        </span>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {lang === 'hi' ? 'बायपास लेयर्ड आर्किटेक्चर (How It Works)' : 'Layered Bypass Architecture Pipeline'}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {lang === 'hi'
              ? 'KaramelliS/shortlink-bypass में लिंक कैसे प्रोसेस होता है'
              : 'How URLs route through specific algorithms down to generic redirect chains'}
          </p>
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative my-6">
        {/* Step 1 */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 relative">
          <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            Step 1 • Input URL
          </div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Domain Parsing
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {lang === 'hi' ? 'URL का डोमेन और स्लग निकाला जाता है।' : 'URL is sanitized and parsed for domain/host lookup.'}
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20 relative">
          <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            Layer 1 • Native Handler
          </div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            23 Custom Handlers
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {lang === 'hi'
              ? 'XOR ysmm (adf.ly), GraphQL (linkvertise), Base64 (boost.ink), Token Flow (aylink).'
              : 'Custom reverse-engineered algorithms without browser requirements.'}
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/20 relative">
          <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            Layer 2 • Form Solver
          </div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            43 Indian Ad-Shorteners
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {lang === 'hi'
              ? 'form inputs निकालता है, 5-7s स्लीप करता है और /links/go पर POST करता है।'
              : 'Extracts CSRF form inputs, applies anti-bot timer delay, POSTs to /links/go.'}
          </p>
        </div>

        {/* Step 4 */}
        <div className="p-4 rounded-xl border border-violet-500/30 bg-violet-50/30 dark:bg-violet-950/20 relative">
          <div className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-1">
            Layer 3 • Redirect Chain
          </div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            1,240 Standard Shorteners
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {lang === 'hi'
              ? 'HTTP 301/302 रीडायरेक्ट हेडर को फॉलो करके अंतिम लिंक प्राप्त करता है।'
              : 'Follows HTTP 301/302 location headers with browser User-Agent headers.'}
          </p>
        </div>
      </div>

      {/* Code Snippets for Running the Repo */}
      <div className="mt-6 pt-5 border-t border-zinc-200/80 dark:border-zinc-800">
        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5" />
          {lang === 'hi' ? 'रिपॉजिटरी को चलाने के कमांड्स (Usage Commands)' : 'Repository Usage Guide'}
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {codeExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-zinc-950 text-zinc-200 border border-zinc-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-300">{ex.title}</span>
                  <button
                    onClick={() => copyCode(ex.code, idx)}
                    className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    title="Copy code"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-zinc-300 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                  {ex.code}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
