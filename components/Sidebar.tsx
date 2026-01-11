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
  FileCheck,
  Database,
  PackageCheck,
  Package,
  Stamp,
  LogOut,
  LifeBuoy,
  Recycle,
  ShieldCheck
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
    className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium transition-colors ${
      active 
        ? 'bg-brand-50 text-brand-700 border-r-4 border-brand-600' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
    }`}
  >
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const { role } = useContext(UserContext);
  
  // RBAC Logic - Module Visibility
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
  
  const canSeeRegistry = 
    role === UserRole.SYSTEM_ADMIN || 
    role === UserRole.MANAGEMENT || 
    role === UserRole.ENGINEERING ||
    role === UserRole.QA_ENGINEER;

  const canSeeBMSProvisioning = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.ENGINEERING ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;
  
  const canSeeFinishedGoods = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.STORES ||
    role === UserRole.LOGISTICS ||
    role === UserRole.MANAGEMENT;

  const canSeePackaging = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.STORES ||
    role === UserRole.LOGISTICS ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;

  const canSeeDispatchAuth = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.LOGISTICS ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;

  const canSeeDispatchExec = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.LOGISTICS ||
    role === UserRole.STORES ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;

  const canSeeService = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.SERVICE ||
    role === UserRole.MANAGEMENT;

  const canSeeRecycling = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.SUSTAINABILITY ||
    role === UserRole.SERVICE ||
    role === UserRole.MANAGEMENT;

  const canSeeCompliance = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.COMPLIANCE ||
    role === UserRole.SUSTAINABILITY ||
    role === UserRole.MANAGEMENT;

  // Group Visibility Logic
  const showSystemSetup = canSeeSystemSetup || canSeeSkuBlueprint;
  const showProcurement = canSeeProcurement || canSeeInboundReceipt;
  const showProduction = canSeeBatchPlanning || canSeeModuleAssembly || canSeeModuleQA || canSeePackAssembly || canSeePackReview;
  const showTraceability = canSeeRegistry || canSeeBMSProvisioning;
  const showLogistics = canSeeFinishedGoods || canSeePackaging || canSeeDispatchAuth || canSeeDispatchExec;
  const showLifecycle = canSeeService || canSeeRecycling;
  const showGovernance = canSeeCompliance;

  return (
    <aside className="w-64 bg-white border-r border-industrial-border h-full flex flex-col shrink-0">
      
      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto py-4">
        
        {/* Dashboard (Always Visible) */}
        <nav className="flex flex-col space-y-1 mb-2">
            <NavItem 
              icon={Home} 
              label="Dashboard" 
              active={currentView === 'dashboard'} 
              onClick={() => onNavigate('dashboard')} 
            />
        </nav>

        {/* Group A: System Setup */}
        {showSystemSetup && (
          <div className="mt-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
              System Setup
            </div>
            <nav className="flex flex-col space-y-1">
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
            </nav>
          </div>
        )}

        {/* Group B: Procurement & Inbound */}
        {showProcurement && (
          <div className="mt-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
              Procurement & Inbound
            </div>
            <nav className="flex flex-col space-y-1">
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
            </nav>
          </div>
        )}

        {/* Group C: Production Planning & Execution */}
        {showProduction && (
          <div className="mt-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
              Production Planning
            </div>
            <nav className="flex flex-col space-y-1">
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
            </nav>
          </div>
        )}

        {/* Group D: Trace & Identity (Renamed from Traceability & Identity) */}
        {showTraceability && (
          <div className="mt-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
              Trace & Identity
            </div>
            <nav className="flex flex-col space-y-1">
              {canSeeRegistry && (
                <NavItem 
                  icon={Database} 
                  label="Battery Registry (S9)" 
                  active={currentView === 'battery_registry'} 
                  onClick={() => onNavigate('battery_registry')} 
                />
              )}
              {canSeeBMSProvisioning && (
                <NavItem 
                  icon={Cpu} 
                  label="BMS Provisioning (S10)" 
                  active={currentView === 'bms_provisioning'} 
                  onClick={() => onNavigate('bms_provisioning')} 
                />
              )}
            </nav>
          </div>
        )}

        {/* Group E: Logistics & Dispatch */}
        {showLogistics && (
          <div className="mt-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
              Logistics & Dispatch
            </div>
            <nav className="flex flex-col space-y-1">
              {canSeeFinishedGoods && (
                <NavItem 
                  icon={PackageCheck} 
                  label="Finished Goods (S11)" 
                  active={currentView === 'finished_goods'} 
                  onClick={() => onNavigate('finished_goods')} 
                />
              )}
              {canSeePackaging && (
                <NavItem 
                  icon={Package} 
                  label="Packaging (S12)" 
                  active={currentView === 'packaging_aggregation'} 
                  onClick={() => onNavigate('packaging_aggregation')} 
                />
              )}
              {canSeeDispatchAuth && (
                <NavItem 
                  icon={Stamp} 
                  label="Dispatch Auth (S13)" 
                  active={currentView === 'dispatch_authorization'} 
                  onClick={() => onNavigate('dispatch_authorization')} 
                />
              )}
              {canSeeDispatchExec && (
                <NavItem 
                  icon={LogOut} 
                  label="Dispatch Exec (S14)" 
                  active={currentView === 'dispatch_execution'} 
                  onClick={() => onNavigate('dispatch_execution')} 
                />
              )}
            </nav>
          </div>
        )}

        {/* Group F: Track & Lifecycle (Renamed from Traceability & Lifecycle) */}
        {showLifecycle && (
          <div className="mt-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
              Track & Lifecycle
            </div>
            <nav className="flex flex-col space-y-1">
              {canSeeService && (
                <NavItem 
                  icon={LifeBuoy} 
                  label="Service & Warranty (S15)" 
                  active={currentView === 'service_warranty'} 
                  onClick={() => onNavigate('service_warranty')} 
                />
              )}
              {canSeeRecycling && (
                <NavItem 
                  icon={Recycle} 
                  label="Recycling & Recovery (S16)" 
                  active={currentView === 'recycling_recovery'} 
                  onClick={() => onNavigate('recycling_recovery')} 
                />
              )}
            </nav>
          </div>
        )}

        {/* Group G: Governance */}
        {showGovernance && (
          <div className="mt-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
              Governance
            </div>
            <nav className="flex flex-col space-y-1">
              {canSeeCompliance && (
                <NavItem 
                  icon={ShieldCheck} 
                  label="Compliance & Audit (S17)" 
                  active={currentView === 'compliance_audit'} 
                  onClick={() => onNavigate('compliance_audit')} 
                />
              )}
            </nav>
          </div>
        )}

        {/* Group H: System */}
        <div className="mt-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
            System
          </div>
          <nav className="flex flex-col space-y-1">
            <NavItem icon={Activity} label="Live Status" />
            <NavItem icon={Box} label="Inventory" />
            <NavItem icon={Layers} label="Production Line" />
            <NavItem icon={ClipboardList} label="Logs" />
            <NavItem icon={BarChart2} label="Reports" />
            <NavItem icon={FileText} label="Documentation" />
          </nav>
        </div>

      </div>
      
      {/* Footer Watermark - Unified Patch ID Source */}
      <div className="p-4 border-t border-slate-100 text-center shrink-0 bg-white z-10">
        <p className="text-[10px] text-slate-400">
          {APP_NAME} {APP_VERSION} | Build {PATCH_ID}
          <br />
          &copy; 2025 Internal Use Only
        </p>
      </div>
    </aside>
  );
};