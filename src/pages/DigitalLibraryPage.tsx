import React, { useEffect, useMemo, useState } from 'react';
import { Bookmark, BookOpen, ChevronLeft, ChevronRight, Download, Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DIGITAL_BOOKS, DigitalBook } from '../data/libraryAndMaps';
import { PageUtilityBar } from '../components/PageUtilityBar';
import { ResilientImage } from '../components/SacredMotifs';
import { downloadAuthorizedStudyPdf } from '../lib/pdfGenerator';

export const DigitalLibraryPage: React.FC = () => {
  const { routeParam, lang, toggleBookmark, isBookmarked, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [readingBook, setReadingBook] = useState<DigitalBook | null>(null);
  const [pageIdx, setPageIdx] = useState(0);

  useEffect(() => {
    if (routeParam) {
      const found = DIGITAL_BOOKS.find((b) => b.id === routeParam);
      if (found) {
        setReadingBook(found);
        setPageIdx(0);
      }
    }
  }, [routeParam]);

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(DIGITAL_BOOKS.map((b) => b.category)))],
    []
  );

  const filteredBooks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return DIGITAL_BOOKS.filter((b) => {
      if (category !== 'all' && b.category !== category) return false;
      if (!q) return true;
      return [b.title, b.titleTa, b.author, b.description, b.category].join(' ').toLowerCase().includes(q);
    });
  }, [search, category]);

  const handleDownload = (book: DigitalBook) => {
    if (!book.downloadAllowed) {
      showToast('Download is unavailable for this title.');
      return;
    }
    downloadAuthorizedStudyPdf({
      title: book.title,
      author: book.author,
      category: book.category,
      licenseNote: book.licenseNote,
      pages: book.pages,
    });
    showToast(`Downloaded ${book.title}`);
  };

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar breadcrumb="Free Digital Library" breadcrumbTa="இலவச டிஜிட்டல் நூலகம்" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
              இலவச டிஜிட்டல் நூலகம் · AUTHORIZED OPEN ACCESS PUBLICATIONS
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
              {lang === 'ta' ? 'இலவச டிஜிட்டல் நூலகம்' : 'Free Digital Book & Resource Library'}
            </h1>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#5C4F42] dark:text-[#CBBBA0] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, author, category..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-sm text-[#1F1914] dark:text-[#FBF4E4]"
            />
          </div>
        </div>

        {/* Category Segmented Bar */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-[#F6ECD8] dark:bg-[#172B45] rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                category === cat
                  ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                  : 'text-[#5C4F42] dark:text-[#CBBBA0]'
              }`}
            >
              {cat === 'all' ? 'All Resources' : cat}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => {
            const bookmarked = isBookmarked('book', book.id);
            return (
              <article
                key={book.id}
                className="rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden">
                    <ResilientImage src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 space-y-2">
                    <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                      {book.category} · {book.language}
                    </p>
                    <h2 className="font-display text-xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                      {lang === 'ta' ? book.titleTa : book.title}
                    </h2>
                    <p className="text-xs text-[#641E24] dark:text-[#D4B16E]">{book.author}</p>
                    <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                      {book.description}
                    </p>
                    <p className="text-[11px] text-[#314B3B] dark:text-[#C6A15B] pt-1">{book.licenseNote}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setReadingBook(book);
                      setPageIdx(0);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Online</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        toggleBookmark({
                          itemType: 'book',
                          itemId: book.id,
                          title: book.title,
                          titleTa: book.titleTa,
                        })
                      }
                      className={`p-2 rounded-lg border cursor-pointer ${
                        bookmarked
                          ? 'border-[#641E24] text-[#641E24] dark:border-[#C6A15B] dark:text-[#D4B16E]'
                          : 'border-[#DFCAA2] dark:border-[#2A4163] text-[#5C4F42] dark:text-[#CBBBA0]'
                      }`}
                      aria-label="Bookmark book"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    {book.downloadAllowed && (
                      <button
                        onClick={() => handleDownload(book)}
                        className="p-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-[#1F1914] dark:text-[#FBF4E4] hover:border-[#C6A15B] cursor-pointer"
                        aria-label="Download authorized PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Built-in Interactive Book / PDF Reader Modal */}
      {readingBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Digital Book Reader"
        >
          <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DFCAA2] dark:border-[#2A4163] flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                  {readingBook.author} · Page {pageIdx + 1} of {readingBook.pages.length}
                </p>
                <h2 className="font-display text-xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                  {lang === 'ta' ? readingBook.titleTa : readingBook.title}
                </h2>
              </div>
              <button
                onClick={() => setReadingBook(null)}
                className="p-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] cursor-pointer"
                aria-label="Close reader"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-[#FFF9ED] dark:bg-[#0F1A2B] space-y-4">
              <h3 className="font-display text-2xl font-bold text-[#641E24] dark:text-[#D4B16E]">
                {readingBook.pages[pageIdx].heading}
              </h3>
              <p className="font-serif-editorial text-base leading-relaxed text-[#1F1914] dark:text-[#FBF4E4] max-w-prose">
                {readingBook.pages[pageIdx].body}
              </p>
            </div>

            <div className="px-6 py-4 border-t border-[#DFCAA2] dark:border-[#2A4163] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  disabled={pageIdx === 0}
                  onClick={() => setPageIdx((p) => Math.max(0, p - 1))}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Page</span>
                </button>
                <button
                  disabled={pageIdx >= readingBook.pages.length - 1}
                  onClick={() => setPageIdx((p) => Math.min(readingBook.pages.length - 1, p + 1))}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold disabled:opacity-40 cursor-pointer"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              {readingBook.downloadAllowed && (
                <button
                  onClick={() => handleDownload(readingBook)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#314B3B] text-[#314B3B] dark:border-[#C6A15B] dark:text-[#D4B16E] text-xs font-semibold cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
