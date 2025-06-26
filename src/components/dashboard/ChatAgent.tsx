import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/ThemeProvider";
import ChatLogs from "@/components/chat/ChatLogs";
import ChatAnalytics from "@/components/chat/ChatAnalytics";
import ChatData from "@/components/chat/ChatData";

interface ChatAgentProps {
  activeSubTab: string;
  setActiveSubTab: (subTab: string) => void;
  onOpenProfile?: (lead: any) => void;
}

const ChatAgent = ({
  activeSubTab,
  setActiveSubTab,
  onOpenProfile,
}: ChatAgentProps) => {
  const { theme } = useTheme();
  const [credits] = useState(450);
  const [isAdminIntervened, setIsAdminIntervened] = useState(false);
  const showBuyCredits = credits < 50;

  const handleIntervene = () => {
    setIsAdminIntervened(true);
  };

  const handleExit = () => {
    setIsAdminIntervened(false);
  };

  const handleNavigateToLogs = () => {
    setActiveSubTab("logs");
  };

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "logs":
        return (
          <ChatLogs
            onIntervene={handleIntervene}
            isAdminIntervened={isAdminIntervened}
            onExit={handleExit}
          />
        );
      case "analytics":
        return <ChatAnalytics />;
      case "data":
        return (
          <ChatData
            onNavigateToLogs={handleNavigateToLogs}
            onOpenProfile={onOpenProfile}
          />
        );
      default:
        return (
          <ChatLogs
            onIntervene={handleIntervene}
            isAdminIntervened={isAdminIntervened}
            onExit={handleExit}
          />
        );
    }
  };

  return (
    <div
      className={`p-6 space-y-6 ${
        theme === "dark" ? "bg-black" : "bg-gray-50"
      }`}
    >
      {/* Top Info Section */}
      <div
        className={`p-6 sticky top-0 z-10 ${
          theme === "dark" ? "bg-black" : "bg-gray-50"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            SniperThink AI Chat Agent
          </h1>
          <div className="flex items-center space-x-4">
            <span
              className={theme === "dark" ? "text-slate-300" : "text-gray-600"}
            >
              Credits Remaining:
            </span>
            <span
              className={`font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {credits}/500
            </span>
            {showBuyCredits && (
              <Button
                size="sm"
                style={{ backgroundColor: "#1A6262" }}
                className="hover:opacity-90 text-white"
              >
                Purchase More Credits
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Sub-tab content */}
      {renderSubTabContent()}
    </div>
  );
};

export default ChatAgent;
