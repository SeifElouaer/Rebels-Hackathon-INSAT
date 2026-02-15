import { Radio, Battery, Thermometer, Droplets, Weight, Activity } from 'lucide-react';
import type { IoTSensor } from '../data/types';

interface Props {
  sensors: IoTSensor[];
  selectedZone: string | null;
}

const typeConfig: Record<string, { icon: typeof Radio; color: string; label: string }> = {
  weight: { icon: Weight, color: 'text-blue-400', label: 'Weight' },
  temperature: { icon: Thermometer, color: 'text-orange-400', label: 'Temp' },
  humidity: { icon: Droplets, color: 'text-cyan-400', label: 'Humidity' },
  motion: { icon: Activity, color: 'text-green-400', label: 'Motion' },
};

export function IoTSensorPanel({ sensors, selectedZone }: Props) {
  const filtered = selectedZone ? sensors.filter(s => s.zone === selectedZone) : sensors;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Radio className="h-4 w-4 text-teal-400" />
          IoT Sensor Network
          {selectedZone && <span className="text-teal-400">/ Zone {selectedZone}</span>}
        </h3>
        <div className="text-[10px] text-slate-500 font-mono">
          {sensors.filter(s => s.status === 'online').length}/{sensors.length} online
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {filtered.map(sensor => {
          const config = typeConfig[sensor.type];
          const Icon = config.icon;
          const batteryColor = sensor.batteryLevel > 50 ? 'text-green-400' : sensor.batteryLevel > 20 ? 'text-yellow-400' : 'text-red-400';

          return (
            <div
              key={sensor.id}
              className={`rounded-lg border p-2.5 transition-all ${
                sensor.status === 'offline'
                  ? 'border-red-500/30 bg-red-950/10 opacity-60'
                  : sensor.status === 'warning'
                  ? 'border-yellow-500/30 bg-yellow-950/10'
                  : 'border-slate-700 bg-slate-800/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                  <span className="text-[10px] font-mono font-bold text-slate-300">{sensor.id}</span>
                </div>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  sensor.status === 'online' ? 'bg-green-400' : sensor.status === 'warning' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
                }`} />
              </div>
              <div className="mt-1.5 flex items-baseline gap-1">
                <span className="text-lg font-bold text-white font-mono">{sensor.value}</span>
                <span className="text-[10px] text-slate-500">{sensor.unit}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[9px] text-slate-500">
                <span>{sensor.zone}/{sensor.aisle}</span>
                <span className={`flex items-center gap-0.5 ${batteryColor}`}>
                  <Battery className="h-2.5 w-2.5" />
                  {sensor.batteryLevel}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
