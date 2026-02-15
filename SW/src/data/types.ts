export interface WarehouseItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  zone: string;
  aisle: string;
  shelf: string;
  erpQuantity: number;
  physicalQuantity: number;
  weight: number; // kg per unit
  unitPrice: number;
  reorderPoint: number;
  leadTimeDays: number;
  dailyConsumptionRate: number;
  lastRestocked: string;
  imageUrl?: string;
}

export interface IoTSensor {
  id: string;
  type: 'weight' | 'temperature' | 'humidity' | 'motion';
  zone: string;
  aisle: string;
  value: number;
  unit: string;
  status: 'online' | 'offline' | 'warning';
  lastReading: string;
  batteryLevel: number;
}

export interface CameraFeed {
  id: string;
  zone: string;
  aisle: string;
  status: 'active' | 'inactive' | 'processing';
  detectedItems: DetectedItem[];
  lastScan: string;
  confidence: number;
}

export interface DetectedItem {
  itemId: string;
  name: string;
  detectedQuantity: number;
  confidence: number;
  boundingBox: { x: number; y: number; w: number; h: number };
}

export interface Anomaly {
  id: string;
  type: 'quantity_mismatch' | 'weight_discrepancy' | 'misplaced_item' | 'unauthorized_access' | 'temperature_alert' | 'stock_critical';
  severity: 'low' | 'medium' | 'high' | 'critical';
  itemId?: string;
  itemName?: string;
  zone: string;
  aisle: string;
  description: string;
  erpValue?: number;
  detectedValue?: number;
  timestamp: string;
  resolved: boolean;
  autoResolvable: boolean;
}

export interface StockForecast {
  itemId: string;
  itemName: string;
  currentStock: number;
  predictedStockout: string; // date
  daysUntilStockout: number;
  recommendedOrderDate: string;
  recommendedOrderQty: number;
  trend: number[]; // last 30 days
  prediction: number[]; // next 14 days
  confidence: number;
}

export interface WarehouseZone {
  id: string;
  name: string;
  type: 'storage' | 'receiving' | 'shipping' | 'cold_storage' | 'hazmat';
  aisles: string[];
  temperature?: number;
  humidity?: number;
  occupancy: number; // percentage
  itemCount: number;
  cameraCount: number;
  sensorCount: number;
}

export interface ERPRecord {
  itemId: string;
  quantity: number;
  lastUpdated: string;
  poNumber?: string;
  supplier?: string;
}

export interface DashboardMetrics {
  totalItems: number;
  totalSKUs: number;
  anomaliesDetected: number;
  criticalAlerts: number;
  inventoryAccuracy: number;
  camerasOnline: number;
  sensorsOnline: number;
  avgConfidence: number;
  totalInventoryValue: number;
  itemsAtRisk: number;
}

export interface ROIMetrics {
  laborSavings: number;
  shrinkageReduction: number;
  accuracyImprovement: number;
  stockoutReduction: number;
  safetyIncidents: number;
  annualSavings: number;
  implementationCost: number;
  paybackMonths: number;
}
