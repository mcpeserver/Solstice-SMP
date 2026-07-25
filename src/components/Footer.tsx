import React from 'react';
import { ExternalLink, ShieldCheck, Heart, Code, Globe, MessageSquare } from 'lucide-react';
import { DeveloperData } from '../types';
import { solsticeLogo } from '../assets/images';

interface FooterProps {
  developerData: DeveloperData | null;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ developerData, onNavigate }) => {
  return (
    <footer className="bg-[#060907] border-t border-emerald-500/20 pt-16 pb-12 text-zinc-400 relative overflow-hidden">
      {/* Background glow ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-500/15">
          {/* Column 1: Server Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={solsticeLogo}
                alt="Solstice SMP Logo"
                className="w-10 h-10 rounded-lg border border-emerald-500/40 object-cover"
              />
              <span className="font-heading font-black text-xl text-white tracking-wider">
                SOLSTICE <span className="text-emerald-400">SMP</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Server Minecraft Survival Murni tanpa plugin tambahan. Murni vanilla, Whitelist Gamertag, support Java Edition & Bedrock Edition.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              solsticeseason2.ddns.net:25020
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-emerald-400 transition-colors">
                  Home (Beranda)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/server')} className="hover:text-emerald-400 transition-colors">
                  Informasi Server
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/rules')} className="hover:text-emerald-400 transition-colors">
                  Aturan Server (Rules)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/join')} className="hover:text-emerald-400 transition-colors">
                  Cara Join & Whitelist
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/community')} className="hover:text-emerald-400 transition-colors">
                  Grup WhatsApp & Donasi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-emerald-400 transition-colors">
                  Tentang Solstice SMP
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Server Specifications */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Spesifikasi Server
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-zinc-800/60 pb-1">
                <span className="text-zinc-500">Konsep</span>
                <span className="text-emerald-300 font-medium">Pure Vanilla Survival</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/60 pb-1">
                <span className="text-zinc-500">Plugin</span>
                <span className="text-white">Tanpa Plugin (0 Plugin)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/60 pb-1">
                <span className="text-zinc-500">Sistem Akun</span>
                <span className="text-emerald-300 font-medium">Whitelist Gamertag</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/60 pb-1">
                <span className="text-zinc-500">Edition</span>
                <span className="text-white">Bedrock & Java</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-zinc-500">Border Map</span>
                <span className="text-emerald-400 font-mono">8000 x 8000</span>
              </div>
            </div>
          </div>

          {/* Column 4: Zero Hardcoded Realtime Developer Data */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Code className="w-4 h-4" /> Developer Info (Realtime)
            </h4>

            {developerData ? (
              <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Developer</span>
                  <span className="text-white font-semibold">{developerData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Phone</span>
                  <span className="text-emerald-300 font-mono">{developerData.contact.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Portfolio</span>
                  <a
                    href={developerData.website.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline truncate max-w-[140px] flex items-center gap-1"
                  >
                    <span>Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Community</span>
                  <span className="text-white">{developerData.community.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Community Site</span>
                  <a
                    href={developerData.community.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Website</span>
                    <Globe className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Discord</span>
                  <a
                    href={developerData.community.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Discord</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-emerald-950/20 rounded-xl animate-pulse space-y-2 border border-emerald-500/10">
                <div className="h-3 bg-emerald-900/40 rounded w-full"></div>
                <div className="h-3 bg-emerald-900/40 rounded w-2/3"></div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Solstice SMP. Built for pure Minecraft Survival experience.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://chat.whatsapp.com/JOePs9rsz0A39j4IwHmQYz?s=cl&p=a&ilr=4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              Grup WhatsApp
            </a>
            <span>•</span>
            <button onClick={() => onNavigate('/rules')} className="hover:text-emerald-400 transition-colors">
              Aturan
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/about')} className="hover:text-emerald-400 transition-colors">
              About
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
