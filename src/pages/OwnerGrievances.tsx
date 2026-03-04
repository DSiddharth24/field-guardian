import { GrievanceTable } from "@/components/GrievanceTable";
import { mockGrievances } from "@/data/mockData";
import { motion } from "framer-motion";

export default function OwnerGrievances() {
  const ownerGrievances = mockGrievances.filter((g) => g.estate === "Green Valley Estate");
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-display font-bold">Grievances</h1>
        <p className="text-muted-foreground mt-1">Review and manage worker grievances</p>
      </motion.div>
      <GrievanceTable grievances={ownerGrievances} />
    </div>
  );
}
