import React, { useContext, useState } from 'react';
import { UserContext, UserRole } from '../types';
import { 
  ShieldAlert, 
  Database, 
  Search, 
  FileText, 
  Calendar, 
  CheckCircle, 
  Globe, 
  FileBadge, 
  GitCommit, 
  Cpu, 
  Box, 
  Battery,
  History
} from 'lucide-react';

// Mock Data Types
interface RegistryPack {
  id: string;
  packId: string;
  skuCode: string;
  batchId: string;
  mfgDate: string;
  status: 'Approved' | 'Dispatched' | 'Hold';
  compliance: {
    batteryAadhaar: boolean;
    euPassport: boolean;
  };
  details: {
    bmsSerial: string;
    firmware: string;
    energy: string;
    weight: string;
    warranty: string;
  };
}

// Mock Data
const REGISTRY_DATA: RegistryPack[] = [
  {
    id: 'reg-001',
    packId: 'PCK-2026-001-010',
    skuCode: 'BP-LFP-48V-2.5K',
    batchId: 'B-2026-01-001',
    mfgDate: '2026-01-11',
    status: 'Approved',
    compliance: { batteryAadhaar: true, euPassport: false },
    details: {
      bmsSerial: 'BMS-O-99281',
      firmware: 'v2.4.1-stable',
      energy: '2.56 kWh',
      weight: '18.4 kg',
      warranty: '3 Years / 1500 Cycles'
    }
  },
  {
    id: 'reg-002',
    packId: 'PCK-2026-001-008',
    skuCode: 'BP-LFP-48V-2.5K',
    batchId: 'B-2026-01-001',
    mfgDate: '2026-01-10',
    status: 'Dispatched',
    compliance: { batteryAadhaar: true, euPassport: false },
    details: {
      bmsSerial: 'BMS-O-99155',
      firmware: 'v2.4.0-stable',
      energy: '2.56 kWh',
      weight: '18.5 kg',
      warranty: '3 Years / 1500 Cycles'
    }
  },
  {
    id: 'reg-003',
    packId: 'PCK-2026-002-001',
    skuCode: 'BP-NMC-800V-75K',
    batchId: 'B-2026-01-002',
    mfgDate: '2026-01-11',
    status: 'Hold',
    compliance: { batteryAadhaar: true, euPassport: true },
    details: {
      bmsSerial: 'BMS-HV-2201',
      firmware: 'v3.0.0-beta',
      energy: '75.0 kWh',
      weight: '420 kg',
      warranty: '8 Years / 3000 Cycles'
    }
  }
];

export const BatteryRegistry: React.FC = () => {
  const { role } = useContext(UserContext);
  const [selectedPack, setSelectedPack] = useState<RegistryPack>(REGISTRY_DATA[0]);

  // RBAC Access Check
  const hasAccess = 
    role === UserRole.SYSTEM_ADMIN || 
    role === UserRole.MANAGEMENT || 
    role === UserRole.ENGINEERING ||
    role === UserRole.QA_ENGINEER;

  if (!hasAccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500">
        <ShieldAlert size={64} className="text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-slate-700">Access Restricted</h2>
        <p>Your role ({role}) does not have permission to view the Battery Registry.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <Database className="text-brand-600" />
             Battery Registry (S9)
           </h1>
           <p className="text-slate-500">System of Record for all manufactured units. Read-only Digital Twin view.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-xs font-bold border border-slate-200">
             <History size={14} />
             <span>IMMUTABLE LEDGER MODE</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Left Col: Registry List */}
        <div className="col-span-5 bg-white rounded-lg shadow-sm border border-industrial-border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
             <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                  <Search size={16} />
                  Production Ledger
                </h3>
             </div>
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="Filter by ID, SKU or Batch..." 
                  className="w-full text-sm border border-slate-300 rounded px-3 py-2 pl-9 focus:outline-none focus:border-brand-500"
                  disabled
                />
                <Search size={14} className="absolute left-3 top-3 text-slate-400" />
             </div>
          </div>
          
          <div className="overflow-y-auto flex-1 p-0">
             <table className="w-full text-sm text-left">
               <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 sticky top-0 z-10">
                 <tr>
                   <th className="px-4 py-3">Pack ID</th>
                   <th className="px-4 py-3">SKU</th>
                   <th className="px-4 py-3">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {REGISTRY_DATA.map((pack) => (
                   <tr 
                     key={pack.id}
                     onClick={() => setSelectedPack(pack)}
                     className={`cursor-pointer transition-colors ${
                       selectedPack.id === pack.id ? 'bg-brand-50' : 'hover:bg-slate-50'
                     }`}
                   >
                     <td className="px-4 py-3">
                       <div className="font-bold text-slate-800">{pack.packId}</div>
                       <div className="text-[10px] text-slate-400">{pack.mfgDate}</div>
                     </td>
                     <td className="px-4 py-3 text-slate-600">{pack.skuCode}</td>
                     <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          pack.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          pack.status === 'Dispatched' ? 'bg-slate-100 text-slate-600' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {pack.status}
                        </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
          <div className="p-2 border-t border-slate-200 bg-slate-50 text-center text-xs text-slate-400">
             Showing {REGISTRY_DATA.length} records.
          </div>
        </div>

        {/* Right Col: Digital Twin Detail */}
        <div className="col-span-7 bg-white rounded-lg shadow-sm border border-industrial-border flex flex-col overflow-hidden">
          {/* Detail Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-brand-50 rounded border border-brand-100">
                    <Battery size={24} className="text-brand-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedPack.packId}</h2>
                    <p className="text-xs text-slate-500 font-mono">Digital Twin ID: {selectedPack.id}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
                <div className="text-xs text-slate-500 uppercase font-bold">Registry State</div>
                <div className={`text-lg font-bold ${
                    selectedPack.status === 'Approved' ? 'text-green-600' :
                    selectedPack.status === 'Dispatched' ? 'text-slate-600' : 'text-amber-600'
                }`}>
                    {selectedPack.status.toUpperCase()}
                </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* 1. Manufacturing Lineage */}
            <section>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <GitCommit size={16} className="text-brand-500" />
                Manufacturing Lineage
              </h3>
              <div className="flex items-center gap-2 text-xs">
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">S3</div>
                    <span className="text-slate-500">Inbound</span>
                 </div>
                 <div className="h-0.5 w-8 bg-green-200"></div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">S5</div>
                    <span className="text-slate-500">Modules</span>
                 </div>
                 <div className="h-0.5 w-8 bg-green-200"></div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">S7</div>
                    <span className="text-slate-500">Pack</span>
                 </div>
                 <div className="h-0.5 w-8 bg-green-200"></div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">S8</div>
                    <span className="text-slate-500">Review</span>
                 </div>
              </div>
            </section>

            {/* 2. Component Traceability */}
            <section>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Cpu size={16} className="text-brand-500" />
                Component Traceability
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                   <div className="text-xs text-slate-400 mb-1">BMS Serial Number</div>
                   <div className="font-mono font-medium text-slate-800">{selectedPack.details.bmsSerial}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                   <div className="text-xs text-slate-400 mb-1">Firmware Version</div>
                   <div className="font-mono font-medium text-slate-800">{selectedPack.details.firmware}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                   <div className="text-xs text-slate-400 mb-1">Modules Installed</div>
                   <div className="font-mono font-medium text-slate-800">4x LFP-48V (Ref: M-042..M-046)</div>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                   <div className="text-xs text-slate-400 mb-1">Warranty Terms</div>
                   <div className="font-medium text-slate-800">{selectedPack.details.warranty}</div>
                </div>
              </div>
            </section>

             {/* 3. Compliance Readiness */}
            <section>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileBadge size={16} className="text-brand-500" />
                Compliance & Digital Passport
              </h3>
              <div className="grid grid-cols-2 gap-4">
                 <div className={`p-4 rounded border flex items-center gap-3 ${selectedPack.compliance.batteryAadhaar ? 'bg-purple-50 border-purple-200' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                    <FileText size={24} className={selectedPack.compliance.batteryAadhaar ? 'text-purple-600' : 'text-slate-400'} />
                    <div>
                        <div className={`font-bold text-sm ${selectedPack.compliance.batteryAadhaar ? 'text-purple-900' : 'text-slate-600'}`}>Battery Aadhaar</div>
                        <div className="text-xs text-slate-500">{selectedPack.compliance.batteryAadhaar ? 'ID Assigned' : 'Not Applicable'}</div>
                    </div>
                 </div>

                 <div className={`p-4 rounded border flex items-center gap-3 ${selectedPack.compliance.euPassport ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                    <Globe size={24} className={selectedPack.compliance.euPassport ? 'text-blue-600' : 'text-slate-400'} />
                    <div>
                        <div className={`font-bold text-sm ${selectedPack.compliance.euPassport ? 'text-blue-900' : 'text-slate-600'}`}>EU Passport</div>
                        <div className="text-xs text-slate-500">{selectedPack.compliance.euPassport ? 'Ready for Export' : 'Not Required'}</div>
                    </div>
                 </div>
              </div>
            </section>

          </div>
          
           {/* Footer Info */}
           <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-center text-slate-400">
               <Calendar size={12} className="inline mr-1" />
               Manufactured Date: {selectedPack.mfgDate} • Batch: {selectedPack.batchId}
           </div>
        </div>

      </div>
    </div>
  );
};