// Simulated SQLite layer using LocalStorage for persistence in this PWA demo.
// In a production PWA, this would typically involve IndexedDB (e.g., via Dexie.js).

export type InjuryType = 'cut_blade' | 'fall' | 'chemical' | 'machinery' | 'animal' | 'other';
export type InjurySeverity = 'minor' | 'moderate' | 'severe';
export type GrievanceType = 'pay' | 'safety' | 'harassment' | 'facilities' | 'tools' | 'other';

export interface Weighment {
    id: string;
    weight: number;
    time: string;
    supervisor: string;
    plot: string;
    synced: boolean;
    blockchainVerified: boolean;
}

export interface Task {
    id: string;
    plot: string;
    type: string;
    target: string;
    rate: number;
    location: { lat: number; lng: number };
    status: 'pending' | 'completed';
}

export interface InjuryReport {
    id: string;
    refNumber: string;
    type: InjuryType;
    bodyParts: string[];
    severity: InjurySeverity;
    timestamp: string;
    gps: { lat: number; lng: number };
    photo?: string;
    voiceNote?: string;
    synced: boolean;
    acknowledged: boolean;
}

export interface GrievanceReport {
    id: string;
    refNumber: string;
    type: GrievanceType;
    description: string;
    timestamp: string;
    synced: boolean;
    acknowledged: boolean;
}

export interface WorkerStats {
    name: string;
    id: string;
    estate: string;
    photo: string;
    isSynced: boolean;
    attendancePresent: boolean;
    attendanceTime?: string;
    attendanceStreak: number;
    dailyEarnings: number;
    weeklyEarnings: number;
    projectedWeekly: number;
    maternityDays: number;
    migrantPassbookIssued: boolean;
    displacementAllowance: boolean;
    journeyAllowance: boolean;
}

const MOCK_WEIGHMENTS: Weighment[] = [
    { id: 'w1', weight: 12.5, time: '08:30', supervisor: 'Arun K.', plot: 'Plot 12', synced: true, blockchainVerified: true },
    { id: 'w2', weight: 14.2, time: '10:15', supervisor: 'Arun K.', plot: 'Plot 12', synced: true, blockchainVerified: true },
    { id: 'w3', weight: 11.8, time: '13:45', supervisor: 'Arun K.', plot: 'Plot 12', synced: false, blockchainVerified: false },
];

const MOCK_STATS: WorkerStats = {
    name: "Gowramma",
    id: "FG-W-56291",
    estate: "Green Valley Estate",
    photo: "/worker-portrait.png",
    isSynced: false,
    attendancePresent: true,
    attendanceTime: "07:15 AM",
    attendanceStreak: 64, // Close to 80 days maternity threshold
    dailyEarnings: 450,
    weeklyEarnings: 2200,
    projectedWeekly: 2800,
    maternityDays: 64,
    migrantPassbookIssued: true,
    displacementAllowance: true,
    journeyAllowance: false,
};

const MOCK_TASK: Task = {
    id: 't1',
    plot: 'Plot 12',
    type: 'Harvest Coffee (Arabica)',
    target: '50 KG',
    rate: 15, // per kg
    location: { lat: 12.9716, lng: 77.5946 },
    status: 'pending'
};

class MockDB {
    private getStorage<T>(key: string, defaultValue: T): T {
        const saved = localStorage.getItem(`fg_db_${key}`);
        return saved ? JSON.parse(saved) : defaultValue;
    }

    private setStorage<T>(key: string, value: T): void {
        localStorage.setItem(`fg_db_${key}`, JSON.stringify(value));
    }

    getStats(): WorkerStats {
        return this.getStorage('stats', MOCK_STATS);
    }

    getWeighments(): Weighment[] {
        return this.getStorage('weighments', MOCK_WEIGHMENTS);
    }

    getTask(): Task {
        return this.getStorage('task', MOCK_TASK);
    }

    getInjuryReports(): InjuryReport[] {
        return this.getStorage('injury_reports', []);
    }

    saveInjuryReport(report: Omit<InjuryReport, 'id' | 'refNumber' | 'synced' | 'acknowledged'>): InjuryReport {
        const reports = this.getInjuryReports();
        const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        const newReport: InjuryReport = {
            ...report,
            id: crypto.randomUUID(),
            refNumber: `FG-INJ-${dateStr}-${random}`,
            synced: false,
            acknowledged: false,
        };

        reports.unshift(newReport);
        this.setStorage('injury_reports', reports);
        return newReport;
    }

    getGrievances(): GrievanceReport[] {
        return this.getStorage('grievances', []);
    }

    saveGrievance(report: Omit<GrievanceReport, 'id' | 'refNumber' | 'synced' | 'acknowledged'>): GrievanceReport {
        const reports = this.getGrievances();
        const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        const newReport: GrievanceReport = {
            ...report,
            id: crypto.randomUUID(),
            refNumber: `FG-GRV-${dateStr}-${random}`,
            synced: false,
            acknowledged: false,
        };

        reports.unshift(newReport);
        this.setStorage('grievances', reports);
        return newReport;
    }
}

export const db = new MockDB();
