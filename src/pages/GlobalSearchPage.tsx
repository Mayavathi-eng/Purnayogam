import React, { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { RouteKey, useApp } from '../context/AppContext';
import { searchKurals } from '../data/thirukkural';
import { VEDANTA_LESSONS, WISDOM_TOPICS } from '../data/vedanta';
import { AUDIO_TRACKS, DIGITAL_BOOKS, WISDOM_MAPS } from '../data/libraryAndMaps';
import { ARTICLES, SPIRITUAL_PLACES } from '../data/communityAndPlaces';
import { PageUtilityBar } from '../components/PageUtilityBar';

export const GlobalSearchPage: React.FC = () => {
  const { navigate, lang } = useApp();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out: { type: string; title: string; subtitle: string; route: RouteKey; param?: string }[] = [];
    if (!q) return out;

    if (typeFilter === 'all' || typeFilter === 'kural') {
      searchKurals(q)
        .slice(0, 12)
        .forEach((k) =>
          out.push({
            type: 'Thirukkural',
            title: `Kural ${k.number}: ${k.tamilLine1} ${k.tamilLine2}`,
            subtitle: k.englishTranslation,
            route: 'thirukkural',
            param: String(k.number),
          })
        );
    }

    if (typeFilter === 'all' || typeFilter === 'vedanta') {
      VEDANTA_LESSONS.filter((l) =>
        [l.title, l.titleTa, l.summary, l.explanation].join(' ').toLowerCase().includes(q)
      ).forEach((l) =>
        out.push({
          type: 'Vedanta Lesson',
          title: lang === 'ta' ? l.titleTa : l.title,
          subtitle: l.summary,
          route: 'vedanta',
          param: l.id,
        })
      );
    }

    if (typeFilter === 'all' || typeFilter === 'wisdom') {
      WISDOM_TOPICS.filter((w) =>
        [w.english, w.tamil, w.intro].join(' ').toLowerCase().includes(q)
      ).forEach((w) =>
        out.push({
          type: 'Wisdom Library',
          title: `${w.tamil} · ${w.english}`,
          subtitle: w.intro,
          route: 'wisdom-library',
          param: w.id,
        })
      );
    }

    if (typeFilter === 'all' || typeFilter === 'articles') {
      ARTICLES.filter((a) => [a.title, a.titleTa, a.excerpt].join(' ').toLowerCase().includes(q)).forEach(
        (a) =>
          out.push({
            type: 'Article',
            title: lang === 'ta' ? a.titleTa : a.title,
            subtitle: a.excerpt,
            route: 'articles',
            param: a.id,
          })
      );
    }

    if (typeFilter === 'all' || typeFilter === 'audio') {
      AUDIO_TRACKS.filter((a) => [a.title, a.titleTa, a.category].join(' ').toLowerCase().includes(q)).forEach(
        (a) =>
          out.push({
            type: 'Audio',
            title: lang === 'ta' ? a.titleTa : a.title,
            subtitle: a.category,
            route: 'audio',
          })
      );
    }

    if (typeFilter === 'all' || typeFilter === 'books') {
      DIGITAL_BOOKS.filter((b) => [b.title, b.titleTa, b.author].join(' ').toLowerCase().includes(q)).forEach(
        (b) =>
          out.push({
            type: 'Digital Book',
            title: lang === 'ta' ? b.titleTa : b.title,
            subtitle: b.author,
            route: 'books',
            param: b.id,
          })
      );
    }

    if (typeFilter === 'all' || typeFilter === 'maps') {
      WISDOM_MAPS.filter((m) => [m.title, m.titleTa, m.subtitle].join(' ').toLowerCase().includes(q)).forEach(
        (m) =>
          out.push({
            type: 'Wisdom Map',
            title: lang === 'ta' ? m.titleTa : m.title,
            subtitle: m.subtitle,
            route: 'wisdom-maps',
            param: m.id,
          })
      );
    }

    if (typeFilter === 'all' || typeFilter === 'places') {
      SPIRITUAL_PLACES.filter((p) => [p.name, p.nameTa, p.district, p.state].join(' ').toLowerCase().includes(q)).forEach(
        (p) =>
          out.push({
            type: 'Spiritual Place',
            title: lang === 'ta' ? p.nameTa : p.name,
            subtitle: `${p.district}, ${p.state}`,
            route: 'places',
            param: p.id,
          })
      );
    }

    return out;
  }, [query, typeFilter, lang]);

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar breadcrumb="Global Search" breadcrumbTa="முழுத் தேடல்" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163]">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
            {lang === 'ta' ? 'முழுத் தளத் தேடல்' : 'Universal Sanctuary Search'}
          </h1>
          <p className="mt-2 text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
            Search Tamil &amp; English records across all 1,080 Kurals, Vedanta classes, Wisdom Library, Audio, Books, Maps, Articles, and Places.
          </p>
        </div>

        <div className="relative">
          <Search className="w-5 h-5 text-[#641E24] dark:text-[#C6A15B] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: 355, வாய்மை, Karma Yoga, Upanishad, Tiruvannamalai..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-base"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            ['all', 'All'],
            ['kural', 'Thirukkural'],
            ['vedanta', 'Vedanta'],
            ['wisdom', 'Wisdom Library'],
            ['articles', 'Articles'],
            ['audio', 'Audio'],
            ['books', 'Books'],
            ['maps', 'Maps'],
            ['places', 'Places'],
          ].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTypeFilter(k)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                typeFilter === k
                  ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                  : 'border border-[#DFCAA2] dark:border-[#2A4163] text-[#5C4F42] dark:text-[#CBBBA0]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {query.trim() && (
          <div className="space-y-3">
            <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
              Found {results.length} results
            </p>
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => navigate(r.route, r.param || null)}
                className="w-full p-4 rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] flex items-center justify-between gap-4 text-left hover:border-[#C6A15B] cursor-pointer"
              >
                <div className="min-w-0">
                  <p className="text-xs text-[#641E24] dark:text-[#D4B16E]">{r.type}</p>
                  <p className="font-semibold text-sm text-[#1F1914] dark:text-[#FBF4E4] truncate">{r.title}</p>
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] truncate">{r.subtitle}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#C6A15B] shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
