import React, { useState } from 'react';
import { MessageSquare, Heart, ExternalLink, Copy, Check, Users, ShieldCheck, Globe, Terminal, Code } from 'lucide-react';
import { DeveloperData, ServerConfig } from '../types';

interface CommunityPageProps {
  serverConfig: ServerConfig;
  developerData: DeveloperData | null;
  showToast: (msg: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({
  serverConfig,
  developerData,
  showToast,
}) => {
  const [copiedDonation, setCopiedDonation] = useState(false);

  const handleCopyDonation = () => {
    navigator.clipboard.writeText(serverConfig.socials.donationPhone);
    setCopiedDonation(true);
    showToast(`Nomor Donasi disalin: ${serverConfig.socials.donationPhone}`);
    setTimeout(() => setCopiedDonation(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <Users className="w-4 h-4" />
          <span>KOMUNITAS & DUKUNGAN SERVER</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
          Komunitas <span className="text-emerald-400">Solstice SMP</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Bergabunglah dengan grup percakapan sesama pemain survival, dapatkan pengumuman event terbaru, dan dukung kelangsungan server.
        </p>
      </div>

      {/* Main Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* WhatsApp Group Card */}
        <div className="glass-card rounded-3xl p-8 border border-green-500/30 space-y-6 bg-gradient-to-br from-green-950/30 via-[#0d1510] to-[#090d0a] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-3 w-fit rounded-2xl bg-green-950 border border-green-500/40 text-green-400">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white font-heading">Grup WhatsApp Resmi</h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Pusat diskusi komunitas, koordinasi tim, penyerahan Gamertag Whitelist, dan berita pemeliharaan server Solstice SMP.
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <a
              href={serverConfig.socials.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-green-500 hover:bg-green-400 text-black font-extrabold text-sm uppercase tracking-wide transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
            >
              <span>Bergabung ke WhatsApp Group</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <span className="text-[11px] text-zinc-500 text-center block font-mono">
              Link: chat.whatsapp.com/JOePs9rsz...
            </span>
          </div>
        </div>

        {/* Donation Support Card */}
        <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 space-y-6 bg-gradient-to-br from-emerald-950/30 via-[#0d1510] to-[#090d0a] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-3 w-fit rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              <Heart className="w-8 h-8 text-emerald-400 fill-emerald-500/20" />
            </div>
            <h2 className="text-2xl font-bold text-white font-heading">Donasi & Dukungan Server</h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Dukungan Anda sangat berarti untuk membiayai sewa hosting dedicated, domain, serta perawatan server survival tanpa plugin.
            </p>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/30 space-y-2">
              <span className="text-[10px] text-zinc-400 font-mono block">NOMOR REKENING / E-WALLET / DANA / OVO / GOPAY</span>
              <div className="flex items-center justify-between font-mono text-emerald-300 font-bold text-lg">
                <span>{serverConfig.socials.donationPhone}</span>
                <button
                  onClick={handleCopyDonation}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copiedDonation ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedDonation ? 'Tersalin' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs text-zinc-400 text-center font-mono">
            Atas nama pengelola Solstice SMP • Terima kasih atas apresiasi Anda!
          </div>
        </div>
      </div>

      {/* Developer Realtime Community Section */}
      <div className="glass-card rounded-3xl p-8 border border-emerald-500/20 space-y-6">
        <div className="border-b border-emerald-500/20 pb-4">
          <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <Code className="w-5 h-5 text-emerald-400" />
            <span>Ekosistem Komunitas Pengembang (API Realtime)</span>
          </h2>
        </div>

        {developerData ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-emerald-500/20 space-y-2">
              <span className="text-zinc-500 font-mono block">NAMA NATIVE</span>
              <span className="text-white font-bold text-sm block">{developerData.community.name}</span>
              <p className="text-zinc-400 text-[11px]">Komunitas pengembang server Minecraft Indonesia.</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-emerald-500/20 space-y-2">
              <span className="text-zinc-500 font-mono block">DISCORD COMMUNITY</span>
              <a
                href={developerData.community.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold text-sm hover:underline flex items-center gap-1"
              >
                <span>Masuk Server Discord</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-zinc-400 text-[11px]">Forum diskusi voice & text antar pengembang.</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-emerald-500/20 space-y-2">
              <span className="text-zinc-500 font-mono block">WEBSITE PORTFOLIO</span>
              <a
                href={developerData.website.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold text-sm hover:underline flex items-center gap-1 truncate"
              >
                <span>{developerData.website.portfolio}</span>
                <Globe className="w-3.5 h-3.5 shrink-0" />
              </a>
              <p className="text-zinc-400 text-[11px]">Portfolio karya & project server pengembang.</p>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-emerald-950/20 rounded-2xl animate-pulse space-y-2">
            <div className="h-4 bg-emerald-900/40 rounded w-1/3"></div>
            <div className="h-4 bg-emerald-900/40 rounded w-2/3"></div>
          </div>
        )}
      </div>
    </div>
  );
};
