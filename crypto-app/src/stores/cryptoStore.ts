import {create} from 'zustand';

type IcryptoState = {
  cryptoData: Object[] | null;
  setCryptoData: (data:Object[]) => void
}

const cryptoStore = create<IcryptoState>((set) => ({
  cryptoData: null,
  setCryptoData: (data) => set({ cryptoData: data }),
}));

export default cryptoStore;
