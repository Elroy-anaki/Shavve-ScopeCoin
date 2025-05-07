'use client';

// This component runs in the start of the app
// We import the cryptos one time and we can access them in the app

import { useEffect } from 'react';
import cryptoStore from '@/stores/cryptoStore';
import axios from 'axios';

type Props = {
  children: React.ReactNode;
};

export default function CryptoProvider({ children }: Props) {
  const setCryptoData = cryptoStore((state) => state.setCryptoData);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const { data } = await axios.get('/api/crypto');
        setCryptoData(data);
        console.log("cryptos", data)
      } catch (err) {
        console.error('Failed to fetch crypto data:', err);
      }
    };

    fetchCrypto();
  }, [setCryptoData]);

  return <>{children}</>;
}
