import React from 'react';
import { ShieldCheck, Zap, Coins, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  totalEstimatedBonus: number;
  onOpenCalculator: () => void;
  onScrollToOffers: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  totalEstimatedBonus,
  onOpenCalculator,
  onScrollToOffers,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-200">
      {/* Subtle decorative grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          {/* Subtle editorial kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span>Mise à jour régulière · Offres testées et garanties</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
            Toutes les meilleures primes de parrainage réunies en un clic.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Ouvrez un compte bancaire, débutez dans l’investissement ou découvrez les crypto-actifs sans mauvaises surprises. Découvrez les montants réels, les conditions précises et les codes officiels pour encaisser jusqu’à <strong className="text-slate-900 font-semibold">{totalEstimatedBonus} €</strong> de bienvenue.
          </p>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={onScrollToOffers}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
            >
              <span>Découvrir les offres</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-800 font-semibold text-sm hover:bg-slate-50 border border-slate-300 transition-colors shadow-2xs cursor-pointer"
            >
              <Coins className="w-4 h-4 text-indigo-600" />
              <span>Simuler mon gain total</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Gratuit & sans engagement</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Établissements certifiés (ACPR, AMF, BaFin)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Codes vérifiés actifs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
