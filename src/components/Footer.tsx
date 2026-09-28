import React from 'react';
import { Gift, Shield, AlertTriangle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Brand and Mission */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Gift className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <span className="font-display font-extrabold text-base text-slate-900">
                Parrainage<span className="text-indigo-600">Gagnant</span>
              </span>
              <p className="text-[11px] text-slate-500">
                Comparateur indépendant des offres de parrainage en France
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <span>BoursoBank</span>
            <span>·</span>
            <span>Fortuneo</span>
            <span>·</span>
            <span>Revolut</span>
            <span>·</span>
            <span>Trade Republic</span>
            <span>·</span>
            <span>Coinbase</span>
            <span>·</span>
            <span>Kraken</span>
          </div>
        </div>

        {/* Regulatory Warnings */}
        <div className="text-[11px] text-slate-500 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Shield className="w-3.5 h-3.5 shrink-0 text-slate-600" />
              <span>Avertissement Risque Investissement & Crypto-actifs</span>
            </div>
            <p>
              Investir dans des actions ou des crypto-actifs comporte des risques de perte en capital. Les informations fournies sur ce site ne constituent en aucun cas des conseils en investissement financier. Prenez soin de vérifier les conditions d’éligibilité directement sur les plateformes officielles certifiées (ACPR, AMF, BaFin).
            </p>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} Parrainage Gagnant. Les marques et logos cités appartiennent à leurs propriétaires respectifs.
          </p>
          <p>
            Offres promotionnelles sous réserve de modifications par les partenaires.
          </p>
        </div>
      </div>
    </footer>
  );
};
