import React from 'react';
import { CheckCircle, Activity } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Operational Status Header */}
      <div className="bg-white rounded-lg shadow-sm border border-industrial-border p-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <CheckCircle size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">System Operational</h1>
            <p className="text-slate-500">All services nominal. Ready for SOP modules.</p>
          </div>
        </div>
      </div>

      {/* Main Content Area / Canvas - Type A Empty State */}
      <div className="flex-1 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center">
        <div className="max-w-md flex flex-col items-center">
          <div className="bg-slate-100 p-4 rounded-full mb-4">
            <Activity className="text-slate-300" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No operational data available</h3>
          <p className="text-slate-500 text-sm mb-4">
            This screen will populate when the corresponding SOP stage is active.
          </p>
          <div className="text-xs font-mono text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            Currently running in Frontend-Only Demo Mode.
          </div>
        </div>
      </div>
    </div>
  );
};