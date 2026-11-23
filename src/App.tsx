/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppProvider, useApp } from './context/AppContext';
import { AudioProvider, useAudio } from './context/AudioContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { MiniAudioPlayer } from './components/MiniAudioPlayer';
import { HomePage } from './pages/HomePage';
import { ThirukkuralPage } from './pages/ThirukkuralPage';
import { VedantaPage } from './pages/VedantaPage';
import { WisdomLibraryPage } from './pages/WisdomLibraryPage';
import { AudioLibraryPage } from './pages/AudioLibraryPage';
import { DigitalLibraryPage } from './pages/DigitalLibraryPage';
import { WisdomMapsPage } from './pages/WisdomMapsPage';
import { DailyPracticePage, MeditationCentrePage } from './pages/PracticeAndMeditationPages';
import { SpiritualPlacesPage, ArticlesPage } from './pages/PlacesAndArticlesPages';
import { ActivitiesPage, QuizzesPage } from './pages/ActivitiesAndQuizzesPages';
import { CertificatesPage, JournalPage } from './pages/CertificatesAndJournalPages';
import { GlobalSearchPage } from './pages/GlobalSearchPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const SanctuaryRouter: React.FC = () => {
  const { route, toastMessage } = useApp();
  const { currentTrack } = useAudio();

  const renderPage = () => {
    switch (route) {
      case 'home':
        return <HomePage />;
      case 'thirukkural':
        return <ThirukkuralPage />;
      case 'vedanta':
        return <VedantaPage />;
      case 'wisdom-library':
        return <WisdomLibraryPage />;
      case 'audio':
        return <AudioLibraryPage />;
      case 'practice':
        return <DailyPracticePage />;
      case 'books':
        return <DigitalLibraryPage />;
      case 'wisdom-maps':
        return <WisdomMapsPage />;
      case 'certificates':
        return <CertificatesPage />;
      case 'journal':
        return <JournalPage />;
      case 'places':
        return <SpiritualPlacesPage />;
      case 'articles':
        return <ArticlesPage />;
      case 'activities':
        return <ActivitiesPage />;
      case 'quizzes':
        return <QuizzesPage />;
      case 'meditation':
        return <MeditationCentrePage />;
      case 'search':
        return <GlobalSearchPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#FFF9ED] dark:bg-[#0F1A2B] text-[#1F1914] dark:text-[#FBF4E4] transition-colors ${
        currentTrack ? 'pb-14' : ''
      }`}
    >
      <Header />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <GlobalSearchModal />
      <MiniAudioPlayer />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed right-4 z-50 max-w-sm px-4 py-3 rounded-lg border border-[#C6A15B]/60 bg-[#1F1914] dark:bg-[#FBF4E4] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs sm:text-sm font-medium shadow-lg ${
            currentTrack ? 'bottom-18' : 'bottom-5'
          }`}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AudioProvider>
          <SanctuaryRouter />
        </AudioProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}
