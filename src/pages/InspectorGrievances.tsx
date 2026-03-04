import { GrievanceTable } from "@/components/GrievanceTable";
import { mockGrievances } from "@/data/mockData";
import { motion } from "framer-motion";

export default function InspectorGrievances() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-display font-bold">All Grievances</h1>
        <p className="text-muted-foreground mt-1">Grievances across all estates in your jurisdiction</p>
      </motion.div>
      <GrievanceTable grievances={mockGrievances} showEstate />
    </div>
  );
}
