import { EstateCard } from "@/components/EstateCard";
import { mockEstates } from "@/data/mockData";
import { motion } from "framer-motion";

export default function InspectorEstates() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-display font-bold">Estates</h1>
        <p className="text-muted-foreground mt-1">All registered estates in your jurisdiction</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockEstates.map((estate) => (
          <EstateCard key={estate.id} estate={estate} />
        ))}
      </div>
    </div>
  );
}
