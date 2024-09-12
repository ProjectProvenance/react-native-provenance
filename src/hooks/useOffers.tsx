import { useState, useEffect } from 'react';
import { getOffers } from '../api';

export const useOffers = (sku: string) => {
  const [offers, setOffers] = useState<any>([]);

  useEffect(() => {
    getOffers(sku)
      .then((responseData) => {
        setOffers(responseData);
      })
      .catch((reason) => console.error('Failed to get offers', reason));
  }, [sku]);

  return { offers };
};
