import { AlertTriangle, MessageSquare, Shield, Clock } from "lucide-react";

const grievanceTypes = {
  wage: { icon: MessageSquare, label: "Wage Dispute" },
  harassment: { icon: Shield, label: "Harassment" },
  unsafe: { icon: AlertTriangle, label: "Unsafe Conditions" },
  entitlement: { icon: Clock, label: "Denied Entitlement" },
};

const statusColors = {
  open: "bg-destructive/10 text-destructive",
  investigating: "bg-warning/10 text-warning",
  resolved: "bg-success/10 text-success",
};

export interface Grievance {
  id: string;
  type: keyof typeof grievanceTypes;
  status: "open" | "investigating" | "resolved";
  date: string;
  anonymityLevel: string;
  estate?: string;
  description: string;
}

interface GrievanceTableProps {
  grievances: Grievance[];
  showEstate?: boolean;
}

export function GrievanceTable({ grievances, showEstate }: GrievanceTableProps) {
  return (
    <div className="rounded-lg border bg-card shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Type</th>
              {showEstate && <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Estate</th>}
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Anonymity</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map((g) => {
              const TypeIcon = grievanceTypes[g.type].icon;
              return (
                <tr key={g.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <TypeIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{grievanceTypes[g.type].label}</span>
                    </div>
                  </td>
                  {showEstate && <td className="px-4 py-3 text-muted-foreground">{g.estate}</td>}
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[g.status]}`}>
                      {g.status.charAt(0).toUpperCase() + g.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{g.date}</td>
                  <td className="px-4 py-3 text-muted-foreground">{g.anonymityLevel}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">{g.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
