import React, { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Compass, FileText, Headphones, MapPin, Search, X } from 'lucide-react';
import { RouteKey, useApp } from '../context/AppContext';
import { searchKurals } from '../data/thirukkural';
import { VEDANTA_LESSONS, WISDOM_TOPICS } from '../data/vedanta';
import { AUDIO_TRACKS, DIGITAL_BOOKS, WISDOM_MAPS } from '../data/libraryAndMaps';
import { ARTICLES, SPIRITUAL_PLACES } from '../data/communityAndPlaces';

interface SearchResult {
  type: 'kural' | 'lesson' | 'wisdom' | 'audio' | 'book' | 'map' | 'article' | 'place';
  label: string;
  title: string;
  subtitle: string;
  route: RouteKey;
  param?: string;
}

export const GlobalSearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, navigate, lang } = useApp();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [recentQueries, setRecentQueries] = useState<string[]>(['34', 'மெய்ப்பொருள்', 'Karma Yoga', 'Arunachala']);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    const list: SearchResult[] = [];

    if (!q) {
      // Quick suggested highlights
      searchKurals('1').slice(0, 2).forEach((k) =>
        list.push({
          type: 'kural',
          label: `Kural ${k.number}`,
          title: `${k.tamilLine1} ${k.tamilLine2}`,
          subtitle: k.englishTranslation,
          route: 'thirukkural',
          param: String(k.number),
        })
      );
      VEDANTA_LESSONS.slice(0, 2).forEach((l) =>
        list.push({
          type: 'lesson',
          label: 'Vedanta Lesson',
          title: lang === 'ta' ? l.titleTa : l.title,
          subtitle: l.chapter,
          route: 'vedanta',
          param: l.id,
        })
      );
      return list;
    }

    if (filter === 'all' || filter === 'kural') {
      searchKurals(q)
        .slice(0, 8)
        .forEach((k) => {
          list.push({
            type: 'kural',
            label: `Thirukkural ${k.number}`,
            title: `${k.tamilLine1} ${k.tamilLine2}`,
            subtitle: k.englishTranslation,
            route: 'thirukkural',
            param: String(k.number),
          });
        });
    }

    if (filter === 'all' || filter === 'lesson') {
      VEDANTA_LESSONS.filter((l) =>
        [l.title, l.titleTa, l.summary, l.summaryTa, l.chapter].join(' ').toLowerCase().includes(q)
      ).forEach((l) => {
        list.push({
          type: 'lesson',
          label: 'Vedanta',
          title: lang === 'ta' ? l.titleTa : l.title,
          subtitle: l.summary,
          route: 'vedanta',
          param: l.id,
        });
      });
    }

    if (filter === 'all' || filter === 'wisdom') {
      WISDOM_TOPICS.filter((w) =>
        [w.english, w.tamil, w.intro, w.introTa].join(' ').toLowerCase().includes(q)
      ).forEach((w) => {
        list.push({
          type: 'wisdom',
          label: 'Wisdom Library',
          title: `${w.tamil} · ${w.english}`,
          subtitle: w.intro,
          route: 'wisdom-library',
          param: w.id,
        });
      });
    }

    if (filter === 'all' || filter === 'audio') {
      AUDIO_TRACKS.filter((a) =>
        [a.title, a.titleTa, a.category, a.speaker].join(' ').toLowerCase().includes(q)
      ).forEach((a) => {
        list.push({
          type: 'audio',
          label: 'Audio',
          title: lang === 'ta' ? a.titleTa : a.title,
          subtitle: a.category,
          route: 'audio',
          param: a.id,
        });
      });
    }

    if (filter === 'all' || filter === 'book') {
      DIGITAL_BOOKS.filter((b) =>
        [b.title, b.titleTa, b.author, b.description].join(' ').toLowerCase().includes(q)
      ).forEach((b) => {
        list.push({
          type: 'book',
          label: 'Digital Book',
          title: lang === 'ta' ? b.titleTa : b.title,
          subtitle: b.author,
          route: 'books',
          param: b.id,
        });
      });
    }

    if (filter === 'all' || filter === 'article') {
      ARTICLES.filter((a) =>
        [a.title, a.titleTa, a.excerpt, a.category].join(' ').toLowerCase().includes(q)
      ).forEach((a) => {
        list.push({
          type: 'article',
          label: 'Article',
          title: lang === 'ta' ? a.titleTa : a.title,
          subtitle: a.excerpt,
          route: 'articles',
          param: a.id,
        });
      });
    }

    if (filter === 'all' || filter === 'map') {
      WISDOM_MAPS.filter((m) =>
        [m.title, m.titleTa, m.subtitle].join(' ').toLowerCase().includes(q)
      ).forEach((m) => {
        list.push({
          type: 'map',
          label: 'Wisdom Map',
          title: lang === 'ta' ? m.titleTa : m.title,
          subtitle: m.subtitle,
          route: 'wisdom-maps',
          param: m.id,
        });
      });
    }

    if (filter === 'all' || filter === 'place') {
      SPIRITUAL_PLACES.filter((p) =>
        [p.name, p.nameTa, p.state, p.district].join(' ').toLowerCase().includes(q)
      ).forEach((p) => {
        list.push({
          type: 'place',
          label: 'Spiritual Place',
          title: lang === 'ta' ? p.nameTa : p.name,
          subtitle: `${p.district}, ${p.state}`,
          route: 'places',
          param: p.id,
        });
      });
    }

    return list.slice(0, 20);
  }, [query, filter, lang]);

  if (!searchOpen) return null;

  const selectResult = (r: SearchResult) => {
    if (query.trim() && !recentQueries.includes(query.trim())) {
      setRecentQueries((prev) => [query.trim(), ...prev].slice(0, 5));
    }
    setSearchOpen(false);
    navigate(r.route, r.param || null);
  };

  const iconFor = (t: SearchResult['type']) => {
    switch (t) {
      case 'kural':
        return <BookOpen className="w-4 h-4 text-[#641E24] dark:text-[#C6A15B]" />;
      case 'audio':
        return <Headphones className="w-4 h-4 text-[#314B3B] dark:text-[#C6A15B]" />;
      case 'place':
        return <MapPin className="w-4 h-4 text-[#D9822B]" />;
      case 'article':
        return <FileText className="w-4 h-4 text-[#172B45] dark:text-[#C6A15B]" />;
      default:
        return <Compass className="w-4 h-4 text-[#641E24] dark:text-[#C6A15B]" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Global Sanctuary Search"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#DFCAA2] dark:border-[#2A4163]">
          <Search className="w-5 h-5 text-[#641E24] dark:text-[#C6A15B]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'ta'
                ? 'குறள் எண், தமிழ் சொற்கள், வேதாந்தம், நூல்கள் தேடுக...'
                : 'Search Kurals (1–1080), Tamil words, Vedanta, Books, Places...'
            }
            className="flex-1 bg-transparent text-sm sm:text-base text-[#1F1914] dark:text-[#FBF4E4] placeholder:text-[#5C4F42]/60 dark:placeholder:text-[#CBBBA0]/60 focus:outline-none"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1.5 rounded-lg text-[#5C4F42] dark:text-[#CBBBA0] hover:bg-[#F6ECD8] dark:hover:bg-[#0F1A2B] cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-1.5 px-5 py-2.5 overflow-x-auto border-b border-[#DFCAA2]/60 dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B]">
          {[
            ['all', 'All'],
            ['kural', 'Thirukkural'],
            ['lesson', 'Vedanta'],
            ['wisdom', 'Wisdom'],
            ['audio', 'Audio'],
            ['book', 'Books'],
            ['article', 'Articles'],
            ['map', 'Maps'],
            ['place', 'Places'],
          ].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 cursor-pointer ${
                filter === k
                  ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                  : 'text-[#5C4F42] dark:text-[#CBBBA0] hover:bg-[#F6ECD8] dark:hover:bg-[#172B45]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Suggestions */}
        {!query.trim() && (
          <div className="px-5 pt-3 pb-1 flex flex-wrap items-center gap-2 text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
            <span>Suggestions:</span>
            {recentQueries.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="underline decoration-[#C6A15B] hover:text-[#641E24] dark:hover:text-[#FBF4E4] cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="max-h-96 overflow-y-auto divide-y divide-[#DFCAA2]/40 dark:divide-[#2A4163]">
          {results.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
              No matching records found for “{query}”. Try Kural number 1–1080 or terms like “அறம்”, “Gita”, or “Upanishad”.
            </div>
          ) : (
            results.map((r, idx) => (
              <button
                key={`${r.type}-${idx}-${r.title}`}
                onClick={() => selectResult(r)}
                className="w-full px-5 py-3.5 flex items-start gap-3 text-left hover:bg-[#F6ECD8]/70 dark:hover:bg-[#0F1A2B]/60 transition-colors cursor-pointer"
              >
                <div className="mt-1 shrink-0">{iconFor(r.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] mb-0.5">{r.label}</div>
                  <div className="text-sm font-semibold text-[#1F1914] dark:text-[#FBF4E4] line-clamp-1">{r.title}</div>
                  <div className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] line-clamp-1">{r.subtitle}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#C6A15B] mt-2 shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
