import { AlertTriangle, CheckCircle, AlertCircle, ShieldAlert, Thermometer, UserX, PackageX, Scale } from 'lucide-react';
import type { Anomaly } from '../data/types';

interface Props {
  anomalies: Anomaly[];
  onResolve: (id: string) => void;
  selectedZone: string | null;
}

const severityStyles: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  critical: { bg: 'bg-red-950/40', border: 'border-red-500/50', text: 'text-red-400', badge: 'bg-red-500' },
  high: { bg: 'bg-orange-950/30', border: 'border-orange-500/40', text: 'text-orange-400', badge: 'bg-orange-500' },
  medium: { bg: 'bg-yellow-950/20', border: 'border-yellow-500/30', text: 'text-yellow-400', badge: 'bg-yellow-500' },
  low: { bg: 'bg-blue-950/20', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500' },
};

const typeIcons: Record<string, typeof AlertTriangle> = {
  quantity_mismatch: PackageX,
  weight_discrepancy: Scale,
  misplaced_item: AlertCircle,
  unauthorized_access: UserX,
  temperature_alert: Thermometer,
  stock_critical: ShieldAlert,
};

export function AnomalyPanel({ anomalies, onResolve, selectedZone }: Props) {
  const filtered = selectedZone
    ? anomalies.filter(a => a.zone === selectedZone)
    : anomalies;

  const sorted = [...filtered].sort((a, b) => {
    if (a.resolved !== b.resolved) return a.resolved ? 1 : -1;
    const sev = { critical: 0, high: 1, medium: 2, low: 3 };
    return sev[a.severity] - sev[b.severity];
  });

  const critCount = filtered.filter(a => !a.resolved && a.severity === 'critical').length;
  const highCount = filtered.filter(a => !a.resolved && a.severity === 'high').length;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          Anomaly Detection & Alerts
          {selectedZone && <span className="text-amber-400">/ Zone {selectedZone}</span>}
        </h3>
        <div className="flex gap-2">
          {critCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold animate-pulse">
              {critCount} CRITICAL
            </span>
          )}
          {highCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white text-[10px] font-bold">
              {highCount} HIGH
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scroll">
        {sorted.map(anomaly => {
          const style = severityStyles[anomaly.severity];
          const Icon = typeIcons[anomaly.type] || AlertTriangle;

          return (
            <div
              key={anomaly.id}
              className={`rounded-lg border p-3 transition-all ${
                anomaly.resolved
                  ? 'border-slate-700/50 bg-slate-800/20 opacity-50'
                  : `${style.border} ${style.bg}`
              }`}
            >
              <div className="flex items-start gap-2">
                <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${anomaly.resolved ? 'text-slate-500' : style.text}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-slate-500">{anomaly.id}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase text-white ${anomaly.resolved ? 'bg-slate-600' : style.badge}`}>
                      {anomaly.severity}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-700 text-slate-300">
                      {anomaly.type.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] text-slate-500 ml-auto shrink-0">
                      {anomaly.zone}/{anomaly.aisle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{anomaly.description}</p>
                  {anomaly.erpValue !== undefined && anomaly.detectedValue !== undefined && (
                    <div className="mt-2 flex gap-4 text-[10px]">
                      <span className="text-slate-400">ERP: <strong className="text-white">{anomaly.erpValue}</strong></span>
                      <span className="text-slate-400">Detected: <strong className={anomaly.resolved ? 'text-white' : style.text}>{anomaly.detectedValue}</strong></span>
                      <span className="text-slate-400">Δ: <strong className={anomaly.resolved ? 'text-white' : style.text}>{Math.abs(anomaly.erpValue - anomaly.detectedValue).toFixed(1)}</strong></span>
                    </div>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">
                      {new Date(anomaly.timestamp).toLocaleString()}
                    </span>
                    {!anomaly.resolved && (
                      <button
                        onClick={() => onResolve(anomaly.id)}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold hover:bg-emerald-600/40 transition-colors"
                      >
                        <CheckCircle className="h-3 w-3" />
                        Resolve
                      </button>
                    )}
                    {anomaly.resolved && (
                      <span className="flex items-center gap-1 text-[10px] text-green-400">
                        <CheckCircle className="h-3 w-3" /> Resolved
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
