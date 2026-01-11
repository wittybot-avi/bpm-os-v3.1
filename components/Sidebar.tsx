import React, { useContext } from 'react';
import { APP_NAME, APP_VERSION, PATCH_ID, NavView, UserContext, UserRole } from '../types';
import { 
  Home, 
  Activity, 
  Box, 
  Layers, 
  ClipboardList, 
  BarChart2, 
  FileText,
  Settings,
  Cpu,
  ShoppingCart,
  Truck,
  CalendarClock,
  Wrench,
  ClipboardCheck,
  Battery,
  FileCheck
} from 'lucide-react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors ${
      active 
        ? 'bg-brand-50 text-brand-700 border-r-4 border-brand-600' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const { role } = useContext(UserContext);
  
  // RBAC Logic
  const canSeeSystemSetup = role === UserRole.SYSTEM_ADMIN || role === UserRole.MANAGEMENT;
  
  const canSeeSkuBlueprint = 
    role === UserRole.SYSTEM_ADMIN || 
    role === UserRole.ENGINEERING || 
    role === UserRole.MANAGEMENT;

  const canSeeProcurement = 
    role === UserRole.SYSTEM_ADMIN || 
    role === UserRole.PROCUREMENT || 
    role === UserRole.MANAGEMENT;

  const canSeeInboundReceipt = 
    role === UserRole.SYSTEM_ADMIN || 
    role === UserRole.STORES || 
    role === UserRole.SUPERVISOR || 
    role === UserRole.MANAGEMENT;

  const canSeeBatchPlanning = 
    role === UserRole.SYSTEM_ADMIN || 
    role === UserRole.PLANNER ||
    role === UserRole.SUPERVISOR || 
    role === UserRole.MANAGEMENT;

  const canSeeModuleAssembly = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.OPERATOR ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;

  const canSeeModuleQA = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.QA_ENGINEER ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;

  const canSeePackAssembly = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.OPERATOR ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;

  const canSeePackReview = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.QA_ENGINEER ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;

  return (
    <aside className="w-64 bg-white border-r border-industrial-border h-full flex flex-col shrink-0">
      <div className="p-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
          Navigation
        </div>
        <nav className="flex flex-col space-y-1">
          <NavItem 
            icon={Home} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => onNavigate('dashboard')} 
          />
          {canSeeSystemSetup && (
            <NavItem 
              icon={Settings} 
              label="System Setup (S0)" 
              active={currentView === 'system_setup'} 
              onClick={() => onNavigate('system_setup')} 
            />
          )}
          {canSeeSkuBlueprint && (
             <NavItem 
              icon={Cpu} 
              label="SKU & Blueprint (S1)" 
              active={currentView === 'sku_blueprint'} 
              onClick={() => onNavigate('sku_blueprint')} 
            />
          )}
          {canSeeProcurement && (
             <NavItem 
              icon={ShoppingCart} 
              label="Procurement (S2)" 
              active={currentView === 'procurement'} 
              onClick={() => onNavigate('procurement')} 
            />
          )}
          {canSeeInboundReceipt && (
             <NavItem 
              icon={Truck} 
              label="Inbound Receipt (S3)" 
              active={currentView === 'inbound_receipt'} 
              onClick={() => onNavigate('inbound_receipt')} 
            />
          )}
          {canSeeBatchPlanning && (
             <NavItem 
              icon={CalendarClock} 
              label="Batch Planning (S4)" 
              active={currentView === 'batch_planning'} 
              onClick={() => onNavigate('batch_planning')} 
            />
          )}
          {canSeeModuleAssembly && (
             <NavItem 
              icon={Wrench} 
              label="Module Assembly (S5)" 
              active={currentView === 'module_assembly'} 
              onClick={() => onNavigate('module_assembly')} 
            />
          )}
          {canSeeModuleQA && (
             <NavItem 
              icon={ClipboardCheck} 
              label="Module QA (S6)" 
              active={currentView === 'module_qa'} 
              onClick={() => onNavigate('module_qa')} 
            />
          )}
          {canSeePackAssembly && (
             <NavItem 
              icon={Battery} 
              label="Pack Assembly (S7)" 
              active={currentView === 'pack_assembly'} 
              onClick={() => onNavigate('pack_assembly')} 
            />
          )}
          {canSeePackReview && (
             <NavItem 
              icon={FileCheck} 
              label="Pack Review (S8)" 
              active={currentView === 'pack_review'} 
              onClick={() => onNavigate('pack_review')} 
            />
          )}
          <NavItem icon={Activity} label="Live Status" />
          <NavItem icon={Box} label="Inventory" />
          <NavItem icon={Layers} label="Production Line" />
        </nav>
      </div>

      <div className="p-4 mt-auto">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
          System
        </div>
        <nav className="flex flex-col space-y-1">
          <NavItem icon={ClipboardList} label="Logs" />
          <NavItem icon={BarChart2} label="Reports" />
          <NavItem icon={FileText} label="Documentation" />
        </nav>
      </div>
      
      {/* Footer Watermark - Unified Patch ID Source */}
      <div className="p-4 border-t border-slate-100 text-center">
        <p className="text-[10px] text-slate-400">
          {APP_NAME} {APP_VERSION} | Build {PATCH_ID}
          <br />
          &copy; 2025 Internal Use Only
        </p>
      </div>
    </aside>
  );
};