import { ScrollText, Info, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

interface LogEntry {
  time: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

interface Props {
  entries: LogEntry[];
}

const typeStyles = {
  info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  warning: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  error: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10' },
  success: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10' },
};

export function EventLog({ entries }: Props) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2 mb-3">
        <ScrollText className="h-4 w-4 text-slate-400" />
        System Event Log
        <span className="ml-auto text-[10px] text-slate-500 font-mono">Live Feed</span>
        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
      </h3>

      <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1 custom-scroll">
        {entries.length === 0 && (
          <div className="text-xs text-slate-500 text-center py-4">Waiting for events...</div>
        )}
        {entries.map((entry, i) => {
          const style = typeStyles[entry.type];
          const Icon = style.icon;
          return (
            <div
              key={i}
              className={`flex items-start gap-2 rounded-md px-2 py-1.5 ${style.bg} transition-all ${i === 0 ? 'animate-pulse' : ''}`}
            >
              <Icon className={`h-3 w-3 mt-0.5 shrink-0 ${style.color}`} />
              <span className="text-[10px] text-slate-300 leading-relaxed">{entry.message}</span>
              <span className="text-[9px] text-slate-600 ml-auto shrink-0 font-mono">{entry.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
