import React, { useEffect, useMemo, useState } from 'react';
import { Bookmark, Clock, MapPin, Search, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  ARTICLE_CATEGORIES,
  ARTICLES,
  ArticleItem,
  SPIRITUAL_PLACES,
  SpiritualPlace,
} from '../data/communityAndPlaces';
import { PageUtilityBar } from '../components/PageUtilityBar';
import { ResilientImage } from '../components/SacredMotifs';

export const SpiritualPlacesPage: React.FC = () => {
  const { routeParam, lang, toggleBookmark, isBookmarked } = useApp();
  const [stateFilter, setStateFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPlace, setSelectedPlace] = useState<SpiritualPlace>(SPIRITUAL_PLACES[0]);

  useEffect(() => {
    if (routeParam) {
      const found = SPIRITUAL_PLACES.find((p) => p.id === routeParam);
      if (found) setSelectedPlace(found);
    }
  }, [routeParam]);

  const states = useMemo(() => ['all', ...Array.from(new Set(SPIRITUAL_PLACES.map((p) => p.state)))], []);
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(SPIRITUAL_PLACES.map((p) => p.category)))],
    []
  );

  const filtered = useMemo(() => {
    return SPIRITUAL_PLACES.filter((p) => {
      if (stateFilter !== 'all' && p.state !== stateFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      return true;
    });
  }, [stateFilter, categoryFilter]);

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar breadcrumb="Spiritual Places" breadcrumbTa="ஆன்மிகத் தலங்கள்" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163]">
          <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
            ஆன்மிகத் தலங்கள் · VERIFIED HERITAGE &amp; PILGRIMAGE DIRECTORY
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
            {lang === 'ta' ? 'ஆன்மிகத் தலங்கள் & கல்வி மையங்கள்' : 'Spiritual Places & Heritage Centres'}
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            aria-label="Filter by state"
            className="px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-xs font-medium"
          >
            {states.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? 'All States' : s}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
            className="px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-xs font-medium"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Place List */}
          <div className="lg:col-span-5 space-y-3">
            {filtered.map((p) => {
              const active = p.id === selectedPlace.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlace(p)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                    active
                      ? 'border-[#641E24] bg-[#F6ECD8]/80 dark:border-[#C6A15B] dark:bg-[#172B45]'
                      : 'border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45]'
                  }`}
                >
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                    {p.district}, {p.state} · {p.category}
                  </p>
                  <h2 className="font-display text-lg font-bold text-[#1F1914] dark:text-[#FBF4E4] mt-0.5">
                    {lang === 'ta' ? p.nameTa : p.name}
                  </h2>
                </button>
              );
            })}
          </div>

          {/* Selected Place Detail + Coordinate Locator */}
          <main className="lg:col-span-7 rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] overflow-hidden">
            <div className="aspect-[16/9] overflow-hidden">
              <ResilientImage src={selectedPlace.image} alt={selectedPlace.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D9822B]" />
                    {selectedPlace.district}, {selectedPlace.state} ·{' '}
                    <span className="font-mono-tabular">
                      {selectedPlace.coordinates.lat.toFixed(4)}° N, {selectedPlace.coordinates.lng.toFixed(4)}° E
                    </span>
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F1914] dark:text-[#FBF4E4] mt-1">
                    {lang === 'ta' ? selectedPlace.nameTa : selectedPlace.name}
                  </h2>
                </div>

                <button
                  onClick={() =>
                    toggleBookmark({
                      itemType: 'place',
                      itemId: selectedPlace.id,
                      title: selectedPlace.name,
                      titleTa: selectedPlace.nameTa,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isBookmarked('place', selectedPlace.id) ? 'Saved' : 'Save Place'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2]/70 dark:border-[#2A4163]">
                  <h3 className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] mb-1.5">
                    Historical Record
                  </h3>
                  <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                    {selectedPlace.historicalBackground}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2]/70 dark:border-[#2A4163]">
                  <h3 className="text-xs font-semibold text-[#314B3B] dark:text-[#D4B16E] mb-1.5">
                    Spiritual &amp; Traditional Significance
                  </h3>
                  <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                    {selectedPlace.spiritualSignificance}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-[#172B45] dark:text-[#D4B16E] mb-1">
                  Verified Visiting Information
                </h3>
                <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0]">{selectedPlace.visitingInfo}</p>
              </div>

              <div className="pt-4 border-t border-[#DFCAA2]/60 dark:border-[#2A4163] flex flex-wrap justify-between gap-4 text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                <span>Nearby Places: {selectedPlace.nearbyPlaces.join(' · ')}</span>
                <span>Related Study: {selectedPlace.relatedTopics.join(' · ')}</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export const ArticlesPage: React.FC = () => {
  const { routeParam, lang, toggleBookmark, isBookmarked, showToast } = useApp();
  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [activeArticle, setActiveArticle] = useState<ArticleItem>(ARTICLES[0]);

  useEffect(() => {
    if (routeParam) {
      const found = ARTICLES.find((a) => a.id === routeParam);
      if (found) setActiveArticle(found);
    }
  }, [routeParam]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      if (category !== 'all' && a.category !== category) return false;
      if (!q) return true;
      return [a.title, a.titleTa, a.excerpt, a.category, a.author].join(' ').toLowerCase().includes(q);
    });
  }, [category, search]);

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/articles/${activeArticle.id}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast('Article link copied to clipboard.');
    } catch {
      showToast(url);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar
        breadcrumb="Articles"
        breadcrumbTa="கட்டுரைகள்"
        readAloudText={(lang === 'ta' ? activeArticle.bodyTa : activeArticle.bodyEn).join(' ')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
              கட்டுரைகள் · MULTILINGUAL ESSAYS &amp; COMMENTARIES
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
              {lang === 'ta' ? 'ஆன்மிக மற்றும் தத்துவக் கட்டுரைகள்' : 'Spiritual & Philosophical Articles'}
            </h1>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#5C4F42] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#F6ECD8] dark:bg-[#172B45]">
          <button
            onClick={() => setCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
              category === 'all'
                ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                : 'text-[#5C4F42] dark:text-[#CBBBA0]'
            }`}
          >
            All
          </button>
          {ARTICLE_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                category === c
                  ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                  : 'text-[#5C4F42] dark:text-[#CBBBA0]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-3">
            {filtered.map((art) => (
              <button
                key={art.id}
                onClick={() => setActiveArticle(art)}
                className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                  art.id === activeArticle.id
                    ? 'border-[#641E24] bg-[#F6ECD8]/80 dark:border-[#C6A15B] dark:bg-[#172B45]'
                    : 'border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45]'
                }`}
              >
                <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                  {art.category} · {art.readTimeMin} min read
                </p>
                <h2 className="font-display text-lg font-bold text-[#1F1914] dark:text-[#FBF4E4] mt-1">
                  {lang === 'ta' ? art.titleTa : art.title}
                </h2>
              </button>
            ))}
          </div>

          <article className="lg:col-span-8 rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] overflow-hidden">
            <div className="aspect-[16/9] overflow-hidden">
              <ResilientImage src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 sm:p-10 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {activeArticle.category} · {activeArticle.readTimeMin} min read · {activeArticle.publishedDate}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      toggleBookmark({
                        itemType: 'article',
                        itemId: activeArticle.id,
                        title: activeArticle.title,
                        titleTa: activeArticle.titleTa,
                      })
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-[#DFCAA2] dark:border-[#2A4163] cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isBookmarked('article', activeArticle.id) ? 'Saved' : 'Save'}</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-[#DFCAA2] dark:border-[#2A4163] cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                {lang === 'ta' ? activeArticle.titleTa : activeArticle.title}
              </h2>
              <p className="text-xs font-medium text-[#641E24] dark:text-[#D4B16E]">
                By {activeArticle.author}
              </p>

              <div className="space-y-4 max-w-prose font-serif-editorial text-base leading-relaxed text-[#1F1914] dark:text-[#FBF4E4]">
                {(lang === 'ta' ? activeArticle.bodyTa : activeArticle.bodyEn).map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <p className="pt-4 border-t border-[#DFCAA2]/60 dark:border-[#2A4163] text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                {activeArticle.sourceNote}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
