import { ShieldCheck, Baby, Clock, Building2 } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { ComplianceBadge } from "@/components/ComplianceBadge";
import { complianceData, womenComplianceData } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function OwnerCompliance() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-display font-bold">Compliance</h1>
        <p className="text-muted-foreground mt-1">Plantation Labour Act & Maternity Benefit Act compliance</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Overall Score" value="87%" icon={ShieldCheck} variant="success" />
        <StatCard title="Maternity Compliance" value={`${womenComplianceData.maternityLeaveCompliance}%`} icon={Baby} variant="success" />
        <StatCard title="Nursing Breaks" value={`${womenComplianceData.nursingBreakCompliance}%`} icon={Clock} variant="warning" />
        <StatCard title="Crèche Provision" value={`${womenComplianceData.crecheCompliance}%`} icon={Building2} variant="danger" />
      </div>

      <div className="rounded-lg border bg-card p-5 shadow-card">
        <h3 className="font-display font-semibold mb-4">Compliance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={complianceData}>
            <defs>
              <linearGradient id="compGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152, 45%, 22%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(152, 45%, 22%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 15%, 85%)" />
            <XAxis dataKey="month" stroke="hsl(150, 10%, 45%)" />
            <YAxis domain={[0, 100]} stroke="hsl(150, 10%, 45%)" />
            <Tooltip />
            <Area type="monotone" dataKey="score" stroke="hsl(152, 45%, 22%)" fill="url(#compGrad2)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
