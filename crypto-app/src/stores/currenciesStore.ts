import {create} from 'zustand';

type ICurrenciesState = {
    currenciesData: Object | null;
  setCurrenciesData: (data:Object) => void
}

const currenciesStore = create<ICurrenciesState>((set) => ({
    currenciesData: null,
    setCurrenciesData: (data) => set({ currenciesData: data }),
}));

export default currenciesStore;
