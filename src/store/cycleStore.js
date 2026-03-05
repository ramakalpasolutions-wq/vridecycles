import { create } from 'zustand';

const useCycleStore = create((set) => ({
  cycles: [],
  filteredCycles: [],
  loading: false,
  searchQuery: '',
  selectedCategory: 'all',
  isAdminLoggedIn: false,

  setCycles: (cycles) => set({ cycles, filteredCycles: cycles }),

  setLoading: (loading) => set({ loading }),

  setSearchQuery: (query) =>
    set((state) => {
      const filtered = state.cycles.filter(
        (cycle) =>
          cycle.name.toLowerCase().includes(query.toLowerCase()) ||
          cycle.description.toLowerCase().includes(query.toLowerCase())
      );
      return { searchQuery: query, filteredCycles: filtered };
    }),

  setSelectedCategory: (category) =>
    set((state) => {
      if (category === 'all') {
        return { selectedCategory: category, filteredCycles: state.cycles };
      }
      const filtered = state.cycles.filter(
        (cycle) => cycle.category === category
      );
      return { selectedCategory: category, filteredCycles: filtered };
    }),

  setAdminLoggedIn: (status) => set({ isAdminLoggedIn: status }),
}));

export default useCycleStore;