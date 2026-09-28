import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface GeneralFaqItem {
  q: string;
  a: string;
}

const GENERAL_FAQS: GeneralFaqItem[] = [
  {
    q: 'Comment fonctionne le parrainage en ligne ?',
    a: 'Lors de votre inscription sur une banque en ligne, un courtier ou une plateforme crypto, vous utilisez un lien spécifique ou saisissez un code parrainage. Une fois que vous remplissez les conditions requises (par exemple ouvrir le compte et réaliser un premier versement), l’établissement vous verse une prime de bienvenue directement sur votre solde ou en avantages exclusifs.'
  },
  {
    q: 'Pourquoi ces banques et applications versent-elles des primes aussi élevées ?',
    a: 'Pour ces entreprises, le coût d’acquisition d’un nouveau client par le bouche-à-oreille et le parrainage est bien inférieur aux millions d’euros dépensés en campagnes télévisées ou publicitaires. En reversant ce budget directement aux utilisateurs, elles attirent des clients satisfaits et actifs.'
  },
  {
    q: 'Les primes de parrainage sont-elles imposables en France ?',
    a: 'Pour le filleul, la prime de bienvenue reçue lors de l’ouverture d’un compte bancaire ou d’un service est considérée comme un geste commercial de bienvenue non imposable sur le revenu (doctrine fiscale de l’administration française). En revanche, pour un parrain générant des montants substantiels et récurrents, ces revenus peuvent relever des BNC non professionnels.'
  },
  {
    q: 'Puis-je clôturer un compte après avoir touché la prime ?',
    a: 'La plupart des banques (comme BoursoBank ou Fortuneo) stipulent dans leurs conditions générales que le compte doit rester ouvert pendant une durée minimale (souvent 12 mois), sous peine d’un prélèvement équivalent au montant de la prime. Comme ces comptes sont sans frais de tenue, il est recommandé de les conserver ouverts pendant cette période.'
  },
  {
    q: 'Quel est l’ordre recommandé pour maximiser ses gains ?',
    a: 'Nous vous conseillons de débuter par BoursoBank (dès 1 € de dépôt pour 130 €, ou 300 € pour 160 € + 80 € mobilité). Vous pouvez ensuite réutiliser vos fonds pour activer Fortuneo (300 € pour jusqu’à 160 €), puis Kraken (200 € déposés pour 30 € en BTC, tout étant retirable immédiatement), Trade Republic (100 € pour 25 €, 100 € retirables directement), Revolut (40 €) et Coinbase (20 € retirables). Cela vous permet de cumuler plus de 500 € sans risque.'
  },
  {
    q: 'Que faire si le code parrain n’a pas été pris en compte ?',
    a: 'Prenez toujours une capture d’écran de l’écran d’inscription avec le code parrain bien visible. Si la prime n’apparaît pas dans le délai imparti, contactez le service client de l’établissement en leur fournissant le code parrain utilisé ainsi que la capture d’écran : ils procèdent généralement à une régularisation manuelle rapide.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="mt-16 sm:mt-20 pt-12 border-t border-slate-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>Foire Aux Questions</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            Tout savoir avant d’activer une offre
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Des réponses claires et transparentes pour profiter des parrainages en toute sérénité.
          </p>
        </div>

        <div className="space-y-3">
          {GENERAL_FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
