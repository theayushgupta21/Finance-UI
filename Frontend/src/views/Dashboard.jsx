import React, { useMemo, useEffect } from 'react';
import useStore from '../store/useStore';
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Layers
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const SummaryCard = ({ title, amount, type, icon: Icon, trend }) => (
  <div className="saas-card p-6 flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div className={`p-2 rounded-lg ${type === 'income' ? 'bg-green-50 text-green-600' : type === 'expense' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className={`text-xs font-bold font-mono tracking-tighter ${trend > 0 ? 'text-green-600' : 'text-red-500'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold tracking-tight text-slate-900 font-serif lowercase italic">
        ${amount.toLocaleString()}
      </h3>
    </div>
  </div>
);

const Dashboard = () => {
  const { transactions, fetchTransactions, loading } = useStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Calculations
  const stats = useMemo(() => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return {
      balance: totalIncome - totalExpense,
      income: totalIncome,
      expenses: totalExpense
    };
  }, [transactions]);

  // Chart Data: Group by category
  const pieData = useMemo(() => {
    const categories = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  // Simple Area Chart Data (Placeholder for trend line if only few days are available)
  const areaData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  const PIE_COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Financial Overview</h2>
        <p className="text-slate-500 text-sm">Real-time insights across all account activities.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" amount={stats.balance} type="balance" icon={Wallet} trend={12.5} />
        <SummaryCard title="Total Income" amount={stats.income} type="income" icon={TrendingUp} trend={8.2} />
        <SummaryCard title="Total Expenses" amount={stats.expenses} type="expense" icon={TrendingDown} trend={-3.1} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Main Trends Area Chart */}
        <div className="lg:col-span-3 saas-card p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-lg font-bold text-slate-900">Balance Orbit</h4>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">Growth Index</p>
            </div>
            <div className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
              <Layers className="w-5 h-5 text-slate-400" />
            </div>
          </div>
          <div className="h-[350px] w-full min-h-[350px] min-w-0">
            <ResponsiveContainer width="100%" height="100%" debounce={100}>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Donut Chart */}
        <div className="lg:col-span-2 saas-card p-10">
          <h4 className="text-lg font-bold text-slate-900 mb-1">Expense Breakdown</h4>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-8">Concentration</p>
          <div className="h-[300px] w-full min-h-[300px] min-w-0 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%" debounce={100}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter italic">Total spent</span>
              <span className="text-xl font-bold text-slate-900 italic font-serif lowercase">${stats.expenses.toLocaleString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
            {pieData.slice(0, 4).map((entry, idx) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}></div>
                <span className="text-xs font-semibold text-slate-500 truncate">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
