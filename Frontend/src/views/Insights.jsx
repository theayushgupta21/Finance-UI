import React, { useMemo } from 'react';
import useStore from '../store/useStore';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  BarChart, 
  PieChart as PieIcon, 
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const InsightCard = ({ title, value, status, icon: Icon, color = 'indigo' }) => (
  <div className="saas-card p-10 flex flex-col justify-between h-full">
    <div className="flex justify-between items-start mb-10">
      <div className={`p-4 rounded-2xl bg-${color}-50 text-${color}-600 shadow-sm border border-${color}-100`}>
        <Icon className="w-8 h-8" />
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Efficiency</span>
        <span className="text-xs text-green-500 font-bold font-mono tracking-tighter shadow-sm">+4.8%</span>
      </div>
    </div>
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">{title}</p>
      <h3 className="text-4xl font-serif font-bold text-slate-900 mb-4 italic lowercase tracking-tight">{value}</h3>
      <p className="text-xs text-slate-400 font-medium italic underline underline-offset-4 decoration-indigo-200/50">{status}</p>
    </div>
  </div>
);

const Insights = () => {
  const { transactions } = useStore();

  const analytics = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Top Category
    const categories = {};
    expenses.forEach(t => categories[t.category] = (categories[t.category] || 0) + t.amount);
    const topCat = Object.entries(categories).sort((a,b) => b[1] - a[1])[0] || ['N/A', 0];

    // Monthly Delta
    const marchTotal = transactions.filter(t => t.date.startsWith('2026-03')).reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);
    const aprilTotal = transactions.filter(t => t.date.startsWith('2026-04')).reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);
    const delta = marchTotal !== 0 ? (((aprilTotal - marchTotal) / Math.abs(marchTotal)) * 100).toFixed(1) : '0.0';

    return { topCat, delta };
  }, [transactions]);

  const barData = [
    { name: 'Jan', savings: 1200 },
    { name: 'Feb', savings: -400 },
    { name: 'Mar', savings: 2100 },
    { name: 'Apr', savings: 1800 },
    { name: 'May', savings: 900 },
    { name: 'Jun', savings: 2500 }
  ];

  return (
    <div className="space-y-10 mb-20">
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-serif lowercase italic">Algorithmic Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <InsightCard 
          title="Savings Velocity" 
          value={`${analytics.delta}%`} 
          status="Projected for cycle"
          icon={Zap}
        />
        <InsightCard 
          title="Concentration" 
          value={analytics.topCat[0]}
          status="Dominates total spend"
          icon={Layers}
        />
        <InsightCard 
          title="Capital Reserve" 
          value="$12.4k" 
          status="Targeting $15.0k"
          icon={Target}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Net Savings Bar Chart */}
        <div className="lg:col-span-3 saas-card p-10">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h4 className="text-2xl font-serif font-bold text-slate-900 italic lowercase tracking-tight">Financial Concentration</h4>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-2">Vertical growth orbit</p>
            </div>
            <BarChart className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="h-[380px] w-full min-h-[380px] min-w-0">
             <ResponsiveContainer width="100%" height="100%" debounce={100}>
                <ReBarChart data={barData}>
                   <CartesianGrid strokeDasharray="1 5" vertical={false} stroke="#f1f5f9" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 600}} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 600}} />
                   <Tooltip 
                      cursor={{fill: 'rgba(79, 70, 229, 0.05)'}}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: 'shadow-lg' }}
                   />
                   <Bar dataKey="savings">
                     {barData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.savings > 0 ? '#4f46e5' : '#ef4444'} radius={[6, 6, 0, 0]} />
                     ))}
                   </Bar>
                </ReBarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Narrative Box */}
        <div className="lg:col-span-2 saas-card p-10 flex flex-col justify-between">
           <div>
              <h4 className="text-2xl font-serif font-bold text-slate-900 italic lowercase tracking-tight mb-4 text-center">Narrative Flow</h4>
              <p className="text-slate-500 text-sm leading-relaxed italic text-center px-4">
                 Your spending velocity in <span className="text-slate-900 font-bold">{analytics.topCat[0]}</span> has decreased by <span className="text-green-500 font-bold">12%</span> this period. This deviation from your historical baseline suggests an improved allocation efficiency.
              </p>
           </div>
           
           <div className="space-y-6 pt-10 border-t border-slate-50">
              {[
                { label: 'Category Optimization', value: 'High' },
                { label: 'Asset Protection', value: 'Moderate' },
                { label: 'Market Liquidity', value: 'High' }
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center px-2">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 italic">{item.label}</span>
                   <span className="text-xs font-bold text-slate-900 border-b border-indigo-200">{item.value}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
