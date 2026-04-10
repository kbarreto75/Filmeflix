import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import DownloadsPage from './pages/DownloadsPage';
import DetailsPage from './pages/DetailsPage';
import PlayerPage from './pages/PlayerPage';
import { useEffect } from 'react';

function AppLayout() {
  const location = useLocation();
  const isPlayer = location.pathname.startsWith('/player');
  const showNav = !isPlayer && !location.pathname.startsWith('/movie');

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="app-container w-full min-h-screen relative overflow-x-hidden bg-bg-black text-text-primary text-[15px] font-sans antialiased selection:bg-gold/30"
      style={{ '--content-pad': 'clamp(16px, 4vw, 72px)' } as React.CSSProperties}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<DetailsPage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
        </Routes>
      </AnimatePresence>
      {showNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppLayout />
      </HashRouter>
    </AppProvider>
  );
}
