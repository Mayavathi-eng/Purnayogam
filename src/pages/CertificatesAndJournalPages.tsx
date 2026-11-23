import React, { useEffect, useMemo, useState } from 'react';
import { Award, CheckCircle2, Download, Lock, Plus, Search, Trash2 } from 'lucide-react';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { useApp } from '../context/AppContext';
import { CERTIFICATE_PROGRAMS } from '../data/vedanta';
import { PageUtilityBar } from '../components/PageUtilityBar';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { downloadCertificatePdf } from '../lib/pdfGenerator';

interface IssuedCertificate {
  certificateId: string;
  uid: string;
  recipientName: string;
  programId: string;
  programTitle: string;
  programTitleTa?: string;
  score: number;
  issuedAt?: { toDate?: () => Date } | string;
}

export const CertificatesPage: React.FC = () => {
  const { user, lang, lessonProgress, signInWithGoogle, navigate, showToast } = useApp();
  const [myCerts, setMyCerts] = useState<IssuedCertificate[]>([]);
  const [recipientName, setRecipientName] = useState('');
  const [verifyId, setVerifyId] = useState('');
  const [verifiedCert, setVerifiedCert] = useState<IssuedCertificate | null | 'not_found'>(null);

  useEffect(() => {
    if (user?.displayName && !recipientName) {
      setRecipientName(user.displayName);
    }
  }, [user, recipientName]);

  useEffect(() => {
    if (!user) {
      setMyCerts([]);
      return;
    }
    const q = query(collection(db, 'certificates'), where('uid', '==', user.uid));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setMyCerts(snap.docs.map((d) => d.data() as IssuedCertificate));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'certificates', true)
    );
    return () => unsub();
  }, [user]);

  const issueCertificate = async (prog: (typeof CERTIFICATE_PROGRAMS)[number], score: number) => {
    if (!user) {
      showToast('Please sign in with Google to generate your personal educational certificate.');
      return;
    }
    const cleanName = (recipientName || user.displayName || 'Seeker').trim().slice(0, 120);
    const certId = `PY-CERT-${prog.id.replace('cert-', '').toUpperCase().slice(0, 8)}-${Date.now().toString(36).toUpperCase()}`;

    try {
      await setDoc(doc(db, 'certificates', certId), {
        certificateId: certId,
        uid: user.uid,
        recipientName: cleanName,
        programId: prog.id,
        programTitle: prog.title,
        programTitleTa: prog.titleTa,
        score,
        issuedAt: serverTimestamp(),
      });
      showToast(`Certificate issued: ${certId}`);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `certificates/${certId}`);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = verifyId.trim();
    if (!cleaned || !/^[a-zA-Z0-9_\-]+$/.test(cleaned)) {
      setVerifiedCert('not_found');
      return;
    }
    try {
      const snap = await getDoc(doc(db, 'certificates', cleaned));
      if (!snap.exists()) {
        setVerifiedCert('not_found');
      } else {
        setVerifiedCert(snap.data() as IssuedCertificate);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `certificates/${cleaned}`, true);
      setVerifiedCert('not_found');
    }
  };

  const formatIssuedDate = (val: IssuedCertificate['issuedAt']): string => {
    if (!val) return new Date().toISOString();
    if (typeof val === 'string') return val;
    if (typeof val.toDate === 'function') return val.toDate().toISOString();
    return new Date().toISOString();
  };

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar breadcrumb="Free Certificates" breadcrumbTa="இலவச சான்றிதழ்" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <div className="pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163]">
          <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
            இலவச சான்றிதழ் · EDUCATIONAL COURSE-COMPLETION RECORDS
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
            {lang === 'ta' ? 'இலவச கல்விச் சான்றிதழ் திட்டம்' : 'Free Educational Certificate System'}
          </h1>
          <p className="mt-2 text-xs text-[#5C4F42] dark:text-[#CBBBA0] max-w-3xl">
            Disclosure: All certificates issued by PURNA YOGAM are free educational course-completion records celebrating self-study and assessment mastery, and are not accredited academic degrees.
          </p>
        </div>

        {/* Certificate Verification Lookup (Open to Public) */}
        <section className="rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 space-y-4">
          <h2 className="font-display text-xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
            Verify an Issued Certificate ID
          </h2>
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={verifyId}
              onChange={(e) => setVerifyId(e.target.value)}
              placeholder="Enter Certificate ID (e.g. PY-CERT-...)"
              className="flex-1 px-4 py-2.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm font-mono-tabular"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#172B45] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Verify Record</span>
            </button>
          </form>

          {verifiedCert === 'not_found' && (
            <p className="text-xs text-[#641E24] dark:text-[#D4B16E]">
              No verified certificate record matched that ID.
            </p>
          )}
          {verifiedCert && verifiedCert !== 'not_found' && (
            <div className="p-4 rounded-xl bg-[#314B3B]/10 border border-[#314B3B] text-sm space-y-1">
              <p className="font-semibold text-[#314B3B] dark:text-[#D4B16E] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Verified Educational Completion Certificate
              </p>
              <p>Recipient: <strong>{verifiedCert.recipientName}</strong></p>
              <p>Programme: {verifiedCert.programTitle} · Score: {verifiedCert.score}%</p>
              <p className="text-xs font-mono-tabular">ID: {verifiedCert.certificateId}</p>
            </div>
          )}
        </section>

        {/* Recipient Name & Eligible Programmes */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
              Eligible Learning Programmes
            </h2>
            {user ? (
              <div className="flex items-center gap-2">
                <label className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">Name on Certificate:</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-sm"
                />
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="px-4 py-2 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
              >
                Sign In with Google to Claim Personal Certificates
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATE_PROGRAMS.map((prog) => {
              const quizProg = lessonProgress.find((p) => p.programId === prog.quizId);
              const score = quizProg?.quizScore ?? 0;
              const eligible = score >= prog.passingScore;
              const alreadyIssued = myCerts.find((c) => c.programId === prog.id);

              return (
                <div
                  key={prog.id}
                  className="rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 flex flex-col justify-between space-y-5"
                >
                  <div>
                    <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                      Passing Criterion: ≥ {prog.passingScore}% on Assessment
                    </p>
                    <h3 className="font-display text-xl font-bold text-[#1F1914] dark:text-[#FBF4E4] mt-1">
                      {lang === 'ta' ? prog.titleTa : prog.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                      {prog.description}
                    </p>
                    <p className="mt-3 text-xs font-mono-tabular text-[#641E24] dark:text-[#D4B16E]">
                      Current Quiz Score: {score}%
                    </p>
                  </div>

                  <div className="space-y-2">
                    {alreadyIssued ? (
                      <button
                        onClick={() =>
                          downloadCertificatePdf({
                            certificateId: alreadyIssued.certificateId,
                            recipientName: alreadyIssued.recipientName,
                            programTitle: alreadyIssued.programTitle,
                            programTitleTa: alreadyIssued.programTitleTa,
                            score: alreadyIssued.score,
                            issuedAt: formatIssuedDate(alreadyIssued.issuedAt),
                          })
                        }
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#314B3B] text-[#FFF9ED] text-xs font-semibold cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF ({alreadyIssued.certificateId})</span>
                      </button>
                    ) : eligible ? (
                      <button
                        onClick={() => issueCertificate(prog, score)}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
                      >
                        <Award className="w-4 h-4" />
                        <span>Generate Free Certificate</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate('quizzes')}
                        className="w-full py-2.5 px-4 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs font-semibold text-[#1F1914] dark:text-[#FBF4E4] hover:border-[#C6A15B] cursor-pointer"
                      >
                        Take Assessment Quiz First
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export const JournalPage: React.FC = () => {
  const {
    user,
    lang,
    signInWithGoogle,
    journalEntries,
    saveJournalEntry,
    deleteJournalEntry,
    bookmarks,
    navigate,
  } = useApp();

  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('Thirukkural');
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');

  const topics = ['Thirukkural', 'Vedanta', 'Bhagavad Gita', 'Meditation', 'Daily Practice', 'Activities'];

  const filteredEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    return journalEntries.filter((e) => {
      if (topicFilter !== 'all' && e.topic !== topicFilter) return false;
      if (!q) return true;
      return [e.title, e.content, e.topic].join(' ').toLowerCase().includes(q);
    });
  }, [journalEntries, search, topicFilter]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    await saveJournalEntry({ title, content, topic });
    setTitle('');
    setContent('');
  };

  const handleExportMarkdown = () => {
    const lines = [
      '# PURNA YOGAM — Personal Wisdom Journal',
      `Exported: ${new Date().toISOString()}`,
      '',
      ...journalEntries.map(
        (e) => `## ${e.title}\nTopic: ${e.topic}\n\n${e.content}\n\n---`
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'purna-yogam-wisdom-journal.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar breadcrumb="My Wisdom Journal" breadcrumbTa="எனது ஞானக் குறிப்பேடு" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>PRIVATE PERSONAL SANCTUARY · NEVER PUBLICLY VISIBLE</span>
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
              {lang === 'ta' ? 'எனது ஞானக் குறிப்பேடு' : 'My Wisdom Journal'}
            </h1>
          </div>

          {user && journalEntries.length > 0 && (
            <button
              onClick={handleExportMarkdown}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs font-semibold cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Notes (.md)</span>
            </button>
          )}
        </div>

        {!user ? (
          <div className="max-w-xl mx-auto rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-8 text-center space-y-4">
            <Lock className="w-8 h-8 mx-auto text-[#641E24] dark:text-[#C6A15B]" />
            <h2 className="font-display text-2xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
              Sign In to Open Your Private Wisdom Journal
            </h2>
            <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
              Public reading across PURNA YOGAM requires no account. Sign in with Google only when you want private, encrypted cloud storage for your favourite Kurals, lesson notes, and personal reflections.
            </p>
            <button
              onClick={signInWithGoogle}
              className="px-6 py-2.5 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-sm font-semibold cursor-pointer"
            >
              Sign In with Google
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: New Entry Form & Bookmarks */}
            <div className="lg:col-span-5 space-y-6">
              <form
                onSubmit={handleCreate}
                className="rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 space-y-4"
              >
                <h2 className="font-display text-xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                  New Reflection Note
                </h2>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Entry Title..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm"
                />
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  aria-label="Reflection topic"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm"
                >
                  {topics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <textarea
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Record insights, quotes, or daily spiritual observations..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm"
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save Private Note</span>
                </button>
              </form>

              {/* Saved Bookmarks */}
              <div className="rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 space-y-3">
                <h2 className="font-display text-xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                  Saved Bookmarks ({bookmarks.length})
                </h2>
                {bookmarks.length === 0 ? (
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                    Bookmark Kurals, Vedanta lessons, books, or articles to collect them here.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {bookmarks.map((b) => (
                      <button
                        key={b.id}
                        onClick={() =>
                          navigate(
                            b.itemType === 'kural'
                              ? 'thirukkural'
                              : b.itemType === 'lesson'
                              ? 'vedanta'
                              : b.itemType === 'book'
                              ? 'books'
                              : b.itemType === 'article'
                              ? 'articles'
                              : 'places',
                            b.itemId
                          )
                        }
                        className="w-full text-left p-3 rounded-lg bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2]/70 dark:border-[#2A4163] hover:border-[#C6A15B] cursor-pointer"
                      >
                        <p className="text-[11px] uppercase text-[#641E24] dark:text-[#D4B16E]">{b.itemType}</p>
                        <p className="text-xs font-semibold text-[#1F1914] dark:text-[#FBF4E4] line-clamp-1">
                          {lang === 'ta' && b.titleTa ? b.titleTa : b.title}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Journal Entries List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search your private notes..."
                  className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-sm"
                />
                <select
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                  aria-label="Filter journal by topic"
                  className="px-3 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-xs font-medium"
                >
                  <option value="all">All Topics</option>
                  {topics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {filteredEntries.length === 0 ? (
                <div className="p-8 rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-center text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
                  No reflection entries yet. Add your first note on the left.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEntries.map((entry) => (
                    <article
                      key={entry.id}
                      className="rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-5 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs text-[#641E24] dark:text-[#D4B16E]">
                            {entry.topic}
                            {entry.linkedRef ? ` · ${entry.linkedRef}` : ''}
                          </p>
                          <h3 className="font-display text-xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                            {entry.title}
                          </h3>
                        </div>
                        <button
                          onClick={() => deleteJournalEntry(entry.id)}
                          className="p-1.5 rounded-lg text-[#5C4F42] hover:text-[#641E24] cursor-pointer"
                          aria-label="Delete entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] whitespace-pre-line leading-relaxed">
                        {entry.content}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
