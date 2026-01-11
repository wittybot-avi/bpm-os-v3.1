import React from 'react';
import { CheckCircle } from 'lucide-react';

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

      {/* Main Content Area / Canvas */}
      <div className="flex-1 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center">
        <div className="max-w-md space-y-4">
          <h3 className="text-lg font-semibold text-slate-700">Operational Canvas Empty</h3>
          <p className="text-slate-500 text-sm">
            This area will be populated with specific SOP screens and manufacturing workflows in upcoming patches.
          </p>
          <div className="text-xs text-slate-400 mt-4">
            Consult the System HUD (bottom right) for governance metadata.
          </div>
        </div>
      </div>
    </div>
  );
};