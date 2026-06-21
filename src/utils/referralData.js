export function normalizeReferral(referral = {}) {
  const id = referral.id ?? referral.referralId ?? referral.referral_id ?? referral._id;
  const name = referral.name ?? referral.partnerName ?? referral.partner_name ?? referral.referralName ?? '';
  const serviceName =
    referral.serviceName ?? referral.service ?? referral.service_name ?? referral.serviceTitle ?? '';
  const date = referral.date ?? referral.createdAt ?? referral.created_at ?? referral.referralDate ?? '';
  const profit =
    referral.profit ??
    referral.profitAmount ??
    referral.profit_amount ??
    referral.earnings ??
    referral.amount ??
    0;

  return {
    ...referral,
    id,
    name,
    serviceName,
    date,
    profit
  };
}

export function normalizeReferrals(referrals = []) {
  return Array.isArray(referrals) ? referrals.map(normalizeReferral) : [];
}

export function findReferralById(referrals = [], id) {
  return normalizeReferrals(referrals).find((referral) => String(referral.id) === String(id)) || null;
}

export function extractReferralFromResponse(responseData, id) {
  const payload = responseData?.data ?? responseData ?? {};
  const candidates = [
    payload.referral,
    payload.referralDetails,
    payload.details,
    payload.item,
    payload
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      const match = findReferralById(candidate, id);
      if (match) {
        return match;
      }
    }

    if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
      if (Array.isArray(candidate.referrals)) {
        const match = findReferralById(candidate.referrals, id);
        if (match) {
          return match;
        }
      }

      const normalized = normalizeReferral(candidate);
      if (normalized.id !== undefined && String(normalized.id) === String(id)) {
        return normalized;
      }
    }
  }

  return null;
}
