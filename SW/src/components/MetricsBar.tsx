import { Package, AlertTriangle, Camera, Radio, TrendingUp, DollarSign, ShieldAlert, Cpu } from 'lucide-react';
import type { DashboardMetrics } from '../data/types';

interface Props {
  metrics: DashboardMetrics;
  ticker: number;
}

const cards = [
  { key: 'totalSKUs', label: 'Active SKUs', icon: Package, color: 'from-blue-500 to-blue-600', fmt: (v: number) => v.toString() },
  { key: 'totalItems', label: 'Total Units', icon: TrendingUp, color: 'from-emerald-500 to-emerald-600', fmt: (v: number) => v.toLocaleString() },
  { key: 'inventoryAccuracy', label: 'Inventory Accuracy', icon: Cpu, color: 'from-violet-500 to-violet-600', fmt: (v: number) => `${v}%` },
  { key: 'camerasOnline', label: 'Cameras Online', icon: Camera, color: 'from-cyan-500 to-cyan-600', fmt: (v: number) => `${v}/18` },
  { key: 'sensorsOnline', label: 'IoT Sensors', icon: Radio, color: 'from-teal-500 to-teal-600', fmt: (v: number) => `${v}/17` },
  { key: 'anomaliesDetected', label: 'Active Anomalies', icon: AlertTriangle, color: 'from-amber-500 to-orange-500', fmt: (v: number) => v.toString() },
  { key: 'criticalAlerts', label: 'Critical Alerts', icon: ShieldAlert, color: 'from-red-500 to-red-600', fmt: (v: number) => v.toString() },
  { key: 'totalInventoryValue', label: 'Inventory Value', icon: DollarSign, color: 'from-green-500 to-green-600', fmt: (v: number) => `$${(v / 1000).toFixed(0)}K` },
] as const;

export function MetricsBar({ metrics, ticker }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {cards.map(card => {
        const Icon = card.icon;
        const value = metrics[card.key as keyof DashboardMetrics] as number;
        const isAlert = card.key === 'criticalAlerts' && value > 0;
        return (
          <div
            key={card.key}
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${card.color} p-3 text-white shadow-lg transition-transform hover:scale-105 ${isAlert ? 'animate-pulse' : ''}`}
          >
            <div className="flex items-center justify-between">
              <Icon className="h-5 w-5 opacity-80" />
              <div className={`h-2 w-2 rounded-full ${ticker % 2 === 0 ? 'bg-white/80' : 'bg-white/40'} transition-colors`} />
            </div>
            <div className="mt-2 text-xl font-bold tracking-tight">{card.fmt(value)}</div>
            <div className="text-[10px] font-medium uppercase tracking-wider opacity-80">{card.label}</div>
          </div>
        );
      })}
    </div>
  );
}
