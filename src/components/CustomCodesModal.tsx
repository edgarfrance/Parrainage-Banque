import React, { useState } from 'react';
import { ReferralOffer } from '../data/offers';
import { CustomCodesMap } from '../utils/storage';
import { X, Save, RotateCcw, Link, KeyRound } from 'lucide-react';

interface CustomCodesModalProps {
  offers: ReferralOffer[];
  customCodes: CustomCodesMap;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCodes: CustomCodesMap) => void;
  onNotify: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

export const CustomCodesModal: React.FC<CustomCodesModalProps> = ({
  offers,
  customCodes,
  isOpen,
  onClose,
  onSave,
  onNotify,
}) => {
  const [formData, setFormData] = useState<CustomCodesMap>(customCodes);

  if (!isOpen) return null;

  const handleChange = (id: string, field: 'code' | 'url', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleResetToDefaults = () => {
    const defaults: CustomCodesMap = {};
    offers.forEach((o) => {
      defaults[o.id] = {
        code: o.defaultCode,
        url: o.defaultUrl,
      };
    });
    setFormData(defaults);
    onNotify('Valeurs par défaut restaurées', 'Pensez à cliquer sur "Enregistrer les modifications".', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onNotify('Codes et liens enregistrés !', 'Votre site utilise désormais vos identifiants personnalisés.', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-extrabold text-slate-900">
              Personnaliser mes codes de parrainage
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Renseignez vos propres codes et liens d’affiliation pour chacune des 10 plateformes.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 flex-1">
          <div className="text-xs text-slate-600 bg-slate-100 p-3 rounded-xl border border-slate-200">
            Ces modifications sont sauvegardées localement dans votre navigateur. Vous pouvez partager ce site ou l’utiliser comme votre propre vitrine de parrainage.
          </div>

          <div className="space-y-4">
            {offers.map((offer) => {
              const current = formData[offer.id] || {
                code: offer.defaultCode,
                url: offer.defaultUrl,
              };

              return (
                <div
                  key={offer.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: offer.brandColor }}
                      />
                      <span className="font-bold text-sm text-slate-900">
                        {offer.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {offer.categoryLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 mb-1">
                        <KeyRound className="w-3 h-3 text-slate-400" />
                        <span>Code parrain :</span>
                      </label>
                      <input
                        type="text"
                        value={current.code}
                        onChange={(e) => handleChange(offer.id, 'code', e.target.value)}
                        placeholder={offer.defaultCode}
                        className="w-full px-3 py-1.5 text-xs font-mono font-bold bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 mb-1">
                        <Link className="w-3 h-3 text-slate-400" />
                        <span>Lien d'inscription / parrain :</span>
                      </label>
                      <input
                        type="url"
                        value={current.url}
                        onChange={(e) => handleChange(offer.id, 'url', e.target.value)}
                        placeholder={offer.defaultUrl}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rétablir les codes d’origine</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Annuler
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
