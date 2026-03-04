import { Users } from "lucide-react";
import { motion } from "framer-motion";

const workers = [
  { name: "Rajesh Kumar", estate: "Green Valley Estate", state: "Bihar", migrant: true, pfNumber: "KL/MNR/0012345" },
  { name: "Lakshmi Devi", estate: "Green Valley Estate", state: "Kerala", migrant: false, pfNumber: "KL/MNR/0012346" },
  { name: "Arjun Singh", estate: "Hillside Plantation", state: "Odisha", migrant: true, pfNumber: "KA/CRG/0054321" },
  { name: "Priya Sharma", estate: "Sunrise Tea Gardens", state: "West Bengal", migrant: false, pfNumber: "WB/DRJ/0098765" },
  { name: "Mohan Das", estate: "Kaveri Spice Farm", state: "Tamil Nadu", migrant: true, pfNumber: "KL/WYD/0076543" },
];

export default function InspectorWorkers() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-display font-bold">Workers</h1>
        <p className="text-muted-foreground mt-1">Registered workers across all estates</p>
      </motion.div>
      <div className="rounded-lg border bg-card shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Estate</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Home State</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">PF Number</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((w, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium">{w.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{w.estate}</td>
                <td className="px-4 py-3 text-muted-foreground">{w.state}</td>
                <td className="px-4 py-3">
                  {w.migrant ? (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-info/10 text-info">Migrant</span>
                  ) : (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground">Local</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{w.pfNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
