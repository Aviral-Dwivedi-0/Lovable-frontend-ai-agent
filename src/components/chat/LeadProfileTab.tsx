import React, { useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TimelineCard } from "./TimelineCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lead, TimelineEntry, ChatMessage } from "@/pages/Dashboard";

// Styled badge helper - fixed to handle undefined values
const getColor = (
  value: string | undefined,
  type: "level" | "yn" | "status"
) => {
  if (!value) {
    return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
  }

  if (type === "status" && value.toLowerCase() === "hot") {
    return "bg-red-600 text-white border-red-600 font-bold shadow-lg";
  }
  if (type === "level") {
    if (value === "High")
      return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
    if (value === "Medium")
      return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200";
    if (value === "Low")
      return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
  }
  if (type === "yn") {
    if (value === "Yes")
      return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
    if (value === "No")
      return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
  }
  return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
};

// Make this function robust for any data
const transcriptParagraphsFromText = (text: unknown) => {
  if (typeof text !== "string") {
    return [];
  }
  return text
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
};

interface LeadProfileTabProps {
  lead?: Lead;
  onBack?: () => void;
}

const LeadProfileTab = ({ lead, onBack }: LeadProfileTabProps) => {
  // State for modal dialogs
  const [openChatEntry, setOpenChatEntry] = useState<TimelineEntry | null>(
    null
  );
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showTranscriptEntry, setShowTranscriptEntry] =
    useState<TimelineEntry | null>(null);

  // Safely handle timeline
  const timelineArray = Array.isArray(lead?.timeline) ? lead.timeline : [];
  const interactionsCount = timelineArray.length;

  if (!lead) {
    return (
      <div className="p-8">
        <p>Lead not found.</p>
        <Button onClick={onBack} className="mt-4">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
      </div>
    );
  }

  // Full chat history for the clicked timeline entry, or fallback
  const getChatHistory = (entry: TimelineEntry) => {
    if (
      entry?.chatHistory &&
      Array.isArray(entry.chatHistory) &&
      entry.chatHistory.length > 0
    ) {
      return entry.chatHistory;
    }
    // fallback for demo, now supports up to 11 messages example as user asked
    return [
      { from: "User", message: "What are your rates?", time: "09:59 AM" },
      {
        from: "Agent",
        message:
          "Hello! Our rates depend on the package; which are you interested in?",
        time: "10:00 AM",
      },
      { from: "User", message: "Standard package.", time: "10:00 AM" },
      {
        from: "Agent",
        message: "Standard starts at $99/month with all core features.",
        time: "10:01 AM",
      },
      {
        from: "User",
        message: "Are there annual discounts?",
        time: "10:02 AM",
      },
      {
        from: "Agent",
        message: "Yes, 2 months free on annual plans!",
        time: "10:03 AM",
      },
      { from: "User", message: "How do I schedule a demo?", time: "10:04 AM" },
      {
        from: "Agent",
        message:
          "You can select a slot from our calendar, or let me know your availability.",
        time: "10:05 AM",
      },
      { from: "User", message: "Tomorrow afternoon works.", time: "10:05 AM" },
      {
        from: "Agent",
        message: "Perfect, I'll send you an invite.",
        time: "10:06 AM",
      },
      { from: "User", message: "Thank you!", time: "10:06 AM" },
    ];
  };

  // Function to open the chat modal/dialog for a timeline entry
  const handleViewChat = (entry: TimelineEntry) => {
    setOpenChatEntry(entry);
  };

  // Play/Pause recording; only one active at a time
  const handlePlayRecording = (entry: TimelineEntry) => {
    if (!entry || playingId === entry.id) {
      setPlayingId(null);
    } else {
      setPlayingId(entry.id.toString());
    }
  };

  // View transcript
  const handleViewTranscript = (entry: TimelineEntry) => {
    setShowTranscriptEntry(entry);
  };

  return (
    <div className="w-full h-full px-6 py-8 relative bg-black min-h-screen">
      <div className="mb-4 flex items-center">
        {/* Back button uses onBack (to tab view) */}
        <Button variant="outline" className="mr-4" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-white">
          {lead.name} — Profile Details
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white bg-gray-700 mb-3">
              {lead.name?.charAt(0)}
            </div>
            <h2 className="text-lg font-semibold text-white">{lead.name}</h2>
            <div className="text-sm text-gray-400">{lead.email}</div>
            <div className="text-sm text-gray-400">{lead.phone}</div>
            {/* Move Interactions here and align */}
            <div className="mt-4 flex items-center text-sm text-gray-400">
              <span className="mr-2">Interactions:</span>
              <span className="text-lg font-bold text-white">
                {interactionsCount}
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div>
              <span className="font-medium text-gray-300">Business Type: </span>
              {lead.businessType || "—"}
            </div>
            <div>
              <span className="font-medium text-gray-300">Lead Type: </span>
              {lead.leadType || "—"}
            </div>
            <div>
              <span className="font-medium text-gray-300">Status: </span>
              {/* Highlight HOT as red badge */}
              <span
                className={`rounded-full px-2 py-1 text-xs font-bold transition ${getColor(
                  lead.leadTag,
                  "status"
                )}`}
              >
                {lead.leadTag || "Unknown"}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <span className="font-medium text-gray-300">Queries/Use Case:</span>
            <div className="italic text-gray-300">{lead.useCase || "—"}</div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-gray-300">
                  Engagement Level
                </div>
                <Badge
                  className={
                    getColor(lead.engagementLevel, "level") + " px-3 py-1 mt-1"
                  }
                >
                  {lead.engagementLevel || "Unknown"}
                </Badge>
              </div>
              <div>
                <div className="font-medium text-gray-300">Intent Level</div>
                <Badge
                  className={
                    getColor(lead.intentLevel, "level") + " px-3 py-1 mt-1"
                  }
                >
                  {lead.intentLevel || "Unknown"}
                </Badge>
              </div>
              <div>
                <div className="font-medium text-gray-300">
                  Budget Constraint
                </div>
                <Badge
                  className={
                    getColor(lead.budgetConstraint, "yn") + " px-3 py-1 mt-1"
                  }
                >
                  {lead.budgetConstraint || "Unknown"}
                </Badge>
              </div>
              <div>
                <div className="font-medium text-gray-300">
                  Timeline Urgency
                </div>
                <Badge
                  className={
                    getColor(lead.timelineUrgency, "level") + " px-3 py-1 mt-1"
                  }
                >
                  {lead.timelineUrgency || "Unknown"}
                </Badge>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div>
                <div className="font-medium text-gray-300">
                  Follow-up Scheduled
                </div>
                <Badge className="bg-gray-700 text-white px-3 py-1 mt-1">
                  {lead.followUpScheduled || "—"}
                </Badge>
              </div>
              <div>
                <div className="font-medium text-gray-300">Demo Scheduled</div>
                <Badge className="bg-gray-700 text-white px-3 py-1 mt-1">
                  {lead.demoScheduled || "—"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="font-semibold text-white mb-2">
              Interaction Timeline
            </div>
            <div className="space-y-4">
              {timelineArray.length > 0 ? (
                timelineArray.map((entry: TimelineEntry, i: number) => (
                  <TimelineCard
                    key={i}
                    entry={entry}
                    dark={true}
                    onViewChat={
                      entry.type === "chat" ? handleViewChat : undefined
                    }
                    onPlayRecording={
                      entry.recording ? handlePlayRecording : undefined
                    }
                    currentlyPlayingId={playingId}
                    onViewTranscript={
                      entry.transcript ? handleViewTranscript : undefined
                    }
                  />
                ))
              ) : (
                <div className="italic text-gray-400">No interactions yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* View Chat dialog (shows chat for selected timeline entry) */}
      {openChatEntry && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              onClick={() => setOpenChatEntry(null)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-lg font-semibold mb-4 text-black flex items-center">
              <span className="mr-2">Chat Conversation —</span>
              <span className="text-blue-600">{lead.name}</span>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* Render entire chat history */}
              {getChatHistory(openChatEntry as TimelineEntry)?.length > 0 ? (
                getChatHistory(openChatEntry as TimelineEntry).map(
                  (msg: ChatMessage, idx: number) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.from === "Agent" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-xs break-words ${
                          msg.from === "Agent"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-900"
                        }`}
                      >
                        <div className="text-sm">{msg.message}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="text-gray-500 text-center">
                  No chat data available.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Transcript Modal */}
      {showTranscriptEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative border border-gray-200 shadow-md">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              onClick={() => setShowTranscriptEntry(null)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-700 text-lg">
                  Call Transcript
                </span>
                <span className="text-sm text-gray-500">
                  {showTranscriptEntry.date || ""}
                </span>
              </div>
            </div>
            <div className="py-2 max-h-96 overflow-y-auto">
              <div className="text-sm leading-relaxed text-gray-700">
                {(() => {
                  // Show transcript clearly if present (either string or array)
                  const transcript = showTranscriptEntry.transcript;
                  if (typeof transcript === "string" && transcript.trim()) {
                    return transcriptParagraphsFromText(transcript).map(
                      (p, i) => (
                        <p key={i} className="mb-4">
                          {p}
                        </p>
                      )
                    );
                  }
                  if (Array.isArray(transcript) && transcript.length > 0) {
                    return transcript.map((p: string, i: number) => (
                      <p key={i} className="mb-4">
                        {p}
                      </p>
                    ));
                  }
                  return <span>No transcript available.</span>;
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadProfileTab;
