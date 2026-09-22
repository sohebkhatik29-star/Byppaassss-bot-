import React, { useState, useMemo } from 'react';
import { Search, Filter, Code2, ExternalLink, ShieldCheck, Zap, FileText, Compass, Lock, Info, Check, Play } from 'lucide-react';
import { ALL_SERVICES } from '../data/servicesData';
import { BypassService, ServiceCategory } from '../types';

interface ServiceExplorerProps {
  lang: 'hi' | 'en';
  selectedCategory: ServiceCategory | 'all';
  onSelectCategory: (cat: ServiceCategory | 'all') => void;
  onTestUrl: (url: string) => void;
}

export const ServiceExplorer: React.FC<ServiceExplorerProps> = ({
  lang,
  selectedCategory,
  onSelectCategory,
  onTestUrl,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<BypassService | null>(null);

  const filteredServices = useMemo(() => {
    return ALL_SERVICES.filter((srv) => {
      const matchesCategory = selectedCategory === 'all' || srv.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        srv.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.bypassMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.technicalMechanism.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryBadge = (cat: ServiceCategory) => {
    switch (cat) {
      case 'native':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Zap className="w-3 h-3" /> Native (23)
          </span>
        );
      case 'form':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <FileText className="w-3 h-3" /> Form-Based (43)
          </span>
        );
      case 'redirect':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
            <Compass className="w-3 h-3" /> Redirect (1,240)
          </span>
        );
      case 'social':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Lock className="w-3 h-3" /> Social Lock (31)
          </span>
        );
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Easy</span>;
      case 'Medium':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/40">Medium</span>;
      case 'Advanced':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/40">Advanced</span>;
      case 'Social Lock':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/40">Social Gate</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            {lang === 'hi' ? 'सभी 1,337 सेवाओं का डेटाबेस एक्सप्लोरर' : 'Complete 1,337 Bypass Services Database'}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            {lang === 'hi'
              ? 'किसी भी डोमेन, विधि या श्रेणी के आधार पर खोजें और उसकी कार्यप्रणाली समझें'
              : 'Search across all domains, algorithmic methods, and architectural handlers'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px] sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'hi' ? 'डोमेन खोजें (उदा. aylink, rocklinks, bit.ly)...' : 'Search domain (e.g. aylink, bit.ly)...'}
            className="w-full pl-9 pr-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none border-b border-zinc-100 dark:border-zinc-800">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
          }`}
        >
          {lang === 'hi' ? 'सभी (All 1,337)' : 'All Services (1,337)'}
        </button>
        <button
          onClick={() => onSelectCategory('native')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === 'native'
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20'
          }`}
        >
          🎯 {lang === 'hi' ? 'कस्टम नेटिव (23)' : 'Native Handlers (23)'}
        </button>
        <button
          onClick={() => onSelectCategory('form')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === 'form'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/20'
          }`}
        >
          📋 {lang === 'hi' ? 'फॉर्म-बेस्ड (43)' : 'Form-Based (43)'}
        </button>
        <button
          onClick={() => onSelectCategory('redirect')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === 'redirect'
              ? 'bg-violet-600 text-white'
              : 'bg-violet-500/10 text-violet-700 dark:text-violet-400 hover:bg-violet-500/20'
          }`}
        >
          🔗 {lang === 'hi' ? 'रीडायरेक्ट (1,240)' : 'Redirect Chain (1,240)'}
        </button>
        <button
          onClick={() => onSelectCategory('social')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === 'social'
              ? 'bg-amber-600 text-white'
              : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20'
          }`}
        >
          🔄 {lang === 'hi' ? 'सोशल गेट (31)' : 'Social Gates (31)'}
        </button>
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
            className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                    {srv.domain}
                  </h4>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {srv.name}
                  </span>
                </div>
                {getDifficultyBadge(srv.difficulty)}
              </div>

              <div className="my-2">{getCategoryBadge(srv.category)}</div>

              <div className="text-xs text-zinc-600 dark:text-zinc-300 space-y-1 mt-2 bg-zinc-50 dark:bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800/60">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-semibold text-zinc-400 text-[10px] uppercase">
                    {lang === 'hi' ? 'विधि:' : 'Method:'}
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-200 text-[11px] font-medium">
                    {srv.bypassMethod}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {srv.technicalMechanism}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedService(srv)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                {lang === 'hi' ? 'विवरण & कोड' : 'Inspect Code'}
              </button>

              {srv.sampleUrl && (
                <button
                  onClick={() => onTestUrl(srv.sampleUrl!)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 text-[11px] font-semibold transition-colors"
                >
                  <Play className="w-3 h-3 fill-current" />
                  {lang === 'hi' ? 'टेस्ट करें' : 'Test URL'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12 text-zinc-400 text-xs">
          {lang === 'hi'
            ? 'कोई सेवा नहीं मिली। कृपया भिन्न खोज शब्द आज़माएं।'
            : 'No matching shortener service found.'}
        </div>
      )}

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                  {selectedService.domain}
                </h4>
                <p className="text-xs text-zinc-500">{selectedService.name}</p>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-400">
                  {lang === 'hi' ? 'श्रेणी' : 'Category'}
                </label>
                <div className="mt-1">{getCategoryBadge(selectedService.category)}</div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-400">
                  {lang === 'hi' ? 'बायपास तकनीक' : 'Bypass Technique'}
                </label>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
                  {selectedService.bypassMethod}
                </p>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-400">
                  {lang === 'hi' ? 'तकनीकी कार्यप्रणाली (Under the Hood)' : 'Technical Mechanism'}
                </label>
                <p className="mt-1 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {selectedService.technicalMechanism}
                </p>
              </div>

              {selectedService.antiBotTiming && (
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400">
                    {lang === 'hi' ? 'एंटी-बॉट स्लीप टाइमर' : 'Anti-Bot Delay'}
                  </label>
                  <p className="text-zinc-700 dark:text-zinc-300 mt-0.5 font-mono">
                    {selectedService.antiBotTiming}
                  </p>
                </div>
              )}

              {selectedService.codeSnippet && (
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400">
                    {lang === 'hi' ? 'curl / कोड लॉजिक' : 'Code Logic / Flow'}
                  </label>
                  <pre className="mt-1 p-3 bg-zinc-950 text-zinc-200 rounded-xl font-mono text-[11px] overflow-x-auto">
                    {selectedService.codeSnippet}
                  </pre>
                </div>
              )}

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
                {selectedService.sampleUrl && (
                  <button
                    onClick={() => {
                      onTestUrl(selectedService.sampleUrl!);
                      setSelectedService(null);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors"
                  >
                    {lang === 'hi' ? 'लाइव टेस्टर में लोड करें' : 'Load in Live Tester'}
                  </button>
                )}
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium"
                >
                  {lang === 'hi' ? 'बंद करें' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
