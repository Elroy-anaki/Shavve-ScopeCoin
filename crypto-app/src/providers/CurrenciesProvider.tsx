'use client';

import { useEffect } from 'react';
import currenciesStore from '@/stores/currenciesStore';
import axios from 'axios';

type Props = {
  children: React.ReactNode;
};

export default function CurrenciesProvider({ children }: Props) {
  const setCurrenciesData = currenciesStore((state) => state.setCurrenciesData);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const { data } = await axios.get('/api/currencies');
        setCurrenciesData(data);
        console.log('CurrenciesProvider:', data);
      } catch (err) {
        console.error('Failed to fetch currencies data:', err);
      }
    };

    fetchCurrencies();
  }, [setCurrenciesData]);

  return <>{children}</>;
}
