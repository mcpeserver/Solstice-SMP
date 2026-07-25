import React from 'react';
import { Info, ShieldCheck, Code, Globe, Phone, ExternalLink, MessageSquare, Terminal } from 'lucide-react';
import { DeveloperData, ServerConfig } from '../types';

interface AboutPageProps {
  serverConfig: ServerConfig;
  developerData: DeveloperData | null;
}

export const AboutPage: React.FC<AboutPageProps> = ({ serverConfig, developerData }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <Info className="w-4 h-4" />
          <span>TENTANG KAMI</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
          Mengenal <span className="text-emerald-400">Solstice SMP</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Server Minecraft Survival murni tanpa plugin tambahan. Murni vanilla, adil, dan mengutamakan kebersamaan komunitas.
        </p>
      </div>

      {/* Story & Vision */}
      <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 space-y-6 bg-gradient-to-br from-emerald-950/20 via-[#0d1510] to-[#090d0a]">
        <h2 className="text-2xl font-bold text-white font-heading">Visi & Filosofi Survival Murni</h2>
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            Solstice SMP dibuat dari kerinduan para pecinta Minecraft akan rasa survival murni tanpa gangguan sistem ekonomi buatan, plugin klaim tanah berlebihan, ataupun fitur pay-to-win. Kami membiarkan mekanik alami Minecraft menjadi penggerak utama eksplorasi dan perdagangan antar pemain.
          </p>
          <p>
            Dengan memberlakukan sistem Whitelist berbasis Gamertag, Solstice SMP memastikan setiap akun pemain telah terdaftar secara sah sehingga lingkungan bermain tetap terjaga dari kecurangan seperti penggunaan akun ganda, X-Ray, ataupun modifikasi ilegal lainnya.
          </p>
        </div>
      </div>

      {/* Developer Information Section (Zero Hardcoded) */}
      <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 space-y-6">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white font-heading">Data Developer Realtime</h3>
              <span className="text-xs text-emerald-400 font-mono">Diambil langsung via JSON API</span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono">
            Zero Hardcoded
          </span>
        </div>

        {developerData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/20 space-y-1">
              <span className="text-zinc-500 font-mono block">DEVELOPER NAME</span>
              <span className="text-white font-bold text-sm block">{developerData.name}</span>
              <p className="text-zinc-400 text-[11px]">Mapped property: <code className="text-emerald-400">data.name</code></p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/20 space-y-1">
              <span className="text-zinc-500 font-mono block">PHONE / WHATSAPP</span>
              <a
                href={`https://wa.me/${developerData.contact.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold text-sm block hover:underline"
              >
                {developerData.contact.phone}
              </a>
              <p className="text-zinc-400 text-[11px]">Mapped: <code className="text-emerald-400">data.contact.phone / whatsapp</code></p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/20 space-y-1">
              <span className="text-zinc-500 font-mono block">PORTFOLIO</span>
              <a
                href={developerData.website.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold text-sm block hover:underline truncate"
              >
                {developerData.website.portfolio}
              </a>
              <p className="text-zinc-400 text-[11px]">Mapped: <code className="text-emerald-400">data.website.portfolio</code></p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/20 space-y-1">
              <span className="text-zinc-500 font-mono block">COMMUNITY NAME</span>
              <span className="text-white font-bold text-sm block">{developerData.community.name}</span>
              <p className="text-zinc-400 text-[11px]">Mapped: <code className="text-emerald-400">data.community.name</code></p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/20 space-y-1">
              <span className="text-zinc-500 font-mono block">COMMUNITY WEBSITE</span>
              <a
                href={developerData.community.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold text-sm block hover:underline truncate"
              >
                {developerData.community.website}
              </a>
              <p className="text-zinc-400 text-[11px]">Mapped: <code className="text-emerald-400">data.community.website</code></p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/20 space-y-1">
              <span className="text-zinc-500 font-mono block">DISCORD LINK</span>
              <a
                href={developerData.community.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold text-sm block hover:underline truncate"
              >
                {developerData.community.discord}
              </a>
              <p className="text-zinc-400 text-[11px]">Mapped: <code className="text-emerald-400">data.community.discord</code></p>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-emerald-950/20 rounded-2xl animate-pulse space-y-2">
            <div className="h-4 bg-emerald-900/40 rounded w-1/2"></div>
            <div className="h-4 bg-emerald-900/40 rounded w-2/3"></div>
          </div>
        )}
      </div>
    </div>
  );
};
