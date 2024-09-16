import { useState, useEffect } from 'react';
import { getOffers, type OffersData } from '../api';

export const useOffers = (sku: string) => {
  const [offers, setOffers] = useState<OffersData | null>();

  useEffect(() => {
    getOffers(sku).then((offersResponseData) => {
      setOffers(offersResponseData);
    });
  }, [sku]);

  return { offers };
};
