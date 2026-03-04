import { TreePine, ShieldCheck, Scale, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <div className="mx-auto h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mb-6">
          <TreePine className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">FieldGuard</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Plantation Worker Rights & Protection Platform
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: ShieldCheck, label: "Compliance" },
            { icon: Scale, label: "Weighment" },
            { icon: Users, label: "Workers" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
              <item.icon className="h-6 w-6 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        <p className="text-sm font-medium text-muted-foreground mb-4">Select your role to continue</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" onClick={() => navigate("/worker")} className="gap-2 bg-green-600 hover:bg-green-700">
            <Users className="h-5 w-5" /> Field Worker
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/owner")} className="gap-2">
            <TreePine className="h-5 w-5" /> Estate Owner
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/inspector")} className="gap-2">
            <ShieldCheck className="h-5 w-5" /> Government Inspector
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
