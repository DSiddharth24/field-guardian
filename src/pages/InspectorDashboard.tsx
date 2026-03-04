import { Map, TreePine, AlertTriangle, Users, ShieldCheck } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { EstateCard } from "@/components/EstateCard";
import { mockEstates } from "@/data/mockData";
import { motion } from "framer-motion";

export default function InspectorDashboard() {
  const compliant = mockEstates.filter((e) => e.complianceScore >= 80).length;
  const atRisk = mockEstates.filter((e) => e.complianceScore >= 50 && e.complianceScore < 80).length;
  const nonCompliant = mockEstates.filter((e) => e.complianceScore < 50).length;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-display font-bold">Inspector Dashboard</h1>
        <p className="text-muted-foreground mt-1">Regional overview — South India Jurisdiction</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Estates" value={mockEstates.length} icon={TreePine} />
        <StatCard title="Compliant" value={compliant} icon={ShieldCheck} variant="success" />
        <StatCard title="At Risk" value={atRisk} icon={AlertTriangle} variant="warning" />
        <StatCard title="Non-Compliant" value={nonCompliant} icon={AlertTriangle} variant="danger" />
      </div>

      {/* Color-coded estate overview */}
      <div>
        <h2 className="font-display font-semibold text-lg mb-4">Estates by Compliance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockEstates
            .sort((a, b) => a.complianceScore - b.complianceScore)
            .map((estate) => (
              <EstateCard key={estate.id} estate={estate} />
            ))}
        </div>
      </div>

      {/* Regional summary */}
      <div className="rounded-lg border bg-card p-5 shadow-card">
        <h3 className="font-display font-semibold mb-4">Regional Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-2xl font-bold font-display text-foreground">988</p>
            <p className="text-sm text-muted-foreground">Total Workers</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-display text-foreground">18</p>
            <p className="text-sm text-muted-foreground">Open Grievances</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-display text-foreground">73%</p>
            <p className="text-sm text-muted-foreground">Avg Compliance</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-display text-foreground">11</p>
            <p className="text-sm text-muted-foreground">Pending Weighments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
