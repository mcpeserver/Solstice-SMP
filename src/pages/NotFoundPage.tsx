import React from 'react';
import { Home, AlertTriangle } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-24 text-center">
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-emerald-500/30 max-w-lg mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-emerald-400 text-xs font-bold uppercase tracking-widest">
            ERROR 404
          </span>
          <h1 className="text-3xl font-black text-white font-heading">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300">
            Halaman yang Anda cari telah berpindah dimensi atau berada di luar World Border Solstice SMP.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/')}
          className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm uppercase tracking-wide transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda (Home)</span>
        </button>
      </div>
    </div>
  );
};
