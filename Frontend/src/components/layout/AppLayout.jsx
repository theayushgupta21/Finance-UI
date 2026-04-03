import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';

const AppLayout = ({ activeView, setActiveView, children }) => {
  const { role, setRole } = useStore();

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar role={role} setRole={setRole} />
        
        <main className="flex-1 overflow-y-auto px-8 py-10 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
