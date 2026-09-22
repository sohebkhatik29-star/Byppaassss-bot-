import React, { useState } from 'react';
import { Header } from './components/Header';
import { DirectAnswerBanner } from './components/DirectAnswerBanner';
import { LiveBypasser } from './components/LiveBypasser';
import { DomainExtender } from './components/DomainExtender';
import { RepoExportViewer } from './components/RepoExportViewer';
import { ServiceExplorer } from './components/ServiceExplorer';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { ServiceCategory } from './types';
import { REPO_STATS } from './data/servicesData';
import { Github, ExternalLink, Terminal, Shield, CheckCircle } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [testUrlTarget, setTestUrlTarget] = useState<string>('');

  const handleTestUrl = (url: string) => {
    setTestUrlTarget(url);
    // Scroll smoothly to the live bypasser
    const bypasserEl = document.getElementById('live-bypasser-section');
    if (bypasserEl) {
      bypasserEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Navigation */}
      <Header lang={lang} setLang={setLang} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Direct Answer & Categorization */}
        <section id="direct-answer-section">
          <DirectAnswerBanner
            lang={lang}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </section>

        {/* Telegram Bot & Repo Integration Package */}
        <section id="repo-export-section">
          <RepoExportViewer lang={lang} />
        </section>

        {/* Live Bypass Engine & Batch Tester */}
        <section id="live-bypasser-section">
          <LiveBypasser
            lang={lang}
            initialUrl={testUrlTarget}
            onSelectServiceSample={handleTestUrl}
          />
        </section>

        {/* Dynamic Domain Extender & Universal Extender */}
        <section id="domain-extender-section">
          <DomainExtender lang={lang} onTestDomain={handleTestUrl} />
        </section>

        {/* Complete Database Explorer (1,337 Services) */}
        <section id="database-explorer-section">
          <ServiceExplorer
            lang={lang}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onTestUrl={handleTestUrl}
          />
        </section>

        {/* Architecture & Code Guide */}
        <section id="architecture-section">
          <ArchitectureDiagram lang={lang} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">ShortLink Bypass Analyzer</span>
            <span>•</span>
            <span>Repository: <code className="text-zinc-600 dark:text-zinc-400">KaramelliS/shortlink-bypass</code></span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://pypi.org/project/shortlink-bypass/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>PyPI Package</span>
            </a>
            <a
              href={REPO_STATS.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
