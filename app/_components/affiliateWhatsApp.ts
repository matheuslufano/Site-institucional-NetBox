export const AFFILIATE_WHATSAPP_EVENT = "netbox:affiliate-whatsapp";

const AFFILIATE_CODE_PATTERN = /^[a-f0-9]{8}$/i;
const AFFILIATE_STORAGE_KEY = "netbox-affiliate-code";

export function openAffiliateAwareWhatsApp(url: string) {
  const affiliateCode = String(
    window.sessionStorage.getItem(AFFILIATE_STORAGE_KEY) || "",
  ).trim();

  if (AFFILIATE_CODE_PATTERN.test(affiliateCode)) {
    window.dispatchEvent(
      new CustomEvent(AFFILIATE_WHATSAPP_EVENT, { detail: { url } }),
    );
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}
