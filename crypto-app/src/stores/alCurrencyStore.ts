
import { create } from 'zustand'

const useStore = create((set) => ({
  data: null,
  loading: false,
  fetchData: async () => {
    set({ loading: true })
    const res = await fetch('/api/some-endpoint')
    const data = await res.json()
    set({ data, loading: false })
  }
}))

export default useStore
