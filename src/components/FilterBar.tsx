import React from 'react';
import { Search, SlidersHorizontal, Check, X } from 'lucide-react';
import { Category } from '../data/offers';

export type SortOption = 'recommended' | 'bonus-desc' | 'fastest' | 'easiest';

interface FilterBarProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  categoryCounts: Record<Category, number>;
  hideClaimed: boolean;
  onToggleHideClaimed: () => void;
  claimedCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  categoryCounts,
  hideClaimed,
  onToggleHideClaimed,
  claimedCount,
}) => {
  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'Toutes les offres' },
    { id: 'banque', label: 'Banques & Néobanques' },
    { id: 'bourse', label: 'Bourse & Épargne' },
    { id: 'crypto', label: 'Crypto' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4">
      {/* Top row: Categories segmented tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? 0;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                  isSelected
                    ? 'bg-slate-100 text-slate-700 font-bold'
                    : 'text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom row: Search & Sorting */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher par nom (BoursoBank, Fortuneo, Kraken...)..."
            className="w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort & claimed filter */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {claimedCount > 0 && (
            <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer select-none px-2 py-1.5 rounded-lg hover:bg-slate-50">
              <input
                type="checkbox"
                checked={hideClaimed}
                onChange={onToggleHideClaimed}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <span>Masquer les {claimedCount} déjà faites</span>
            </label>
          )}

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="recommended">Recommandé</option>
              <option value="bonus-desc">Prime la plus élevée</option>
              <option value="fastest">Délai le plus rapide</option>
              <option value="easiest">Le plus simple</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
