import React from 'react';
import { 
  Bell, 
  Search, 
  Sun, 
  Moon, 
  ShieldCheck, 
  User,
  ShieldEllipsis
} from 'lucide-react';
import useStore from '../../store/useStore';

const Navbar = ({ role, setRole }) => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
      {/* Search Bar */}
      <div className="relative w-96 max-w-lg hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search for transactions..." 
          className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-300 focus:bg-white transition-all"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-6 ml-auto">
        {/* Role Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
           <button 
             onClick={() => setRole('viewer')}
             className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
               role === 'viewer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
             }`}
           >
             <User className={`w-3.5 h-3.5 ${role === 'viewer' ? 'text-indigo-600' : ''}`} />
             Viewer
           </button>
           <button 
             onClick={() => setRole('admin')}
             className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
               role === 'admin' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
             }`}
           >
             <ShieldCheck className={`w-3.5 h-3.5 ${role === 'admin' ? 'text-indigo-600' : ''}`} />
             Admin
           </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 border-l border-slate-200 pl-6">
           <button className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors">
             <Bell className="w-5 h-5" />
           </button>
           <button className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors">
             <Sun className="w-5 h-5" />
           </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
