import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { downloadReport } from "@/lib/reportUtils";

const reports = [
  { title: "Monthly Compliance Report", date: "March 2026", type: "Compliance" },
  { title: "Weighment Summary", date: "February 2026", type: "Weighment" },
  { title: "Grievance Log", date: "Q1 2026", type: "Grievance" },
  { title: "Women Entitlement Report", date: "March 2026", type: "Compliance" },
  { title: "Migrant Worker Passbook Report", date: "March 2026", type: "Migrant" },
];

export default function OwnerReports() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-display font-bold">Reports</h1>
        <p className="text-muted-foreground mt-1">Export compliance and operational reports as PDF</p>
      </motion.div>

      <div className="space-y-3">
        {reports.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-lg border bg-card p-4 shadow-card flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{r.title}</p>
                <p className="text-sm text-muted-foreground">{r.date} • {r.type}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => downloadReport(r.title, r.type)}
            >
              <Download className="h-4 w-4" /> Export PDF
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
