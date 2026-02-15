import { TrendingDown, Clock, ShoppingCart, AlertTriangle } from 'lucide-react';
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Area, ComposedChart } from 'recharts';
import type { StockForecast } from '../data/types';

interface Props {
  forecasts: StockForecast[];
}

export function ForecastPanel({ forecasts }: Props) {
  const sorted = [...forecasts].sort((a, b) => a.daysUntilStockout - b.daysUntilStockout);
  const critical = sorted.filter(f => f.daysUntilStockout <= 14);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-purple-400" />
          Predictive Stock Forecasting
        </h3>
        {critical.length > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-bold">
            {critical.length} items at risk
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {sorted.slice(0, 6).map(forecast => {
          const isUrgent = forecast.daysUntilStockout <= 14;
          const isWarning = forecast.daysUntilStockout <= 30;

          // Build chart data
          const chartData = [
            ...forecast.trend.map((v, i) => ({ day: i - 30, stock: v, type: 'actual' })),
            { day: 0, stock: forecast.currentStock, type: 'current' },
            ...forecast.prediction.map((v, i) => ({ day: i + 1, stock: v, predicted: v })),
          ];

          return (
            <div
              key={forecast.itemId}
              className={`rounded-lg border p-3 ${
                isUrgent ? 'border-red-500/40 bg-red-950/20' : isWarning ? 'border-yellow-500/30 bg-yellow-950/10' : 'border-slate-700 bg-slate-800/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-200 truncate">{forecast.itemName}</span>
                {isUrgent && <AlertTriangle className="h-3.5 w-3.5 text-red-400 animate-pulse shrink-0" />}
              </div>

              <div className="h-24 mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                    <XAxis dataKey="day" tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} width={30} />
                    <Tooltip
                      contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 10 }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <ReferenceLine y={0} stroke="#334155" />
                    <Line type="monotone" dataKey="stock" stroke="#3b82f6" strokeWidth={1.5} dot={false} />
                    <Area type="monotone" dataKey="predicted" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-2 text-[10px]">
                <div>
                  <span className="text-slate-500">Current</span>
                  <div className="font-bold text-white">{forecast.currentStock}</div>
                </div>
                <div>
                  <span className="text-slate-500 flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> Stockout</span>
                  <div className={`font-bold ${isUrgent ? 'text-red-400' : isWarning ? 'text-yellow-400' : 'text-green-400'}`}>
                    {forecast.daysUntilStockout}d
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 flex items-center gap-0.5"><ShoppingCart className="h-2.5 w-2.5" /> Order</span>
                  <div className="font-bold text-blue-400">{forecast.recommendedOrderQty} units</div>
                </div>
              </div>

              <div className="mt-1 text-[9px] text-slate-500">
                Confidence: {forecast.confidence.toFixed(1)}% | Order by: {new Date(forecast.recommendedOrderDate).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
