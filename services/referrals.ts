/** Shared referral storage preserves links opened through either public area. */
export const AFFILIATE_CODE_PATTERN = /^[a-f0-9]{8}$/i;
export const AFFILIATE_STORAGE_KEY = "netbox-affiliate-code";

export function normalizedAffiliateCode(value: string | null) {
  const code = String(value || "").trim().toLowerCase();
  return AFFILIATE_CODE_PATTERN.test(code) ? code : null;
}

/** Store only a validated public referral code; no sales UI is mounted by this operation. */
export function rememberReferral() {
  const code = normalizedAffiliateCode(new URLSearchParams(window.location.search).get("ref"));
  if (code) window.sessionStorage.setItem(AFFILIATE_STORAGE_KEY, code);
}
