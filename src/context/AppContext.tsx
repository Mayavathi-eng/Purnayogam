import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  auth,
  BOOTSTRAP_ADMIN_EMAIL,
  db,
  googleAuthProvider,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';

export type Language = 'en' | 'ta';
export type ThemeMode = 'light' | 'dark';
export type FontScale = 'sm' | 'md' | 'lg';
export type StaffRole = 'learner' | 'content_manager' | 'editor' | 'admin';

export type RouteKey =
  | 'home'
  | 'thirukkural'
  | 'vedanta'
  | 'wisdom-library'
  | 'audio'
  | 'practice'
  | 'books'
  | 'wisdom-maps'
  | 'certificates'
  | 'journal'
  | 'places'
  | 'articles'
  | 'activities'
  | 'quizzes'
  | 'meditation'
  | 'search'
  | 'admin';

export interface BookmarkRecord {
  id: string;
  uid: string;
  itemType: 'kural' | 'lesson' | 'article' | 'book' | 'audio' | 'place';
  itemId: string;
  title: string;
  titleTa?: string;
}

export interface JournalRecord {
  id: string;
  uid: string;
  title: string;
  content: string;
  topic: string;
  linkedRef?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface LessonProgressRecord {
  id: string;
  uid: string;
  programId: string;
  lessonId: string;
  completed: boolean;
  lastPositionSec?: number;
  quizScore?: number;
}

export interface PracticeLogRecord {
  id: string;
  uid: string;
  dateKey: string;
  morningDone: boolean;
  afternoonDone: boolean;
  eveningDone: boolean;
  meditationMinutes: number;
  reflectionNote?: string;
}

export interface CmsItemRecord {
  id: string;
  moduleType: 'kural' | 'lesson' | 'article' | 'book' | 'audio' | 'place' | 'quiz' | 'practice' | 'wisdom' | 'map' | 'activity';
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  title: string;
  titleTa?: string;
  category?: string;
  payload?: Record<string, unknown>;
  authorUid: string;
  scheduledFor?: string;
}

interface AppContextValue {
  route: RouteKey;
  routeParam: string | null;
  navigate: (route: RouteKey, param?: string | null) => void;
  lang: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  fontScale: FontScale;
  setFontScale: (s: FontScale) => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  user: User | null;
  authReady: boolean;
  userRole: StaffRole;
  isStaff: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  bookmarks: BookmarkRecord[];
  toggleBookmark: (item: Omit<BookmarkRecord, 'id' | 'uid'>) => Promise<void>;
  isBookmarked: (itemType: BookmarkRecord['itemType'], itemId: string) => boolean;
  journalEntries: JournalRecord[];
  saveJournalEntry: (entry: { id?: string; title: string; content: string; topic: string; linkedRef?: string }) => Promise<void>;
  deleteJournalEntry: (id: string) => Promise<void>;
  lessonProgress: LessonProgressRecord[];
  saveLessonProgress: (programId: string, lessonId: string, patch: { completed?: boolean; lastPositionSec?: number; quizScore?: number }) => Promise<void>;
  practiceLogs: PracticeLogRecord[];
  savePracticeLog: (log: Omit<PracticeLogRecord, 'id' | 'uid'>) => Promise<void>;
  cmsItems: CmsItemRecord[];
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function parseHashRoute(): { route: RouteKey; param: string | null } {
  if (typeof window === 'undefined') return { route: 'home', param: null };
  const raw = window.location.hash.replace(/^#\/?/, '').trim();
  if (!raw) return { route: 'home', param: null };
  const [seg1, ...rest] = raw.split('/');
  const validRoutes: RouteKey[] = [
    'home',
    'thirukkural',
    'vedanta',
    'wisdom-library',
    'audio',
    'practice',
    'books',
    'wisdom-maps',
    'certificates',
    'journal',
    'places',
    'articles',
    'activities',
    'quizzes',
    'meditation',
    'search',
    'admin',
  ];
  const matched = validRoutes.includes(seg1 as RouteKey) ? (seg1 as RouteKey) : 'home';
  return { route: matched, param: rest.length ? decodeURIComponent(rest.join('/')) : null };
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = parseHashRoute();
  const [route, setRoute] = useState<RouteKey>(initial.route);
  const [routeParam, setRouteParam] = useState<string | null>(initial.param);

  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [fontScale, setFontScale] = useState<FontScale>('md');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [userRole, setUserRole] = useState<StaffRole>('learner');

  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalRecord[]>([]);
  const [lessonProgress, setLessonProgress] = useState<LessonProgressRecord[]>([]);
  const [practiceLogs, setPracticeLogs] = useState<PracticeLogRecord[]>([]);
  const [cmsItems, setCmsItems] = useState<CmsItemRecord[]>([]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3400);
  }, []);

  const navigate = useCallback((nextRoute: RouteKey, param: string | null = null) => {
    setRoute(nextRoute);
    setRouteParam(param);
    const nextHash = param ? `#/${nextRoute}/${encodeURIComponent(param)}` : `#/${nextRoute}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHashRoute();
      setRoute(parsed.route);
      setRouteParam(parsed.param);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Keyboard shortcut Cmd/Ctrl + K for Global Search
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Sync DOM theme, font size, reduced motion, and lang
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.setAttribute('data-font-size', fontScale);
    root.lang = lang === 'ta' ? 'ta' : 'en';
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [theme, fontScale, reducedMotion, lang]);

  // Listen to Firebase Auth state & sync user doc
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);

      if (!firebaseUser) {
        setUserRole('learner');
        setBookmarks([]);
        setJournalEntries([]);
        setLessonProgress([]);
        setPracticeLogs([]);
        return;
      }

      const isBootstrap =
        firebaseUser.emailVerified && firebaseUser.email === BOOTSTRAP_ADMIN_EMAIL;

      try {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          const initialRole: StaffRole = isBootstrap ? 'admin' : 'learner';
          await setDoc(userRef, {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || 'Seeker',
            role: initialRole,
            preferredLanguage: lang,
            themePreference: theme,
            fontSize: fontScale,
            reducedMotion,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          setUserRole(initialRole);
        } else {
          const data = snap.data();
          const detectedRole: StaffRole = isBootstrap
            ? 'admin'
            : ((data.role as StaffRole) || 'learner');
          setUserRole(detectedRole);
        }

        // Check /admins/{uid} overrides
        if (!isBootstrap) {
          const adminSnap = await getDoc(doc(db, 'admins', firebaseUser.uid));
          if (adminSnap.exists()) {
            const adminRole = adminSnap.data().role as StaffRole;
            if (adminRole) setUserRole(adminRole);
          }
        }

        // Sync isolated private email record
        const privRef = doc(db, 'users', firebaseUser.uid, 'private', 'info');
        const privSnap = await getDoc(privRef);
        if (!privSnap.exists()) {
          await setDoc(privRef, {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${firebaseUser.uid}`, true);
      }
    });

    return () => unsub();
  }, []);

  // Subscribe to user-scoped collections ONLY when signed in
  useEffect(() => {
    if (!authReady || !user) return;

    const uid = user.uid;

    const unsubBookmarks = onSnapshot(
      query(collection(db, 'users', uid, 'bookmarks'), where('uid', '==', uid)),
      (snap) => {
        setBookmarks(snap.docs.map((d) => d.data() as BookmarkRecord));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, `users/${uid}/bookmarks`, true)
    );

    const unsubJournal = onSnapshot(
      query(collection(db, 'users', uid, 'journalEntries'), where('uid', '==', uid)),
      (snap) => {
        const rows = snap.docs.map((d) => d.data() as JournalRecord);
        const getMillis = (ts: unknown): number => {
          if (ts && typeof ts === 'object' && 'toMillis' in ts && typeof (ts as { toMillis: () => number }).toMillis === 'function') {
            return (ts as { toMillis: () => number }).toMillis();
          }
          if (typeof ts === 'number') return ts;
          return 0;
        };
        rows.sort((a, b) => getMillis(b.updatedAt) - getMillis(a.updatedAt));
        setJournalEntries(rows);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, `users/${uid}/journalEntries`, true)
    );

    const unsubProgress = onSnapshot(
      query(collection(db, 'users', uid, 'lessonProgress'), where('uid', '==', uid)),
      (snap) => {
        setLessonProgress(snap.docs.map((d) => d.data() as LessonProgressRecord));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, `users/${uid}/lessonProgress`, true)
    );

    const unsubPractice = onSnapshot(
      query(collection(db, 'users', uid, 'practiceLogs'), where('uid', '==', uid)),
      (snap) => {
        setPracticeLogs(snap.docs.map((d) => d.data() as PracticeLogRecord));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, `users/${uid}/practiceLogs`, true)
    );

    return () => {
      unsubBookmarks();
      unsubJournal();
      unsubProgress();
      unsubPractice();
    };
  }, [authReady, user]);

  // Subscribe to public published CMS items (or all if staff)
  const isStaff = userRole === 'admin' || userRole === 'editor' || userRole === 'content_manager';
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    const q = isStaff
      ? query(collection(db, 'cmsItems'))
      : query(collection(db, 'cmsItems'), where('status', '==', 'published'));

    const unsub = onSnapshot(
      q,
      (snap) => {
        setCmsItems(snap.docs.map((d) => d.data() as CmsItemRecord));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'cmsItems', true)
    );
    return () => unsub();
  }, [isStaff]);

  const signInWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      showToast(lang === 'ta' ? 'உள்நுழைவு வெற்றிகரமாக முடிந்தது' : 'Signed in successfully');
    } catch (err) {
      console.error('Google sign-in error:', err);
      showToast(lang === 'ta' ? 'உள்நுழைவு ரத்து செய்யப்பட்டது' : 'Sign-in was cancelled or blocked');
    }
  }, [lang, showToast]);

  const signOutUser = useCallback(async () => {
    await signOut(auth);
    showToast(lang === 'ta' ? 'வெளியேறினீர்கள்' : 'Signed out');
  }, [lang, showToast]);

  const toggleBookmark = useCallback(
    async (item: Omit<BookmarkRecord, 'id' | 'uid'>) => {
      if (!user) {
        showToast(
          lang === 'ta'
            ? 'புத்தகக்குறியைச் சேமிக்க Google கணக்கில் உள்நுழையவும்'
            : 'Please sign in with Google to save bookmarks to your Wisdom Journal'
        );
        return;
      }
      const docId = `${item.itemType}_${item.itemId}`.replace(/[^a-zA-Z0-9_\-]/g, '_');
      const existing = bookmarks.find((b) => b.id === docId);
      const ref = doc(db, 'users', user.uid, 'bookmarks', docId);

      try {
        if (existing) {
          await deleteDoc(ref);
          showToast(lang === 'ta' ? 'புத்தகக்குறி நீக்கப்பட்டது' : 'Removed from bookmarks');
        } else {
          await setDoc(ref, {
            id: docId,
            uid: user.uid,
            itemType: item.itemType,
            itemId: item.itemId,
            title: item.title.slice(0, 240),
            ...(item.titleTa ? { titleTa: item.titleTa.slice(0, 240) } : {}),
            createdAt: serverTimestamp(),
          });
          showToast(lang === 'ta' ? 'புத்தகக்குறியில் சேமிக்கப்பட்டது' : 'Saved to your bookmarks');
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/bookmarks/${docId}`);
      }
    },
    [user, bookmarks, lang, showToast]
  );

  const isBookmarked = useCallback(
    (itemType: BookmarkRecord['itemType'], itemId: string) => {
      const docId = `${itemType}_${itemId}`.replace(/[^a-zA-Z0-9_\-]/g, '_');
      return bookmarks.some((b) => b.id === docId);
    },
    [bookmarks]
  );

  const saveJournalEntry = useCallback(
    async (entry: { id?: string; title: string; content: string; topic: string; linkedRef?: string }) => {
      if (!user) return;
      const entryId = entry.id || `jr_${Date.now()}`;
      const ref = doc(db, 'users', user.uid, 'journalEntries', entryId);
      try {
        const snap = await getDoc(ref);
        if (snap.exists()) {
          await updateDoc(ref, {
            title: entry.title.trim().slice(0, 200),
            content: entry.content.trim().slice(0, 10000),
            topic: entry.topic.trim().slice(0, 80),
            ...(entry.linkedRef ? { linkedRef: entry.linkedRef.slice(0, 200) } : {}),
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(ref, {
            id: entryId,
            uid: user.uid,
            title: entry.title.trim().slice(0, 200),
            content: entry.content.trim().slice(0, 10000),
            topic: entry.topic.trim().slice(0, 80),
            ...(entry.linkedRef ? { linkedRef: entry.linkedRef.slice(0, 200) } : {}),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
        showToast(lang === 'ta' ? 'குறிப்பு சேமிக்கப்பட்டது' : 'Journal entry saved privately');
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/journalEntries/${entryId}`);
      }
    },
    [user, lang, showToast]
  );

  const deleteJournalEntry = useCallback(
    async (id: string) => {
      if (!user) return;
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'journalEntries', id));
        showToast(lang === 'ta' ? 'குறிப்பு நீக்கப்பட்டது' : 'Journal entry deleted');
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/journalEntries/${id}`);
      }
    },
    [user, lang, showToast]
  );

  const saveLessonProgress = useCallback(
    async (
      programId: string,
      lessonId: string,
      patch: { completed?: boolean; lastPositionSec?: number; quizScore?: number }
    ) => {
      if (!user) return;
      const docId = `${programId}_${lessonId}`.replace(/[^a-zA-Z0-9_\-]/g, '_');
      const ref = doc(db, 'users', user.uid, 'lessonProgress', docId);
      try {
        const snap = await getDoc(ref);
        if (snap.exists()) {
          await updateDoc(ref, {
            completed: patch.completed ?? snap.data().completed ?? false,
            ...(patch.lastPositionSec !== undefined ? { lastPositionSec: patch.lastPositionSec } : {}),
            ...(patch.quizScore !== undefined ? { quizScore: patch.quizScore } : {}),
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(ref, {
            id: docId,
            uid: user.uid,
            programId,
            lessonId,
            completed: patch.completed ?? false,
            ...(patch.lastPositionSec !== undefined ? { lastPositionSec: patch.lastPositionSec } : {}),
            ...(patch.quizScore !== undefined ? { quizScore: patch.quizScore } : {}),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/lessonProgress/${docId}`, true);
      }
    },
    [user]
  );

  const savePracticeLog = useCallback(
    async (log: Omit<PracticeLogRecord, 'id' | 'uid'>) => {
      if (!user) {
        showToast(lang === 'ta' ? 'பயிற்சியைச் சேமிக்க உள்நுழையவும்' : 'Sign in to sync your practice streak across devices');
        return;
      }
      const docId = `pr_${log.dateKey}`;
      const ref = doc(db, 'users', user.uid, 'practiceLogs', docId);
      try {
        const snap = await getDoc(ref);
        if (snap.exists()) {
          await updateDoc(ref, {
            morningDone: log.morningDone,
            afternoonDone: log.afternoonDone,
            eveningDone: log.eveningDone,
            meditationMinutes: log.meditationMinutes,
            ...(log.reflectionNote !== undefined ? { reflectionNote: log.reflectionNote.slice(0, 2000) } : {}),
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(ref, {
            id: docId,
            uid: user.uid,
            dateKey: log.dateKey,
            morningDone: log.morningDone,
            afternoonDone: log.afternoonDone,
            eveningDone: log.eveningDone,
            meditationMinutes: log.meditationMinutes,
            ...(log.reflectionNote !== undefined ? { reflectionNote: log.reflectionNote.slice(0, 2000) } : {}),
            updatedAt: serverTimestamp(),
          });
        }
        showToast(lang === 'ta' ? 'இன்றைய பயிற்சி பதிவு செய்யப்பட்டது' : 'Practice progress saved');
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/practiceLogs/${docId}`);
      }
    },
    [user, lang, showToast]
  );

  return (
    <AppContext.Provider
      value={{
        route,
        routeParam,
        navigate,
        lang,
        setLang,
        toggleLang: () => setLang((p) => (p === 'en' ? 'ta' : 'en')),
        theme,
        setTheme,
        toggleTheme: () => setTheme((p) => (p === 'light' ? 'dark' : 'light')),
        fontScale,
        setFontScale,
        reducedMotion,
        setReducedMotion,
        searchOpen,
        setSearchOpen,
        user,
        authReady,
        userRole,
        isStaff,
        isAdmin,
        signInWithGoogle,
        signOutUser,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        journalEntries,
        saveJournalEntry,
        deleteJournalEntry,
        lessonProgress,
        saveLessonProgress,
        practiceLogs,
        savePracticeLog,
        cmsItems,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
