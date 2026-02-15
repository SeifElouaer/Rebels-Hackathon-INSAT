import { useState, useEffect, useCallback, useRef } from 'react';
import type { Anomaly, IoTSensor, CameraFeed, DashboardMetrics } from '../data/types';
import { warehouseItems, iotSensors as initialSensors, cameraFeeds as initialCameras, generateAnomalies, generateForecasts, roiMetrics } from '../data/warehouseData';

export function useSimulation() {
  const [sensors, setSensors] = useState<IoTSensor[]>(initialSensors);
  const [cameras, setCameras] = useState<CameraFeed[]>(initialCameras);
  const [anomalies, setAnomalies] = useState<Anomaly[]>(generateAnomalies);
  const [forecasts] = useState(() => generateForecasts());
  const [ticker, setTicker] = useState(0);
  const [eventLog, setEventLog] = useState<Array<{ time: string; message: string; type: 'info' | 'warning' | 'error' | 'success' }>>([]);
  const logRef = useRef(eventLog);
  logRef.current = eventLog;

  const addLog = useCallback((message: string, type: 'info' | 'warning' | 'error' | 'success' = 'info') => {
    const entry = { time: new Date().toLocaleTimeString(), message, type };
    setEventLog(prev => [entry, ...prev].slice(0, 50));
  }, []);

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTicker(t => t + 1);

      // Jitter sensor values
      setSensors(prev => prev.map(s => {
        if (s.status === 'offline') return s;
        const jitter = s.type === 'weight' ? (Math.random() - 0.5) * 2 : (Math.random() - 0.5) * 0.3;
        return {
          ...s,
          value: Math.max(0, +(s.value + jitter).toFixed(2)),
          lastReading: new Date().toISOString(),
        };
      }));

      // Simulate camera scans
      setCameras(prev => prev.map(cam => {
        if (cam.status === 'inactive') return cam;
        const confJitter = (Math.random() - 0.5) * 2;
        return {
          ...cam,
          confidence: Math.min(99.9, Math.max(70, +(cam.confidence + confJitter).toFixed(1))),
          lastScan: new Date().toISOString(),
          detectedItems: cam.detectedItems.map(di => ({
            ...di,
            confidence: Math.min(99.9, Math.max(70, +(di.confidence + confJitter).toFixed(1))),
          })),
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate occasional new events
  useEffect(() => {
    if (ticker === 0) return;
    if (ticker % 3 === 0) {
      const messages = [
        { msg: 'Camera CAM-A1 completed scan cycle — 487 items detected in A1', type: 'info' as const },
        { msg: 'Weight sensor WS-B2-01 battery critical (15%) — schedule replacement', type: 'warning' as const },
        { msg: 'Edge AI processed 18 frames/sec across 16 cameras', type: 'info' as const },
        { msg: 'ERP sync completed — 3 discrepancies flagged', type: 'warning' as const },
        { msg: 'Predictive model updated — ITM011 stockout risk elevated', type: 'error' as const },
        { msg: 'Zone C temperature nominal at 22.3°C', type: 'success' as const },
        { msg: 'Cloud analytics pipeline processed 2,847 sensor readings', type: 'info' as const },
        { msg: 'Anomaly ANM002 escalated — Conveyor Belt discrepancy unresolved', type: 'error' as const },
        { msg: 'Motion detected at Receiving Dock R1 — authorized personnel', type: 'success' as const },
        { msg: 'YOLO v8 model inference: 42ms avg latency', type: 'info' as const },
      ];
      const entry = messages[ticker % messages.length];
      addLog(entry.msg, entry.type);
    }
  }, [ticker, addLog]);

  const resolveAnomaly = useCallback((id: string) => {
    setAnomalies(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
    addLog(`Anomaly ${id} marked as resolved`, 'success');
  }, [addLog]);

  const metrics: DashboardMetrics = {
    totalItems: warehouseItems.reduce((sum, i) => sum + i.physicalQuantity, 0),
    totalSKUs: warehouseItems.length,
    anomaliesDetected: anomalies.filter(a => !a.resolved).length,
    criticalAlerts: anomalies.filter(a => !a.resolved && (a.severity === 'critical' || a.severity === 'high')).length,
    inventoryAccuracy: +(warehouseItems.reduce((sum, i) => sum + Math.min(i.physicalQuantity, i.erpQuantity) / Math.max(i.physicalQuantity, i.erpQuantity), 0) / warehouseItems.length * 100).toFixed(1),
    camerasOnline: cameras.filter(c => c.status !== 'inactive').length,
    sensorsOnline: sensors.filter(s => s.status !== 'offline').length,
    avgConfidence: +(cameras.filter(c => c.confidence > 0).reduce((s, c) => s + c.confidence, 0) / cameras.filter(c => c.confidence > 0).length).toFixed(1),
    totalInventoryValue: warehouseItems.reduce((sum, i) => sum + i.physicalQuantity * i.unitPrice, 0),
    itemsAtRisk: forecasts.filter(f => f.daysUntilStockout <= 14).length,
  };

  return {
    sensors,
    cameras,
    anomalies,
    forecasts,
    metrics,
    eventLog,
    roiMetrics,
    items: warehouseItems,
    resolveAnomaly,
    ticker,
  };
}
