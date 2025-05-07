import {create} from 'zustand';

// This file contains the store of the cryptos

type IcryptoState = {
  cryptoData: Object[] | null;
  setCryptoData: (data:Object[]) => void
}

const cryptoStore = create<IcryptoState>((set) => ({
  cryptoData: null,
  setCryptoData: (data) => set({ cryptoData: data }),
}));

export default cryptoStore;
