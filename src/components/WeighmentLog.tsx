import { Scale, Link, CheckCircle, AlertCircle } from "lucide-react";

export interface WeighmentEntry {
  id: string;
  workerName: string;
  weight: number;
  unit: string;
  date: string;
  scaleId: string;
  blockchainHash?: string;
  verified: boolean;
}

interface WeighmentLogProps {
  entries: WeighmentEntry[];
}

export function WeighmentLog({ entries }: WeighmentLogProps) {
  return (
    <div className="rounded-lg border bg-card shadow-card overflow-hidden">
      <div className="p-4 border-b flex items-center gap-2">
        <Scale className="h-5 w-5 text-primary" />
        <h3 className="font-display font-semibold">Weighment Log</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Worker</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Weight</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Scale</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Blockchain</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium">{e.workerName}</td>
                <td className="px-4 py-3">
                  <span className="font-semibold">{e.weight}</span>{" "}
                  <span className="text-muted-foreground">{e.unit}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{e.date}</td>
                <td className="px-4 py-3 text-muted-foreground">{e.scaleId}</td>
                <td className="px-4 py-3">
                  {e.blockchainHash ? (
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-xs text-muted-foreground font-mono truncate max-w-[100px]">{e.blockchainHash}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4 text-warning" />
                      <span className="text-xs text-muted-foreground">Pending</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
