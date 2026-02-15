import type { WarehouseItem, IoTSensor, CameraFeed, WarehouseZone, Anomaly, StockForecast, ROIMetrics } from './types';

const now = new Date();
const fmt = (d: Date) => d.toISOString();
const ago = (mins: number) => fmt(new Date(now.getTime() - mins * 60000));
const future = (days: number) => fmt(new Date(now.getTime() + days * 86400000));

export const warehouseItems: WarehouseItem[] = [
  { id: 'ITM001', name: 'Industrial Bearings SKF-6205', sku: 'SKF-6205-2RS', category: 'Mechanical Parts', zone: 'A', aisle: 'A1', shelf: 'S1', erpQuantity: 500, physicalQuantity: 487, weight: 0.12, unitPrice: 8.50, reorderPoint: 100, leadTimeDays: 7, dailyConsumptionRate: 15, lastRestocked: ago(4320) },
  { id: 'ITM002', name: 'Hydraulic Cylinders HC-50', sku: 'HC-50-200', category: 'Hydraulics', zone: 'A', aisle: 'A2', shelf: 'S1', erpQuantity: 120, physicalQuantity: 120, weight: 5.4, unitPrice: 245.00, reorderPoint: 25, leadTimeDays: 14, dailyConsumptionRate: 3, lastRestocked: ago(7200) },
  { id: 'ITM003', name: 'Steel Bolts M10x50', sku: 'BLT-M10-50-SS', category: 'Fasteners', zone: 'B', aisle: 'B1', shelf: 'S2', erpQuantity: 5000, physicalQuantity: 4832, weight: 0.035, unitPrice: 0.45, reorderPoint: 1000, leadTimeDays: 5, dailyConsumptionRate: 80, lastRestocked: ago(2880) },
  { id: 'ITM004', name: 'Servo Motor SM-400W', sku: 'SM-400W-AC', category: 'Electronics', zone: 'C', aisle: 'C1', shelf: 'S1', erpQuantity: 45, physicalQuantity: 42, weight: 3.2, unitPrice: 520.00, reorderPoint: 10, leadTimeDays: 21, dailyConsumptionRate: 1, lastRestocked: ago(14400) },
  { id: 'ITM005', name: 'Copper Wire Spool 2.5mm', sku: 'CW-2.5-100M', category: 'Electrical', zone: 'C', aisle: 'C2', shelf: 'S3', erpQuantity: 200, physicalQuantity: 195, weight: 8.9, unitPrice: 89.00, reorderPoint: 40, leadTimeDays: 10, dailyConsumptionRate: 5, lastRestocked: ago(5760) },
  { id: 'ITM006', name: 'Pneumatic Valve PV-25', sku: 'PV-25-3WAY', category: 'Pneumatics', zone: 'A', aisle: 'A3', shelf: 'S2', erpQuantity: 300, physicalQuantity: 312, weight: 0.8, unitPrice: 34.00, reorderPoint: 60, leadTimeDays: 8, dailyConsumptionRate: 8, lastRestocked: ago(3600) },
  { id: 'ITM007', name: 'Safety Helmets Class-E', sku: 'SH-CLE-WHT', category: 'Safety Equipment', zone: 'D', aisle: 'D1', shelf: 'S1', erpQuantity: 150, physicalQuantity: 148, weight: 0.4, unitPrice: 28.00, reorderPoint: 30, leadTimeDays: 3, dailyConsumptionRate: 2, lastRestocked: ago(1440) },
  { id: 'ITM008', name: 'Welding Rods E7018 3.2mm', sku: 'WR-E7018-3.2', category: 'Welding', zone: 'D', aisle: 'D2', shelf: 'S2', erpQuantity: 2000, physicalQuantity: 1876, weight: 0.05, unitPrice: 1.20, reorderPoint: 500, leadTimeDays: 4, dailyConsumptionRate: 50, lastRestocked: ago(2160) },
  { id: 'ITM009', name: 'Lubricant Oil ISO-68 20L', sku: 'LO-ISO68-20L', category: 'Lubricants', zone: 'E', aisle: 'E1', shelf: 'S1', erpQuantity: 80, physicalQuantity: 78, weight: 18.0, unitPrice: 65.00, reorderPoint: 15, leadTimeDays: 6, dailyConsumptionRate: 2, lastRestocked: ago(4320) },
  { id: 'ITM010', name: 'PLC Controller S7-1200', sku: 'PLC-S7-1200', category: 'Automation', zone: 'C', aisle: 'C3', shelf: 'S1', erpQuantity: 12, physicalQuantity: 12, weight: 0.6, unitPrice: 1850.00, reorderPoint: 3, leadTimeDays: 30, dailyConsumptionRate: 0.2, lastRestocked: ago(21600) },
  { id: 'ITM011', name: 'Conveyor Belt Roll 50m', sku: 'CB-PVC-50M', category: 'Conveyor Parts', zone: 'B', aisle: 'B2', shelf: 'S1', erpQuantity: 15, physicalQuantity: 8, weight: 45.0, unitPrice: 420.00, reorderPoint: 5, leadTimeDays: 18, dailyConsumptionRate: 0.5, lastRestocked: ago(10080) },
  { id: 'ITM012', name: 'Air Filter AF-200', sku: 'AF-200-HEPA', category: 'Filtration', zone: 'B', aisle: 'B3', shelf: 'S3', erpQuantity: 250, physicalQuantity: 247, weight: 0.3, unitPrice: 15.00, reorderPoint: 50, leadTimeDays: 5, dailyConsumptionRate: 6, lastRestocked: ago(2880) },
  { id: 'ITM013', name: 'Thermal Paste TG-7 50g', sku: 'TP-TG7-50G', category: 'Thermal Management', zone: 'E', aisle: 'E2', shelf: 'S2', erpQuantity: 400, physicalQuantity: 395, weight: 0.05, unitPrice: 12.00, reorderPoint: 80, leadTimeDays: 7, dailyConsumptionRate: 10, lastRestocked: ago(1440) },
  { id: 'ITM014', name: 'Stainless Steel Pipe DN50', sku: 'SSP-DN50-6M', category: 'Piping', zone: 'A', aisle: 'A4', shelf: 'S1', erpQuantity: 60, physicalQuantity: 55, weight: 25.0, unitPrice: 180.00, reorderPoint: 12, leadTimeDays: 12, dailyConsumptionRate: 1.5, lastRestocked: ago(5760) },
  { id: 'ITM015', name: 'Emergency Stop Button ES-40', sku: 'ES-40-RED', category: 'Safety Equipment', zone: 'D', aisle: 'D3', shelf: 'S1', erpQuantity: 100, physicalQuantity: 98, weight: 0.15, unitPrice: 22.00, reorderPoint: 20, leadTimeDays: 4, dailyConsumptionRate: 1, lastRestocked: ago(3600) },
  { id: 'ITM016', name: 'Forklift Battery 48V 600Ah', sku: 'FB-48V-600AH', category: 'Power Systems', zone: 'E', aisle: 'E3', shelf: 'S1', erpQuantity: 8, physicalQuantity: 6, weight: 580.0, unitPrice: 4200.00, reorderPoint: 2, leadTimeDays: 45, dailyConsumptionRate: 0.1, lastRestocked: ago(43200) },
];

export const warehouseZones: WarehouseZone[] = [
  { id: 'A', name: 'Zone A — Mechanical & Hydraulics', type: 'storage', aisles: ['A1', 'A2', 'A3', 'A4'], occupancy: 72, itemCount: 4, cameraCount: 4, sensorCount: 8 },
  { id: 'B', name: 'Zone B — Fasteners & Conveyor', type: 'storage', aisles: ['B1', 'B2', 'B3'], occupancy: 58, itemCount: 3, cameraCount: 3, sensorCount: 6 },
  { id: 'C', name: 'Zone C — Electronics & Automation', type: 'storage', aisles: ['C1', 'C2', 'C3'], temperature: 22, humidity: 45, occupancy: 65, itemCount: 3, cameraCount: 3, sensorCount: 9 },
  { id: 'D', name: 'Zone D — Safety & Welding', type: 'storage', aisles: ['D1', 'D2', 'D3'], occupancy: 45, itemCount: 3, cameraCount: 3, sensorCount: 6 },
  { id: 'E', name: 'Zone E — Lubricants & Power', type: 'hazmat', aisles: ['E1', 'E2', 'E3'], temperature: 18, humidity: 40, occupancy: 38, itemCount: 3, cameraCount: 3, sensorCount: 9 },
  { id: 'R', name: 'Receiving Dock', type: 'receiving', aisles: ['R1'], occupancy: 30, itemCount: 0, cameraCount: 2, sensorCount: 4 },
  { id: 'S', name: 'Shipping Dock', type: 'shipping', aisles: ['S1'], occupancy: 25, itemCount: 0, cameraCount: 2, sensorCount: 4 },
];

export const iotSensors: IoTSensor[] = [
  { id: 'WS-A1-01', type: 'weight', zone: 'A', aisle: 'A1', value: 58.44, unit: 'kg', status: 'online', lastReading: ago(1), batteryLevel: 92 },
  { id: 'WS-A2-01', type: 'weight', zone: 'A', aisle: 'A2', value: 648.0, unit: 'kg', status: 'online', lastReading: ago(1), batteryLevel: 87 },
  { id: 'WS-A3-01', type: 'weight', zone: 'A', aisle: 'A3', value: 249.6, unit: 'kg', status: 'online', lastReading: ago(2), batteryLevel: 78 },
  { id: 'WS-A4-01', type: 'weight', zone: 'A', aisle: 'A4', value: 1375.0, unit: 'kg', status: 'online', lastReading: ago(1), batteryLevel: 95 },
  { id: 'WS-B1-01', type: 'weight', zone: 'B', aisle: 'B1', value: 169.12, unit: 'kg', status: 'online', lastReading: ago(1), batteryLevel: 81 },
  { id: 'WS-B2-01', type: 'weight', zone: 'B', aisle: 'B2', value: 360.0, unit: 'kg', status: 'warning', lastReading: ago(5), batteryLevel: 15 },
  { id: 'WS-B3-01', type: 'weight', zone: 'B', aisle: 'B3', value: 74.1, unit: 'kg', status: 'online', lastReading: ago(1), batteryLevel: 90 },
  { id: 'WS-C1-01', type: 'weight', zone: 'C', aisle: 'C1', value: 134.4, unit: 'kg', status: 'online', lastReading: ago(1), batteryLevel: 88 },
  { id: 'TS-C1-01', type: 'temperature', zone: 'C', aisle: 'C1', value: 22.3, unit: '°C', status: 'online', lastReading: ago(1), batteryLevel: 94 },
  { id: 'HS-C1-01', type: 'humidity', zone: 'C', aisle: 'C1', value: 44.8, unit: '%', status: 'online', lastReading: ago(1), batteryLevel: 91 },
  { id: 'WS-D1-01', type: 'weight', zone: 'D', aisle: 'D1', value: 59.2, unit: 'kg', status: 'online', lastReading: ago(2), batteryLevel: 76 },
  { id: 'WS-D2-01', type: 'weight', zone: 'D', aisle: 'D2', value: 93.8, unit: 'kg', status: 'online', lastReading: ago(1), batteryLevel: 83 },
  { id: 'WS-E1-01', type: 'weight', zone: 'E', aisle: 'E1', value: 1404.0, unit: 'kg', status: 'online', lastReading: ago(1), batteryLevel: 89 },
  { id: 'TS-E1-01', type: 'temperature', zone: 'E', aisle: 'E1', value: 18.1, unit: '°C', status: 'online', lastReading: ago(1), batteryLevel: 96 },
  { id: 'HS-E1-01', type: 'humidity', zone: 'E', aisle: 'E1', value: 39.5, unit: '%', status: 'online', lastReading: ago(1), batteryLevel: 93 },
  { id: 'MS-R1-01', type: 'motion', zone: 'R', aisle: 'R1', value: 1, unit: 'bool', status: 'online', lastReading: ago(0), batteryLevel: 99 },
  { id: 'WS-E3-01', type: 'weight', zone: 'E', aisle: 'E3', value: 3480.0, unit: 'kg', status: 'offline', lastReading: ago(120), batteryLevel: 3 },
];

export const cameraFeeds: CameraFeed[] = [
  { id: 'CAM-A1', zone: 'A', aisle: 'A1', status: 'active', lastScan: ago(2), confidence: 94.2, detectedItems: [
    { itemId: 'ITM001', name: 'Industrial Bearings SKF-6205', detectedQuantity: 487, confidence: 94.2, boundingBox: { x: 10, y: 20, w: 180, h: 120 } }
  ]},
  { id: 'CAM-A2', zone: 'A', aisle: 'A2', status: 'active', lastScan: ago(3), confidence: 97.8, detectedItems: [
    { itemId: 'ITM002', name: 'Hydraulic Cylinders HC-50', detectedQuantity: 120, confidence: 97.8, boundingBox: { x: 30, y: 15, w: 200, h: 150 } }
  ]},
  { id: 'CAM-A3', zone: 'A', aisle: 'A3', status: 'active', lastScan: ago(1), confidence: 91.5, detectedItems: [
    { itemId: 'ITM006', name: 'Pneumatic Valve PV-25', detectedQuantity: 312, confidence: 91.5, boundingBox: { x: 15, y: 25, w: 170, h: 110 } }
  ]},
  { id: 'CAM-A4', zone: 'A', aisle: 'A4', status: 'active', lastScan: ago(2), confidence: 89.3, detectedItems: [
    { itemId: 'ITM014', name: 'Stainless Steel Pipe DN50', detectedQuantity: 55, confidence: 89.3, boundingBox: { x: 20, y: 10, w: 220, h: 160 } }
  ]},
  { id: 'CAM-B1', zone: 'B', aisle: 'B1', status: 'active', lastScan: ago(1), confidence: 88.1, detectedItems: [
    { itemId: 'ITM003', name: 'Steel Bolts M10x50', detectedQuantity: 4832, confidence: 88.1, boundingBox: { x: 5, y: 30, w: 190, h: 130 } }
  ]},
  { id: 'CAM-B2', zone: 'B', aisle: 'B2', status: 'processing', lastScan: ago(4), confidence: 72.4, detectedItems: [
    { itemId: 'ITM011', name: 'Conveyor Belt Roll 50m', detectedQuantity: 8, confidence: 72.4, boundingBox: { x: 40, y: 20, w: 160, h: 140 } }
  ]},
  { id: 'CAM-B3', zone: 'B', aisle: 'B3', status: 'active', lastScan: ago(1), confidence: 95.6, detectedItems: [
    { itemId: 'ITM012', name: 'Air Filter AF-200', detectedQuantity: 247, confidence: 95.6, boundingBox: { x: 12, y: 18, w: 175, h: 115 } }
  ]},
  { id: 'CAM-C1', zone: 'C', aisle: 'C1', status: 'active', lastScan: ago(2), confidence: 93.7, detectedItems: [
    { itemId: 'ITM004', name: 'Servo Motor SM-400W', detectedQuantity: 42, confidence: 93.7, boundingBox: { x: 25, y: 12, w: 185, h: 125 } }
  ]},
  { id: 'CAM-C2', zone: 'C', aisle: 'C2', status: 'active', lastScan: ago(1), confidence: 96.1, detectedItems: [
    { itemId: 'ITM005', name: 'Copper Wire Spool 2.5mm', detectedQuantity: 195, confidence: 96.1, boundingBox: { x: 18, y: 22, w: 195, h: 135 } }
  ]},
  { id: 'CAM-C3', zone: 'C', aisle: 'C3', status: 'active', lastScan: ago(3), confidence: 98.5, detectedItems: [
    { itemId: 'ITM010', name: 'PLC Controller S7-1200', detectedQuantity: 12, confidence: 98.5, boundingBox: { x: 35, y: 8, w: 150, h: 100 } }
  ]},
  { id: 'CAM-D1', zone: 'D', aisle: 'D1', status: 'active', lastScan: ago(2), confidence: 94.9, detectedItems: [
    { itemId: 'ITM007', name: 'Safety Helmets Class-E', detectedQuantity: 148, confidence: 94.9, boundingBox: { x: 8, y: 15, w: 200, h: 140 } }
  ]},
  { id: 'CAM-D2', zone: 'D', aisle: 'D2', status: 'active', lastScan: ago(1), confidence: 90.2, detectedItems: [
    { itemId: 'ITM008', name: 'Welding Rods E7018 3.2mm', detectedQuantity: 1876, confidence: 90.2, boundingBox: { x: 22, y: 28, w: 165, h: 105 } }
  ]},
  { id: 'CAM-D3', zone: 'D', aisle: 'D3', status: 'active', lastScan: ago(2), confidence: 97.1, detectedItems: [
    { itemId: 'ITM015', name: 'Emergency Stop Button ES-40', detectedQuantity: 98, confidence: 97.1, boundingBox: { x: 14, y: 20, w: 180, h: 120 } }
  ]},
  { id: 'CAM-E1', zone: 'E', aisle: 'E1', status: 'active', lastScan: ago(3), confidence: 95.3, detectedItems: [
    { itemId: 'ITM009', name: 'Lubricant Oil ISO-68 20L', detectedQuantity: 78, confidence: 95.3, boundingBox: { x: 30, y: 10, w: 210, h: 155 } }
  ]},
  { id: 'CAM-E2', zone: 'E', aisle: 'E2', status: 'active', lastScan: ago(1), confidence: 96.8, detectedItems: [
    { itemId: 'ITM013', name: 'Thermal Paste TG-7 50g', detectedQuantity: 395, confidence: 96.8, boundingBox: { x: 16, y: 24, w: 175, h: 118 } }
  ]},
  { id: 'CAM-E3', zone: 'E', aisle: 'E3', status: 'inactive', lastScan: ago(60), confidence: 0, detectedItems: [] },
  { id: 'CAM-R1', zone: 'R', aisle: 'R1', status: 'active', lastScan: ago(0), confidence: 99.1, detectedItems: [] },
  { id: 'CAM-S1', zone: 'S', aisle: 'S1', status: 'active', lastScan: ago(1), confidence: 98.7, detectedItems: [] },
];

export function generateAnomalies(): Anomaly[] {
  return [
    { id: 'ANM001', type: 'quantity_mismatch', severity: 'high', itemId: 'ITM001', itemName: 'Industrial Bearings SKF-6205', zone: 'A', aisle: 'A1', description: 'CV detected 487 units but ERP shows 500. Discrepancy of 13 units ($110.50 value).', erpValue: 500, detectedValue: 487, timestamp: ago(2), resolved: false, autoResolvable: false },
    { id: 'ANM002', type: 'quantity_mismatch', severity: 'critical', itemId: 'ITM011', itemName: 'Conveyor Belt Roll 50m', zone: 'B', aisle: 'B2', description: 'CV detected 8 units but ERP shows 15. Major discrepancy of 7 units ($2,940 value). Possible theft or misplacement.', erpValue: 15, detectedValue: 8, timestamp: ago(4), resolved: false, autoResolvable: false },
    { id: 'ANM003', type: 'quantity_mismatch', severity: 'medium', itemId: 'ITM006', itemName: 'Pneumatic Valve PV-25', zone: 'A', aisle: 'A3', description: 'CV detected 312 units but ERP shows 300. Surplus of 12 units — possible receiving error.', erpValue: 300, detectedValue: 312, timestamp: ago(1), resolved: false, autoResolvable: true },
    { id: 'ANM004', type: 'weight_discrepancy', severity: 'medium', itemId: 'ITM003', itemName: 'Steel Bolts M10x50', zone: 'B', aisle: 'B1', description: 'Weight sensor reads 169.12 kg. Expected ~175 kg for 5000 units. Possible shortage of ~168 units.', erpValue: 175, detectedValue: 169.12, timestamp: ago(1), resolved: false, autoResolvable: false },
    { id: 'ANM005', type: 'stock_critical', severity: 'critical', itemId: 'ITM016', itemName: 'Forklift Battery 48V 600Ah', zone: 'E', aisle: 'E3', description: 'Stock at 6 units, approaching reorder point of 2. Lead time is 45 days — order immediately.', erpValue: 8, detectedValue: 6, timestamp: ago(30), resolved: false, autoResolvable: false },
    { id: 'ANM006', type: 'quantity_mismatch', severity: 'low', itemId: 'ITM004', itemName: 'Servo Motor SM-400W', zone: 'C', aisle: 'C1', description: 'CV detected 42 units but ERP shows 45. Minor discrepancy of 3 units ($1,560 value).', erpValue: 45, detectedValue: 42, timestamp: ago(2), resolved: false, autoResolvable: false },
    { id: 'ANM007', type: 'temperature_alert', severity: 'low', zone: 'E', aisle: 'E1', description: 'Temperature slightly above threshold at 18.1°C (threshold: 18°C) in hazmat zone.', erpValue: 18.0, detectedValue: 18.1, timestamp: ago(5), resolved: false, autoResolvable: true },
    { id: 'ANM008', type: 'unauthorized_access', severity: 'high', zone: 'E', aisle: 'E3', description: 'Motion detected in restricted zone E3 during non-operational hours. Camera E3 offline.', timestamp: ago(45), resolved: false, autoResolvable: false },
    { id: 'ANM009', type: 'quantity_mismatch', severity: 'medium', itemId: 'ITM008', itemName: 'Welding Rods E7018 3.2mm', zone: 'D', aisle: 'D2', description: 'CV detected 1876 units but ERP shows 2000. Discrepancy of 124 units ($148.80 value).', erpValue: 2000, detectedValue: 1876, timestamp: ago(1), resolved: false, autoResolvable: false },
    { id: 'ANM010', type: 'quantity_mismatch', severity: 'low', itemId: 'ITM014', itemName: 'Stainless Steel Pipe DN50', zone: 'A', aisle: 'A4', description: 'CV detected 55 units but ERP shows 60. Discrepancy of 5 units ($900 value).', erpValue: 60, detectedValue: 55, timestamp: ago(2), resolved: false, autoResolvable: false },
    { id: 'ANM011', type: 'weight_discrepancy', severity: 'high', itemId: 'ITM016', itemName: 'Forklift Battery 48V 600Ah', zone: 'E', aisle: 'E3', description: 'Weight sensor reads 3480 kg vs expected 4640 kg for 8 units. Confirms missing 2 batteries ($8,400 value). Sensor now offline.', erpValue: 4640, detectedValue: 3480, timestamp: ago(120), resolved: false, autoResolvable: false },
  ];
}

function generateTrend(current: number, rate: number): number[] {
  const trend: number[] = [];
  let val = current + rate * 30;
  for (let i = 0; i < 30; i++) {
    val -= rate * (0.8 + Math.random() * 0.4);
    trend.push(Math.max(0, Math.round(val)));
  }
  return trend;
}

function generatePrediction(current: number, rate: number): number[] {
  const pred: number[] = [];
  let val = current;
  for (let i = 0; i < 14; i++) {
    val -= rate * (0.85 + Math.random() * 0.3);
    pred.push(Math.max(0, Math.round(val)));
  }
  return pred;
}

export function generateForecasts(): StockForecast[] {
  return warehouseItems.map(item => {
    const daysUntil = Math.max(1, Math.round((item.physicalQuantity - item.reorderPoint) / item.dailyConsumptionRate));
    const orderDays = Math.max(0, daysUntil - item.leadTimeDays);
    return {
      itemId: item.id,
      itemName: item.name,
      currentStock: item.physicalQuantity,
      predictedStockout: future(daysUntil),
      daysUntilStockout: daysUntil,
      recommendedOrderDate: future(orderDays),
      recommendedOrderQty: Math.round(item.dailyConsumptionRate * (item.leadTimeDays + 14)),
      trend: generateTrend(item.physicalQuantity, item.dailyConsumptionRate),
      prediction: generatePrediction(item.physicalQuantity, item.dailyConsumptionRate),
      confidence: 85 + Math.random() * 12,
    };
  });
}

export const roiMetrics: ROIMetrics = {
  laborSavings: 185000,
  shrinkageReduction: 72,
  accuracyImprovement: 34,
  stockoutReduction: 61,
  safetyIncidents: 45,
  annualSavings: 420000,
  implementationCost: 280000,
  paybackMonths: 8,
};
