import React from 'react';
import { Gift, Calculator, Settings2, Share2, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenCalculator: () => void;
  onOpenSettings: () => void;
  onShareSite: () => void;
  claimedCount: number;
  totalOffers: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCalculator,
  onOpenSettings,
  onShareSite,
  claimedCount,
  totalOffers,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
            <Gift className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg text-slate-900 tracking-tight">
                Parrainage<span className="text-indigo-600">Gagnant</span>
              </span>
              <span className="hidden sm:inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Offres 2026 vérifiées
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              Les meilleures primes de bienvenue : banques, bourse & crypto
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Claimed Tracker pill */}
          {claimedCount > 0 && (
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{claimedCount} / {totalOffers} débloquées</span>
            </div>
          )}

          {/* Calculator CTA */}
          <button
            onClick={onOpenCalculator}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/80 transition-colors shadow-2xs"
            title="Calculer mes gains cumulés"
          >
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Simulateur</span>
            <span className="inline sm:hidden">Simuler</span>
          </button>

          {/* Custom Codes / Settings CTA */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Personnaliser avec mes propres codes et liens de parrainage"
          >
            <Settings2 className="w-4 h-4 text-slate-500" />
            <span className="hidden md:inline">Gérer mes codes</span>
          </button>

          {/* Share CTA */}
          <button
            onClick={onShareSite}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-300" />
            <span>Partager</span>
          </button>
        </div>
      </div>
    </header>
  );
};
