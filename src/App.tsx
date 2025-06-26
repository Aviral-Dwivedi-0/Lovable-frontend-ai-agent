import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import LeadProfileTab from "./components/chat/LeadProfileTab";
import ChatDataPage from "./pages/ChatDataPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/chat/data" element={<ChatDataPage />} />
            <Route
              path="/dashboard/chat/profile"
              element={
                <Dashboard
                  initialTab="chat"
                  initialSubTab="data"
                  customContent={<LeadProfileTab />}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
