import React, { useState } from 'react';
import { Copy, Check, ExternalLink, ShieldCheck, Gamepad2, Users, Flame, Globe, Compass, ArrowRight, Server, ShieldAlert } from 'lucide-react';
import { ServerConfig, ServerStatus } from '../types';
import { solsticeHeroBg } from '../assets/images';
import { solsticeHeroBg } from '../assets/images';

interface HomeProps {
  serverConfig: ServerConfig;
  serverStatus: ServerStatus;
  onNavigate: (path: string) => void;
  showToast: (msg: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  serverConfig,
  serverStatus,
  onNavigate,
  showToast,
}) => {
  const [copiedIp, setCopiedIp] = useState(false);
  const [gamertagInput, setGamertagInput] = useState('');

  const handleCopyIp = () => {
    navigator.clipboard.writeText(serverConfig.connection.javaAddress);
    setCopiedIp(true);
    showToast(`IP & Port berhasil disalin: ${serverConfig.connection.javaAddress}`);
    setTimeout(() => setCopiedIp(false), 2500);
  };

  const handleGamertagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gamertagInput.trim()) {
      showToast('Harap masukkan Gamertag Xbox Anda!');
      return;
    }
    const message = encodeURIComponent(
      `Halo Admin Solstice SMP, saya ingin mendaftar Whitelist dengan Gamertag Xbox: ${gamertagInput.trim()}`
    );
    const waUrl = `${serverConfig.socials.whatsappGroup}&text=${message}`;
    window.open(waUrl, '_blank');
    showToast(`Membuka WhatsApp untuk mendaftarkan Gamertag: ${gamertagInput.trim()}`);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* FULLSCREEN HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 overflow-hidden">
        {/* Fullscreen Hero Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={solsticeHeroBg}
            alt="Solstice SMP Floating Island Background"
            className="w-full h-full object-cover object-center scale-105 filter brightness-90 transform animate-pulse-slow"
          />
          {/* Dark Overlay with Emerald Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d0a] via-[#090d0a]/75 to-[#090d0a]/60" />
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-lg shadow-emerald-950/50">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Server Online</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300 font-mono">
              {serverStatus.players.online}/{serverStatus.players.max} Pemain
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white font-heading uppercase drop-shadow-2xl">
              SOLSTICE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-green-500 text-glow">SMP</span>
            </h1>

            <p className="text-emerald-400 font-mono text-sm sm:text-xl font-semibold uppercase tracking-widest">
              {serverConfig.heroSubtitle}
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white max-w-2xl mx-auto">
              {serverConfig.heroTitle}
            </h2>

            <p className="text-xs sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal bg-[#090d0a]/40 p-4 rounded-2xl border border-emerald-500/10 backdrop-blur-sm">
              {serverConfig.heroDescription}
            </p>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* 1. Join Server */}
            <button
              onClick={() => onNavigate('/join')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black font-extrabold text-base tracking-wide uppercase transition-all transform hover:-translate-y-1 shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-3 group"
            >
              <Gamepad2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Join Server</span>
            </button>

            {/* 2. Copy IP */}
            <button
              onClick={handleCopyIp}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0e1811]/90 hover:bg-[#15251a] border border-emerald-500/40 text-emerald-200 font-bold text-base transition-all transform hover:-translate-y-1 shadow-xl flex items-center justify-center gap-3 font-mono"
            >
              {copiedIp ? (
                <>
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>IP Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-emerald-400" />
                  <span>Copy IP Server</span>
                </>
              )}
            </button>

            {/* 3. WhatsApp Group */}
            <a
              href={serverConfig.socials.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-green-950/80 hover:bg-green-900/90 border border-green-500/40 text-green-300 font-bold text-base transition-all transform hover:-translate-y-1 shadow-xl flex items-center justify-center gap-3"
            >
              <ExternalLink className="w-5 h-5" />
              <span>WhatsApp Group</span>
            </a>
          </div>

          {/* Connection quick details pills */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-xs text-zinc-300 font-mono">
            <div className="p-2.5 rounded-xl bg-[#090d0a]/80 border border-emerald-500/20 backdrop-blur-md">
              <span className="text-zinc-500 block text-[10px]">IP ADDRESS</span>
              <span className="text-emerald-300 font-semibold truncate block">
                {serverConfig.connection.ip}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#090d0a]/80 border border-emerald-500/20 backdrop-blur-md">
              <span className="text-zinc-500 block text-[10px]">PORT BEDROCK</span>
              <span className="text-emerald-300 font-semibold block">{serverConfig.connection.port}</span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-[#090d0a]/80 border border-emerald-500/20 backdrop-blur-md">
              <span className="text-zinc-500 block text-[10px]">SUPPORT</span>
              <span className="text-emerald-300 font-semibold block">Java & Bedrock</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK WHITELIST GAMERTAG FORM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-emerald-500/30 relative overflow-hidden bg-gradient-to-br from-emerald-950/40 via-[#0d1510]/80 to-[#090d0a]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AKSES WHITELIST FAIR-PLAY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Kirim Gamertag Xbox Anda Sekarang
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Seluruh pemain wajib mendaftarkan Gamertag Xbox sebelum bergabung. Sistem ini menjamin tidak ada penggunaan akun ganda atau kecurangan.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleGamertagSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={gamertagInput}
                    onChange={(e) => setGamertagInput(e.target.value)}
                    placeholder="Masukkan Gamertag Xbox / Minecraft..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-zinc-950/90 border border-emerald-500/40 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 text-sm font-mono shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm uppercase tracking-wide transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <span>Daftar Whitelist via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SERVER CONCEPT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Konsep <span className="text-emerald-400">Survival Murni</span>
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
            Solstice SMP dirancang khusus untuk pemain yang merindukan esensi sejati permainan Minecraft Survival tanpa keanehan plugin tambahan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serverConfig.concept.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-2xl p-6 space-y-3 border border-emerald-500/20 relative group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm group-hover:scale-110 transition-transform">
                0{idx + 1}
              </div>
              <p className="text-sm text-emerald-100 font-medium leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* RULES PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-emerald-500/20 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Aturan Utama Server
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Pahami hal yang diperbolehkan dan dilarang di Solstice SMP
            </p>
          </div>
          <button
            onClick={() => onNavigate('/rules')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono"
          >
            <span>LIHAT ATURAN LENGKAP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Allowed Rules Card */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 space-y-4 bg-emerald-950/20">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Diperbolehkan (Allowed)</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {serverConfig.rules.allowed.map((rule, i) => (
                <div
                  key={i}
                  className="px-3.5 py-2.5 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-200 text-xs font-medium flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prohibited Rules Card */}
          <div className="glass-card rounded-2xl p-6 border border-red-500/30 space-y-4 bg-red-950/10">
            <div className="flex items-center gap-2 text-red-400 font-bold text-base">
              <ShieldAlert className="w-5 h-5 text-red-400" />
              <span>Dilarang keras (Prohibited)</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {serverConfig.rules.prohibited.map((rule, i) => (
                <div
                  key={i}
                  className="px-3.5 py-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs font-medium flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
