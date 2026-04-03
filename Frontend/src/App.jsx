import React, { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './views/Dashboard';
import Transactions from './views/Transactions';
import Insights from './views/Insights';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'insights':
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppLayout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </AppLayout>
  );
}

export default App;
