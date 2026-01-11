import React, { useContext } from 'react';
import { UserContext, UserRole } from '../types';
import { 
  ShieldAlert, 
  FileCheck, 
  Globe, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  History, 
  Download, 
  BarChart4,
  CheckCircle2,
  XCircle,
  Flag
} from 'lucide-react';

// Mock Data for Dashboard
const KPI_DATA = {
  totalManufactured: 1240,
  aadhaarReady: 98,
  euPassportReady: 45,
  eprEligible: 1240,
  riskCount: 12
};

const RISK_LIST = [
  { id: 'risk-01', packId: 'PCK-2026-001-013', issue: 'QA Hold - Electrical', severity: 'High' },
  { id: 'risk-02', packId: 'PCK-2025-010-092', issue: 'Service - Over Temp', severity: 'Medium' },
  { id: 'risk-03', packId: 'PCK-2026-002-005', issue: 'BMS Firmware Mismatch', severity: 'Low' }
];

const AUDIT_TRAIL = [
  { stage: 'S14: Dispatch', event: 'Custody Handover', timestamp: '2026-01-11 14:00', actor: 'Logistics Mgr', status: 'Verified' },
  { stage: 'S8: QA Review', event: 'Final Release', timestamp: '2026-01-11 10:30', actor: 'Quality Lead', status: 'Approved' },
  { stage: 'S7: Assembly', event: 'Enclosure Seal', timestamp: '2026-01-11 09:15', actor: 'Operator 42', status: 'Completed' },
  { stage: 'S3: Inbound', event: 'Cell Receipt', timestamp: '2026-01-05 08:00', actor: 'Stores Keeper', status: 'Logged' }
];

export const ComplianceAudit: React.FC = () => {
  const { role } = useContext(UserContext);

  // RBAC Access Check
  const hasAccess = 
    role === UserRole.SYSTEM_ADMIN || 
    role === UserRole.COMPLIANCE || 
    role === UserRole.SUSTAINABILITY || 
    role === UserRole.MANAGEMENT;

  if (!hasAccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500">
        <ShieldAlert size={64} className="text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-slate-700">Access Restricted</h2>
        <p>Your role ({role}) does not have permission to view Compliance & Audit.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <ShieldCheck className="text-brand-600" />
             Compliance & Audit (S17)
           </h1>
           <p className="text-slate-500">Regulatory governance, audit trails, and compliance reporting.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1 rounded border border-slate-200 text-xs font-bold">
             <Flag size={14} />
             <span>GOVERNANCE VIEW ONLY</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 shrink-0">
          <div className="bg-white p-4 rounded-lg border border-industrial-border shadow-sm">
             <div className="text-xs text-slate-500 uppercase font-bold mb-1">Total Packs</div>
             <div className="text-2xl font-mono font-bold text-slate-800">{KPI_DATA.totalManufactured}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-industrial-border shadow-sm">
             <div className="text-xs text-slate-500 uppercase font-bold mb-1">Aadhaar Ready</div>
             <div className="text-2xl font-mono font-bold text-green-600">{KPI_DATA.aadhaarReady}%</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-industrial-border shadow-sm">
             <div className="text-xs text-slate-500 uppercase font-bold mb-1">EU Passport</div>
             <div className="text-2xl font-mono font-bold text-blue-600">{KPI_DATA.euPassportReady}%</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-industrial-border shadow-sm">
             <div className="text-xs text-slate-500 uppercase font-bold mb-1">EPR Eligible</div>
             <div className="text-2xl font-mono font-bold text-slate-800">{KPI_DATA.eprEligible}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-industrial-border shadow-sm">
             <div className="text-xs text-slate-500 uppercase font-bold mb-1">Active Risks</div>
             <div className="text-2xl font-mono font-bold text-red-600">{KPI_DATA.riskCount}</div>
          </div>
      </div>

      {/* Main Content Split */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Left Column: Regulatory Panels */}
        <div className="col-span-8 flex flex-col gap-6 overflow-hidden">
            
            {/* Regulatory Readiness */}
            <div className="bg-white rounded-lg shadow-sm border border-industrial-border flex-1 flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                        <Globe size={16} />
                        Regulatory Readiness
                    </h3>
                </div>
                <div className="p-6 grid grid-cols-2 gap-8 overflow-y-auto">
                    {/* India */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
                            <span className="text-xl">🇮🇳</span> India (AIS-156 / MoRTH)
                        </h4>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                                <span className="text-sm text-slate-600">Battery Aadhaar API</span>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">CONNECTED</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                                <span className="text-sm text-slate-600">AIS-156 Phase 2 Data</span>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">COMPLIANT</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                                <span className="text-sm text-slate-600">EPR Registration</span>
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200">PENDING AUDIT</span>
                            </div>
                        </div>
                    </div>

                    {/* EU */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
                            <span className="text-xl">🇪🇺</span> European Union (EU Batt. Reg)
                        </h4>
                         <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                                <span className="text-sm text-slate-600">Digital Product Passport</span>
                                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200">PARTIAL DATA</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                                <span className="text-sm text-slate-600">Carbon Footprint Decl.</span>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">READY</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                                <span className="text-sm text-slate-600">Recycled Content %</span>
                                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">N/A (NEW)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Audit Trail */}
            <div className="bg-white rounded-lg shadow-sm border border-industrial-border flex-1 flex flex-col">
                 <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                        <History size={16} />
                        Sample Audit Trail
                    </h3>
                    <span className="text-xs text-slate-400">Traceability Verification (Read-Only)</span>
                </div>
                <div className="p-6 overflow-y-auto">
                    <div className="relative border-l-2 border-slate-200 pl-6 space-y-6">
                        {AUDIT_TRAIL.map((event, index) => (
                            <div key={index} className="relative">
                                <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-brand-500 border-2 border-white shadow-sm"></div>
                                <div className="bg-slate-50 rounded border border-slate-100 p-3">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-slate-800 text-sm">{event.stage}</span>
                                        <span className="text-xs font-mono text-slate-500">{event.timestamp}</span>
                                    </div>
                                    <div className="text-sm text-slate-600 mb-1">{event.event}</div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="font-semibold text-slate-500">By: {event.actor}</span>
                                        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full font-bold text-[10px] uppercase">{event.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>

        {/* Right Column: Reporting & Risks */}
        <div className="col-span-4 flex flex-col gap-6">
            
            {/* Risk Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-industrial-border flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-red-50">
                    <h3 className="font-semibold text-red-800 flex items-center gap-2">
                        <AlertTriangle size={16} />
                        Exceptions & Risks
                    </h3>
                </div>
                <div className="overflow-y-auto p-4 space-y-3">
                    {RISK_LIST.map((risk) => (
                        <div key={risk.id} className="p-3 border border-red-100 bg-red-50/50 rounded flex items-start gap-3">
                             {risk.severity === 'High' ? <XCircle size={16} className="text-red-600 mt-0.5" /> : <AlertTriangle size={16} className="text-amber-500 mt-0.5" />}
                             <div>
                                <div className="text-sm font-bold text-slate-800">{risk.packId}</div>
                                <div className="text-xs text-red-700 font-medium">{risk.issue}</div>
                                <div className="text-[10px] text-slate-500 mt-1 uppercase font-bold">Severity: {risk.severity}</div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

             {/* Reporting Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-industrial-border flex flex-col p-6 gap-4">
                 <h3 className="font-semibold text-slate-700 flex items-center gap-2 mb-2">
                    <FileText size={16} />
                    Reporting & Export
                </h3>
                
                <button 
                    disabled 
                    className="w-full bg-brand-600 text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 opacity-50 cursor-not-allowed shadow-sm"
                    title="Demo Mode: Backend not connected"
                >
                    <BarChart4 size={16} />
                    Generate Compliance Report
                </button>
                
                <button 
                    disabled 
                    className="w-full bg-white border border-slate-300 text-slate-500 py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 opacity-60 cursor-not-allowed"
                    title="Demo Mode: Backend not connected"
                >
                    <Download size={16} />
                    Export Full Audit Trail (CSV)
                </button>

                <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-500 text-center italic mt-2">
                    Reports are generated based on immutable ledger data (Mocked).
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};