import React, { useState, useEffect, useMemo } from 'react';
import useStore from '../store/useStore';
import { 
  Search, 
  Filter, 
  Trash2, 
  Edit2, 
  Plus, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown,
  X,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Transactions = () => {
  const { 
    transactions, 
    fetchTransactions, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction, 
    filters, 
    setFilters, 
    getFilteredTransactions,
    role,
    loading 
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ description: '', amount: '', category: 'Food', type: 'expense', date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredData = useMemo(() => getFilteredTransactions(), [getFilteredTransactions, transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, amount: parseFloat(formData.amount) };
    if (editingId) {
      updateTransaction(editingId, data);
    } else {
      addTransaction(data);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ description: '', amount: '', category: 'Food', type: 'expense', date: new Date().toISOString().split('T')[0] });
  };

  const openEdit = (t) => {
    setEditingId(t.id);
    setFormData({ ...t });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Search & Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-serif lowercase italic">Transaction Ledger</h2>
        <div className="flex gap-3">
          <button className="saas-button-secondary flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          {role === 'admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="saas-button-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Entry
            </button>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="saas-card p-4 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Filter by description..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-300 focus:bg-white transition-all"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
        </div>
        
        <select 
          className="bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-300"
          value={filters.type}
          onChange={(e) => setFilters({ type: e.target.value })}
        >
          <option value="all">Types (All)</option>
          <option value="income">Credits (+)</option>
          <option value="expense">Debits (-)</option>
        </select>

        <select 
          className="bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-300"
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value })}
        >
          <option value="all">Categories (All)</option>
          <option value="Salary">Salary</option>
          <option value="Food">Food</option>
          <option value="Housing">Housing</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <select 
          className="bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-300"
          value={filters.sort}
          onChange={(e) => setFilters({ sort: e.target.value })}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="saas-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr className="text-xs uppercase tracking-widest font-bold text-slate-400">
                <th className="px-8 py-5">Date Index</th>
                <th className="px-8 py-5">Entity Description</th>
                <th className="px-8 py-5">Classification</th>
                <th className="px-8 py-5">Value Basis</th>
                {role === 'admin' && <th className="px-8 py-5 text-right">Mutations</th>}
              </tr>
            </thead>
            <tbody className="divide-y border-slate-50">
              <AnimatePresence mode="popLayout">
                {filteredData.map((t, idx) => (
                  <motion.tr 
                    key={t.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 font-semibold text-slate-900">{t.description}</td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-500 border border-slate-200 rounded-full italic">
                        {t.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-bold font-mono">
                      <div className="flex items-center gap-1.5 justify-end md:justify-start">
                        {t.type === 'income' ? <ArrowUpRight className="w-3.5 h-3.5 text-green-500" /> : <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />}
                        <span className={t.type === 'income' ? 'text-green-600' : 'text-slate-900'}>
                          {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    {role === 'admin' && (
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(t)} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-indigo-100 transition-all">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteTransaction(t.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-red-100 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="saas-card w-full max-w-lg p-10 relative z-10"
            >
              <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
                <h3 className="text-2xl font-bold font-serif italic lowercase tracking-tight text-slate-900">
                   {editingId ? 'Edit mutation' : 'New ledger entry'}
                </h3>
                <button onClick={closeModal} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Description</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Monthly Salary"
                    className="w-full bg-slate-50 border border-slate-100 rounded-lg py-3 px-4 focus:outline-none focus:border-indigo-300 transition-all font-medium text-slate-900"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Amount ($)</label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      placeholder="0.00"
                      className="w-full bg-slate-50 border border-slate-100 rounded-lg py-3 px-4 focus:outline-none focus:border-indigo-300 transition-all font-medium text-slate-900"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Transaction Type</label>
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                      <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'income' })}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.type === 'income' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                      >Credit</button>
                      <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'expense' })}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.type === 'expense' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                      >Debit</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Internal Category</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-100 rounded-lg py-3 px-4 focus:outline-none"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option>Salary</option><option>Food</option><option>Housing</option><option>Transport</option><option>Utilities</option><option>Entertainment</option><option>Freelance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Execution Date</label>
                    <input 
                      required
                      type="date" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-lg py-3 px-4 focus:outline-none"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full saas-button-primary py-4 text-sm uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 disabled:opacity-50"
                >
                  {editingId ? 'Confirm mutation' : 'Post to Ledger'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Transactions;
