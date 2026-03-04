import { Users, AlertTriangle, Scale, ShieldCheck, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { GrievanceTable } from "@/components/GrievanceTable";
import { WeighmentLog } from "@/components/WeighmentLog";
import { mockGrievances, mockWeighments, complianceData } from "@/data/mockData";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function OwnerDashboard() {
  const ownerGrievances = mockGrievances.filter((g) => g.estate === "Green Valley Estate");

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Green Valley Estate — Munnar, Kerala</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Workers" value={245} icon={Users} trend={{ value: 3, label: "this month" }} />
        <StatCard title="Open Grievances" value={2} icon={AlertTriangle} variant="warning" trend={{ value: -15, label: "vs last month" }} />
        <StatCard title="Today's Weighments" value={18} icon={Scale} variant="success" />
        <StatCard title="Compliance Score" value="87%" icon={ShieldCheck} variant="success" trend={{ value: 5, label: "this quarter" }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold">Compliance Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={complianceData}>
                <defs>
                  <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(152, 45%, 22%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(152, 45%, 22%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 15%, 85%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(150, 10%, 45%)" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(150, 10%, 45%)" />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="hsl(152, 45%, 22%)" fill="url(#compGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-5 shadow-card">
            <h3 className="font-display font-semibold mb-3">Women's Compliance</h3>
            <div className="space-y-3">
              {[
                { label: "Maternity Leave", value: 78 },
                { label: "Nursing Breaks", value: 65 },
                { label: "Crèche Provision", value: 45 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold">{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${item.value >= 70 ? "bg-success" : item.value >= 50 ? "bg-warning" : "bg-destructive"}`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-5 shadow-card">
            <h3 className="font-display font-semibold mb-2">Scale Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">SCL-001</span>
                <span className="text-success font-medium">Calibrated</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">SCL-002</span>
                <span className="text-warning font-medium">Expires in 5 days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">SCL-003</span>
                <span className="text-destructive font-medium">Expired</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GrievanceTable grievances={ownerGrievances} />
      <WeighmentLog entries={mockWeighments} />
    </div>
  );
}
