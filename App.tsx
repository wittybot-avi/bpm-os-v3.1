import React, { useState, useMemo } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { SystemSetup } from './components/SystemSetup';
import { SKUBlueprint } from './components/SKUBlueprint';
import { Procurement } from './components/Procurement';
import { InboundReceipt } from './components/InboundReceipt';
import { BatchPlanning } from './components/BatchPlanning';
import { ModuleAssembly } from './components/ModuleAssembly';
import { UserRole, UserContextType, UserContext, NavView } from './types';
import { canAccess } from './utils/rbac';

const App: React.FC = () => {
  // PP-010: View State
  const [currentView, setCurrentView] = useState<NavView>('dashboard');
  
  // BP-002: Dynamic Role State
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.SYSTEM_ADMIN);

  // Derive user identity based on role for demo purposes
  const userContextValue: UserContextType = useMemo(() => {
    return {
      id: `usr_${currentRole.toLowerCase().replace(/ /g, '_')}`,
      name: `${currentRole} User`, // Generic name based on role
      role: currentRole,
      isDemo: true,
      setRole: (role: UserRole) => setCurrentRole(role),
      checkAccess: (featureId: string) => canAccess(currentRole, featureId)
    };
  }, [currentRole]);

  return (
    <ErrorBoundary>
      <UserContext.Provider value={userContextValue}>
        <Layout currentView={currentView} onNavigate={setCurrentView}>
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'system_setup' && <SystemSetup />}
          {currentView === 'sku_blueprint' && <SKUBlueprint />}
          {currentView === 'procurement' && <Procurement />}
          {currentView === 'inbound_receipt' && <InboundReceipt />}
          {currentView === 'batch_planning' && <BatchPlanning />}
          {currentView === 'module_assembly' && <ModuleAssembly />}
        </Layout>
      </UserContext.Provider>
    </ErrorBoundary>
  );
};

export default App;