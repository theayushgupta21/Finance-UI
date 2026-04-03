import React from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  TrendingUp, 
  Wallet, 
  Settings, 
  CircleUserRound, 
  HelpCircle,
  PiggyBank
} from 'lucide-react';

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
  ];

  const secondaryItems = [
    { id: 'savings', label: 'Savings', icon: PiggyBank },
    { id: 'support', label: 'Support', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen border-r border-slate-200 bg-white flex flex-col sticky top-0">
      {/* Brand */}
      <div className="flex items-center gap-3 p-8">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <Wallet className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 font-serif lowercase italic">luxefinance</h1>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest px-4 mb-2 mt-4">Main Menu</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
              activeView === item.id 
                ? 'bg-slate-50 text-indigo-600' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeView === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
            {item.label}
          </button>
        ))}

        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest px-4 mb-2 mt-8">Personal</div>
        {secondaryItems.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50/50 transition-all text-sm font-medium"
          >
            <item.icon className="w-5 h-5 text-slate-400" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-slate-100 mb-2">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
               <span className="text-slate-600 font-bold text-sm">AG</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 truncate">
            <p className="text-sm font-semibold text-slate-900 truncate">Ayush Gupta</p>
            <p className="text-xs text-slate-500 font-medium tracking-tight">Premium Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
