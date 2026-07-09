import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Contracts from "./pages/Contracts";
import BillingRules from "./pages/BillingRules";
import Invoices from "./pages/Invoices";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

function App() {

  const location = useLocation();

  const pageMeta = {
    "/": {
      title: "Finance Dashboard",
      description: "Monitor contracts and billing rules in one place."
    },
    "/contracts": {
      title: "Contracts",
      description: "Create, edit, search, and remove contract records."
    },
    "/billing-rules": {
      title: "Billing Rules",
      description: "Manage billing policies for each contract."
    },
    "/invoices": {
      title: "Invoices",
      description: "Track and manage billing invoices for your contracts."
    }
  };

  const currentPage = pageMeta[location.pathname] ?? pageMeta["/"];

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar
          title={currentPage.title}
          description={currentPage.description}
        />

        <main className="min-h-[calc(100vh-80px)] bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.08),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff_100%)]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/billing-rules" element={<BillingRules />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

      </div>

    </div>
  );
}

export default App;