import { Layers, Camera, Radio, Cpu, Cloud, Database, ArrowDown, ArrowRight } from 'lucide-react';

export function ArchitectureDiagram() {
  const layers = [
    {
      name: 'Physical Layer',
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-500/40',
      items: [
        { icon: Camera, label: 'IP Cameras', detail: '18 YOLO v8 feeds' },
        { icon: Radio, label: 'Weight Sensors', detail: '17 IoT nodes' },
        { icon: Radio, label: 'Env Sensors', detail: 'Temp / Humidity' },
      ],
    },
    {
      name: 'Edge AI Processing',
      color: 'from-violet-500 to-purple-600',
      borderColor: 'border-violet-500/40',
      items: [
        { icon: Cpu, label: 'Object Detection', detail: 'YOLO v8 + TensorRT' },
        { icon: Cpu, label: 'Item Counting', detail: 'CV + Depth estimation' },
        { icon: Cpu, label: 'Anomaly Detect', detail: 'Real-time inference' },
      ],
    },
    {
      name: 'Cloud Analytics',
      color: 'from-cyan-500 to-teal-600',
      borderColor: 'border-cyan-500/40',
      items: [
        { icon: Cloud, label: 'Data Aggregation', detail: 'Time-series DB' },
        { icon: Cloud, label: 'ML Forecasting', detail: 'Stock prediction' },
        { icon: Cloud, label: 'Digital Twin', detail: '3D warehouse model' },
      ],
    },
    {
      name: 'ERP Integration',
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-500/40',
      items: [
        { icon: Database, label: 'SAP/Oracle Sync', detail: 'Bi-directional API' },
        { icon: Database, label: 'PO Management', detail: 'Auto-reorder logic' },
        { icon: Database, label: 'Reporting', detail: 'Business intelligence' },
      ],
    },
  ];

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2 mb-4">
        <Layers className="h-4 w-4 text-indigo-400" />
        System Architecture
      </h3>

      <div className="space-y-2">
        {layers.map((layer, li) => (
          <div key={layer.name}>
            <div className={`rounded-lg border ${layer.borderColor} bg-gradient-to-r ${layer.color} bg-opacity-10 p-3`}>
              <div className="text-[10px] font-bold text-white/90 uppercase tracking-wider mb-2">{layer.name}</div>
              <div className="grid grid-cols-3 gap-2">
                {layer.items.map((item, ii) => {
                  const Icon = item.icon;
                  return (
                    <div key={ii} className="rounded bg-black/20 p-2 text-center">
                      <Icon className="h-4 w-4 mx-auto text-white/80 mb-1" />
                      <div className="text-[9px] font-semibold text-white/90">{item.label}</div>
                      <div className="text-[8px] text-white/50">{item.detail}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {li < layers.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown className="h-4 w-4 text-slate-600" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Data flow summary */}
      <div className="mt-4 flex items-center justify-center gap-1 text-[8px] text-slate-500 flex-wrap">
        <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">Sensors</span>
        <ArrowRight className="h-2.5 w-2.5" />
        <span className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400">Edge</span>
        <ArrowRight className="h-2.5 w-2.5" />
        <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400">Cloud</span>
        <ArrowRight className="h-2.5 w-2.5" />
        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">ERP</span>
        <ArrowRight className="h-2.5 w-2.5" />
        <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-400">Alerts</span>
      </div>
    </div>
  );
}
