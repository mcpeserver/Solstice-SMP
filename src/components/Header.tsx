import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, ShieldCheck, Code, Globe, MessageSquare, Terminal } from 'lucide-react';
import { DeveloperData, NavigationItem } from '../types';
import { solsticeLogo } from '../assets/images';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  developerData: DeveloperData | null;
  navigationItems: NavigationItem[];
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  developerData,
  navigationItems,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'h-16 bg-[#090d0a]/90 backdrop-blur-md border-b border-emerald-500/20 shadow-lg shadow-emerald-950/40'
            : 'h-20 bg-gradient-to-b from-[#090d0a]/90 via-[#090d0a]/50 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo & Server Name */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            aria-label="Solstice SMP Home"
          >
            <div className="relative overflow-hidden rounded-lg border border-emerald-500/30 p-0.5 bg-emerald-950/40 group-hover:border-emerald-400 transition-colors">
              <img
                src={solsticeLogo}
                alt="Solstice SMP Logo"
                className={`transition-all duration-300 object-cover rounded-md ${
                  isScrolled ? 'w-8 h-8' : 'w-10 h-10'
                }`}
              />
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg sm:text-xl text-white tracking-wide flex items-center gap-1.5">
                SOLSTICE <span className="text-emerald-400">SMP</span>
              </span>
              <p className="text-[10px] text-emerald-400/80 tracking-wider font-mono hidden sm:block">
                PURE SURVIVAL VANILLA
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navigationItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-zinc-300 hover:text-white hover:bg-emerald-900/20'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Top-Right Developer Badge */}
          <div className="hidden lg:flex items-center gap-3">
            {developerData ? (
              <a
                href={developerData.website.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/20 text-xs text-emerald-300 hover:border-emerald-400/50 hover:bg-emerald-900/40 transition-all"
                title={`Dev: ${developerData.name}`}
              >
                <Code className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-[11px] truncate max-w-[120px]">
                  {developerData.name}
                </span>
                <ExternalLink className="w-3 h-3 text-emerald-400/70" />
              </a>
            ) : (
              <div className="w-24 h-6 bg-emerald-950/40 animate-pulse rounded-full" />
            )}

            <button
              onClick={() => handleNavClick('/join')}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-wide uppercase transition-all transform hover:scale-105 shadow-md shadow-emerald-500/20"
            >
              Main Sekarang
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => handleNavClick('/join')}
              className="px-3 py-1 rounded-md bg-emerald-500 text-black font-bold text-xs"
            >
              Join
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex flex-col justify-between bg-[#090d0a]/98 backdrop-blur-2xl pt-24 pb-8 px-6 overflow-y-auto animate-fade-in border-b border-emerald-500/30">
          <div className="space-y-6">
            <div className="pb-3 border-b border-emerald-500/20 flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                Navigasi Website
              </span>
              <span className="text-xs text-zinc-400">Solstice SMP</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navigationItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.path)}
                    className={`px-4 py-3 rounded-xl text-left font-medium text-sm transition-all ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-zinc-900/60 text-zinc-300 hover:bg-emerald-950/50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Developer Information Drawer Section */}
            <div className="pt-4 border-t border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                <Code className="w-4 h-4" />
                <span>Developer Info (Realtime API)</span>
              </div>

              {developerData ? (
                <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-4 space-y-2.5 text-xs text-zinc-300">
                  <div className="flex justify-between items-center pb-2 border-b border-emerald-500/10">
                    <span className="text-zinc-400">Developer</span>
                    <span className="font-semibold text-white">{developerData.name}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">WhatsApp</span>
                    <a
                      href={`https://wa.me/${developerData.contact.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      <MessageSquare className="w-3 h-3" />
                      {developerData.contact.phone}
                    </a>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Portfolio</span>
                    <a
                      href={developerData.website.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1 truncate max-w-[160px]"
                    >
                      <Globe className="w-3 h-3" />
                      {developerData.website.portfolio.replace('https://', '')}
                    </a>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Community</span>
                    <span className="text-white font-medium">{developerData.community.name}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Discord</span>
                    <a
                      href={developerData.community.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <Terminal className="w-3 h-3" />
                      Join Discord
                    </a>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Website</span>
                    <a
                      href={developerData.community.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" />
                      Visit Site
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl animate-pulse space-y-2">
                  <div className="h-4 bg-emerald-900/40 rounded w-1/2"></div>
                  <div className="h-4 bg-emerald-900/40 rounded w-3/4"></div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 text-center text-xs text-zinc-500">
            Solstice SMP © 2026 - Pure Survival Vanilla
          </div>
        </div>
      )}
    </>
  );
};
