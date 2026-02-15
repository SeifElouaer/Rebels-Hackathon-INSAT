import { useState } from 'react';
import { Warehouse, LayoutDashboard, Camera, AlertTriangle, TrendingDown, Radio, Database, Layers, BarChart3, Menu, X, Eye } from 'lucide-react';
import { useSimulation } from './hooks/useSimulation';
import { MetricsBar } from './components/MetricsBar';
import { WarehouseMap } from './components/WarehouseMap';
import { CameraVisionPanel } from './components/CameraVisionPanel';
import { AnomalyPanel } from './components/AnomalyPanel';
import { ForecastPanel } from './components/ForecastPanel';
import { IoTSensorPanel } from './components/IoTSensorPanel';
import { ERPIntegration } from './components/ERPIntegration';
import { ROIPanel } from './components/ROIPanel';
import { EventLog } from './components/EventLog';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';

type Tab = 'dashboard' | 'cameras' | 'anomalies' | 'forecast' | 'sensors' | 'erp' | 'architecture' | 'roi';

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'cameras', label: 'Computer Vision', icon: Camera },
  { id: 'anomalies', label: 'Anomalies', icon: AlertTriangle },
  { id: 'forecast', label: 'Forecasting', icon: TrendingDown },
  { id: 'sensors', label: 'IoT Sensors', icon: Radio },
  { id: 'erp', label: 'ERP Integration', icon: Database },
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'roi', label: 'ROI Analysis', icon: BarChart3 },
];

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sim = useSimulation();

  const unresolvedCount = sim.anomalies.filter(a => !a.resolved).length;
  const criticalCount = sim.anomalies.filter(a => !a.resolved && (a.severity === 'critical' || a.severity === 'high')).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/20">
                <Warehouse className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Smart Warehouse Digital Twin
                </h1>
                <p className="text-[10px] text-slate-500 -mt-0.5">AI-Powered Inventory Intelligence System</p>
              </div>
            </div>

            {/* Status indicators */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[10px]">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-mono">SYSTEM ONLINE</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px]">
                <Eye className="h-3 w-3 text-blue-400" />
                <span className="text-slate-400 font-mono">{sim.metrics.camerasOnline} Cameras</span>
              </div>
              {criticalCount > 0 && (
                <div className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full bg-red-500/10 border border-red-500/30 animate-pulse">
                  <AlertTriangle className="h-3 w-3 text-red-400" />
                  <span className="text-red-400 font-bold">{criticalCount} Critical</span>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block mt-2`}>
            <div className="flex flex-wrap gap-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                    {tab.id === 'anomalies' && unresolvedCount > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold">
                        {unresolvedCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 py-4 space-y-4">
        {/* Metrics bar - always visible */}
        <MetricsBar metrics={sim.metrics} ticker={sim.ticker} />

        {/* Zone filter */}
        {(activeTab === 'dashboard' || activeTab === 'cameras' || activeTab === 'anomalies' || activeTab === 'sensors') && (
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-slate-500 uppercase font-semibold">Filter Zone:</span>
            <button
              onClick={() => setSelectedZone(null)}
              className={`px-2 py-1 rounded ${!selectedZone ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              All Zones
            </button>
            {['A', 'B', 'C', 'D', 'E'].map(z => (
              <button
                key={z}
                onClick={() => setSelectedZone(selectedZone === z ? null : z)}
                className={`px-2 py-1 rounded ${selectedZone === z ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800'}`}
              >
                Zone {z}
              </button>
            ))}
          </div>
        )}

        {/* Tab content */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <WarehouseMap
                anomalies={sim.anomalies}
                cameras={sim.cameras}
                onSelectZone={(z) => setSelectedZone(selectedZone === z ? null : z)}
                selectedZone={selectedZone}
              />
              <CameraVisionPanel
                cameras={sim.cameras}
                anomalies={sim.anomalies}
                selectedZone={selectedZone}
                ticker={sim.ticker}
              />
            </div>
            <div className="space-y-4">
              <AnomalyPanel anomalies={sim.anomalies} onResolve={sim.resolveAnomaly} selectedZone={selectedZone} />
              <EventLog entries={sim.eventLog} />
            </div>
          </div>
        )}

        {activeTab === 'cameras' && (
          <CameraVisionPanel
            cameras={sim.cameras}
            anomalies={sim.anomalies}
            selectedZone={selectedZone}
            ticker={sim.ticker}
          />
        )}

        {activeTab === 'anomalies' && (
          <AnomalyPanel anomalies={sim.anomalies} onResolve={sim.resolveAnomaly} selectedZone={selectedZone} />
        )}

        {activeTab === 'forecast' && (
          <ForecastPanel forecasts={sim.forecasts} />
        )}

        {activeTab === 'sensors' && (
          <IoTSensorPanel sensors={sim.sensors} selectedZone={selectedZone} />
        )}

        {activeTab === 'erp' && (
          <ERPIntegration anomalies={sim.anomalies} ticker={sim.ticker} />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureDiagram />
        )}

        {activeTab === 'roi' && (
          <ROIPanel roi={sim.roiMetrics} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-8 py-4 px-4">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-600 gap-2">
          <span>Smart Warehouse Digital Twin v2.0 — AI-Powered Inventory Intelligence</span>
          <span className="flex items-center gap-4">
            <span>YOLO v8 + Edge TPU</span>
            <span>•</span>
            <span>IoT MQTT Gateway</span>
            <span>•</span>
            <span>Cloud ML Pipeline</span>
            <span>•</span>
            <span>SAP ERP Integration</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
