import {create} from 'zustand';

type ICurrenciesState = {
    currenciesData: Record<string, string> | null;
  setCurrenciesData: (data:Record<string, string>) => void
}

const currenciesStore = create<ICurrenciesState>((set) => ({
    currenciesData: null,
    setCurrenciesData: (data) => set({ currenciesData: data }),
}));

export default currenciesStore;
