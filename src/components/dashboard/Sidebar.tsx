import {
  MessageSquare,
  Phone,
  Settings as SettingsIcon,
  BarChart3,
  Database,
  Users2,
  LayoutDashboard,
  Brain,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useState } from "react";
import SidebarPanel from "./SidebarPanel";

interface SidebarProps {
  agents: Array<any>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeSubTab: string;
  setActiveSubTab: (subTab: string) => void;
  onInviteTeam: () => void;
}

const Sidebar = ({
  agents,
  activeTab,
  setActiveTab,
  activeSubTab,
  setActiveSubTab,
  onInviteTeam,
}: SidebarProps) => {
  const { theme } = useTheme();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // No-op logout handler to prevent error
  const handleLogout = () => {};

  // Only include menu items dynamically based on agents
  const hasChatAgent = agents.some((a) => a.type === "ChatAgent");
  const chatAgent = agents.find((a) => a.type === "ChatAgent");
  const hasCallAgent = agents.some((a) => a.type === "CallAgent");
  const callAgent = agents.find((a) => a.type === "CallAgent");

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "agents",
      label: "Agents",
      icon: Users2,
      subTabs: [
        {
          id: "agent-manager",
          label: "Agent Manager",
          icon: Users2,
        },
        ...(hasChatAgent
          ? [
              {
                id: `chat-${chatAgent.id}`,
                label: chatAgent.name,
                icon: MessageSquare,
                subTabs: [
                  {
                    id: `chat-${chatAgent.id}-logs`,
                    label: "Chat Logs",
                    icon: MessageSquare,
                  },
                  {
                    id: `chat-${chatAgent.id}-analytics`,
                    label: "Analytics",
                    icon: BarChart3,
                  },
                  {
                    id: `chat-${chatAgent.id}-data`,
                    label: "Data",
                    icon: Database,
                  },
                ],
              },
            ]
          : []),
        ...(hasCallAgent
          ? [
              {
                id: `call-${callAgent.id}`,
                label: callAgent.name,
                icon: Phone,
                subTabs: [
                  {
                    id: `call-${callAgent.id}-logs`,
                    label: "Call Logs",
                    icon: Phone,
                  },
                  {
                    id: `call-${callAgent.id}-analytics`,
                    label: "Analytics",
                    icon: BarChart3,
                  },
                  {
                    id: `call-${callAgent.id}-data`,
                    label: "Data",
                    icon: Database,
                  },
                ],
              },
            ]
          : []),
      ],
    },
    {
      id: "imported-data",
      label: "Imported Data",
      icon: FileText,
    },
    {
      id: "lead-intelligence",
      label: "Lead Intelligence",
      icon: Brain,
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: SettingsIcon,
    },
    {
      id: "profile",
      label: "Settings",
      icon: SettingsIcon,
    },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "agents") {
      setActiveSubTab("agent-manager");
    }
  };

  // Updated handleAgentSubTabClick to default to logs tab for agent selection
  const handleAgentSubTabClick = (subTabId: string) => {
    // If the clicked tab is a "chat-*" or "call-*" agent, set to the -logs sub-sub-tab by default
    if (subTabId.startsWith("chat-")) {
      setActiveSubTab(`${subTabId}-logs`);
    } else if (subTabId.startsWith("call-")) {
      setActiveSubTab(`${subTabId}-logs`);
    } else {
      setActiveSubTab(subTabId);
    }
  };

  return (
    <>
      <div
        className={`w-64 border-r flex flex-col ${
          theme === "dark"
            ? "bg-black border-slate-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="p-6 flex-1">
          <div className="flex items-center mb-8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#1A6262" }}
            >
              <span className="text-white font-bold">⚡</span>
            </div>
            <h1
              className={`text-xl font-bold ml-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              SniperThink
            </h1>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              if (item.id !== "agents") {
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => handleTabClick(item.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? "text-white"
                          : theme === "dark"
                          ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      style={isActive ? { backgroundColor: "#1A6262" } : {}}
                    >
                      <IconComponent className="w-5 h-5 mr-3" />
                      {item.label}
                    </button>
                  </div>
                );
              }
              // AGENTS menu rendering:
              return (
                <div key={item.id}>
                  <button
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? "text-white"
                        : theme === "dark"
                        ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    style={isActive ? { backgroundColor: "#1A6262" } : {}}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                  {/* Only show subtabs if active */}
                  {isActive && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.subTabs?.map((subTab) => {
                        const SubIconComponent = subTab.icon;
                        const isSubActive =
                          activeSubTab === subTab.id ||
                          (subTab.subTabs &&
                            subTab.subTabs.some(
                              (st) => activeSubTab === st.id
                            ));
                        // Nested sub-tabs (chat/call agent)
                        if (subTab.subTabs) {
                          return (
                            <div key={subTab.id}>
                              <button
                                onClick={() =>
                                  handleAgentSubTabClick(subTab.id)
                                }
                                className={`w-full flex items-center px-4 py-2 rounded-lg text-left text-sm transition-colors ${
                                  isSubActive
                                    ? theme === "dark"
                                      ? "bg-slate-600 text-white"
                                      : "bg-gray-200 text-gray-900"
                                    : theme === "dark"
                                    ? "text-slate-400 hover:bg-slate-700 hover:text-white"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                              >
                                <SubIconComponent className="w-4 h-4 mr-3" />
                                {subTab.label}
                              </button>
                              {isSubActive && (
                                <div className="ml-4 mt-1 space-y-0.5">
                                  {subTab.subTabs.map((subSubTab) => {
                                    const SSIcon = subSubTab.icon;
                                    const isSubSubActive =
                                      activeSubTab === subSubTab.id;
                                    return (
                                      <button
                                        key={subSubTab.id}
                                        onClick={() =>
                                          setActiveSubTab(subSubTab.id)
                                        }
                                        className={`w-full flex items-center px-4 py-1.5 rounded-lg text-left text-xs transition-colors ${
                                          isSubSubActive
                                            ? theme === "dark"
                                              ? "bg-slate-500 text-white"
                                              : "bg-gray-300 text-gray-900 font-bold"
                                            : theme === "dark"
                                            ? "text-slate-400 hover:bg-slate-700 hover:text-white"
                                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                      >
                                        <SSIcon className="w-3 h-3 mr-2" />
                                        {subSubTab.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        }
                        return (
                          <button
                            key={subTab.id}
                            onClick={() => handleAgentSubTabClick(subTab.id)}
                            className={`w-full flex items-center px-4 py-2 rounded-lg text-left text-sm transition-colors ${
                              isSubActive
                                ? theme === "dark"
                                  ? "bg-slate-600 text-white"
                                  : "bg-gray-200 text-gray-900"
                                : theme === "dark"
                                ? "text-slate-400 hover:bg-slate-700 hover:text-white"
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                          >
                            <SubIconComponent className="w-4 h-4 mr-3" />
                            {subTab.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
      <SidebarPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onInviteTeam={() => {
          setIsPanelOpen(false);
          onInviteTeam();
        }}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Sidebar;
