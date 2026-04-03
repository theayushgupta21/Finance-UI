import { create } from 'zustand';
import api from '../api/axios';

const useStore = create((set, get) => ({
  transactions: [],
  role: 'admin', // Default to admin for easier testing
  filters: {
    search: '',
    category: 'all',
    type: 'all',
    sort: 'date-desc',
  },
  loading: false,
  error: null,

  // Actions
  fetchTransactions: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/transactions');
      set({ transactions: response.data, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch transactions', loading: false });
    }
  },

  addTransaction: async (transaction) => {
    set({ loading: true });
    try {
      const response = await api.post('/transactions', transaction);
      set((state) => ({
        transactions: [response.data, ...state.transactions],
        loading: false,
      }));
    } catch (err) {
      set({ error: 'Failed to add transaction', loading: false });
    }
  },

  updateTransaction: async (id, updatedData) => {
    set({ loading: true });
    try {
      const response = await api.put(`/transactions/${id}`, updatedData);
      set((state) => ({
        transactions: state.transactions.map((t) => (t.id === id ? response.data : t)),
        loading: false,
      }));
    } catch (err) {
      set({ error: 'Failed to update transaction', loading: false });
    }
  },

  deleteTransaction: async (id) => {
    set({ loading: true });
    try {
      await api.delete(`/transactions/${id}`);
      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: 'Failed to delete transaction', loading: false });
    }
  },

  setRole: (role) => set({ role }),
  
  setFilters: (newFilters) => 
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),

  // Selectors/Computed values (derived from state)
  getFilteredTransactions: () => {
    const { transactions, filters } = get();
    let result = [...transactions];

    if (filters.search) {
      result = result.filter((t) =>
        t.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.category !== 'all') {
      result = result.filter((t) => t.category === filters.category);
    }
    if (filters.type !== 'all') {
      result = result.filter((t) => t.type === filters.type);
    }

    // Sort
    const [key, direction] = filters.sort.split('-');
    result.sort((a, b) => {
      let valA = a[key === 'date' ? 'date' : 'amount'];
      let valB = b[key === 'date' ? 'date' : 'amount'];

      if (key === 'date') {
        const timeA = new Date(valA).getTime();
        const timeB = new Date(valB).getTime();
        return direction === 'asc' ? timeA - timeB : timeB - timeA;
      }
      return direction === 'asc' ? valA - valB : valB - valA;
    });

    return result;
  },
}));

export default useStore;
