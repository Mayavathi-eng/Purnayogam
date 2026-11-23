import React from 'react';
import { ChevronRight, Home, Moon, Search, Sun, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { speakBilingual, stopSpeaking } from '../lib/audioEngine';

export const PageUtilityBar: React.FC<{
  breadcrumb: string;
  breadcrumbTa?: string;
  readAloudText?: string;
}> = ({ breadcrumb, breadcrumbTa, readAloudText }) => {
  const { navigate, lang, toggleLang, theme, toggleTheme, setSearchOpen, showToast } = useApp();

  const handleReadAloud = () => {
    if (!readAloudText) return;
    const ok = speakBilingual(readAloudText, lang, 0.95);
    if (!ok) {
      showToast('Speech synthesis is unavailable in this browser.');
    } else {
      showToast(lang === 'ta' ? 'ஒலி வாசிப்பு தொடங்கியது' : 'Reading aloud...');
    }
  };

  return (
    <div className="border-b border-[#DFCAA2]/60 dark:border-[#2A4163] bg-[#F6ECD8]/50 dark:bg-[#15243A]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <nav className="flex items-center gap-1.5 text-[#5C4F42] dark:text-[#CBBBA0]" aria-label="Breadcrumb">
          <button
            onClick={() => navigate('home')}
            className="inline-flex items-center gap-1 hover:text-[#641E24] dark:hover:text-[#FBF4E4] cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'முகப்பு' : 'Home'}</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="font-medium text-[#1F1914] dark:text-[#FBF4E4]">
            {lang === 'ta' && breadcrumbTa ? breadcrumbTa : breadcrumb}
          </span>
        </nav>

        <div className="flex items-center gap-2">
          {readAloudText && (
            <button
              onClick={handleReadAloud}
              onDoubleClick={() => stopSpeaking()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-[#1F1914] dark:text-[#FBF4E4] hover:border-[#C6A15B] cursor-pointer whitespace-nowrap"
              title="Click to read aloud, double-click to stop"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#641E24] dark:text-[#C6A15B]" />
              <span>{lang === 'ta' ? 'வாசிக்க' : 'Read Aloud'}</span>
            </button>
          )}
          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-[#1F1914] dark:text-[#FBF4E4] hover:border-[#C6A15B] cursor-pointer whitespace-nowrap"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'ta' ? 'தேடல்' : 'Search'}</span>
          </button>
          <button
            onClick={toggleLang}
            className="px-2.5 py-1 rounded-md border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-[#641E24] dark:text-[#D4B16E] font-semibold hover:border-[#C6A15B] cursor-pointer whitespace-nowrap"
          >
            {lang === 'en' ? 'தமிழ்' : 'English'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-[#1F1914] dark:text-[#FBF4E4] hover:border-[#C6A15B] cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
