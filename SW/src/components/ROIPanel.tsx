import { DollarSign, TrendingUp, Shield, BarChart3, Target, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { ROIMetrics } from '../data/types';

interface Props {
  roi: ROIMetrics;
}

export function ROIPanel({ roi }: Props) {
  const chartData = [
    { name: 'Labor\nSavings', value: roi.laborSavings, color: '#3b82f6' },
    { name: 'Shrinkage\nReduction', value: 95000, color: '#10b981' },
    { name: 'Stockout\nPrevention', value: 85000, color: '#8b5cf6' },
    { name: 'Safety\nSavings', value: 55000, color: '#f59e0b' },
  ];

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-green-400" />
          Business Value & ROI Analysis
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <div className="rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-3">
          <DollarSign className="h-5 w-5 text-green-400 mb-1" />
          <div className="text-xl font-bold text-green-400">${(roi.annualSavings / 1000).toFixed(0)}K</div>
          <div className="text-[10px] text-green-400/70">Annual Savings</div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 p-3">
          <Clock className="h-5 w-5 text-blue-400 mb-1" />
          <div className="text-xl font-bold text-blue-400">{roi.paybackMonths} mo</div>
          <div className="text-[10px] text-blue-400/70">Payback Period</div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 p-3">
          <Target className="h-5 w-5 text-violet-400 mb-1" />
          <div className="text-xl font-bold text-violet-400">{roi.accuracyImprovement}%</div>
          <div className="text-[10px] text-violet-400/70">Accuracy Improvement</div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-3">
          <Shield className="h-5 w-5 text-amber-400 mb-1" />
          <div className="text-xl font-bold text-amber-400">{roi.safetyIncidents}%</div>
          <div className="text-[10px] text-amber-400/70">Safety Incident Reduction</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Savings Breakdown Chart */}
        <div>
          <h4 className="text-[10px] text-slate-500 uppercase mb-2">Annual Savings Breakdown</h4>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}K`} />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 10 }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Savings']}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key metrics */}
        <div className="space-y-2">
          <h4 className="text-[10px] text-slate-500 uppercase mb-2">Key Performance Indicators</h4>
          {[
            { label: 'Shrinkage Reduction', value: `${roi.shrinkageReduction}%`, color: 'bg-green-400', width: roi.shrinkageReduction },
            { label: 'Stockout Reduction', value: `${roi.stockoutReduction}%`, color: 'bg-blue-400', width: roi.stockoutReduction },
            { label: 'Safety Improvement', value: `${roi.safetyIncidents}%`, color: 'bg-amber-400', width: roi.safetyIncidents },
            { label: 'Labor Efficiency', value: '+38%', color: 'bg-violet-400', width: 38 },
            { label: 'Inventory Accuracy', value: '+34%', color: 'bg-cyan-400', width: 34 },
          ].map(kpi => (
            <div key={kpi.label}>
              <div className="flex justify-between text-[10px] mb-0.5">
                <span className="text-slate-400">{kpi.label}</span>
                <span className="text-white font-bold">{kpi.value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-700">
                <div className={`h-full rounded-full ${kpi.color} transition-all duration-1000`} style={{ width: `${kpi.width}%` }} />
              </div>
            </div>
          ))}

          <div className="mt-3 p-2 rounded-lg bg-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-1 text-[10px] text-green-400">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">ROI: {((roi.annualSavings / roi.implementationCost) * 100).toFixed(0)}%</span>
              <span className="text-green-400/60 ml-1">in first year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
