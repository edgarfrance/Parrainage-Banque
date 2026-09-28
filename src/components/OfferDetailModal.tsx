import React, { useState } from 'react';
import { ReferralOffer } from '../data/offers';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Clock,
  Wallet,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Share2
} from 'lucide-react';
import { copyToClipboard } from '../utils/storage';

interface OfferDetailModalProps {
  offer: ReferralOffer | null;
  code: string;
  url: string;
  isClaimed: boolean;
  onToggleClaimed: (id: string) => void;
  onClose: () => void;
  onNotify: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const OfferDetailModal: React.FC<OfferDetailModalProps> = ({
  offer,
  code,
  url,
  isClaimed,
  onToggleClaimed,
  onClose,
  onNotify,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'conditions' | 'faq'>('guide');

  if (!offer) return null;

  const handleCopyCode = async () => {
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied(true);
      onNotify(`Code ${code} copié !`, `Collez-le lors de votre inscription sur ${offer.name}.`, 'success');
      setTimeout(() => setCopied(false), 2500);
    } else {
      onNotify('Erreur', 'Impossible de copier le code', 'error');
    }
  };

  const handleOpenLink = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareOffer = async () => {
    const text = `Profite de l'offre de parrainage ${offer.name} : ${offer.bonusDisplay} avec le code ${code} !`;
    const ok = await copyToClipboard(text);
    if (ok) {
      onNotify('Offre copiée !', 'Le texte de partage est prêt à être envoyé à vos amis.', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top brand header bar */}
        <div 
          className="h-2 w-full"
          style={{ backgroundColor: offer.brandColor }}
        />

        {/* Modal Header */}
        <div className="p-5 sm:p-7 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold font-display text-xl shadow-md shrink-0"
              style={{ backgroundColor: offer.brandColor }}
            >
              {offer.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl font-extrabold text-slate-900">
                  {offer.fullName}
                </h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs">
                  {offer.categoryLabel}
                </span>
                {isClaimed && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" />
                    Prime déjà obtenue
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {offer.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={handleShareOffer}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
              title="Partager cette offre"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
              aria-label="Fermer la modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-7 flex-1">
          {/* Main Action Banner: Code + Direct Link */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-auto">
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                Votre Code Parrain Exclusif
              </span>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 tracking-wider">
                  {code}
                </span>
                <button
                  onClick={handleCopyCode}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-white text-indigo-700 hover:bg-indigo-100 border border-indigo-200 shadow-2xs'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <button
                onClick={handleOpenLink}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-sm cursor-pointer"
              >
                <span>Activer l’offre sur {offer.name}</span>
                <ExternalLink className="w-4 h-4 text-indigo-200" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-slate-500 block">Prime totale</span>
              <span className="font-display font-bold text-lg text-slate-900 mt-0.5 block">
                {offer.bonusDisplay}
              </span>
              <span className="text-[11px] text-slate-500 leading-tight">
                {offer.bonusSubtitle}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-slate-500 block">Dépôt minimum</span>
              <span className="font-display font-bold text-lg text-slate-900 mt-0.5 block">
                {offer.minDeposit.split('(')[0].trim()}
              </span>
              <span className="text-[11px] text-slate-500 leading-tight">
                {offer.minDeposit.includes('(') ? offer.minDeposit.split('(')[1].replace(')', '') : 'Pour activation'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-slate-500 block">Délai de paiement</span>
              <span className="font-display font-semibold text-sm text-slate-900 mt-1 block">
                {offer.payoutDelay}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-slate-500 block">Temps requis</span>
              <span className="font-display font-bold text-lg text-slate-900 mt-0.5 block">
                {offer.estimatedTime}
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold leading-tight">
                {offer.difficulty}
              </span>
            </div>
          </div>

          {/* Detailed Overview */}
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
              Présentation du service & de l’offre
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {offer.overview}
            </p>
          </div>

          {/* Breakdown of bonuses */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h3 className="font-display font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Détail et décomposition de la prime ({offer.bonusDisplay})</span>
            </h3>
            <div className="space-y-2.5">
              {offer.bonusBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-white border border-slate-200 gap-1.5"
                >
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Condition : {item.condition}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-emerald-700 sm:text-right shrink-0">
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Tabs for Guide, Conditions, FAQ */}
          <div>
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'guide'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Guide étape par étape ({offer.steps.length})
              </button>
              <button
                onClick={() => setActiveTab('conditions')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'conditions'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Conditions & Avis
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'faq'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Questions fréquentes ({offer.faq.length})
              </button>
            </div>

            {/* Tab 1: Step by Step Guide */}
            {activeTab === 'guide' && (
              <div className="pt-4 space-y-4">
                <div className="space-y-3">
                  {offer.steps.map((st) => (
                    <div
                      key={st.number}
                      className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                        {st.number}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900">
                          {st.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          {st.description}
                        </p>
                        {st.caution && (
                          <div className="mt-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>{st.caution}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Conditions, Pros & Cons */}
            {activeTab === 'conditions' && (
              <div className="pt-4 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Conditions obligatoires d'éligibilité
                  </h4>
                  <ul className="space-y-2">
                    {offer.conditions.map((cond, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pros */}
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-2.5">
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Points forts</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {offer.pros.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-2.5">
                      <ThumbsDown className="w-3.5 h-3.5 text-slate-500" />
                      <span>Points de vigilance</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {offer.cons.map((c, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-slate-400 font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: FAQ */}
            {activeTab === 'faq' && (
              <div className="pt-4 space-y-3">
                {offer.faq.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 pl-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Legal and regulatory guarantee */}
          <div className="p-3.5 rounded-xl bg-slate-100 text-slate-600 text-xs flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Régulation : {offer.regulatory}</span>
          </div>
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onToggleClaimed(offer.id)}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
              isClaimed
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-300'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isClaimed ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{isClaimed ? 'Prime marquée comme obtenue' : 'J’ai déjà fait cette offre'}</span>
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Copier le code</span>
            </button>
            <button
              onClick={handleOpenLink}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <span>Activer l’offre</span>
              <ExternalLink className="w-4 h-4 text-indigo-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
