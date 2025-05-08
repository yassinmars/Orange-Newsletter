import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LoginForm from "./components/LoginForm";
import Navbar from "./pages/NavBar";
import Homepage from "./components/Homepage";
import Newsletter from "./pages/Newsletter";
import Footer from "./pages/Footer";
import SelectTemplate from "./components/template/SelectTemplate";
import CreateTemplate from "./components/template/CreateTemplate";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const AppContent = () => {
  const location = useLocation();
  const hidenavbar = location.pathname === "/";
  const hideFooter = location.pathname === "/";


  return (
    <div className="flex flex-col min-h-screen">
      {!hidenavbar && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/news" element={<Newsletter />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/selectTemplate" element={<SelectTemplate />} />
          <Route path="/createTemplate" element={<CreateTemplate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default App;
