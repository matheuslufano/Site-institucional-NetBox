"use client";

import { useEffect } from "react";
import { rememberReferral } from "@/services/referrals";

/** Preserve referral attribution on direct entry, including editorial URLs. Renders no UI. */
export function ReferralTracker() {
  useEffect(() => {
    rememberReferral();
  }, []);
  return null;
}
