import type { OffersData, ProofPoint } from '../api';

export function ofSize(size: number) {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
}

export function getClaimIcons(offersData: OffersData): string[] {
  if (!offersData.proofPoints) return [];

  return offersData.proofPoints
    .map((p: ProofPoint) => p.iconHTML)
    .map((v: string) =>
      v.startsWith('<img ') ? extractImageUrlFromHtml(v) : v
    );
}

function extractImageUrlFromHtml(html: string): string {
  const match = /<img[^>]+src="([^"]+)"[^>]*>/i.exec(html);

  return match && match[1] ? match[1] : '';
}
