import { REFERRAL_OFFERS, ReferralOffer } from '../data/offers';

const CODES_STORAGE_KEY = 'parrainhub_custom_codes_v1';
const CLAIMED_STORAGE_KEY = 'parrainhub_claimed_offers_v1';

export interface CustomCodeEntry {
  code: string;
  url: string;
}

export type CustomCodesMap = Record<string, CustomCodeEntry>;

export function getCustomCodes(): CustomCodesMap {
  const defaults: CustomCodesMap = {};
  REFERRAL_OFFERS.forEach((o) => {
    defaults[o.id] = {
      code: o.defaultCode,
      url: o.defaultUrl,
    };
  });

  try {
    const saved = localStorage.getItem(CODES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const merged: CustomCodesMap = { ...defaults };
      REFERRAL_OFFERS.forEach((o) => {
        if (parsed[o.id]?.code) {
          merged[o.id] = parsed[o.id];
        }
      });
      return merged;
    }
  } catch (e) {
    console.error('Failed to load custom codes', e);
  }

  return defaults;
}

export function saveCustomCodes(codes: CustomCodesMap): void {
  try {
    localStorage.setItem(CODES_STORAGE_KEY, JSON.stringify(codes));
  } catch (e) {
    console.error('Failed to save custom codes', e);
  }
}

export function getClaimedOffers(): string[] {
  try {
    const saved = localStorage.getItem(CLAIMED_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load claimed offers', e);
  }
  return [];
}

export function toggleClaimedOffer(offerId: string): string[] {
  const current = getClaimedOffers();
  const next = current.includes(offerId)
    ? current.filter((id) => id !== offerId)
    : [...current, offerId];
  try {
    localStorage.setItem(CLAIMED_STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    console.error('Failed to save claimed offers', e);
  }
  return next;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Unable to copy', err);
    return false;
  }
}
