import React, { useState, useEffect } from 'react';
import { DeveloperData, ServerConfig, NavigationItem, ServerStatus } from './types';
import {
  fetchDeveloperData,
  fetchServerConfig,
  fetchNavigation,
  fetchServerStatus,
} from './services/api';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

import { Home } from './pages/Home';
import { ServerPage } from './pages/ServerPage';
import { RulesPage } from './pages/RulesPage';
import { JoinPage } from './pages/JoinPage';
import { CommunityPage } from './pages/CommunityPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [developerData, setDeveloperData] = useState<DeveloperData | null>(null);
  const [serverConfig, setServerConfig] = useState<ServerConfig | null>(null);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    online: true,
    players: { online: 12, max: 50 },
    version: 'Vanilla 1.21.x (Bedrock & Java)',
    pingMs: 38,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load configuration & API data
  useEffect(() => {
    async function loadData() {
      try {
        const [devData, configData, navData, statusData] = await Promise.all([
          fetchDeveloperData(),
          fetchServerConfig(),
          fetchNavigation(),
          fetchServerStatus(),
        ]);

        setDeveloperData(devData);
        setServerConfig(configData);
        setNavigationItems(navData);
        setServerStatus(statusData);
      } catch (err) {
        console.error('Error loading initial app data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Handle URL history push and popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  if (loading || !serverConfig) {
    return (
      <div className="min-h-screen bg-[#090d0a] text-emerald-100 flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
          <img
            src="/src/assets/images/solstice_logo_1784981126871.jpg"
            alt="Loading Logo"
            className="w-10 h-10 rounded-full object-cover absolute inset-3 border border-emerald-500/40"
          />
        </div>
        <span className="font-mono text-xs text-emerald-400 animate-pulse tracking-widest uppercase">
          Memuat Solstice SMP...
        </span>
      </div>
    );
  }

  // Route matching
  const renderPage = () => {
    const path = currentPath.toLowerCase();

    if (path === '/' || path === '/home' || path === '/index.html') {
      return (
        <Home
          serverConfig={serverConfig}
          serverStatus={serverStatus}
          onNavigate={navigateTo}
          showToast={showToast}
        />
      );
    }

    if (path === '/server' || path === '/server.html') {
      return (
        <ServerPage
          serverConfig={serverConfig}
          serverStatus={serverStatus}
          showToast={showToast}
        />
      );
    }

    if (path === '/rules' || path === '/rules.html') {
      return <RulesPage serverConfig={serverConfig} />;
    }

    if (path === '/join' || path === '/join.html') {
      return <JoinPage serverConfig={serverConfig} showToast={showToast} />;
    }

    if (path === '/community' || path === '/community.html') {
      return (
        <CommunityPage
          serverConfig={serverConfig}
          developerData={developerData}
          showToast={showToast}
        />
      );
    }

    if (path === '/about' || path === '/about.html') {
      return <AboutPage serverConfig={serverConfig} developerData={developerData} />;
    }

    return <NotFoundPage onNavigate={navigateTo} />;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#090d0a] text-emerald-50 font-['Plus_Jakarta_Sans',sans-serif]">
      <div>
        <Header
          currentPath={currentPath}
          onNavigate={navigateTo}
          developerData={developerData}
          navigationItems={navigationItems}
        />

        <main className="min-h-[80vh]">{renderPage()}</main>
      </div>

      <Footer developerData={developerData} onNavigate={navigateTo} />

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
