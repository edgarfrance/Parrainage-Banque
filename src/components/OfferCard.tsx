import React, { useState } from 'react';
import { ReferralOffer } from '../data/offers';
import { Copy, Check, Clock, Wallet, ShieldCheck, ArrowRight, ExternalLink, CheckCircle } from 'lucide-react';
import { copyToClipboard } from '../utils/storage';

interface OfferCardProps {
  offer: ReferralOffer;
  code: string;
  url: string;
  isClaimed: boolean;
  onToggleClaimed: (id: string) => void;
  onOpenDetail: (offer: ReferralOffer) => void;
  onNotify: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  code,
  url,
  isClaimed,
  onToggleClaimed,
  onOpenDetail,
  onNotify,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied(true);
      onNotify(`Code ${code} copié !`, `Le code pour ${offer.name} est dans votre presse-papier.`, 'success');
      setTimeout(() => setCopied(false), 2500);
    } else {
      onNotify('Erreur', 'Impossible de copier le code', 'error');
    }
  };

  const handleOpenLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      onClick={() => onOpenDetail(offer)}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-slate-300 ${
        isClaimed
          ? 'border-emerald-200/90 bg-emerald-50/15'
          : 'border-slate-200 shadow-2xs'
      }`}
    >
      {/* Top Accent bar matching brand */}
      <div 
        className="h-1.5 w-full transition-opacity group-hover:opacity-100 opacity-80" 
        style={{ backgroundColor: offer.brandColor }}
      />

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        {/* Header: Brand monogram, titles, claim check */}
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Brand Avatar */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold font-display text-lg shadow-2xs shrink-0 select-none"
                style={{ backgroundColor: offer.brandColor }}
              >
                {offer.name.substring(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {offer.name}
                  </h3>
                  {isClaimed && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Obtenu
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span>{offer.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-600 font-medium">{offer.badgeText}</span>
                </div>
              </div>
            </div>

            {/* Quick check to mark claimed */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleClaimed(offer.id);
              }}
              title={isClaimed ? "Marquer comme non réclamée" : "Marquer comme déjà obtenue"}
              className={`p-1.5 rounded-lg text-xs transition-colors shrink-0 ${
                isClaimed
                  ? 'text-emerald-700 hover:bg-emerald-100/60'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CheckCircle className={`w-5 h-5 ${isClaimed ? 'fill-emerald-600 text-white' : ''}`} />
            </button>
          </div>

          {/* Bonus Highlight Box */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block font-medium">Prime totale estimée</span>
              <span className="font-display font-extrabold text-xl text-slate-900 tracking-tight">
                {offer.bonusDisplay}
              </span>
            </div>
            <span className="text-xs text-slate-600 text-right max-w-[140px] leading-tight">
              {offer.bonusSubtitle}
            </span>
          </div>

          {/* Highlights summary bullet points */}
          <ul className="mt-4 space-y-2 text-xs text-slate-600">
            {offer.summaryHighlights.map((hl, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <span className="leading-snug">{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick parameters metadata */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Temps : <strong className="text-slate-700 font-semibold">{offer.estimatedTime}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Dépôt : <strong className="text-slate-700 font-semibold">{offer.minDeposit.split('(')[0].trim()}</strong></span>
          </div>
        </div>
      </div>

      {/* Footer Card Controls */}
      <div className="px-5 pb-5 pt-2 bg-white sm:px-6 flex flex-col gap-2.5">
        {/* Code copy block */}
        <div className="flex items-center justify-between gap-2 p-1.5 pl-3 rounded-xl bg-slate-100/90 border border-slate-200/80">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
              Code Parrainage
            </span>
            <span className="font-mono text-xs font-bold text-slate-900 tracking-wider truncate block">
              {code}
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-white text-slate-800 hover:bg-slate-200/60 shadow-2xs'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copié</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>

        {/* CTA buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(offer);
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors cursor-pointer border border-indigo-200/60"
          >
            <span>Détail de l’offre</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleOpenLink}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
          >
            <span>Ouvrir le site</span>
            <ExternalLink className="w-3 h-3 text-slate-300" />
          </button>
        </div>
      </div>
    </article>
  );
};
