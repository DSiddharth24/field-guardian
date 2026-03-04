import { Grievance } from "@/components/GrievanceTable";
import { WeighmentEntry } from "@/components/WeighmentLog";
import { Estate } from "@/components/EstateCard";

export const mockGrievances: Grievance[] = [
  { id: "G001", type: "wage", status: "open", date: "2026-03-02", anonymityLevel: "Fully Anonymous", description: "Wages delayed by 3 weeks for February", estate: "Green Valley Estate" },
  { id: "G002", type: "harassment", status: "investigating", date: "2026-03-01", anonymityLevel: "Semi-Anonymous", description: "Kangany verbal abuse during morning roll call", estate: "Hillside Plantation" },
  { id: "G003", type: "unsafe", status: "open", date: "2026-02-28", anonymityLevel: "Named", description: "No protective gear provided for pesticide spraying", estate: "Green Valley Estate" },
  { id: "G004", type: "entitlement", status: "resolved", date: "2026-02-25", anonymityLevel: "Fully Anonymous", description: "Maternity leave denied despite eligibility", estate: "Sunrise Tea Gardens" },
  { id: "G005", type: "wage", status: "open", date: "2026-02-20", anonymityLevel: "Semi-Anonymous", description: "Weighment readings consistently lower than actual", estate: "Hillside Plantation" },
];

export const mockWeighments: WeighmentEntry[] = [
  { id: "W001", workerName: "Rajesh Kumar", weight: 42.5, unit: "kg", date: "2026-03-04", scaleId: "SCL-001", blockchainHash: "0x7a8b...3f2d", verified: true },
  { id: "W002", workerName: "Lakshmi Devi", weight: 38.2, unit: "kg", date: "2026-03-04", scaleId: "SCL-001", blockchainHash: "0x9c1d...8e4a", verified: true },
  { id: "W003", workerName: "Arjun Singh", weight: 45.0, unit: "kg", date: "2026-03-04", scaleId: "SCL-002", verified: false },
  { id: "W004", workerName: "Priya Sharma", weight: 36.8, unit: "kg", date: "2026-03-03", scaleId: "SCL-001", blockchainHash: "0x2e5f...1b7c", verified: true },
  { id: "W005", workerName: "Mohan Das", weight: 51.3, unit: "kg", date: "2026-03-03", scaleId: "SCL-003", verified: false },
];

export const mockEstates: Estate[] = [
  { id: "E001", name: "Green Valley Estate", location: "Munnar, Kerala", workerCount: 245, complianceScore: 87, openGrievances: 2, pendingWeighments: 1, cropType: "Tea" },
  { id: "E002", name: "Hillside Plantation", location: "Coorg, Karnataka", workerCount: 180, complianceScore: 54, openGrievances: 5, pendingWeighments: 3, cropType: "Coffee" },
  { id: "E003", name: "Sunrise Tea Gardens", location: "Darjeeling, WB", workerCount: 312, complianceScore: 92, openGrievances: 0, pendingWeighments: 0, cropType: "Tea" },
  { id: "E004", name: "Kaveri Spice Farm", location: "Wayanad, Kerala", workerCount: 95, complianceScore: 38, openGrievances: 8, pendingWeighments: 5, cropType: "Spices" },
  { id: "E005", name: "Nilgiri Heights", location: "Ooty, TN", workerCount: 156, complianceScore: 71, openGrievances: 3, pendingWeighments: 2, cropType: "Tea" },
];

export const complianceData = [
  { month: "Sep", score: 62 },
  { month: "Oct", score: 68 },
  { month: "Nov", score: 72 },
  { month: "Dec", score: 65 },
  { month: "Jan", score: 78 },
  { month: "Feb", score: 82 },
  { month: "Mar", score: 85 },
];

export const womenComplianceData = {
  maternityLeaveCompliance: 78,
  nursingBreakCompliance: 65,
  crecheCompliance: 45,
  overallScore: 63,
};
