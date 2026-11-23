import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Download,
  Eye,
  FilePlus2,
  Shield,
  Trash2,
  Upload,
  Users,
} from 'lucide-react';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { CmsItemRecord, StaffRole, useApp } from '../context/AppContext';
import { getKuralByNumber } from '../data/thirukkural';
import { PageUtilityBar } from '../components/PageUtilityBar';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

interface AuditLogEntry {
  id: string;
  actorUid: string;
  action: string;
  targetType: string;
  targetId: string;
  summary: string;
}

interface AdminUserRow {
  uid: string;
  displayName: string;
  role: StaffRole;
}

export const AdminDashboardPage: React.FC = () => {
  const { user, userRole, isStaff, isAdmin, cmsItems, showToast, signInWithGoogle } = useApp();

  const [tab, setTab] = useState<'cms' | 'kural' | 'seo' | 'users' | 'audit' | 'backup'>('cms');
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [usersList, setUsersList] = useState<AdminUserRow[]>([]);

  // CMS item editor state
  const [moduleType, setModuleType] = useState<CmsItemRecord['moduleType']>('article');
  const [status, setStatus] = useState<CmsItemRecord['status']>('draft');
  const [title, setTitle] = useState('');
  const [titleTa, setTitleTa] = useState('');
  const [category, setCategory] = useState('Vedanta');
  const [scheduledFor, setScheduledFor] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [previewItem, setPreviewItem] = useState<CmsItemRecord | null>(null);

  // Thirukkural CMS editor state (Strictly 1-1080 across 2 Paals)
  const [kuralNum, setKuralNum] = useState(1);
  const [kLine1, setKLine1] = useState('');
  const [kLine2, setKLine2] = useState('');
  const [kWordTa, setKWordTa] = useState('');
  const [kCommTa, setKCommTa] = useState('');
  const [kTransEn, setKTransEn] = useState('');
  const [kExplEn, setKExplEn] = useState('');
  const [kAudioUrl, setKAudioUrl] = useState('');
  const [kVideoUrl, setKVideoUrl] = useState('');
  const [kPdfUrl, setKPdfUrl] = useState('');
  const [kStatus, setKStatus] = useState<CmsItemRecord['status']>('published');

  // SEO & Site settings
  const [seoTitle, setSeoTitle] = useState('PURNA YOGAM – பூர்ண யோகம் | Ancient Wisdom & Digital Sanctuary');
  const [seoDesc, setSeoDesc] = useState(
    'Free bilingual Tamil and English sanctuary for Thirukkural (1,080), Swamiji Vedanta teachings, Bhagavad Gita, Upanishads, and Meditation.'
  );
  const [featuredKural, setFeaturedKural] = useState(355);

  useEffect(() => {
    const k = getKuralByNumber(kuralNum);
    const existingCms = cmsItems.find(
      (item) => item.moduleType === 'kural' && Number(item.payload?.kuralNumber) === kuralNum
    );
    const p = (existingCms?.payload || {}) as Record<string, string>;
    setKLine1(p.tamilLine1 || k.tamilLine1);
    setKLine2(p.tamilLine2 || k.tamilLine2);
    setKWordTa(p.wordByWordTa || k.wordByWordTa);
    setKCommTa(p.tamilCommentary || k.tamilCommentary);
    setKTransEn(p.englishTranslation || k.englishTranslation);
    setKExplEn(p.englishExplanation || k.englishExplanation);
    setKAudioUrl(p.audioUrl || '');
    setKVideoUrl(p.videoUrl || '');
    setKPdfUrl(p.pdfUrl || '');
  }, [kuralNum, cmsItems]);

  useEffect(() => {
    if (!isAdmin) return;
    const unsubAudit = onSnapshot(
      query(collection(db, 'auditLogs'), orderBy('createdAt', 'desc')),
      (snap) => setAuditLogs(snap.docs.map((d) => d.data() as AuditLogEntry)),
      (err) => handleFirestoreError(err, OperationType.LIST, 'auditLogs', true)
    );
    const unsubUsers = onSnapshot(
      collection(db, 'users'),
      (snap) => setUsersList(snap.docs.map((d) => d.data() as AdminUserRow)),
      (err) => handleFirestoreError(err, OperationType.LIST, 'users', true)
    );
    return () => {
      unsubAudit();
      unsubUsers();
    };
  }, [isAdmin]);

  const recordAudit = async (action: string, targetType: string, targetId: string, summary: string) => {
    if (!user) return;
    const logId = `log_${Date.now()}`;
    try {
      await setDoc(doc(db, 'auditLogs', logId), {
        id: logId,
        actorUid: user.uid,
        action,
        targetType,
        targetId,
        summary: summary.slice(0, 500),
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `auditLogs/${logId}`, true);
    }
  };

  const handleSaveCmsItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isStaff) return;
    const itemId = `cms_${moduleType}_${Date.now()}`;
    try {
      await setDoc(doc(db, 'cmsItems', itemId), {
        id: itemId,
        moduleType,
        status,
        title: title.trim(),
        titleTa: titleTa.trim(),
        category: category.trim(),
        payload: { body: bodyText },
        authorUid: user.uid,
        ...(scheduledFor ? { scheduledFor } : {}),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      await recordAudit('CREATE_CMS_ITEM', moduleType, itemId, `Created ${moduleType}: ${title} (${status})`);
      setTitle('');
      setTitleTa('');
      setBodyText('');
      setScheduledFor('');
      showToast(`Saved ${moduleType} (${status})`);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `cmsItems/${itemId}`);
    }
  };

  const handleToggleCmsStatus = async (item: CmsItemRecord) => {
    if (!user || !isStaff) return;
    const nextStatus = item.status === 'published' ? 'draft' : 'published';
    try {
      await updateDoc(doc(db, 'cmsItems', item.id), {
        status: nextStatus,
        updatedAt: serverTimestamp(),
      });
      await recordAudit('UPDATE_STATUS', item.moduleType, item.id, `Changed status to ${nextStatus}`);
      showToast(`Updated status to ${nextStatus}`);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `cmsItems/${item.id}`);
    }
  };

  const handleDeleteCms = async (item: CmsItemRecord) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, 'cmsItems', item.id));
      await recordAudit('DELETE_CMS_ITEM', item.moduleType, item.id, `Deleted ${item.title}`);
      showToast('Item deleted');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `cmsItems/${item.id}`);
    }
  };

  const handleSaveKural = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isStaff) return;
    const clamped = Math.max(1, Math.min(1080, kuralNum));
    const itemId = `kural_${clamped}`;
    const kuralPayload = {
      kuralNumber: clamped,
      tamilLine1: kLine1,
      tamilLine2: kLine2,
      wordByWordTa: kWordTa,
      tamilCommentary: kCommTa,
      englishTranslation: kTransEn,
      englishExplanation: kExplEn,
      commentaryAuthor: 'Admin CMS Curated Edition',
      ...(kAudioUrl.trim() ? { audioUrl: kAudioUrl.trim() } : {}),
      ...(kVideoUrl.trim() ? { videoUrl: kVideoUrl.trim() } : {}),
      ...(kPdfUrl.trim() ? { pdfUrl: kPdfUrl.trim() } : {}),
    };
    const kuralRef = doc(db, 'cmsItems', itemId);
    try {
      const existingSnap = await getDoc(kuralRef);
      if (existingSnap.exists()) {
        await updateDoc(kuralRef, {
          status: kStatus,
          title: `Thirukkural #${clamped}`,
          titleTa: `திருக்குறள் #${clamped}`,
          category: clamped <= 380 ? 'Arathuppaal' : 'Porutpaal',
          payload: kuralPayload,
          updatedAt: serverTimestamp(),
        });
      } else {
        await setDoc(kuralRef, {
          id: itemId,
          moduleType: 'kural',
          status: kStatus,
          title: `Thirukkural #${clamped}`,
          titleTa: `திருக்குறள் #${clamped}`,
          category: clamped <= 380 ? 'Arathuppaal' : 'Porutpaal',
          payload: kuralPayload,
          authorUid: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      await recordAudit('UPDATE_KURAL', 'kural', itemId, `Saved Thirukkural #${clamped} (${kStatus})`);
      showToast(`Saved Kural #${clamped} (${kStatus})`);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `cmsItems/${itemId}`);
    }
  };

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isAdmin) return;
    try {
      await setDoc(doc(db, 'siteSettings', 'homepage'), {
        id: 'homepage',
        featuredKuralNumber: featuredKural,
        seoTitle: seoTitle.slice(0, 160),
        seoDescription: seoDesc.slice(0, 320),
        updatedBy: user.uid,
        updatedAt: serverTimestamp(),
      });
      await recordAudit('UPDATE_SEO', 'siteSettings', 'homepage', 'Updated Homepage & SEO metadata');
      showToast('Site SEO & Featured settings saved');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'siteSettings/homepage');
    }
  };

  const handleUpdateUserRole = async (targetUid: string, nextRole: StaffRole) => {
    if (!user || !isAdmin) return;
    try {
      await updateDoc(doc(db, 'users', targetUid), {
        role: nextRole,
        updatedAt: serverTimestamp(),
      });
      if (nextRole === 'learner') {
        await deleteDoc(doc(db, 'admins', targetUid)).catch(() => undefined);
      } else {
        await setDoc(doc(db, 'admins', targetUid), {
          uid: targetUid,
          role: nextRole,
          grantedBy: user.uid,
          createdAt: serverTimestamp(),
        });
      }
      await recordAudit('ROLE_CHANGE', 'users', targetUid, `Set role to ${nextRole}`);
      showToast(`Updated role to ${nextRole}`);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${targetUid}`);
    }
  };

  const handleExportBackup = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      platform: 'PURNA YOGAM',
      cmsItems,
      siteSettings: { seoTitle, seoDesc, featuredKural },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `purna-yogam-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Database backup JSON exported');
  };

  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !isAdmin) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as { cmsItems?: CmsItemRecord[] };
      if (!Array.isArray(parsed.cmsItems)) {
        showToast('Invalid backup file format');
        return;
      }
      for (const item of parsed.cmsItems.slice(0, 25)) {
        if (item.id && item.title && item.moduleType) {
          await setDoc(doc(db, 'cmsItems', item.id), {
            ...item,
            authorUid: user.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      }
      await recordAudit('RESTORE_BACKUP', 'cmsItems', 'batch', `Restored ${parsed.cmsItems.length} CMS records`);
      showToast('Backup restored to Firestore');
    } catch {
      showToast('Failed to parse backup JSON');
    }
  };

  if (!user || !isStaff) {
    return (
      <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
        <PageUtilityBar breadcrumb="Admin Dashboard" breadcrumbTa="நிர்வாகப் பகுதி" />
        <div className="max-w-xl mx-auto px-4 py-16">
          <div className="rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-8 text-center space-y-4">
            <Shield className="w-8 h-8 mx-auto text-[#641E24] dark:text-[#C6A15B]" />
            <h1 className="font-display text-2xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
              Role-Protected Staff &amp; Admin CMS
            </h1>
            <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
              {user
                ? `Signed in as ${user.email} (Role: ${userRole}). Only administrators, editors, and content managers can access CMS tools.`
                : 'Sign in with an authorized Administrator, Editor, or Content Manager Google account to manage content.'}
            </p>
            {!user && (
              <button
                onClick={signInWithGoogle}
                className="px-6 py-2.5 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
              >
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar breadcrumb="Admin Dashboard" breadcrumbTa="நிர்வாகப் பகுதி" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163] flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
              ROLE: {userRole.toUpperCase()} · {user.email}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
              PURNA YOGAM Content Management System
            </h1>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#F6ECD8] dark:bg-[#172B45]">
            {(
              [
                ['cms', 'Content & Media'],
                ['kural', 'Thirukkural (1,080)'],
                ...(isAdmin
                  ? [
                      ['seo', 'SEO & Homepage'],
                      ['users', 'Roles & Users'],
                      ['audit', 'Audit Logs'],
                      ['backup', 'Backup & Restore'],
                    ]
                  : []),
              ] as [typeof tab, string][]
            ).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  tab === k
                    ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                    : 'text-[#5C4F42] dark:text-[#CBBBA0]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: Unified Content CMS */}
        {tab === 'cms' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleSaveCmsItem}
              className="lg:col-span-5 rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 space-y-4"
            >
              <h2 className="font-display text-xl font-bold flex items-center gap-2">
                <FilePlus2 className="w-5 h-5 text-[#641E24] dark:text-[#C6A15B]" />
                <span>Create / Schedule Educational Content</span>
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={moduleType}
                  onChange={(e) => setModuleType(e.target.value as CmsItemRecord['moduleType'])}
                  aria-label="Module Type"
                  className="px-3 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-xs"
                >
                  {['lesson', 'article', 'book', 'audio', 'place', 'quiz', 'practice', 'wisdom', 'map', 'activity'].map(
                    (m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    )
                  )}
                </select>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as CmsItemRecord['status'])}
                  aria-label="Publication status"
                  className="px-3 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-xs"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="English Title..."
                className="w-full px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm"
              />
              <input
                type="text"
                value={titleTa}
                onChange={(e) => setTitleTa(e.target.value)}
                placeholder="தமிழ் தலைப்பு (Tamil Title)..."
                className="w-full px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm font-tamil"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category"
                  className="px-3 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-xs"
                />
                <input
                  type="date"
                  value={scheduledFor}
                  onChange={(e) => setScheduledFor(e.target.value)}
                  aria-label="Scheduled publication date"
                  className="px-3 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-xs"
                />
              </div>
              <textarea
                rows={4}
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                placeholder="Content body / notes / media link..."
                className="w-full px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
              >
                Save Content Record
              </button>
            </form>

            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-display text-xl font-bold">Managed CMS Items ({cmsItems.length})</h2>
              {cmsItems.length === 0 ? (
                <div className="p-6 rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
                  No custom CMS items saved yet. Use the form on the left to publish or draft new lessons, articles, or Kurals.
                </div>
              ) : (
                <div className="space-y-3">
                  {cmsItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] flex flex-wrap items-center justify-between gap-3"
                    >
                      <div>
                        <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                          {item.moduleType} · {item.status.toUpperCase()}
                          {item.scheduledFor ? ` · Scheduled ${item.scheduledFor}` : ''}
                        </p>
                        <p className="font-semibold text-sm text-[#1F1914] dark:text-[#FBF4E4]">{item.title}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPreviewItem(item)}
                          className="p-1.5 rounded border border-[#DFCAA2] dark:border-[#2A4163] cursor-pointer"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleCmsStatus(item)}
                          className="px-3 py-1 rounded bg-[#314B3B] text-[#FFF9ED] text-xs font-medium cursor-pointer"
                        >
                          {item.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => handleDeleteCms(item)}
                            className="p-1.5 rounded text-[#641E24] cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {previewItem && (
                <div className="p-5 rounded-xl border border-[#C6A15B] bg-[#FFF9ED] dark:bg-[#0F1A2B] space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[#641E24] dark:text-[#D4B16E]">
                      Preview ({previewItem.moduleType})
                    </span>
                    <button onClick={() => setPreviewItem(null)} className="underline cursor-pointer">
                      Close Preview
                    </button>
                  </div>
                  <h3 className="font-display text-xl font-bold">{previewItem.title}</h3>
                  {previewItem.titleTa && <p className="font-tamil text-sm">{previewItem.titleTa}</p>}
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                    {JSON.stringify(previewItem.payload)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Thirukkural Governance (Strictly 2 Paals, 108 Chapters, 1,080 Kurals) */}
        {tab === 'kural' && (
          <form
            onSubmit={handleSaveKural}
            className="max-w-3xl rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 sm:p-8 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold">Thirukkural Editorial Manager (1–1,080)</h2>
                <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                  Enforces Arathuppaal (1–380) &amp; Porutpaal (381–1080) across 108 chapters only.
                </p>
              </div>
              <input
                type="number"
                min={1}
                max={1080}
                value={kuralNum}
                onChange={(e) => setKuralNum(Math.max(1, Math.min(1080, Number(e.target.value) || 1)))}
                className="w-28 px-3 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] font-mono-tabular text-sm"
              />
            </div>

            <input
              type="text"
              value={kLine1}
              onChange={(e) => setKLine1(e.target.value)}
              placeholder="Tamil Line 1"
              className="w-full px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] font-tamil text-sm"
            />
            <input
              type="text"
              value={kLine2}
              onChange={(e) => setKLine2(e.target.value)}
              placeholder="Tamil Line 2"
              className="w-full px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] font-tamil text-sm"
            />
            <textarea
              rows={2}
              value={kWordTa}
              onChange={(e) => setKWordTa(e.target.value)}
              placeholder="பதவுரை (Word-by-word Tamil)"
              className="w-full px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] font-tamil text-sm"
            />
            <textarea
              rows={2}
              value={kCommTa}
              onChange={(e) => setKCommTa(e.target.value)}
              placeholder="தமிழ் விளக்கவுரை"
              className="w-full px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] font-tamil text-sm"
            />
            <input
              type="text"
              value={kTransEn}
              onChange={(e) => setKTransEn(e.target.value)}
              placeholder="English Translation"
              className="w-full px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm"
            />
            <textarea
              rows={2}
              value={kExplEn}
              onChange={(e) => setKExplEn(e.target.value)}
              placeholder="English Philosophical Explanation"
              className="w-full px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="url"
                value={kAudioUrl}
                onChange={(e) => setKAudioUrl(e.target.value)}
                placeholder="Optional Audio URL (https://...mp3)"
                className="px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-xs"
              />
              <input
                type="url"
                value={kVideoUrl}
                onChange={(e) => setKVideoUrl(e.target.value)}
                placeholder="Optional Video URL (YouTube / mp4)"
                className="px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-xs"
              />
              <input
                type="url"
                value={kPdfUrl}
                onChange={(e) => setKPdfUrl(e.target.value)}
                placeholder="Optional External PDF URL (https://...)"
                className="px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-xs"
              />
            </div>
            <div className="flex items-center gap-3">
              <select
                value={kStatus}
                onChange={(e) => setKStatus(e.target.value as CmsItemRecord['status'])}
                className="px-3 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-xs"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
              >
                Save Verified Kural #{kuralNum}
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: SEO */}
        {tab === 'seo' && isAdmin && (
          <form
            onSubmit={handleSaveSeo}
            className="max-w-2xl rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 space-y-4"
          >
            <h2 className="font-display text-2xl font-bold">SEO &amp; Homepage Curation</h2>
            <div>
              <label className="block text-xs font-semibold mb-1">Featured Kural Number (1–1080)</label>
              <input
                type="number"
                min={1}
                max={1080}
                value={featuredKural}
                onChange={(e) => setFeaturedKural(Number(e.target.value))}
                className="w-36 px-3 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">SEO Page Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">SEO Meta Description</label>
              <textarea
                rows={3}
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
            >
              Save Site Settings
            </button>
          </form>
        )}

        {/* TAB 4: RBAC Users & Permissions */}
        {tab === 'users' && isAdmin && (
          <div className="rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 space-y-4">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-[#641E24] dark:text-[#C6A15B]" />
              <span>User Roles &amp; Permissions</span>
            </h2>
            <div className="divide-y divide-[#DFCAA2]/60 dark:divide-[#2A4163]">
              {usersList.map((u) => (
                <div key={u.uid} className="py-3 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">{u.displayName}</p>
                    <p className="text-xs font-mono-tabular text-[#5C4F42] dark:text-[#CBBBA0]">{u.uid}</p>
                  </div>
                  <select
                    value={u.role}
                    onChange={(e) => handleUpdateUserRole(u.uid, e.target.value as StaffRole)}
                    aria-label={`Role for ${u.displayName}`}
                    className="px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-xs font-semibold"
                  >
                    <option value="learner">Learner</option>
                    <option value="content_manager">Content Manager</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Audit Logs */}
        {tab === 'audit' && isAdmin && (
          <div className="rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 space-y-4">
            <h2 className="font-display text-2xl font-bold">Immutable Content Audit Trail</h2>
            {auditLogs.length === 0 ? (
              <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0]">No editorial actions logged yet.</p>
            ) : (
              <div className="divide-y divide-[#DFCAA2]/60 dark:divide-[#2A4163]">
                {auditLogs.map((log) => (
                  <div key={log.id} className="py-3 text-xs flex flex-wrap justify-between gap-2">
                    <div>
                      <span className="font-semibold text-[#641E24] dark:text-[#D4B16E]">{log.action}</span> ·{' '}
                      <span>{log.summary}</span>
                    </div>
                    <span className="font-mono-tabular text-[#5C4F42] dark:text-[#CBBBA0]">
                      Actor: {log.actorUid.slice(0, 10)}...
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: Backup & Restore */}
        {tab === 'backup' && isAdmin && (
          <div className="rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 space-y-5 max-w-2xl">
            <h2 className="font-display text-2xl font-bold">Content Backup &amp; Restore</h2>
            <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
              Export all CMS content records to a portable JSON archive or restore verified records into Firestore.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleExportBackup}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#314B3B] text-[#FFF9ED] text-xs font-semibold cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Full Backup (.json)</span>
              </button>
              <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs font-semibold cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Restore From Backup JSON</span>
                <input type="file" accept="application/json" onChange={handleImportBackup} className="hidden" />
              </label>
            </div>
            <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#314B3B]" />
              Firestore rules enforce schema validation on all restored documents.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
