import React from 'react';
import { ExternalLink, Terminal, ShieldCheck } from 'lucide-react';
import { REPO_STATS } from '../data/servicesData';

interface HeaderProps {
  lang: 'hi' | 'en';
  setLang: (lang: 'hi' | 'en') => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            <span className="text-white">🔗</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                ShortLink Bypass Analyzer
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" /> 1,337 Services
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Analysis for <code className="text-zinc-700 dark:text-zinc-300 font-mono text-[11px]">KaramelliS/shortlink-bypass</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs">
            <button
              onClick={() => setLang('hi')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                lang === 'hi'
                  ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              हिंदी / Hinglish
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                lang === 'en'
                  ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              English
            </button>
          </div>

          <a
            href={REPO_STATS.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub Repo</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>
      </div>
    </header>
  );
};
