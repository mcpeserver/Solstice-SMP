import React, { useState } from 'react';
import { Server, Copy, Check, ShieldCheck, Terminal, Smartphone, Laptop, Cpu, Radio, Hash } from 'lucide-react';
import { ServerConfig, ServerStatus } from '../types';

interface ServerPageProps {
  serverConfig: ServerConfig;
  serverStatus: ServerStatus;
  showToast: (msg: string) => void;
}

export const ServerPage: React.FC<ServerPageProps> = ({
  serverConfig,
  serverStatus,
  showToast,
}) => {
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrockIp, setCopiedBedrockIp] = useState(false);
  const [copiedPort, setCopiedPort] = useState(false);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${type} berhasil disalin: ${text}`);
    if (type === 'Java IP') {
      setCopiedJava(true);
      setTimeout(() => setCopiedJava(false), 2000);
    } else if (type === 'Bedrock IP') {
      setCopiedBedrockIp(true);
      setTimeout(() => setCopiedBedrockIp(false), 2000);
    } else if (type === 'Port') {
      setCopiedPort(true);
      setTimeout(() => setCopiedPort(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <Server className="w-4 h-4" />
          <span>INFORMASI TEKNIS & KONEKSI</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
          Detail Server <span className="text-emerald-400">Solstice SMP</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Server Minecraft Survival murni tanpa plugin tambahan. Murni vanilla, fair play, dan mendukung koneksi dari Java Edition maupun Bedrock Edition.
        </p>
      </div>

      {/* Live Connection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Java Edition Connection Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6 relative overflow-hidden bg-gradient-to-b from-emerald-950/30 to-[#090d0a]">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white font-heading">Java Edition</h3>
                <span className="text-xs text-emerald-400 font-mono">PC / Mac / Linux</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono">
              v1.21.x
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 font-mono block mb-1">SERVER ADDRESS (IP:PORT)</label>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950 border border-emerald-500/30 font-mono text-emerald-300 text-sm">
                <span>{serverConfig.connection.javaAddress}</span>
                <button
                  onClick={() => copyToClipboard(serverConfig.connection.javaAddress, 'Java IP')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copiedJava ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedJava ? 'Tersalin' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Buka Minecraft Java Edition &gt; Multiplayer &gt; Add Server &gt; Masukkan Server Address: <code className="text-emerald-300 font-mono">solsticeseason2.ddns.net:25020</code>
            </p>
          </div>
        </div>

        {/* Bedrock Edition Connection Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6 relative overflow-hidden bg-gradient-to-b from-emerald-950/30 to-[#090d0a]">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white font-heading">Bedrock Edition</h3>
                <span className="text-xs text-emerald-400 font-mono">Android / iOS / Win10 / Console</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono">
              v1.21.x
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 font-mono block mb-1">SERVER IP</label>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-emerald-500/30 font-mono text-emerald-300 text-xs">
                <span className="truncate">{serverConfig.connection.ip}</span>
                <button
                  onClick={() => copyToClipboard(serverConfig.connection.ip, 'Bedrock IP')}
                  className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300"
                >
                  {copiedBedrockIp ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-mono block mb-1">PORT</label>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-emerald-500/30 font-mono text-emerald-300 text-xs">
                <span>{serverConfig.connection.port}</span>
                <button
                  onClick={() => copyToClipboard(serverConfig.connection.port.toString(), 'Port')}
                  className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300"
                >
                  {copiedPort ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Buka Minecraft Bedrock &gt; Play &gt; Servers &gt; Add Server &gt; Masukkan IP <code className="text-emerald-300 font-mono">solsticeseason2.ddns.net</code> dan Port <code className="text-emerald-300 font-mono">25020</code>
          </p>
        </div>
      </div>

      {/* Concept Breakdown Table */}
      <div className="glass-card rounded-3xl p-8 border border-emerald-500/20 space-y-6">
        <div className="border-b border-emerald-500/20 pb-4">
          <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Spesifikasi Filosofi Server Solstice SMP</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-emerald-500/20 space-y-1">
            <span className="text-zinc-500 font-mono block">KONSEP</span>
            <span className="text-emerald-300 font-bold text-sm block">Survival Murni Vanilla</span>
            <p className="text-zinc-400 text-[11px]">Pengalaman survival tanpa plugin klaim tanah, shop ajaib, atau ekonomi fiktif.</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-emerald-500/20 space-y-1">
            <span className="text-zinc-500 font-mono block">PLUGIN</span>
            <span className="text-white font-bold text-sm block">Tanpa Plugin Tambahan</span>
            <p className="text-zinc-400 text-[11px]">Zero plugin overhead untuk performa tick rate (20 TPS) terbaik & murni vanilla mechanic.</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-emerald-500/20 space-y-1">
            <span className="text-zinc-500 font-mono block">KEAMANAN</span>
            <span className="text-emerald-300 font-bold text-sm block">Sistem Whitelist Gamertag</span>
            <p className="text-zinc-400 text-[11px]">Setiap pemain terverifikasi akunnya untuk mencegah alt account dan kecurangan.</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-emerald-500/20 space-y-1">
            <span className="text-zinc-500 font-mono block">SUPPORT EDITION</span>
            <span className="text-white font-bold text-sm block">Bedrock & Java Crossplay</span>
            <p className="text-zinc-400 text-[11px]">Bisa dimainkan bersama dari HP, Laptop, PC, maupun Konsol secara bersamaan.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
