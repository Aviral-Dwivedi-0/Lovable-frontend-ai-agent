import { useState } from "react";
import {
  Play,
  FileText,
  Phone,
  Pause,
  X,
  SkipBack,
  SkipForward,
  Search,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme/ThemeProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CallingModal from "@/components/call/CallingModal";

const CallLogs = () => {
  const { theme } = useTheme();
  const [showTranscript, setShowTranscript] = useState<string | null>(null);
  const [showCallingModal, setShowCallingModal] = useState(false);
  const [currentCallLead, setCurrentCallLead] = useState<{
    name: string;
    phone: string;
  } | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [audioProgress, setAudioProgress] = useState<{
    [key: string]: { current: number; total: number };
  }>({});

  const mockData = [
    {
      id: "1",
      leadName: "John Smith",
      numberDialed: "+91 9876543210",
      dateTime: "2023-12-15",
      time: "10:30 AM",
      duration: "4:32",
      outcome: "Demo Booked",
      leadType: "Hot",
      status: "Connected",
      transcript: "Transcript for John Smith call...",
    },
    {
      id: "2",
      leadName: "Sarah Johnson",
      numberDialed: "+91 8765432109",
      dateTime: "2023-12-15",
      time: "09:45 AM",
      duration: "2:15",
      outcome: "Follow-up Scheduled",
      leadType: "Warm",
      status: "Unanswered",
      transcript: "Transcript for Sarah Johnson call...",
    },
    {
      id: "3",
      leadName: "Mike Chen",
      numberDialed: "+91 7654321098",
      dateTime: "2023-12-15",
      time: "04:12 PM",
      duration: "3:45",
      outcome: "Call Scheduled",
      leadType: "Cold",
      status: "Rejected",
      transcript: "Transcript for Mike Chen call...",
    },
  ];

  const filteredData = mockData.filter(
    (call) =>
      call.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.numberDialed.includes(searchTerm) ||
      call.outcome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowTranscript = (callId: string) => {
    setShowTranscript(callId);
  };

  const handleCloseTranscript = () => {
    setShowTranscript(null);
  };

  const handleCall = (leadName: string, phone: string) => {
    setCurrentCallLead({ name: leadName, phone });
    setShowCallingModal(true);
  };

  const handlePlayAudio = (callId: string) => {
    if (playingAudio === callId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(callId);
      // Initialize audio progress if not exists
      if (!audioProgress[callId]) {
        setAudioProgress((prev) => ({
          ...prev,
          [callId]: { current: 15, total: 272 }, // 0:15 / 4:32 in seconds
        }));
      }
      // Simulate audio playing
      setTimeout(() => {
        setPlayingAudio(null);
      }, 5000);
    }
  };

  const handleSkipForward = (callId: string) => {
    console.log(`Skipping forward 10 seconds for call ${callId}`);
    setAudioProgress((prev) => ({
      ...prev,
      [callId]: {
        ...prev[callId],
        current: Math.min(
          (prev[callId]?.current || 15) + 10,
          prev[callId]?.total || 272
        ),
      },
    }));
  };

  const handleSkipBackward = (callId: string) => {
    console.log(`Skipping backward 10 seconds for call ${callId}`);
    setAudioProgress((prev) => ({
      ...prev,
      [callId]: {
        ...prev[callId],
        current: Math.max((prev[callId]?.current || 15) - 10, 0),
      },
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-green-500";
      case "Unanswered":
        return "bg-yellow-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getLeadTypeColor = (leadType: string) => {
    switch (leadType) {
      case "Hot":
        return "text-red-400";
      case "Warm":
        return "text-yellow-400";
      case "Cold":
        return "text-slate-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h2
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Call Logs
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              theme === "dark" ? "text-slate-400" : "text-gray-500"
            }`}
          />
          <Input
            type="text"
            placeholder="Search calls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
            }`}
          />
        </div>

        {/* Call Log Cards */}
        <div className="space-y-4">
          {filteredData.map((call) => (
            <div
              key={call.id}
              className={`p-6 rounded-lg border ${
                theme === "dark"
                  ? "bg-slate-800/50 border-slate-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Left side - Lead info */}
                <div className="flex items-center space-x-6">
                  <div>
                    <h3
                      className={`text-xl font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {call.leadName}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone
                        className={`w-4 h-4 ${
                          theme === "dark" ? "text-slate-400" : "text-gray-500"
                        }`}
                      />
                      <span
                        className={`${
                          theme === "dark" ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        {call.numberDialed}
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div
                      className={`text-sm ${
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      }`}
                    >
                      Time:
                    </div>
                    <div
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {call.dateTime} {call.time}
                    </div>
                  </div>

                  <div className="text-center">
                    <div
                      className={`text-sm ${
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      }`}
                    >
                      Duration:
                    </div>
                    <div
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {call.duration}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span
                      className={`px-3 py-1 rounded text-sm text-white ${getStatusColor(
                        call.status
                      )}`}
                    >
                      Connected
                    </span>
                  </div>
                </div>

                {/* Right side - Action buttons */}
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShowTranscript(call.id)}
                    className={`${
                      theme === "dark"
                        ? "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Transcript
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePlayAudio(call.id)}
                    className={`${
                      theme === "dark"
                        ? "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Audio
                  </Button>
                </div>
              </div>

              {/* Bottom row - Outcome, Lead Type and Audio Player */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-8">
                  <div>
                    <span
                      className={`text-sm ${
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      }`}
                    >
                      Outcome:
                    </span>
                    <span
                      className={`ml-2 font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {call.outcome}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`text-sm ${
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      }`}
                    >
                      Lead Type:
                    </span>
                    <span
                      className={`ml-2 font-medium ${getLeadTypeColor(
                        call.leadType
                      )}`}
                    >
                      {call.leadType}
                    </span>
                  </div>
                </div>

                {/* Enhanced Audio Player */}
                {playingAudio === call.id && (
                  <div
                    className={`flex items-center space-x-4 px-6 py-3 rounded-xl border shadow-sm ${
                      theme === "dark"
                        ? "bg-slate-800/80 border-slate-600 backdrop-blur-sm"
                        : "bg-white/90 border-gray-200 backdrop-blur-sm"
                    }`}
                  >
                    {/* Skip backward button with tooltip */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleSkipBackward(call.id)}
                          className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                            theme === "dark"
                              ? "border-slate-600 hover:bg-slate-700 text-slate-300 hover:border-slate-500"
                              : "border-gray-300 hover:bg-gray-100 text-gray-600 hover:border-gray-400"
                          }`}
                        >
                          <SkipBack className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>10 secs</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Play/Pause button */}
                    <button
                      onClick={() => handlePlayAudio(call.id)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105 shadow-md ${
                        theme === "dark"
                          ? "bg-slate-600 hover:bg-slate-500 shadow-slate-900/30"
                          : "bg-slate-700 hover:bg-slate-600 shadow-slate-900/20"
                      }`}
                    >
                      <Pause className="w-5 h-5" />
                    </button>

                    {/* Skip forward button with tooltip */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleSkipForward(call.id)}
                          className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                            theme === "dark"
                              ? "border-slate-600 hover:bg-slate-700 text-slate-300 hover:border-slate-500"
                              : "border-gray-300 hover:bg-gray-100 text-gray-600 hover:border-gray-400"
                          }`}
                        >
                          <SkipForward className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>10 secs</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Progress bar and time */}
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-24 h-1.5 rounded-full ${
                          theme === "dark" ? "bg-slate-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            theme === "dark" ? "bg-slate-400" : "bg-slate-600"
                          }`}
                          style={{
                            width: `${
                              ((audioProgress[call.id]?.current || 15) /
                                (audioProgress[call.id]?.total || 272)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>

                      <div
                        className={`text-xs font-medium min-w-[60px] ${
                          theme === "dark" ? "text-slate-400" : "text-gray-500"
                        }`}
                      >
                        {formatTime(audioProgress[call.id]?.current || 15)} /{" "}
                        {formatTime(audioProgress[call.id]?.total || 272)}
                      </div>

                      <Volume2
                        className={`w-4 h-4 ${
                          theme === "dark" ? "text-slate-400" : "text-gray-500"
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Transcript Modal */}
        {showTranscript && (
          <Dialog open={!!showTranscript} onOpenChange={handleCloseTranscript}>
            <DialogContent
              className={`max-w-2xl ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Close Button */}
              <button
                className="absolute right-4 top-4 rounded-md p-1 transition hover:bg-slate-700/30 focus:outline-none focus:ring-2 focus:ring-slate-500 z-10"
                onClick={handleCloseTranscript}
                aria-label="Close Transcript Modal"
                type="button"
              >
                <X
                  className={`w-5 h-5 ${
                    theme === "dark" ? "text-slate-400" : "text-gray-500"
                  }`}
                />
              </button>
              <DialogHeader>
                <DialogTitle
                  className={`flex items-center justify-between ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span>Call Transcript</span>
                    <span
                      className={`text-sm ${
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      }`}
                    >
                      {
                        mockData.find((call) => call.id === showTranscript)
                          ?.dateTime
                      }{" "}
                      {
                        mockData.find((call) => call.id === showTranscript)
                          ?.time
                      }
                    </span>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="py-4 max-h-96 overflow-y-auto">
                <div
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  <p className="mb-4">
                    <strong>Agent:</strong> Hello, this is Sarah from
                    SniperThink. I'm calling regarding your inquiry about our
                    analytics platform. Do you have a few minutes to discuss how
                    we can help improve your business insights?
                  </p>
                  <p className="mb-4">
                    <strong>Customer:</strong> Yes, I have some time. I've been
                    looking for a solution that can help us understand our
                    customer behavior better.
                  </p>
                  <p className="mb-4">
                    <strong>Agent:</strong> That's exactly what we specialize
                    in. Our platform provides real-time analytics and customer
                    journey mapping. Can you tell me a bit about your current
                    setup and what specific challenges you're facing?
                  </p>
                  <p className="mb-4">
                    <strong>Customer:</strong> We're using Google Analytics
                    currently, but we need something more comprehensive. We have
                    multiple touchpoints and need to track the complete customer
                    journey.
                  </p>
                  <p className="mb-4">
                    <strong>Agent:</strong> Perfect. Our platform integrates
                    with existing tools like Google Analytics and provides a
                    unified view. Would you be interested in a demo to see how
                    this works for businesses similar to yours?
                  </p>
                  <p>
                    <strong>Customer:</strong> Yes, that sounds great. When can
                    we schedule that?
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {/* Calling Modal, moved outside of the main div for correct JSX structure */}
      <CallingModal
        isOpen={showCallingModal}
        onClose={() => setShowCallingModal(false)}
        leadName={currentCallLead?.name}
        leadPhone={currentCallLead?.phone}
      />
    </TooltipProvider>
  );
};

export default CallLogs;
