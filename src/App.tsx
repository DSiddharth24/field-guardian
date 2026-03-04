import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerGrievances from "./pages/OwnerGrievances";
import OwnerWeighment from "./pages/OwnerWeighment";
import OwnerCompliance from "./pages/OwnerCompliance";
import OwnerReports from "./pages/OwnerReports";
import InspectorDashboard from "./pages/InspectorDashboard";
import InspectorEstates from "./pages/InspectorEstates";
import InspectorGrievances from "./pages/InspectorGrievances";
import InspectorWorkers from "./pages/InspectorWorkers";
import InspectorReports from "./pages/InspectorReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/owner" element={<DashboardLayout role="owner" />}>
            <Route index element={<OwnerDashboard />} />
            <Route path="grievances" element={<OwnerGrievances />} />
            <Route path="weighment" element={<OwnerWeighment />} />
            <Route path="compliance" element={<OwnerCompliance />} />
            <Route path="reports" element={<OwnerReports />} />
          </Route>

          <Route path="/inspector" element={<DashboardLayout role="inspector" />}>
            <Route index element={<InspectorDashboard />} />
            <Route path="estates" element={<InspectorEstates />} />
            <Route path="grievances" element={<InspectorGrievances />} />
            <Route path="workers" element={<InspectorWorkers />} />
            <Route path="reports" element={<InspectorReports />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
