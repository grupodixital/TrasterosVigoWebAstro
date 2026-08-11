export const CONSENT_KEY = "tv-cookie-consent";
export const CONSENT_EVENT = "tv:cookie-consent";

export type ConsentValue = "accepted" | "rejected";

export function getConsent(): ConsentValue | null {
  return localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
}

export function setConsent(value: ConsentValue) {
  localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

export function onConsentChange(callback: (value: ConsentValue) => void) {
  window.addEventListener(CONSENT_EVENT, (event) => {
    callback((event as CustomEvent<ConsentValue>).detail);
  });
}
