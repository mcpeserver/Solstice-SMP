import React, { useState } from 'react';
import { Gamepad2, ShieldCheck, Copy, Check, MessageSquare, ExternalLink, ArrowRight, UserCheck } from 'lucide-react';
import { ServerConfig } from '../types';

interface JoinPageProps {
  serverConfig: ServerConfig;
  showToast: (msg: string) => void;
}

export const JoinPage: React.FC<JoinPageProps> = ({ serverConfig, showToast }) => {
  const [gamertag, setGamertag] = useState('');
  const [copiedIp, setCopiedIp] = useState(false);

  const handleCopyIp = () => {
    navigator.clipboard.writeText(serverConfig.connection.javaAddress);
    setCopiedIp(true);
    showToast(`IP Server disalin: ${serverConfig.connection.javaAddress}`);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  const handleSendWhitelist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gamertag.trim()) {
      showToast('Masukkan Gamertag Xbox / Minecraft Anda terlebih dahulu!');
      return;
    }
    const msg = encodeURIComponent(
      `Halo Admin Solstice SMP, saya ingin mendaftar Whitelist dengan Gamertag: ${gamertag.trim()}`
    );
    const url = `${serverConfig.socials.whatsappGroup}&text=${msg}`;
    window.open(url, '_blank');
    showToast(`Membuka WhatsApp untuk mengirim Whitelist: ${gamertag.trim()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <Gamepad2 className="w-4 h-4" />
          <span>PANDUAN BERGABUNG & WHITELIST</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
          Cara Join <span className="text-emerald-400">Solstice SMP</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Ikuti 4 langkah mudah di bawah ini untuk mendaftarkan akun Xbox Gamertag Anda ke dalam Whitelist server.
        </p>
      </div>

      {/* Step by Step Guide */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Step 1 */}
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 space-y-3 relative">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-black font-extrabold flex items-center justify-center font-mono text-sm">
            1
          </div>
          <h3 className="font-bold text-white text-base font-heading">Salin IP Server</h3>
          <p className="text-xs text-zinc-400">
            Gunakan IP <code className="text-emerald-300 font-mono">solsticeseason2.ddns.net</code> dan Port <code className="text-emerald-300 font-mono">25020</code>.
          </p>
          <button
            onClick={handleCopyIp}
            className="w-full py-2 px-3 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
          >
            {copiedIp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedIp ? 'Tersalin' : 'Copy IP Address'}</span>
          </button>
        </div>

        {/* Step 2 */}
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 space-y-3 relative">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-black font-extrabold flex items-center justify-center font-mono text-sm">
            2
          </div>
          <h3 className="font-bold text-white text-base font-heading">Siapkan Gamertag</h3>
          <p className="text-xs text-zinc-400">
            Pastikan Anda memiliki nama Gamertag Xbox / Minecraft resmi yang aktif dan benar.
          </p>
          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 font-mono">
            Contoh: SteveCraft_21
          </div>
        </div>

        {/* Step 3 */}
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 space-y-3 relative">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-black font-extrabold flex items-center justify-center font-mono text-sm">
            3
          </div>
          <h3 className="font-bold text-white text-base font-heading">Kirim ke WhatsApp</h3>
          <p className="text-xs text-zinc-400">
            Kirimkan pesan Whitelist Gamertag ke grup WhatsApp pengelola Solstice SMP.
          </p>
          <a
            href={serverConfig.socials.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-green-950 border border-green-500/30 text-green-300 hover:bg-green-900/50 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Grup WhatsApp</span>
          </a>
        </div>

        {/* Step 4 */}
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 space-y-3 relative">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-black font-extrabold flex items-center justify-center font-mono text-sm">
            4
          </div>
          <h3 className="font-bold text-white text-base font-heading">Masuk & Main</h3>
          <p className="text-xs text-zinc-400">
            Setelah Admin mengkonfirmasi, buka Minecraft Bedrock/Java dan selamat bermain!
          </p>
          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pure Vanilla Survival</span>
          </div>
        </div>
      </div>

      {/* Interactive Form Card */}
      <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-[#0d1510] to-[#090d0a] space-y-6">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <UserCheck className="w-10 h-10 text-emerald-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white font-heading">
            Form Pendaftaran Whitelist
          </h2>
          <p className="text-xs text-zinc-300">
            Ketikkan Gamertag Xbox Anda untuk membuka tautan pendaftaran otomatis ke WhatsApp Admin.
          </p>
        </div>

        <form onSubmit={handleSendWhitelist} className="max-w-md mx-auto space-y-4">
          <div>
            <label className="text-xs font-mono text-emerald-400 block mb-1">
              GAMERTAG XBOX / MINECRAFT
            </label>
            <input
              type="text"
              value={gamertag}
              onChange={(e) => setGamertag(e.target.value)}
              placeholder="Contoh: Gamertag123..."
              className="w-full px-4 py-3 rounded-2xl bg-zinc-950 border border-emerald-500/40 text-white font-mono text-sm focus:outline-none focus:border-emerald-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black font-extrabold text-sm uppercase tracking-wide transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <span>Kirim Pendaftaran Whitelist</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
