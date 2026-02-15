import { warehouseZones } from '../data/warehouseData';
import type { Anomaly, CameraFeed } from '../data/types';

interface Props {
  anomalies: Anomaly[];
  cameras: CameraFeed[];
  onSelectZone: (zoneId: string) => void;
  selectedZone: string | null;
}

const zoneLayout: Record<string, { x: number; y: number; w: number; h: number }> = {
  A: { x: 5, y: 5, w: 35, h: 40 },
  B: { x: 42, y: 5, w: 28, h: 40 },
  C: { x: 72, y: 5, w: 23, h: 40 },
  D: { x: 5, y: 48, w: 30, h: 35 },
  E: { x: 37, y: 48, w: 30, h: 35 },
  R: { x: 69, y: 48, w: 13, h: 35 },
  S: { x: 84, y: 48, w: 13, h: 35 },
};

const zoneColors: Record<string, string> = {
  storage: '#3b82f6',
  receiving: '#10b981',
  shipping: '#f59e0b',
  cold_storage: '#06b6d4',
  hazmat: '#ef4444',
};

export function WarehouseMap({ anomalies, cameras, onSelectZone, selectedZone }: Props) {
  const unresolvedByZone: Record<string, number> = {};
  anomalies.filter(a => !a.resolved).forEach(a => {
    unresolvedByZone[a.zone] = (unresolvedByZone[a.zone] || 0) + 1;
  });

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        Warehouse Digital Twin — Live Floor Plan
      </h3>
      <div className="relative w-full" style={{ paddingBottom: '50%' }}>
        <svg viewBox="0 0 100 88" className="absolute inset-0 w-full h-full">
          {/* Grid background */}
          <defs>
            <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="0.2" />
            </pattern>
          </defs>
          <rect width="100" height="88" fill="url(#grid)" rx="2" />

          {warehouseZones.map(zone => {
            const pos = zoneLayout[zone.id];
            if (!pos) return null;
            const alertCount = unresolvedByZone[zone.id] || 0;
            const isSelected = selectedZone === zone.id;
            const activeCams = cameras.filter(c => c.zone === zone.id && c.status === 'active').length;
            const baseColor = zoneColors[zone.type] || '#6366f1';

            return (
              <g key={zone.id} onClick={() => onSelectZone(zone.id)} className="cursor-pointer">
                <rect
                  x={pos.x} y={pos.y} width={pos.w} height={pos.h}
                  rx="1.5"
                  fill={isSelected ? `${baseColor}33` : `${baseColor}15`}
                  stroke={isSelected ? baseColor : `${baseColor}66`}
                  strokeWidth={isSelected ? 0.8 : 0.4}
                  className="transition-all duration-300 hover:fill-opacity-40"
                />
                {/* Zone label */}
                <text x={pos.x + pos.w / 2} y={pos.y + 5} textAnchor="middle" fontSize="3" fill={baseColor} fontWeight="bold">
                  {zone.id}
                </text>
                <text x={pos.x + pos.w / 2} y={pos.y + 9} textAnchor="middle" fontSize="1.8" fill="#94a3b8">
                  {zone.type === 'hazmat' ? '⚠ HAZMAT' : zone.type.replace('_', ' ').toUpperCase()}
                </text>

                {/* Occupancy bar */}
                <rect x={pos.x + 2} y={pos.y + pos.h - 5} width={pos.w - 4} height="2" rx="1" fill="rgba(148,163,184,0.2)" />
                <rect x={pos.x + 2} y={pos.y + pos.h - 5} width={(pos.w - 4) * zone.occupancy / 100} height="2" rx="1" fill={baseColor} opacity="0.7" />
                <text x={pos.x + pos.w / 2} y={pos.y + pos.h - 1.5} textAnchor="middle" fontSize="1.5" fill="#94a3b8">
                  {zone.occupancy}% full
                </text>

                {/* Aisles */}
                {zone.aisles.map((aisle, i) => {
                  const aw = (pos.w - 4) / zone.aisles.length;
                  const ax = pos.x + 2 + i * aw;
                  const ay = pos.y + 12;
                  const ah = pos.h - 22;
                  const cam = cameras.find(c => c.zone === zone.id && c.aisle === aisle);
                  return (
                    <g key={aisle}>
                      <rect x={ax + 0.5} y={ay} width={aw - 1} height={ah} rx="0.5" fill="rgba(148,163,184,0.08)" stroke="rgba(148,163,184,0.15)" strokeWidth="0.2" />
                      <text x={ax + aw / 2} y={ay + 3} textAnchor="middle" fontSize="1.8" fill="#cbd5e1" fontWeight="500">
                        {aisle}
                      </text>
                      {/* Camera indicator */}
                      {cam && (
                        <circle cx={ax + aw - 2} cy={ay + 2} r="1" fill={cam.status === 'active' ? '#22c55e' : cam.status === 'processing' ? '#f59e0b' : '#ef4444'}>
                          {cam.status === 'active' && <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />}
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Camera count */}
                <text x={pos.x + 3} y={pos.y + pos.h - 7} fontSize="1.5" fill="#22c55e">
                  📷 {activeCams}
                </text>

                {/* Alert badge */}
                {alertCount > 0 && (
                  <g>
                    <circle cx={pos.x + pos.w - 3} cy={pos.y + 4} r="3" fill="#ef4444">
                      <animate attributeName="r" values="3;3.5;3" dur="1s" repeatCount="indefinite" />
                    </circle>
                    <text x={pos.x + pos.w - 3} y={pos.y + 5} textAnchor="middle" fontSize="2.5" fill="white" fontWeight="bold">{alertCount}</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-slate-400">
        {Object.entries(zoneColors).map(([type, color]) => (
          <span key={type} className="flex items-center gap-1">
            <span className="h-2 w-2 rounded" style={{ backgroundColor: color }} />
            {type.replace('_', ' ')}
          </span>
        ))}
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500" /> Camera Active</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500" /> Alert</span>
      </div>
    </div>
  );
}
