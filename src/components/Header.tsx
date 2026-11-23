import React, { useState } from 'react';
import {
  Award,
  BookMarked,
  BookOpen,
  Compass,
  FileText,
  Headphones,
  HelpCircle,
  LayoutDashboard,
  Library,
  MapPin,
  Menu,
  Moon,
  Network,
  PenTool,
  Search,
  Sparkles,
  Sun,
  UserCheck,
  X,
} from 'lucide-react';
import { RouteKey, useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    route,
    navigate,
    lang,
    toggleLang,
    theme,
    toggleTheme,
    fontScale,
    setFontScale,
    reducedMotion,
    setReducedMotion,
    setSearchOpen,
    user,
    isStaff,
    signInWithGoogle,
    signOutUser,
  } = useApp();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems: { key: RouteKey; labelEn: string; labelTa: string }[] = [
    { key: 'thirukkural', labelEn: 'Thirukkural', labelTa: 'திருக்குறள்' },
    { key: 'vedanta', labelEn: 'Vedanta', labelTa: 'வேதாந்தம்' },
    { key: 'books', labelEn: 'Library', labelTa: 'நூலகம்' },
    { key: 'practice', labelEn: 'Practice', labelTa: 'பயிற்சி' },
    { key: 'meditation', labelEn: 'Meditation', labelTa: 'தியானம்' },
  ];

  const directoryGroups: {
    heading: string;
    headingTa: string;
    items: { key: RouteKey; en: string; ta: string; icon: React.ReactNode }[];
  }[] = [
    {
      heading: 'Scripture & Teaching',
      headingTa: 'நூல்கள் & பாடங்கள்',
      items: [
        { key: 'thirukkural', en: 'Thirukkural (1,080)', ta: 'திருக்குறள் (1,080)', icon: <BookOpen className="w-4 h-4" /> },
        { key: 'vedanta', en: "Swamiji's Vedanta", ta: 'வேதாந்தக் கல்வி', icon: <Compass className="w-4 h-4" /> },
        { key: 'wisdom-library', en: 'Wisdom Library', ta: 'ஞானக் களஞ்சியம்', icon: <Library className="w-4 h-4" /> },
        { key: 'wisdom-maps', en: 'Wisdom Maps', ta: 'ஞான வரைபடங்கள்', icon: <Network className="w-4 h-4" /> },
      ],
    },
    {
      heading: 'Media & Literature',
      headingTa: 'ஒலி, நூலகம் & கட்டுரைகள்',
      items: [
        { key: 'audio', en: 'Spiritual Audio', ta: 'ஒலிக் களஞ்சியம்', icon: <Headphones className="w-4 h-4" /> },
        { key: 'books', en: 'Free Digital Books', ta: 'டிஜிட்டல் நூலகம்', icon: <BookMarked className="w-4 h-4" /> },
        { key: 'articles', en: 'Articles', ta: 'கட்டுரைகள்', icon: <FileText className="w-4 h-4" /> },
        { key: 'places', en: 'Spiritual Places', ta: 'ஆன்மிகத் தலங்கள்', icon: <MapPin className="w-4 h-4" /> },
      ],
    },
    {
      heading: 'Practice & Mastery',
      headingTa: 'பயிற்சி, தேர்வு & குறிப்பேடு',
      items: [
        { key: 'practice', en: 'Daily Practice', ta: 'தினசரிப் பயிற்சி', icon: <Sun className="w-4 h-4" /> },
        { key: 'meditation', en: 'Meditation Centre', ta: 'தியான மையம்', icon: <Sparkles className="w-4 h-4" /> },
        { key: 'activities', en: 'Learning Activities', ta: 'செயல்பாடுகள்', icon: <PenTool className="w-4 h-4" /> },
        { key: 'quizzes', en: 'Quiz Assessment', ta: 'அறிவுத் தேர்வு', icon: <HelpCircle className="w-4 h-4" /> },
      ],
    },
    {
      heading: 'Personal & Governance',
      headingTa: 'சான்றிதழ் & நிர்வாகம்',
      items: [
        { key: 'certificates', en: 'Free Certificates', ta: 'இலவச சான்றிதழ்', icon: <Award className="w-4 h-4" /> },
        { key: 'journal', en: 'Wisdom Journal', ta: 'ஞானக் குறிப்பேடு', icon: <BookMarked className="w-4 h-4" /> },
        { key: 'search', en: 'Global Search', ta: 'முழுத் தேடல்', icon: <Search className="w-4 h-4" /> },
        ...(isStaff
          ? [{ key: 'admin' as RouteKey, en: 'Admin CMS', ta: 'நிர்வாகம் (CMS)', icon: <LayoutDashboard className="w-4 h-4" /> }]
          : []),
      ],
    },
  ];

  const handleGo = (key: RouteKey) => {
    setDrawerOpen(false);
    navigate(key);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED]/95 dark:bg-[#0F1A2B]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Wordmark */}
          <button
            onClick={() => navigate('home')}
            className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#641E24] dark:text-[#D4B16E] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6A15B]"
          >
            {lang === 'ta' ? 'பூர்ண யோகம்' : 'PURNA YOGAM'}
          </button>

          {/* Zone 2: 5 concise single-line text nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5C4F42] dark:text-[#CBBBA0]" aria-label="Main navigation">
            {navItems.map((item) => {
              const active = route === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => navigate(item.key)}
                  className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                    active
                      ? 'border-[#641E24] dark:border-[#C6A15B] text-[#641E24] dark:text-[#FBF4E4]'
                      : 'border-transparent hover:text-[#1F1914] dark:hover:text-[#FBF4E4] hover:border-[#C6A15B]/50'
                  }`}
                >
                  {lang === 'ta' ? item.labelTa : item.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="shrink-0">
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Open Sanctuary Directory and Accessibility Controls"
            >
              <Menu className="w-4 h-4" />
              <span>{lang === 'ta' ? 'பட்டியல்' : 'Explore'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full Sanctuary Directory, Accessibility & Account Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Sanctuary Directory"
        >
          <div className="w-full max-w-md h-full bg-[#FFF9ED] dark:bg-[#0F1A2B] border-l border-[#DFCAA2] dark:border-[#2A4163] overflow-y-auto p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#DFCAA2] dark:border-[#2A4163]">
              <div>
                <p className="font-display text-xl font-bold text-[#641E24] dark:text-[#D4B16E]">
                  PURNA YOGAM · பூர்ண யோகம்
                </p>
                <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                  {lang === 'ta' ? 'கட்டணமில்லா ஆன்மிகக் கல்வித் தளம்' : 'Free Digital Sanctuary · No Paywalls'}
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-[#1F1914] dark:text-[#FBF4E4] hover:bg-[#F6ECD8] dark:hover:bg-[#172B45] cursor-pointer"
                aria-label="Close directory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Search */}
            <button
              onClick={() => {
                setDrawerOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-sm text-[#5C4F42] dark:text-[#CBBBA0] hover:border-[#C6A15B] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#641E24] dark:text-[#C6A15B]" />
                {lang === 'ta' ? 'திருக்குறள், வேதாந்தம் தேடுக...' : 'Search across all 1,080 Kurals & Vedanta...'}
              </span>
              <span className="text-xs font-mono-tabular opacity-75">Ctrl+K</span>
            </button>

            {/* Language, Theme & Accessibility Bar */}
            <div className="p-4 rounded-xl bg-[#F6ECD8]/70 dark:bg-[#172B45] border border-[#DFCAA2] dark:border-[#2A4163] space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#5C4F42] dark:text-[#CBBBA0]">
                  {lang === 'ta' ? 'மொழி / Language' : 'Language / மொழி'}
                </span>
                <div className="flex items-center gap-1 p-1 rounded-lg bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2] dark:border-[#2A4163]">
                  <button
                    onClick={() => lang !== 'en' && toggleLang()}
                    className={`px-3 py-1 text-xs font-medium rounded-md cursor-pointer ${
                      lang === 'en' ? 'bg-[#641E24] text-[#FFF9ED]' : 'text-[#5C4F42] dark:text-[#CBBBA0]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => lang !== 'ta' && toggleLang()}
                    className={`px-3 py-1 text-xs font-medium rounded-md cursor-pointer ${
                      lang === 'ta' ? 'bg-[#641E24] text-[#FFF9ED]' : 'text-[#5C4F42] dark:text-[#CBBBA0]'
                    }`}
                  >
                    தமிழ்
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#5C4F42] dark:text-[#CBBBA0]">
                  {lang === 'ta' ? 'தோற்றம்' : 'Appearance'}
                </span>
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#0F1A2B] text-xs font-medium text-[#1F1914] dark:text-[#FBF4E4] cursor-pointer"
                >
                  {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                  {theme === 'light' ? 'Dark Sanctuary' : 'Warm Ivory'}
                </button>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#5C4F42] dark:text-[#CBBBA0]">
                  {lang === 'ta' ? 'எழுத்து அளவு' : 'Reading Size'}
                </span>
                <div className="flex items-center gap-1">
                  {(['sm', 'md', 'lg'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontScale(sz)}
                      className={`px-2.5 py-1 text-xs rounded-md border cursor-pointer ${
                        fontScale === sz
                          ? 'bg-[#641E24] text-[#FFF9ED] border-[#641E24]'
                          : 'border-[#DFCAA2] dark:border-[#2A4163] text-[#5C4F42] dark:text-[#CBBBA0]'
                      }`}
                    >
                      {sz === 'sm' ? 'A-' : sz === 'md' ? 'A' : 'A+'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#5C4F42] dark:text-[#CBBBA0]">
                  {lang === 'ta' ? 'அசைவுக் குறைப்பு' : 'Reduced Motion'}
                </span>
                <button
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className={`px-3 py-1 text-xs rounded-md border cursor-pointer ${
                    reducedMotion
                      ? 'bg-[#314B3B] text-[#FFF9ED] border-[#314B3B]'
                      : 'border-[#DFCAA2] dark:border-[#2A4163] text-[#5C4F42] dark:text-[#CBBBA0]'
                  }`}
                >
                  {reducedMotion ? 'On' : 'Off'}
                </button>
              </div>
            </div>

            {/* Optional Account Status */}
            <div className="p-4 rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45]">
              {user ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#1F1914] dark:text-[#FBF4E4] truncate flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-[#314B3B] dark:text-[#C6A15B] shrink-0" />
                      {user.displayName || 'Seeker'}
                    </p>
                    <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={signOutUser}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] hover:bg-[#F6ECD8] dark:hover:bg-[#0F1A2B] cursor-pointer whitespace-nowrap"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                    {lang === 'ta'
                      ? 'பொதுக் கல்விப் பகுதிகள் உள்நுழைவின்றி இலவசம். குறிப்பேடு & சான்றிதழுக்கு மட்டும் உள்நுழையவும்.'
                      : 'All public learning is free without sign-in. Optional Google sign-in saves your Wisdom Journal & Certificates.'}
                  </p>
                  <button
                    onClick={signInWithGoogle}
                    className="w-full py-2 px-4 rounded-lg bg-[#172B45] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
                  >
                    {lang === 'ta' ? 'Google மூலம் உள்நுழையவும்' : 'Sign In with Google (Optional)'}
                  </button>
                </div>
              )}
            </div>

            {/* Directory Modules */}
            <div className="space-y-5 pb-8">
              {directoryGroups.map((group) => (
                <div key={group.heading}>
                  <h3 className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] mb-2">
                    {lang === 'ta' ? group.headingTa : group.heading}
                  </h3>
                  <div className="grid grid-cols-1 gap-1.5">
                    {group.items.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleGo(item.key)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                          route === item.key
                            ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                            : 'hover:bg-[#F6ECD8] dark:hover:bg-[#172B45] text-[#1F1914] dark:text-[#FBF4E4]'
                        }`}
                      >
                        {item.icon}
                        <span>{lang === 'ta' ? item.ta : item.en}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
