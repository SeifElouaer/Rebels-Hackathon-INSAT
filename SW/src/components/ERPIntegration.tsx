import { Database, ArrowLeftRight, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { warehouseItems } from '../data/warehouseData';
import type { Anomaly } from '../data/types';

interface Props {
  anomalies: Anomaly[];
  ticker: number;
}

export function ERPIntegration({ anomalies, ticker }: Props) {
  const discrepancies = warehouseItems.filter(item => item.erpQuantity !== item.physicalQuantity);
  const matched = warehouseItems.filter(item => item.erpQuantity === item.physicalQuantity);
  const totalVariance = discrepancies.reduce((sum, item) => sum + Math.abs(item.erpQuantity - item.physicalQuantity) * item.unitPrice, 0);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Database className="h-4 w-4 text-indigo-400" />
          ERP Integration — SAP Simulation
        </h3>
        <div className="flex items-center gap-2">
          <span className={`flex items-center gap-1 text-[10px] ${ticker % 4 === 0 ? 'text-yellow-400' : 'text-green-400'}`}>
            <RefreshCw className={`h-3 w-3 ${ticker % 4 === 0 ? 'animate-spin' : ''}`} />
            {ticker % 4 === 0 ? 'Syncing...' : 'Synced'}
          </span>
        </div>
      </div>

      {/* Sync Status Bar */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-2 text-center">
          <div className="text-lg font-bold text-green-400">{matched.length}</div>
          <div className="text-[9px] text-green-400/70 uppercase">Matched</div>
        </div>
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2 text-center">
          <div className="text-lg font-bold text-red-400">{discrepancies.length}</div>
          <div className="text-[9px] text-red-400/70 uppercase">Discrepancies</div>
        </div>
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2 text-center">
          <div className="text-lg font-bold text-amber-400">${totalVariance.toFixed(0)}</div>
          <div className="text-[9px] text-amber-400/70 uppercase">Variance Value</div>
        </div>
      </div>

      {/* Item comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-1.5 text-slate-500 font-medium">SKU</th>
              <th className="text-left py-1.5 text-slate-500 font-medium">Item</th>
              <th className="text-right py-1.5 text-slate-500 font-medium">ERP Qty</th>
              <th className="text-right py-1.5 text-slate-500 font-medium">CV Qty</th>
              <th className="text-right py-1.5 text-slate-500 font-medium">Δ</th>
              <th className="text-center py-1.5 text-slate-500 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {warehouseItems.map(item => {
              const diff = item.physicalQuantity - item.erpQuantity;
              const hasAnomaly = anomalies.some(a => !a.resolved && a.itemId === item.id);
              return (
                <tr key={item.id} className={`border-b border-slate-800 ${hasAnomaly ? 'bg-red-950/20' : ''}`}>
                  <td className="py-1.5 font-mono text-slate-400">{item.sku}</td>
                  <td className="py-1.5 text-slate-300 max-w-[120px] truncate">{item.name}</td>
                  <td className="py-1.5 text-right font-mono text-slate-300">{item.erpQuantity}</td>
                  <td className="py-1.5 text-right font-mono text-white font-bold">{item.physicalQuantity}</td>
                  <td className={`py-1.5 text-right font-mono font-bold ${diff === 0 ? 'text-green-400' : diff > 0 ? 'text-blue-400' : 'text-red-400'}`}>
                    {diff > 0 ? '+' : ''}{diff}
                  </td>
                  <td className="py-1.5 text-center">
                    {diff === 0 ? (
                      <CheckCircle2 className="h-3 w-3 text-green-400 mx-auto" />
                    ) : (
                      <XCircle className="h-3 w-3 text-red-400 mx-auto" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Data flow */}
      <div className="mt-3 flex items-center justify-center gap-2 text-[9px] text-slate-500">
        <span className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">Camera CV</span>
        <ArrowLeftRight className="h-3 w-3" />
        <span className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">Edge AI</span>
        <ArrowLeftRight className="h-3 w-3" />
        <span className="px-2 py-1 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400">Cloud</span>
        <ArrowLeftRight className="h-3 w-3" />
        <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400">SAP ERP</span>
      </div>
    </div>
  );
}
