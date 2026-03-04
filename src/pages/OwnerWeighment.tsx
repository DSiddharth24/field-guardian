import { WeighmentLog } from "@/components/WeighmentLog";
import { mockWeighments } from "@/data/mockData";
import { motion } from "framer-motion";

export default function OwnerWeighment() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-display font-bold">Weighment Records</h1>
        <p className="text-muted-foreground mt-1">Tamper-proof weighment log with blockchain verification</p>
      </motion.div>
      <WeighmentLog entries={mockWeighments} />
    </div>
  );
}
