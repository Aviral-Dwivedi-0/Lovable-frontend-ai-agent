import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ChatAgent from "@/components/dashboard/ChatAgent";
import CallAgent from "@/components/dashboard/CallAgent";
import Integrations from "@/components/dashboard/Integrations";
import Profile from "@/components/dashboard/Profile";
import TopNavigation from "@/components/dashboard/TopNavigation";
import LeadIntelligence from "@/components/dashboard/LeadIntelligence";
import ImportedData from "@/components/dashboard/ImportedData";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Toaster } from "sonner";
import LeadProfileTab from "@/components/chat/LeadProfileTab";
import Overview from "@/pages/Overview";
import Agents from "@/pages/Agents";

export interface ChatMessage {
  from: string;
  message: string;
  time: string;
}

export interface TimelineEntry {
  id: number | string;
  type: string;
  interactionAgent?: string;
  interactionDate?: string;
  platform?: string;
  leadType?: string;
  businessType?: string;
  status?: string;
  useCase?: string;
  messages?: number | null;
  duration?: string | null;
  engagementLevel?: string;
  intentLevel?: string;
  budgetConstraint?: string;
  timelineUrgency?: string;
  followUpScheduled?: string;
  demoScheduled?: string;
  actions?: string;
  recording?: boolean;
  transcript?: string | string[];
  chatHistory?: ChatMessage[];
  date?: string;
}

export interface Lead {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  businessType?: string;
  leadType?: string;
  leadTag?: string;
  agentType?: string;
  interactions?: number;
  engagementLevel?: string;
  intentLevel?: string;
  budgetConstraint?: string;
  timelineUrgency?: string;
  useCase?: string;
  timeline?: TimelineEntry[];
  followUpScheduled?: string;
  demoScheduled?: string;
}

const initialAgents = [
  {
    id: 1,
    name: "Chatter box 3000",
    type: "ChatAgent",
    language: "English",
    description:
      "Top support agent for chat. Handles customer queries efficiently using advanced NLP. This agent can escalate to human support if necessary. It integrates seamlessly with all platforms and adapts tone based on context.",
    doc: null,
    created: "Jun 11, 2025",
    status: "active",
    model: "gpt-4o-mini",
    conversations: 1247,
  },
  {
    id: 2,
    name: "Voice Master Pro",
    type: "CallAgent",
    language: "English",
    description:
      "Advanced calling agent specialized in voice interactions. Handles inbound and outbound calls with natural conversation flow and can book demos, qualify leads, and provide customer support.",
    doc: null,
    created: "Jun 10, 2025",
    status: "active",
    model: "gpt-4o-mini",
    conversations: 856,
  },
];

interface DashboardProps {
  initialTab?: string;
  initialSubTab?: string;
  customContent?: React.ReactNode;
}

const Dashboard = ({
  initialTab = "overview",
  initialSubTab = "",
  customContent,
}: DashboardProps) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);

  // Agents state lifted up here with initial agents!
  const [agents, setAgents] = useState(initialAgents);

  // State for profile/lead viewing
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  // Track where the lead profile launched from ("chat" | "call"), to restore on back
  const [profileAgentTab, setProfileAgentTab] = useState<string | null>(null);
  const [profileAgentSubTab, setProfileAgentSubTab] = useState<string | null>(
    null
  );

  // Handler that child passes when clicking on a lead in Chat/Call data tabs
  const handleOpenProfile = (
    lead: Lead,
    agentTab: string = "chat",
    agentSubTab: string = "data"
  ) => {
    setProfileAgentTab(agentTab);
    setProfileAgentSubTab(agentSubTab);
    setSelectedLead(lead);
  };

  const handleBackFromProfile = () => {
    setSelectedLead(null);
    setProfileAgentTab(null);
    setProfileAgentSubTab(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== "profile") {
      setSelectedLead(null);
      setProfileAgentTab(null);
      setProfileAgentSubTab(null);
    }
    if (tab === "agents") {
      setActiveSubTab("agent-manager");
    }
  };

  const isAgentsTab = activeTab === "agents";
  const isAgentManager = isAgentsTab && activeSubTab === "agent-manager";

  // Dynamically computed
  const chatAgent = agents.find((ag) => ag.type === "ChatAgent");
  const callAgent = agents.find((ag) => ag.type === "CallAgent");

  // Dynamically render sub tabs based on existing agents
  const isChatAgent =
    isAgentsTab &&
    chatAgent &&
    (activeSubTab === `chat-${chatAgent.id}-logs` ||
      activeSubTab === `chat-${chatAgent.id}-analytics` ||
      activeSubTab === `chat-${chatAgent.id}-data`);
  const isCallAgent =
    isAgentsTab &&
    callAgent &&
    (activeSubTab === `call-${callAgent.id}-logs` ||
      activeSubTab === `call-${callAgent.id}-analytics` ||
      activeSubTab === `call-${callAgent.id}-data`);

  const renderContent = () => {
    if (selectedLead) {
      return (
        <LeadProfileTab lead={selectedLead} onBack={handleBackFromProfile} />
      );
    }
    if (activeTab === "profile") {
      return <Profile />;
    }
    if (activeTab === "overview") {
      return <Overview />;
    }
    if (activeTab === "imported-data") {
      return <ImportedData onOpenProfile={handleOpenProfile} />;
    }
    if (activeTab === "lead-intelligence") {
      return <LeadIntelligence onOpenProfile={handleOpenProfile} />;
    }
    if (isAgentsTab) {
      if (isAgentManager) {
        return <Agents agents={agents} setAgents={setAgents} />;
      }
      // Chat Agent and sub-sub-tabs (dynamic)
      if (isChatAgent && chatAgent) {
        const selectedSubtab = activeSubTab.split("-").pop(); // logs, analytics, data
        return (
          <ChatAgent
            activeSubTab={selectedSubtab}
            setActiveSubTab={(subtab) =>
              setActiveSubTab(`chat-${chatAgent.id}-${subtab}`)
            }
            onOpenProfile={(lead: Lead) =>
              handleOpenProfile(lead, "chat", "data")
            }
          />
        );
      }
      // Call Agent and sub-sub-tabs (dynamic)
      if (isCallAgent && callAgent) {
        const selectedSubtab = activeSubTab.split("-").pop(); // logs, analytics, data
        return (
          <CallAgent
            activeSubTab={selectedSubtab}
            setActiveSubTab={(subtab) =>
              setActiveSubTab(`call-${callAgent.id}-${subtab}`)
            }
            onOpenProfile={(lead: Lead) =>
              handleOpenProfile(lead, "call", "data")
            }
          />
        );
      }
    }
    if (activeTab === "integrations") {
      return <Integrations />;
    }
    return <Overview />;
  };

  return (
    <div
      className={`min-h-screen flex ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar
        agents={agents}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        onInviteTeam={() => {}}
      />
      <div className="flex-1 flex flex-col">
        <TopNavigation />
        <main className="h-screen overflow-auto">{renderContent()}</main>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Dashboard;
