import { useState } from "react";
import { AgentModal } from "./AgentModal";
import DeleteAgentModal from "./DeleteAgentModal";
import { useTheme } from "@/components/theme/ThemeProvider";
import {
  Pencil,
  Trash2,
  Eye,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

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
    creditsRemaining: 2500,
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
    creditsRemaining: 1850,
  },
];

const agentStatusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
];

function clampLines(text, maxLines) {
  if (!text) return "";
  const lines = text.split("\n");
  let out = lines[0];
  let count = 1;
  for (let i = 1; i < lines.length && count < maxLines; ++i, ++count)
    out += "\n" + lines[i];
  return out;
}

export default function AgentManager({ agents, setAgents }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editAgent, setEditAgent] = useState(null);
  const [deleteAgent, setDeleteAgent] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [expanded, setExpanded] = useState({});
  const [viewDetails, setViewDetails] = useState({});
  const { theme } = useTheme();

  // Use initial agents if no agents provided
  const displayAgents = agents.length > 0 ? agents : initialAgents;

  const handleSaveAgent = (agent) => {
    if (agent.id) {
      setAgents((a) => a.map((ag) => (ag.id === agent.id ? agent : ag)));
    } else {
      setAgents((a) => [
        ...a,
        {
          ...agent,
          id: Date.now(),
          created: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          status: "draft",
          model: "gpt-4o-mini",
          conversations: 0,
          creditsRemaining: 5000,
        },
      ]);
    }
    setModalOpen(false);
    setEditAgent(null);
  };

  const handleDeleteConfirmed = () => {
    if (deleteAgent) {
      setAgents((a) => a.filter((ag) => ag.id !== deleteAgent.id));
      setDeleteAgent(null);
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("all");
  };

  const toggleViewDetails = (agentId) => {
    setViewDetails((prev) => ({
      ...prev,
      [agentId]: !prev[agentId],
    }));
  };

  const filteredAgents = displayAgents.filter((agent) => {
    const searchText = search.toLowerCase();
    const matchesSearch =
      agent.name?.toLowerCase().includes(searchText) ||
      agent.description?.toLowerCase().includes(searchText);
    const matchesStatus = status === "all" || agent.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4">
        {/* HEADER row */}
        <div className="flex items-center justify-between mt-2 mb-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Your Agents
            </h2>
            <div className="text-muted-foreground mt-1 mb-2 text-sm">
              Create and manage your AI calling agents
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col md:flex-row md:gap-6 items-start md:items-end w-full">
          <div className="w-full md:w-1/3">
            <label
              className="text-xs font-semibold text-muted-foreground"
              htmlFor="agent-search"
            >
              Search
            </label>
            <input
              id="agent-search"
              type="text"
              placeholder="Search agents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-border rounded outline-none text-sm bg-background"
              autoComplete="off"
            />
          </div>
          <div className="w-full md:w-1/3 mt-2 md:mt-0">
            <label
              className="text-xs font-semibold text-muted-foreground"
              htmlFor="agent-status"
            >
              Status
            </label>
            <select
              id="agent-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-border rounded bg-background text-sm"
            >
              {agentStatusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/3 flex md:justify-end mt-2 md:mt-0">
            <button
              onClick={handleClearFilters}
              className="text-sm font-medium text-primary hover:underline px-2 py-2 rounded"
              type="button"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* AGENT CARDS */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAgents.length === 0 ? (
            <div className="text-muted-foreground col-span-full text-center py-12">
              No agents found.
            </div>
          ) : (
            filteredAgents.map((agent) => {
              const isExpanded = expanded[agent.id];
              const isViewingDetails = viewDetails[agent.id];
              const desc =
                typeof agent.description === "string" ? agent.description : "";
              const fallbackDesc = (
                <span className="italic opacity-70">
                  No description provided
                </span>
              );
              return (
                <div
                  key={agent.id}
                  className={`bg-card border border-border rounded-lg shadow-md p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
                    isViewingDetails ? "min-h-[320px]" : "min-h-[200px]"
                  }`}
                >
                  {/* Title */}
                  <div className="flex items-center gap-2 mb-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-semibold text-lg text-foreground truncate max-w-[75%] cursor-help">
                          {agent.name}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p>
                          You can rename agents and add descriptions. Click the
                          edit button to modify agent details.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        agent.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {agent.status}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="text-sm text-muted-foreground mb-1">
                    {desc ? (
                      !isExpanded && desc.length > 120 ? (
                        <div>
                          {desc.slice(0, 120)}...{" "}
                          <button
                            className="text-primary underline text-xs"
                            onClick={() =>
                              setExpanded((e) => ({
                                ...e,
                                [agent.id]: true,
                              }))
                            }
                          >
                            Read more
                          </button>
                        </div>
                      ) : desc.length > 120 ? (
                        <div>
                          {desc}{" "}
                          <button
                            className="text-primary underline text-xs"
                            onClick={() =>
                              setExpanded((e) => ({
                                ...e,
                                [agent.id]: false,
                              }))
                            }
                          >
                            Show less
                          </button>
                        </div>
                      ) : (
                        desc
                      )
                    ) : (
                      fallbackDesc
                    )}
                  </div>

                  {/* Agent details */}
                  <div className="flex flex-col gap-0.5 text-[13px] text-foreground/80 mb-2 mt-2">
                    <div className="flex items-center gap-2">
                      <span className="w-24 text-muted-foreground font-semibold">
                        Type:
                      </span>
                      <span>
                        {agent.type === "ChatAgent"
                          ? "Chat Agent"
                          : "Call Agent"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-24 text-muted-foreground font-semibold">
                        Language:
                      </span>
                      <span>{agent.language || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-24 text-muted-foreground font-semibold">
                        Conversations:
                      </span>
                      <span>{agent.conversations ?? 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-24 text-muted-foreground font-semibold">
                        Created:
                      </span>
                      <span>{agent.created || "-"}</span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isViewingDetails && (
                    <div className="flex flex-col gap-0.5 text-[13px] text-foreground/80 mb-2 border-t pt-2">
                      <div className="flex items-center gap-2">
                        <span className="w-24 text-muted-foreground font-semibold">
                          Model:
                        </span>
                        <span>{agent.model || "gpt-4o-mini"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-24 text-muted-foreground font-semibold">
                          Credits:
                        </span>
                        <span
                          className={`${
                            (agent.creditsRemaining || 0) < 500
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {(agent.creditsRemaining || 0).toLocaleString()}{" "}
                          remaining
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-24 text-muted-foreground font-semibold">
                          Performance:
                        </span>
                        <span className="text-blue-600">
                          {Math.floor(Math.random() * 20) + 80}% success rate
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-24 text-muted-foreground font-semibold">
                          Avg Response:
                        </span>
                        <span>{(Math.random() * 2 + 1).toFixed(1)}s</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <button
                      onClick={() => toggleViewDetails(agent.id)}
                      className="font-medium hover:underline flex items-center gap-1 text-[#1A6262]"
                    >
                      {isViewingDetails ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          View Details
                        </>
                      )}
                    </button>
                    <div className="flex gap-3">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="text-blue-600 hover:bg-blue-50 rounded p-1"
                            onClick={() => {
                              setModalOpen(true);
                              setEditAgent(agent);
                            }}
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Edit agent name and description</p>
                        </TooltipContent>
                      </Tooltip>
                      <button
                        className="text-red-600 hover:bg-red-50 rounded p-1"
                        onClick={() => setDeleteAgent(agent)}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {modalOpen && (
        <AgentModal
          open={modalOpen}
          agent={editAgent}
          onClose={() => {
            setModalOpen(false);
            setEditAgent(null);
          }}
          onSave={handleSaveAgent}
        />
      )}
      {deleteAgent && (
        <DeleteAgentModal
          open={!!deleteAgent}
          agent={deleteAgent}
          onClose={() => setDeleteAgent(null)}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </TooltipProvider>
  );
}
