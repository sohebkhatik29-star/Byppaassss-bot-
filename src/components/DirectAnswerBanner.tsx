import React from 'react';
import { ShieldCheck, Zap, FileText, Compass, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { CATEGORY_SUMMARIES, REPO_STATS } from '../data/servicesData';
import { ServiceCategory } from '../types';

interface DirectAnswerBannerProps {
  lang: 'hi' | 'en';
  onSelectCategory: (category: ServiceCategory | 'all') => void;
  selectedCategory: ServiceCategory | 'all';
}

export const DirectAnswerBanner: React.FC<DirectAnswerBannerProps> = ({
  lang,
  onSelectCategory,
  selectedCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-emerald-500" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-violet-500" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-amber-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50/50 via-white to-zinc-50/50 dark:from-blue-950/20 dark:via-zinc-900 dark:to-zinc-900/50 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-5 sm:p-7 shadow-xs">
      {/* Direct Headline Answer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-xs mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            {lang === 'hi' ? 'सीधा जवाब (Direct Answer)' : 'Direct Verification Answer'}
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {lang === 'hi' ? (
              <>
                इस कोड में कुल <span className="text-blue-600 dark:text-blue-400 font-black">{REPO_STATS.totalServices} URL Services</span> का बायपास सपोर्ट है!
              </>
            ) : (
              <>
                This repository supports <span className="text-blue-600 dark:text-blue-400 font-black">{REPO_STATS.totalServices} Shortlink Services</span> in total!
              </>
            )}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
            {lang === 'hi' ? (
              <>
                <strong className="text-zinc-900 dark:text-zinc-100">KaramelliS/shortlink-bypass</strong> कोडबेस में <strong>1,306 एक्टिव बायपास करने योग्य लिंक्स</strong> और <strong>31 सोशल लॉक गेटवे</strong> शामिल हैं। यह बिना किसी ब्राउज़र या API की आवश्यकता के सिर्फ <code>curl</code> और Python से काम करता है।
              </>
            ) : (
              <>
                The <strong className="text-zinc-900 dark:text-zinc-100">KaramelliS/shortlink-bypass</strong> codebase includes <strong>1,306 directly bypassable services</strong> and <strong>31 tracked social task locks</strong>. It runs purely using <code>curl</code> + Python with zero external browser dependencies.
              </>
            )}
          </p>
        </div>

        {/* Quick total counter badge */}
        <div className="flex md:flex-col items-center justify-between md:justify-center p-4 bg-white dark:bg-zinc-800/90 rounded-xl border border-blue-200/80 dark:border-zinc-700/80 shadow-xs min-w-[170px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {lang === 'hi' ? 'कुल सेवाएं' : 'Grand Total'}
          </span>
          <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
            {REPO_STATS.totalServices}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            {REPO_STATS.bypassableServices} {lang === 'hi' ? 'बायपास योग्य' : 'Bypassable'}
          </span>
        </div>
      </div>

      {/* 4 Category Breakdown Cards */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {lang === 'hi' ? '4 श्रेणियों में विस्तृत वर्गीकरण (Category Breakdown)' : '4-Tier Architectural Categorization'}
          </h3>
          <button
            onClick={() => onSelectCategory('all')}
            className={`text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'text-blue-600 dark:text-blue-400 font-bold underline'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            {lang === 'hi' ? 'सभी देखें (Show All)' : 'Show All (1,337)'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {CATEGORY_SUMMARIES.map((cat) => {
            const isSelected = selectedCategory === cat.category;
            return (
              <button
                key={cat.category}
                onClick={() => onSelectCategory(isSelected ? 'all' : cat.category)}
                className={`text-left p-4 rounded-xl border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 dark:border-blue-500 bg-white dark:bg-zinc-800 ring-2 ring-blue-500/20 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-700/60">
                      {getIcon(cat.iconName)}
                    </div>
                    <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {cat.count}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {lang === 'hi' ? cat.titleHindi : cat.title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-700/60">
                  <div className="text-[11px] text-zinc-600 dark:text-zinc-400 flex flex-wrap gap-1 items-center">
                    <span className="font-semibold text-zinc-500">{lang === 'hi' ? 'उदा:' : 'Ex:'}</span>
                    {cat.examples.slice(0, 3).map((ex) => (
                      <span
                        key={ex}
                        className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-mono text-[10px]"
                      >
                        {ex}
                      </span>
                    ))}
                    {cat.examples.length > 3 && (
                      <span className="text-zinc-400 text-[10px]">+{cat.examples.length - 3}</span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-blue-600 dark:text-blue-400">
                    <span>{isSelected ? (lang === 'hi' ? 'फ़िल्टर सक्रिय' : 'Filter Active') : (lang === 'hi' ? 'फ़िल्टर करें' : 'Filter List')}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
