import { MapPin, Users, AlertTriangle, Scale } from "lucide-react";
import { ComplianceBadge } from "./ComplianceBadge";
import { motion } from "framer-motion";

export interface Estate {
  id: string;
  name: string;
  location: string;
  workerCount: number;
  complianceScore: number;
  openGrievances: number;
  pendingWeighments: number;
  cropType: string;
}

interface EstateCardProps {
  estate: Estate;
  onClick?: () => void;
}

export function EstateCard({ estate, onClick }: EstateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="rounded-lg border bg-card p-5 shadow-card cursor-pointer hover:shadow-elevated transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display font-semibold text-foreground">{estate.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="h-3.5 w-3.5" /> {estate.location}
          </p>
        </div>
        <ComplianceBadge score={estate.complianceScore} size="sm" />
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">{estate.workerCount} workers</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <span className="text-muted-foreground">{estate.openGrievances} open</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Scale className="h-4 w-4 text-info" />
          <span className="text-muted-foreground">{estate.pendingWeighments} pending</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{estate.cropType}</span>
      </div>
    </motion.div>
  );
}
