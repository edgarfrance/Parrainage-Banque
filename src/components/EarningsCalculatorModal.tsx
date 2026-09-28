import React, { useState } from 'react';
import { ReferralOffer } from '../data/offers';
import { X, Calculator, Check, ArrowRight, Sparkles, CheckSquare, Square, Info } from 'lucide-react';

interface EarningsCalculatorModalProps {
  offers: ReferralOffer[];
  isOpen: boolean;
  onClose: () => void;
  onSelectOffer: (offer: ReferralOffer) => void;
}

export const EarningsCalculatorModal: React.FC<EarningsCalculatorModalProps> = ({
  offers,
  isOpen,
  onClose,
  onSelectOffer,
}) => {
  const [selectedOfferIds, setSelectedOfferIds] = useState<string[]>(
    offers.map((o) => o.id)
  );

  if (!isOpen) return null;

  const toggleOffer = (id: string) => {
    setSelectedOfferIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedOfferIds(offers.map((o) => o.id));
  };

  const deselectAll = () => {
    setSelectedOfferIds([]);
  };

  const selectedOffers = offers.filter((o) => selectedOfferIds.includes(o.id));
  const totalBonus = selectedOffers.reduce((sum, o) => sum + o.estimatedBonus, 0);

  // Group by category
  const banksBonus = selectedOffers
    .filter((o) => o.category === 'banque')
    .reduce((sum, o) => sum + o.estimatedBonus, 0);

  const bourseBonus = selectedOffers
    .filter((o) => o.category === 'bourse')
    .reduce((sum, o) => sum + o.estimatedBonus, 0);

  const cryptoBonus = selectedOffers
    .filter((o) => o.category === 'crypto')
    .reduce((sum, o) => sum + o.estimatedBonus, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                Simulateur de Gains de Parrainage
              </h2>
              <p className="text-xs text-slate-500">
                Cochez les offres qui vous intéressent pour estimer vos primes cumulées.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          {/* Real-time Result Summary Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-md">
            <span className="text-xs uppercase tracking-wider text-indigo-300 font-semibold block">
              Gain Total Estimé ({selectedOffers.length} offre{selectedOffers.length > 1 ? 's' : ''})
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-white">
                {totalBonus} €
              </span>
              <span className="text-sm text-indigo-200 font-medium">en primes & bonus</span>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-slate-300 block">Banques</span>
                <span className="font-bold text-sm text-emerald-400 font-mono-numbers">
                  {banksBonus} €
                </span>
              </div>
              <div>
                <span className="text-slate-300 block">Bourse & Épargne</span>
                <span className="font-bold text-sm text-indigo-300 font-mono-numbers">
                  {bourseBonus} €
                </span>
              </div>
              <div>
                <span className="text-slate-300 block">Crypto</span>
                <span className="font-bold text-sm text-purple-300 font-mono-numbers">
                  {cryptoBonus} €
                </span>
              </div>
            </div>
          </div>

          {/* Strategic Tip */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-semibold block">Astuce d’optimisation :</strong>
              <p>
                Vous n’avez pas besoin d’avoir une grosse épargne ! Commencez par <strong>BoursoBank</strong> (dès 1 € ou 300 € pour toucher jusqu’à 240 €). Réutilisez ensuite votre argent pour activer <strong>Fortuneo</strong> (300 €), puis <strong>Trade Republic</strong> (100 € retirables directement), <strong>Coinbase</strong> (20 € retirables) et <strong>Kraken</strong> (200 € retirables directement).
              </p>
            </div>
          </div>

          {/* Controls: Select all / Deselect all */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="font-semibold text-slate-700">Sélectionnez vos offres :</span>
            <div className="flex items-center gap-2">
              <button
                onClick={selectAll}
                className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline cursor-pointer"
              >
                Tout sélectionner
              </button>
              <span className="text-slate-300">·</span>
              <button
                onClick={deselectAll}
                className="text-slate-500 hover:text-slate-700 font-medium hover:underline cursor-pointer"
              >
                Tout désélectionner
              </button>
            </div>
          </div>

          {/* Offers list */}
          <div className="space-y-2">
            {offers.map((offer) => {
              const isSelected = selectedOfferIds.includes(offer.id);
              return (
                <div
                  key={offer.id}
                  onClick={() => toggleOffer(offer.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/50 border-indigo-200'
                      : 'bg-white border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-indigo-600">
                      {isSelected ? (
                        <CheckSquare className="w-5 h-5 fill-indigo-600 text-white" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{offer.name}</span>
                        <span className="text-[11px] text-slate-500">{offer.categoryLabel}</span>
                      </div>
                      <span className="text-xs text-slate-600 block">
                        Temps : {offer.estimatedTime} · Dépôt : {offer.minDeposit.split('(')[0].trim()}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-display font-bold text-sm text-slate-900 block">
                      {offer.bonusDisplay}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                        onSelectOffer(offer);
                      }}
                      className="text-[11px] text-indigo-600 hover:underline font-semibold"
                    >
                      Détails ↗
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            {selectedOffers.length} sur {offers.length} offres retenues
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Fermer le simulateur
          </button>
        </div>
      </div>
    </div>
  );
};
