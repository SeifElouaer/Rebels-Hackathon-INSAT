import { Camera, Eye, ScanLine, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { CameraFeed, Anomaly } from '../data/types';
import { warehouseItems } from '../data/warehouseData';

interface Props {
  cameras: CameraFeed[];
  anomalies: Anomaly[];
  selectedZone: string | null;
  ticker: number;
}

function CameraView({ cam, anomalies, ticker }: { cam: CameraFeed; anomalies: Anomaly[]; ticker: number }) {
  const relatedAnomalies = anomalies.filter(a => !a.resolved && a.zone === cam.zone && a.aisle === cam.aisle);
  const hasAnomaly = relatedAnomalies.length > 0;
  const item = cam.detectedItems[0];
  const erpItem = item ? warehouseItems.find(w => w.id === item.itemId) : null;

  return (
    <div className={`rounded-lg border ${hasAnomaly ? 'border-red-500/50 bg-red-950/20' : 'border-slate-700 bg-slate-800/30'} p-3 transition-all`}>
      {/* Camera header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Camera className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-xs font-mono font-bold text-slate-300">{cam.id}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`h-1.5 w-1.5 rounded-full ${cam.status === 'active' ? 'bg-green-400' : cam.status === 'processing' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'}`} />
          <span className="text-[10px] text-slate-500 uppercase">{cam.status}</span>
        </div>
      </div>

      {/* Simulated camera view */}
      <div className="relative aspect-video rounded-md bg-slate-900 border border-slate-700 overflow-hidden mb-2">
        {cam.status === 'inactive' ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-red-400 font-mono">NO SIGNAL</span>
          </div>
        ) : (
          <>
            {/* Grid overlay simulating camera view */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`h${i}`} className="absolute w-full border-t border-green-500/30" style={{ top: `${(i + 1) * 20}%` }} />
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`v${i}`} className="absolute h-full border-l border-green-500/30" style={{ left: `${(i + 1) * 20}%` }} />
              ))}
            </div>

            {/* Simulated shelf rows */}
            <div className="absolute inset-0 flex flex-col justify-center gap-1 px-3 py-2">
              {[0, 1, 2].map(row => (
                <div key={row} className="flex gap-0.5">
                  {Array.from({ length: Math.floor(6 + Math.random() * 6) }).map((_, col) => (
                    <div
                      key={col}
                      className={`h-3 rounded-sm ${hasAnomaly && row === 1 ? 'bg-red-500/40 border border-red-500/60' : 'bg-blue-400/20 border border-blue-400/30'}`}
                      style={{ width: `${6 + Math.random() * 8}%`, opacity: 0.4 + Math.random() * 0.6 }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Bounding box overlay */}
            {item && (
              <div
                className={`absolute border-2 rounded ${hasAnomaly ? 'border-red-400' : 'border-green-400'}`}
                style={{
                  left: '15%', top: '10%', width: '70%', height: '75%',
                  boxShadow: `0 0 8px ${hasAnomaly ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
                }}
              >
                <div className={`absolute -top-4 left-0 text-[8px] font-mono px-1 rounded ${hasAnomaly ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                  {item.name.substring(0, 20)} ({item.confidence.toFixed(1)}%)
                </div>
                <div className={`absolute -bottom-4 left-0 text-[8px] font-mono px-1 rounded ${hasAnomaly ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                  QTY: {item.detectedQuantity}
                </div>
                {/* Scanning line */}
                <div
                  className="absolute left-0 right-0 h-px bg-green-400/60"
                  style={{ top: `${(ticker * 15) % 100}%`, transition: 'top 0.3s' }}
                />
              </div>
            )}

            {/* Timestamp overlay */}
            <div className="absolute bottom-1 right-1 text-[7px] font-mono text-green-400/70">
              {new Date().toLocaleTimeString()} | {cam.zone}-{cam.aisle}
            </div>
            <div className="absolute top-1 right-1 text-[7px] font-mono text-green-400/70">
              ● REC
            </div>

            {/* Scan line effect */}
            <div
              className="absolute left-0 right-0 h-8 bg-gradient-to-b from-green-400/5 to-transparent pointer-events-none"
              style={{ top: `${(ticker * 10) % 120 - 10}%`, transition: 'top 3s linear' }}
            />
          </>
        )}
      </div>

      {/* Detection details */}
      {item && erpItem && (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[10px]">
            <Eye className="h-3 w-3 text-blue-400" />
            <span className="text-slate-400">CV Detected:</span>
            <span className="text-white font-mono font-bold">{item.detectedQuantity}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px]">
            <ScanLine className="h-3 w-3 text-violet-400" />
            <span className="text-slate-400">ERP Record:</span>
            <span className="text-white font-mono font-bold">{erpItem.erpQuantity}</span>
          </div>
          {hasAnomaly ? (
            <div className="flex items-center gap-1 text-[10px] text-red-400">
              <AlertCircle className="h-3 w-3" />
              <span className="font-semibold">MISMATCH: Δ{Math.abs(erpItem.erpQuantity - item.detectedQuantity)} units</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[10px] text-green-400">
              <CheckCircle2 className="h-3 w-3" />
              <span>Verified — within tolerance</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function CameraVisionPanel({ cameras, anomalies, selectedZone, ticker }: Props) {
  const filteredCameras = selectedZone
    ? cameras.filter(c => c.zone === selectedZone)
    : cameras.filter(c => c.detectedItems.length > 0).slice(0, 6);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Camera className="h-4 w-4 text-blue-400" />
          Computer Vision — Item Detection
          {selectedZone && <span className="text-blue-400">/ Zone {selectedZone}</span>}
        </h3>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span className="font-mono">YOLO v8 | Edge TPU</span>
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredCameras.map(cam => (
          <CameraView key={cam.id} cam={cam} anomalies={anomalies} ticker={ticker} />
        ))}
      </div>
    </div>
  );
}
