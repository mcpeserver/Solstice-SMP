import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Check, XCircle, Search, Filter, AlertTriangle } from 'lucide-react';
import { ServerConfig } from '../types';

interface RulesPageProps {
  serverConfig: ServerConfig;
}

export const RulesPage: React.FC<RulesPageProps> = ({ serverConfig }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'allowed' | 'prohibited'>('all');

  const allowedRules = serverConfig.rules.allowed.map((name) => ({
    type: 'allowed' as const,
    name,
    desc: 'Diperbolehkan sebagai bagian dinamika dunia Minecraft Survival murni.',
  }));

  const prohibitedRules = serverConfig.rules.prohibited.map((name) => ({
    type: 'prohibited' as const,
    name,
    desc: 'Dilarang keras! Pelanggaran berakibat sanksi permanent Banned Gamertag.',
  }));

  const allRules = [...allowedRules, ...prohibitedRules];

  const filteredRules = allRules.filter((rule) => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === 'all' ? true : activeTab === rule.type;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>PERATURAN DITERAPKAN DENGAN KETAT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
          Aturan Resmi <span className="text-emerald-400">Solstice SMP</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Demi menjaga kenyamanan dan sportivitas seluruh pemain di server survival murni, harap patuhi peraturan di bawah ini.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-4 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tab Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            Semua ({allRules.length})
          </button>
          <button
            onClick={() => setActiveTab('allowed')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'allowed'
                ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            Diperbolehkan ({allowedRules.length})
          </button>
          <button
            onClick={() => setActiveTab('prohibited')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'prohibited'
                ? 'bg-red-950/40 border border-red-500/50 text-red-300'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            Dilarang ({prohibitedRules.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari aturan..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-950 border border-emerald-500/20 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRules.map((rule, idx) => (
          <div
            key={idx}
            className={`glass-card glass-card-hover rounded-2xl p-6 border space-y-3 relative overflow-hidden ${
              rule.type === 'allowed'
                ? 'border-emerald-500/30 bg-emerald-950/20'
                : 'border-red-500/30 bg-red-950/15'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                  rule.type === 'allowed'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-red-500/20 text-red-300 border border-red-500/40'
                }`}
              >
                {rule.type === 'allowed' ? 'DIPERBOLEHKAN' : 'DILARANG KERAS'}
              </span>

              {rule.type === 'allowed' ? (
                <Check className="w-5 h-5 text-emerald-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
            </div>

            <h3 className="text-xl font-bold text-white font-heading">{rule.name}</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">{rule.desc}</p>
          </div>
        ))}
      </div>

      {/* Warning Box */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 bg-amber-950/10 flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
        <div className="space-y-1 text-xs sm:text-sm">
          <h4 className="font-bold text-amber-200">Catatan Whitelist Gamertag:</h4>
          <p className="text-zinc-300 leading-relaxed">
            Seluruh pemain wajib mengirim Gamertag sebelum bergabung agar mencegah penggunaan akun lain untuk melakukan kecurangan. Penggunaan client X-Ray, Mod Cheat, maupun Glitch Dupe akan terdeteksi dan di-banned permanen dari server.
          </p>
        </div>
      </div>
    </div>
  );
};
