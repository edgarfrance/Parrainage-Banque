/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { REFERRAL_OFFERS, ReferralOffer, Category } from './data/offers';
import {
  getCustomCodes,
  saveCustomCodes,
  getClaimedOffers,
  toggleClaimedOffer,
  CustomCodesMap,
  copyToClipboard
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar, SortOption } from './components/FilterBar';
import { OfferCard } from './components/OfferCard';
import { OfferDetailModal } from './components/OfferDetailModal';
import { EarningsCalculatorModal } from './components/EarningsCalculatorModal';
import { CustomCodesModal } from './components/CustomCodesModal';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Sparkles, Trophy, CheckCircle, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [customCodes, setCustomCodes] = useState<CustomCodesMap>(() => getCustomCodes());
  const [claimedIds, setClaimedIds] = useState<string[]>(() => getClaimedOffers());
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [hideClaimed, setHideClaimed] = useState(false);

  // Modals state
  const [detailOffer, setDetailOffer] = useState<ReferralOffer | null>(null);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const offersSectionRef = useRef<HTMLDivElement>(null);

  // Listen to URL hash changes for deep linking (e.g. #fortuneo)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash) {
        const found = REFERRAL_OFFERS.find((o) => o.id.toLowerCase() === hash);
        if (found) {
          setDetailOffer(found);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const addToast = (
    title: string,
    message?: string,
    type: 'success' | 'info' | 'error' = 'info'
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleClaimed = (id: string) => {
    const next = toggleClaimedOffer(id);
    setClaimedIds(next);
    const wasClaimed = next.includes(id);
    const offer = REFERRAL_OFFERS.find((o) => o.id === id);
    if (offer) {
      if (wasClaimed) {
        addToast(`Bravo !`, `${offer.name} marqué comme obtenu.`, 'success');
      } else {
        addToast(`Mise à jour`, `${offer.name} retiré des offres obtenues.`, 'info');
      }
    }
  };

  const handleSaveCodes = (newCodes: CustomCodesMap) => {
    saveCustomCodes(newCodes);
    setCustomCodes(newCodes);
  };

  const handleShareSite = async () => {
    const ok = await copyToClipboard(window.location.origin || window.location.href);
    if (ok) {
      addToast('Lien du site copié !', 'Partagez les meilleures offres avec vos amis.', 'success');
    }
  };

  const handleScrollToOffers = () => {
    offersSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      all: REFERRAL_OFFERS.length,
      banque: 0,
      bourse: 0,
      crypto: 0,
    };
    REFERRAL_OFFERS.forEach((o) => {
      counts[o.category]++;
    });
    return counts;
  }, []);

  // Filtered and sorted offers
  const filteredOffers = useMemo(() => {
    return REFERRAL_OFFERS.filter((offer) => {
      // Category filter
      if (selectedCategory !== 'all' && offer.category !== selectedCategory) {
        return false;
      }
      // Hide claimed filter
      if (hideClaimed && claimedIds.includes(offer.id)) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = offer.name.toLowerCase().includes(q);
        const matchFull = offer.fullName.toLowerCase().includes(q);
        const matchCat = offer.categoryLabel.toLowerCase().includes(q);
        const matchTag = offer.tagline.toLowerCase().includes(q);
        const matchSummary = offer.summaryHighlights.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchFull && !matchCat && !matchTag && !matchSummary) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'bonus-desc') {
        return b.estimatedBonus - a.estimatedBonus;
      }
      if (sortBy === 'fastest') {
        // e.g. "5 minutes" vs "10 minutes"
        const timeA = parseInt(a.estimatedTime) || 99;
        const timeB = parseInt(b.estimatedTime) || 99;
        return timeA - timeB;
      }
      if (sortBy === 'easiest') {
        const order = { 'Très facile': 1, Facile: 2, Moyen: 3 };
        return (order[a.difficulty] || 9) - (order[b.difficulty] || 9);
      }
      // 'recommended'
      return 0; // maintain original curated order
    });
  }, [selectedCategory, searchQuery, sortBy, hideClaimed, claimedIds]);

  const totalBonusPossible = useMemo(() => {
    return REFERRAL_OFFERS.reduce((sum, o) => sum + o.estimatedBonus, 0);
  }, []);

  const totalEarnedSoFar = useMemo(() => {
    return REFERRAL_OFFERS.filter((o) => claimedIds.includes(o.id)).reduce(
      (sum, o) => sum + o.estimatedBonus,
      0
    );
  }, [claimedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-500 selection:text-white">
      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Top Navigation */}
      <Navbar
        onOpenCalculator={() => setCalculatorOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        onShareSite={handleShareSite}
        claimedCount={claimedIds.length}
        totalOffers={REFERRAL_OFFERS.length}
      />

      {/* Hero Section */}
      <Hero
        totalEstimatedBonus={totalBonusPossible}
        onOpenCalculator={() => setCalculatorOpen(true)}
        onScrollToOffers={handleScrollToOffers}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full" ref={offersSectionRef}>
        {/* Earnings progress banner if user marked any as claimed */}
        {claimedIds.length > 0 && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-emerald-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="font-display font-bold text-sm sm:text-base text-slate-900 block">
                  Votre progression : {totalEarnedSoFar} € déjà empochés !
                </span>
                <span className="text-xs text-slate-600">
                  {claimedIds.length} offre{claimedIds.length > 1 ? 's' : ''} débloquée{claimedIds.length > 1 ? 's' : ''} sur {REFERRAL_OFFERS.length}. Il vous reste jusqu’à {totalBonusPossible - totalEarnedSoFar} € à réclamer.
                </span>
              </div>
            </div>

            <button
              onClick={() => setCalculatorOpen(true)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition-colors shrink-0"
            >
              Voir le récapitulatif
            </button>
          </div>
        )}

        {/* Section Heading & Subtitle */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Catalogue des Offres de Parrainage
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Cliquez sur une offre pour afficher le détail, le guide d’inscription et les conditions.
            </p>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Affichage de <strong>{filteredOffers.length}</strong> offre{filteredOffers.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Filter & Search Bar */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categoryCounts={categoryCounts}
          hideClaimed={hideClaimed}
          onToggleHideClaimed={() => setHideClaimed(!hideClaimed)}
          claimedCount={claimedIds.length}
        />

        {/* Offers Grid */}
        {filteredOffers.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => {
              const codeEntry = customCodes[offer.id] || {
                code: offer.defaultCode,
                url: offer.defaultUrl,
              };
              const isClaimed = claimedIds.includes(offer.id);

              return (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  code={codeEntry.code}
                  url={codeEntry.url}
                  isClaimed={isClaimed}
                  onToggleClaimed={handleToggleClaimed}
                  onOpenDetail={(o) => {
                    setDetailOffer(o);
                    window.location.hash = o.id;
                  }}
                  onNotify={addToast}
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-12 text-center py-12 px-4 rounded-3xl bg-white border border-slate-200">
            <p className="text-base font-semibold text-slate-800">
              Aucune offre ne correspond à votre recherche
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Essayez de modifier votre catégorie ou de réinitialiser la recherche.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setHideClaimed(false);
              }}
              className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* General FAQ section */}
        <FaqSection />
      </main>

      {/* Offer Detail Modal */}
      {detailOffer && (
        <OfferDetailModal
          offer={detailOffer}
          code={customCodes[detailOffer.id]?.code || detailOffer.defaultCode}
          url={customCodes[detailOffer.id]?.url || detailOffer.defaultUrl}
          isClaimed={claimedIds.includes(detailOffer.id)}
          onToggleClaimed={handleToggleClaimed}
          onClose={() => {
            setDetailOffer(null);
            if (window.location.hash) {
              history.pushState('', document.title, window.location.pathname + window.location.search);
            }
          }}
          onNotify={addToast}
        />
      )}

      {/* Earnings Calculator Modal */}
      <EarningsCalculatorModal
        offers={REFERRAL_OFFERS}
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
        onSelectOffer={(offer) => {
          setCalculatorOpen(false);
          setDetailOffer(offer);
          window.location.hash = offer.id;
        }}
      />

      {/* Custom Codes & Links Settings Modal */}
      <CustomCodesModal
        offers={REFERRAL_OFFERS}
        customCodes={customCodes}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSave={handleSaveCodes}
        onNotify={addToast}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
