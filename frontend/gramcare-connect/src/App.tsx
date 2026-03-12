import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/contexts/AppContext";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import PatientDashboard from "./pages/patient/PatientDashboard";
import SymptomChecker from "./pages/patient/SymptomChecker";
import BookConsultation from "./pages/patient/BookConsultation";
import FindMedicine from "./pages/patient/FindMedicine";
import HealthRecords from "./pages/patient/HealthRecords";
import EmergencyHelp from "./pages/patient/EmergencyHelp";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DiagnosisPage from "./pages/doctor/DiagnosisPage";
import PharmacistDashboard from "./pages/pharmacist/PharmacistDashboard";
import PrescriptionManagement from "./pages/pharmacist/PrescriptionManagement";
import InventoryManagement from "./pages/pharmacist/InventoryManagement";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import HealthAnalytics from "./pages/admin/HealthAnalytics";
import HealthAlerts from "./pages/admin/HealthAlerts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user } = useApp();

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${user.role}`} replace />} />

      {/* Patient Routes */}
      <Route path="/patient" element={<PatientDashboard />} />
      <Route path="/patient/symptoms" element={<SymptomChecker />} />
      <Route path="/patient/consultation" element={<BookConsultation />} />
      <Route path="/patient/medicine" element={<FindMedicine />} />
      <Route path="/patient/records" element={<HealthRecords />} />
      <Route path="/patient/emergency" element={<EmergencyHelp />} />

      {/* Doctor Routes */}
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/doctor/patients" element={<DoctorPatients />} />
      <Route path="/doctor/diagnosis" element={<DiagnosisPage />} />

      {/* Pharmacist Routes */}
      <Route path="/pharmacist" element={<PharmacistDashboard />} />
      <Route path="/pharmacist/prescriptions" element={<PrescriptionManagement />} />
      <Route path="/pharmacist/inventory" element={<InventoryManagement />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/analytics" element={<HealthAnalytics />} />
      <Route path="/admin/alerts" element={<HealthAlerts />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
