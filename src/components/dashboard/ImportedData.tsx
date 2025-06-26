import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Phone,
  MessageSquare,
  Calendar as CalendarIcon,
  Mail,
  Download,
  Users,
  ChevronDown,
  Search,
  Filter,
  Plus,
  FileText,
  MoreHorizontal,
  UserCheck,
  UserPlus,
  X,
  Upload,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { useTheme } from "@/components/theme/ThemeProvider";
import CallingModal from "@/components/call/CallingModal";
import type { Lead, TimelineEntry } from "@/pages/Dashboard";

interface ImportedDataProps {
  onOpenProfile: (lead: Lead) => void;
}

// Mock data for imported leads with more timeline interactions for John Smith
const importedLeads = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Solutions",
    leadType: "Inbound",
    businessType: "SaaS",
    agentType: "ChatAgent",
    leadTag: "Hot",
    interactions: 15,
    engagementLevel: "High",
    intentLevel: "High",
    budgetConstraint: "Low",
    timelineConstraint: "High",
    timeline: [
      {
        id: 1,
        type: "chat",
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-20",
        platform: "WhatsApp",
        leadType: "Inbound",
        businessType: "SaaS",
        status: "Hot",
        useCase: "Enterprise software pricing inquiry",
        messages: 15,
        duration: null,
        engagementLevel: "High",
        intentLevel: "High",
        budgetConstraint: "No",
        timelineUrgency: "High",
        followUpScheduled: "2024-06-22 10:30",
        demoScheduled: "2024-06-21 14:00",
        date: "2024-06-20 15:14",
        actions: "Initial pricing inquiry and feature discussion",
        queries: [
          "What are your enterprise pricing tiers?",
          "Do you offer custom integrations?",
        ],
      },
      {
        id: 2,
        type: "chat",
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-19",
        platform: "WhatsApp",
        leadType: "Inbound",
        businessType: "SaaS",
        status: "Hot",
        useCase: "Follow-up on pricing discussion",
        messages: 8,
        duration: null,
        engagementLevel: "High",
        intentLevel: "High",
        budgetConstraint: "No",
        timelineUrgency: "High",
        followUpScheduled: "2024-06-21 14:00",
        demoScheduled: "2024-06-21 14:00",
        date: "2024-06-19 11:30",
        actions: "Follow-up chat regarding enterprise features",
        queries: [
          "Can we schedule a demo?",
          "What's included in the enterprise plan?",
        ],
      },
      {
        id: 3,
        type: "chat",
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-18",
        platform: "WhatsApp",
        leadType: "Inbound",
        businessType: "SaaS",
        status: "Warm",
        useCase: "Technical questions about integration",
        messages: 12,
        duration: null,
        engagementLevel: "High",
        intentLevel: "Medium",
        budgetConstraint: "No",
        timelineUrgency: "High",
        followUpScheduled: "2024-06-19 10:00",
        demoScheduled: "",
        date: "2024-06-18 16:45",
        actions: "Technical integration discussion",
        queries: [
          "What APIs do you provide?",
          "How does the integration process work?",
        ],
      },
      {
        id: 4,
        type: "chat",
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-17",
        platform: "WhatsApp",
        leadType: "Inbound",
        businessType: "SaaS",
        status: "Warm",
        useCase: "Security and compliance questions",
        messages: 6,
        duration: null,
        engagementLevel: "Medium",
        intentLevel: "Medium",
        budgetConstraint: "No",
        timelineUrgency: "Medium",
        followUpScheduled: "",
        demoScheduled: "",
        date: "2024-06-17 14:20",
        actions: "Security compliance discussion",
        queries: [
          "Are you SOC 2 compliant?",
          "What security measures do you have?",
        ],
      },
      {
        id: 5,
        type: "chat",
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-16",
        platform: "WhatsApp",
        leadType: "Inbound",
        businessType: "SaaS",
        status: "Warm",
        useCase: "Initial contact and product overview",
        messages: 4,
        duration: null,
        engagementLevel: "Medium",
        intentLevel: "Low",
        budgetConstraint: "No",
        timelineUrgency: "Low",
        followUpScheduled: "",
        demoScheduled: "",
        date: "2024-06-16 09:15",
        actions: "First contact and product introduction",
        queries: ["What does your software do?"],
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@techcorp.com",
    phone: "+1 (555) 987-6543",
    company: "InnovateTech",
    leadType: "Outbound",
    businessType: "E-commerce",
    agentType: "CallAgent",
    leadTag: "Warm",
    interactions: 8,
    engagementLevel: "Medium",
    intentLevel: "Medium",
    budgetConstraint: "Medium",
    timelineUrgency: "Medium",
    timeline: [
      {
        id: 2,
        type: "call",
        interactionAgent: "Call Agent",
        interactionDate: "2024-06-19",
        platform: "Phone",
        leadType: "Outbound",
        businessType: "E-commerce",
        status: "Warm",
        useCase: "Follow-up call for enterprise software demo",
        messages: null,
        duration: "22:15",
        engagementLevel: "Medium",
        intentLevel: "Medium",
        budgetConstraint: "Yes",
        timelineUrgency: "Medium",
        followUpScheduled: "2024-06-22 10:30",
        demoScheduled: "2024-06-21 14:00",
        date: "2024-06-19 14:30",
        actions: "Follow-up call for demo scheduling",
        recording: true,
        transcript:
          "Agent: Hello Sarah, this is a follow-up regarding our enterprise software solution.\n\nSarah: Hi, yes I've been thinking about it. Can you tell me more about the implementation timeline?\n\nAgent: Absolutely! Our typical implementation takes 2-4 weeks depending on complexity.\n\nSarah: That sounds reasonable. What about training for our team?\n\nAgent: We provide comprehensive training including live sessions and documentation.",
      },
    ],
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@startup.io",
    phone: "+1 (555) 456-7890",
    company: "StartupX",
    leadType: "Customer",
    businessType: "Fintech",
    agentType: "ChatAgent",
    leadTag: "Cold",
    interactions: 3,
    engagementLevel: "Low",
    intentLevel: "Low",
    budgetConstraint: "High",
    timelineUrgency: "Low",
    timeline: [
      {
        id: 3,
        type: "chat",
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-18",
        platform: "Instagram",
        leadType: "Customer",
        businessType: "Fintech",
        status: "Cold",
        useCase: "Initial product inquiry",
        messages: 8,
        duration: null,
        engagementLevel: "Low",
        intentLevel: "Low",
        budgetConstraint: "Yes",
        timelineUrgency: "Low",
        followUpScheduled: "2024-06-19 15:00",
        demoScheduled: "2024-06-20 16:00",
        date: "2024-06-18 10:00",
        actions: "Initial product inquiry",
        queries: ["What is your product about?"],
      },
    ],
  },
];

const ImportedData = ({ onOpenProfile }: ImportedDataProps) => {
  const { theme } = useTheme();
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [bulkChatModalOpen, setBulkChatModalOpen] = useState(false);
  const [bulkCallModalOpen, setBulkCallModalOpen] = useState(false);
  const [bulkFollowupModalOpen, setBulkFollowupModalOpen] = useState(false);
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [followupDate, setFollowupDate] = useState<Date>();
  const [followupTime, setFollowupTime] = useState("");
  const [followupChannel, setFollowupChannel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Lead | null>(null);
  const [contacts, setContacts] = useState(importedLeads);
  const [callingModalOpen, setCallingModalOpen] = useState(false);
  const [currentCallLead, setCurrentCallLead] = useState<Lead | null>(null);
  const [scheduleFollowupModalOpen, setScheduleFollowupModalOpen] =
    useState(false);
  const [scheduleDemoModalOpen, setScheduleDemoModalOpen] = useState(false);
  const [currentActionLead, setCurrentActionLead] = useState<Lead | null>(null);
  const [viewChatModalOpen, setViewChatModalOpen] = useState(false);
  const [viewTranscriptModalOpen, setViewTranscriptModalOpen] = useState(false);
  const [currentChatLead, setCurrentChatLead] = useState<Lead | null>(null);
  const [currentTranscriptLead, setCurrentTranscriptLead] =
    useState<Lead | null>(null);

  // New state for enhanced Add Lead form
  const [newLeadData, setNewLeadData] = useState({
    name: "",
    email: "",
    phone: "",
    leadType: "",
    leadTag: "",
    agent: "",
    businessType: "",
    engagementLevel: "",
    intentLevel: "",
    budgetConstraint: "",
    timelineUrgency: "",
  });

  // Filters
  const [agentFilter, setAgentFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [leadTagFilter, setLeadTagFilter] = useState("all");
  const [leadTypeFilter, setLeadTypeFilter] = useState("all");

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "hot":
        return "bg-red-500 text-white hover:bg-red-600";
      case "warm":
        return "bg-orange-500 text-white hover:bg-orange-600";
      case "cold":
        return "bg-blue-500 text-white hover:bg-blue-600";
      default:
        return "bg-gray-500 text-white hover:bg-gray-600";
    }
  };

  // Updated function to match Chat Agent data tab styling
  const getLevelBadgeColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
    }
  };

  const handleSelectLead = (leadId: number) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId)
        ? prev.filter((id) => id !== leadId)
        : [...prev, leadId]
    );
  };
  const handleSelectAll = () => {
    setSelectedLeads(
      selectedLeads.length === importedLeads.length
        ? []
        : importedLeads.map((lead) => lead.id)
    );
  };
  const getLeadTagColor = (tag: string) => {
    switch (tag) {
      case "Hot":
        return "bg-red-100 text-red-800";
      case "Warm":
        return "bg-orange-100 text-orange-800";
      case "Cold":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getLeadTypeColor = (type: string) => {
    switch (type) {
      case "Inbound":
        return "bg-green-100 text-green-800";
      case "Outbound":
        return "bg-purple-100 text-purple-800";
      case "Customer":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const handleExport = (format: "csv") => {
    console.log(`Exporting ${format} with current filters`);
  };
  const handleSendEmail = () => {
    console.log("Sending email:", {
      subject: emailSubject,
      body: emailBody,
    });
    setEmailModalOpen(false);
    setEmailSubject("");
    setEmailBody("");
  };
  const handleBulkChat = () => {
    console.log("Starting bulk chat with message:", chatMessage);
    setBulkChatModalOpen(false);
    setChatMessage("");
  };
  const handleBulkCall = () => {
    console.log("Starting bulk call");
    setBulkCallModalOpen(false);
  };
  const handleBulkFollowup = () => {
    console.log("Scheduling bulk followup:", {
      date: followupDate,
      time: followupTime,
      channel: followupChannel,
    });
    setBulkFollowupModalOpen(false);
    setFollowupDate(undefined);
    setFollowupTime("");
    setFollowupChannel("");
  };
  const handleAddLead = () => {
    if (!newLeadData.name || !newLeadData.email || !newLeadData.leadType) {
      console.log("Please fill in required fields");
      return;
    }
    console.log("Adding new lead:", newLeadData);
    setAddLeadModalOpen(false);
    setNewLeadData({
      name: "",
      email: "",
      phone: "",
      leadType: "",
      leadTag: "",
      agent: "",
      businessType: "",
      engagementLevel: "",
      intentLevel: "",
      budgetConstraint: "",
      timelineUrgency: "",
    });
  };

  const handleCall = (lead: Lead) => {
    setCurrentCallLead(lead);
    setCallingModalOpen(true);
  };

  const handleScheduleFollowup = (lead: Lead) => {
    setCurrentActionLead(lead);
    setScheduleFollowupModalOpen(true);
  };

  const handleScheduleDemo = (lead: Lead) => {
    setCurrentActionLead(lead);
    setScheduleDemoModalOpen(true);
  };

  const handleSaveFollowup = () => {
    console.log("Scheduling follow-up for:", currentActionLead?.name);
    setScheduleFollowupModalOpen(false);
    setCurrentActionLead(null);
  };

  const handleSaveDemo = () => {
    console.log("Scheduling demo for:", currentActionLead?.name);
    setScheduleDemoModalOpen(false);
    setCurrentActionLead(null);
  };

  const handleContactClick = (contact: Lead) => {
    setSelectedContact(contact);
  };

  const handleBackToList = () => {
    setSelectedContact(null);
  };

  const handleLeadTypeChange = (leadId: number, newLeadType: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === leadId ? { ...contact, leadType: newLeadType } : contact
      )
    );
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLeadType =
      leadTypeFilter === "all" || contact.leadType === leadTypeFilter;
    const matchesTag =
      leadTagFilter === "all" || contact.leadTag === leadTagFilter;

    return matchesSearch && matchesLeadType && matchesTag;
  });

  const handleViewChat = (lead: Lead) => {
    setCurrentChatLead(lead);
    setViewChatModalOpen(true);
  };

  const handleViewTranscript = (lead: Lead) => {
    setCurrentTranscriptLead(lead);
    setViewTranscriptModalOpen(true);
  };

  if (selectedContact) {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="p-6 border-b bg-card">
          <Button variant="outline" onClick={handleBackToList} className="mb-4">
            ← Back to Contacts
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2 text-foreground">
                {selectedContact.name}
              </h1>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Email: {selectedContact.email}</div>
                <div>Phone: {selectedContact.phone}</div>
                <div>Company: {selectedContact.company}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                style={{ backgroundColor: "#1A6262" }}
                className="hover:opacity-90 text-white"
              >
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-foreground border-border hover:bg-accent"
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Chat
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-foreground border-border hover:bg-accent"
              >
                <Mail className="w-4 h-4 mr-1" />
                Email
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-foreground border-border hover:bg-accent"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Follow Up
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-foreground border-border hover:bg-accent"
              >
                <CalendarIcon className="w-4 h-4 mr-1" />
                Demo
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-foreground border-border hover:bg-accent"
              >
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 bg-muted/30">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                Interaction Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">
                        Interaction Agent
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Date
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Platform/Source
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Lead Type
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Business Type
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Status/Lead Tag
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Lead Use-case/Query
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Messages/Duration
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Engagement Level
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Intent Level
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Budget Constraint
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Timeline Urgency
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Follow-up Scheduled
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Demo Scheduled
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedContact.timeline?.map(
                      (interaction: TimelineEntry) => (
                        <TableRow
                          key={interaction.id}
                          className="border-border"
                        >
                          <TableCell className="font-medium text-foreground">
                            {interaction.interactionAgent}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {interaction.interactionDate}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {interaction.platform}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={interaction.leadType}
                              onValueChange={(value) => {
                                setSelectedContact((prev) => ({
                                  ...prev,
                                  timeline: prev.timeline.map(
                                    (item: TimelineEntry) =>
                                      item.id === interaction.id
                                        ? { ...item, leadType: value }
                                        : item
                                  ),
                                }));
                              }}
                            >
                              <SelectTrigger className="w-32 bg-background border-border">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-popover border-border">
                                <SelectItem value="Inbound">Inbound</SelectItem>
                                <SelectItem value="Outbound">
                                  Outbound
                                </SelectItem>
                                <SelectItem value="Customer">
                                  Customer
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-foreground">
                            {interaction.businessType}
                          </TableCell>
                          <TableCell>
                            <Badge className={getTagColor(interaction.status)}>
                              {interaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs text-foreground">
                            <div
                              className="truncate"
                              title={interaction.useCase}
                            >
                              {interaction.useCase}
                            </div>
                          </TableCell>
                          <TableCell className="text-foreground">
                            {interaction.messages
                              ? `${interaction.messages} messages`
                              : interaction.duration}
                          </TableCell>
                          <TableCell>
                            {interaction.engagementLevel && (
                              <Badge
                                className={getLevelBadgeColor(
                                  interaction.engagementLevel
                                )}
                              >
                                {interaction.engagementLevel}
                              </Badge>
                            )}
                            {!interaction.engagementLevel && (
                              <span className="text-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {interaction.intentLevel && (
                              <Badge
                                className={getLevelBadgeColor(
                                  interaction.intentLevel
                                )}
                              >
                                {interaction.intentLevel}
                              </Badge>
                            )}
                            {!interaction.intentLevel && (
                              <span className="text-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {interaction.budgetConstraint || "—"}
                          </TableCell>
                          <TableCell>
                            {interaction.timelineUrgency && (
                              <Badge
                                className={getLevelBadgeColor(
                                  interaction.timelineUrgency
                                )}
                              >
                                {interaction.timelineUrgency}
                              </Badge>
                            )}
                            {!interaction.timelineUrgency && (
                              <span className="text-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {interaction.followUpScheduled || "—"}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {interaction.demoScheduled || "—"}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getChatHistory = (lead: Lead) => {
    if (
      lead?.timeline &&
      Array.isArray(lead.timeline) &&
      lead.timeline.length > 0
    ) {
      const chatEntry = lead.timeline.find(
        (entry: TimelineEntry) => entry.type === "chat"
      );
      if (
        chatEntry?.chatHistory &&
        Array.isArray(chatEntry.chatHistory) &&
        chatEntry.chatHistory.length > 0
      ) {
        return chatEntry.chatHistory;
      }
    }
    // fallback demo chat history
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

  const getTranscript = (lead: Lead) => {
    if (
      lead?.timeline &&
      Array.isArray(lead.timeline) &&
      lead.timeline.length > 0
    ) {
      const callEntry = lead.timeline.find(
        (entry: TimelineEntry) => entry.type === "call"
      );
      if (callEntry?.transcript) {
        return callEntry.transcript;
      }
    }
    return "No transcript available for this lead.";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with title only */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Imported Data</h1>
      </div>

      {/* Search bar and controls */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>

        {/* Right side with Add Lead, filters and 3 dots menu */}
        <div className="flex items-center space-x-2">
          <Dialog open={addLeadModalOpen} onOpenChange={setAddLeadModalOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                style={{ backgroundColor: "#1A6262" }}
                className="hover:opacity-90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Lead/Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Lead/Customer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Lead Name *
                    </label>
                    <Input
                      placeholder="Enter lead name"
                      value={newLeadData.name}
                      onChange={(e) =>
                        setNewLeadData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={newLeadData.email}
                      onChange={(e) =>
                        setNewLeadData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Phone Number
                    </label>
                    <Input
                      placeholder="Enter phone number"
                      value={newLeadData.phone}
                      onChange={(e) =>
                        setNewLeadData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Lead Type *
                    </label>
                    <Select
                      value={newLeadData.leadType}
                      onValueChange={(value) =>
                        setNewLeadData((prev) => ({ ...prev, leadType: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select lead type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inbound">Inbound</SelectItem>
                        <SelectItem value="Outbound">Outbound</SelectItem>
                        <SelectItem value="Customer">Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Lead Tag
                    </label>
                    <Select
                      value={newLeadData.leadTag}
                      onValueChange={(value) =>
                        setNewLeadData((prev) => ({ ...prev, leadTag: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select lead tag" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hot">Hot</SelectItem>
                        <SelectItem value="Warm">Warm</SelectItem>
                        <SelectItem value="Cold">Cold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Select Agent
                    </label>
                    <Select
                      value={newLeadData.agent}
                      onValueChange={(value) =>
                        setNewLeadData((prev) => ({ ...prev, agent: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose agent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Chat Agent">Chat Agent</SelectItem>
                        <SelectItem value="Call Agent">Call Agent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Business Type
                    </label>
                    <Select
                      value={newLeadData.businessType}
                      onValueChange={(value) =>
                        setNewLeadData((prev) => ({
                          ...prev,
                          businessType: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SaaS">SaaS</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="Fintech">Fintech</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Engagement Level
                    </label>
                    <Select
                      value={newLeadData.engagementLevel}
                      onValueChange={(value) =>
                        setNewLeadData((prev) => ({
                          ...prev,
                          engagementLevel: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select engagement level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Intent Level
                    </label>
                    <Select
                      value={newLeadData.intentLevel}
                      onValueChange={(value) =>
                        setNewLeadData((prev) => ({
                          ...prev,
                          intentLevel: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select intent level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Budget Constraint
                    </label>
                    <Select
                      value={newLeadData.budgetConstraint}
                      onValueChange={(value) =>
                        setNewLeadData((prev) => ({
                          ...prev,
                          budgetConstraint: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget constraint" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Timeline Urgency
                    </label>
                    <Select
                      value={newLeadData.timelineUrgency}
                      onValueChange={(value) =>
                        setNewLeadData((prev) => ({
                          ...prev,
                          timelineUrgency: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Upload Container */}
                <div className="mt-6">
                  <label className="text-sm font-medium mb-2 block">
                    Upload Data
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your Excel/CSV file here or click to browse
                    </p>
                    <Button variant="outline" size="sm" className="mb-3">
                      Browse Files
                    </Button>
                    <div className="text-xs text-gray-500">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-600 p-0 h-auto"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download Template
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setAddLeadModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddLead}
                    style={{ backgroundColor: "#1A6262" }}
                    className="hover:opacity-90 text-white"
                  >
                    Save Lead
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>

          {/* 3 dots menu for bulk actions */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <Dialog
                  open={bulkChatModalOpen}
                  onOpenChange={setBulkChatModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Bulk Chat
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>💬 Bulk Chat</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Enter your message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => setBulkChatModalOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleBulkChat}
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={bulkCallModalOpen}
                  onOpenChange={setBulkCallModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Bulk Call
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>📞 Bulk Call</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>
                        Start calling {selectedLeads.length} selected leads?
                      </p>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => setBulkCallModalOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleBulkCall}
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          Start Calling
                        </Button>
                        <Button variant="destructive">End All</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Bulk Email
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>📧 SniperThink Email Composer</DialogTitle>
                      <p className="text-sm text-muted-foreground">
                        Communicate with leads directly from SniperThink
                      </p>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Subject"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                      />
                      <Textarea
                        placeholder="Email body..."
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        rows={8}
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => setEmailModalOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSendEmail}
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          Send Email
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={bulkFollowupModalOpen}
                  onOpenChange={setBulkFollowupModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Bulk Follow-up
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>📅 Schedule Bulk Follow-up</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {followupDate
                              ? format(followupDate, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={followupDate}
                            onSelect={setFollowupDate}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <Input
                        type="time"
                        value={followupTime}
                        onChange={(e) => setFollowupTime(e.target.value)}
                      />
                      <Select
                        value={followupChannel}
                        onValueChange={setFollowupChannel}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select channel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chat">Chat</SelectItem>
                          <SelectItem value="call">Call</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => setBulkFollowupModalOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleBulkFollowup}
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <hr className="my-2" />

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleExport("csv")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Bulk Actions - only show when multiple leads are selected */}
      {selectedLeads.length > 1 && (
        <div className="flex gap-2 p-4 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700 mr-4">
            {selectedLeads.length} selected
          </span>

          <Dialog open={bulkChatModalOpen} onOpenChange={setBulkChatModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <MessageSquare className="w-4 h-4 mr-1" />
                Bulk Chat
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>💬 Bulk Chat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setBulkChatModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBulkChat}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={bulkCallModalOpen} onOpenChange={setBulkCallModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4 mr-1" />
                Bulk Call
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>📞 Bulk Call</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p>Start calling {selectedLeads.length} selected leads?</p>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setBulkCallModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBulkCall}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Start Calling
                  </Button>
                  <Button variant="destructive">End All</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Mail className="w-4 h-4 mr-1" />
                Bulk Email
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>📧 SniperThink Email Composer</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Communicate with leads directly from SniperThink
                </p>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
                <Textarea
                  placeholder="Email body..."
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={8}
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setEmailModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSendEmail}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Send Email
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            open={bulkFollowupModalOpen}
            onOpenChange={setBulkFollowupModalOpen}
          >
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <CalendarIcon className="w-4 h-4 mr-1" />
                Bulk Follow-up
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>📅 Schedule Bulk Follow-up</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {followupDate
                        ? format(followupDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={followupDate}
                      onSelect={setFollowupDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  value={followupTime}
                  onChange={(e) => setFollowupTime(e.target.value)}
                />
                <Select
                  value={followupChannel}
                  onValueChange={setFollowupChannel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chat">Chat</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setBulkFollowupModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBulkFollowup}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Schedule
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedLeads.length === importedLeads.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Lead Type</TableHead>
              <TableHead>Business Type</TableHead>
              <TableHead>Agent Type</TableHead>
              <TableHead>Lead Tag</TableHead>
              <TableHead>Interactions</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead>Intent</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedLeads.includes(lead.id)}
                    onCheckedChange={() => handleSelectLead(lead.id)}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div
                      className="font-medium cursor-pointer hover:text-blue-600"
                      onClick={() => handleContactClick(lead)}
                    >
                      {lead.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {lead.email}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {lead.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={lead.leadType}
                    onValueChange={(value) =>
                      handleLeadTypeChange(lead.id, value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inbound">Inbound</SelectItem>
                      <SelectItem value="Outbound">Outbound</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{lead.businessType}</TableCell>
                <TableCell>{lead.agentType}</TableCell>
                <TableCell>
                  <Badge className={getLeadTagColor(lead.leadTag)}>
                    {lead.leadTag}
                  </Badge>
                </TableCell>
                <TableCell>{lead.interactions}</TableCell>
                <TableCell>
                  <Badge className={getLevelBadgeColor(lead.engagementLevel)}>
                    {lead.engagementLevel}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getLevelBadgeColor(lead.intentLevel)}>
                    {lead.intentLevel}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getLevelBadgeColor(lead.budgetConstraint)}>
                    {lead.budgetConstraint}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getLevelBadgeColor(lead.timelineUrgency)}>
                    {lead.timelineUrgency}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                      onClick={() => handleCall(lead)}
                    >
                      <Phone className="w-4 h-4 text-gray-600" />
                    </Button>
                    {lead.agentType === "ChatAgent" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                        onClick={() => handleViewChat(lead)}
                      >
                        <MessageSquare className="w-4 h-4 text-gray-600" />
                      </Button>
                    )}
                    {lead.agentType === "CallAgent" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                        onClick={() => handleViewTranscript(lead)}
                      >
                        <FileText className="w-4 h-4 text-gray-600" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                      onClick={() => handleScheduleFollowup(lead)}
                    >
                      <UserPlus className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                      onClick={() => handleScheduleDemo(lead)}
                    >
                      <CalendarIcon className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <Mail className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Calling Modal */}
      <CallingModal
        isOpen={callingModalOpen}
        onClose={() => setCallingModalOpen(false)}
        leadName={currentCallLead?.name}
        leadPhone={currentCallLead?.phone}
      />

      {/* Schedule Follow-up Modal */}
      <Dialog
        open={scheduleFollowupModalOpen}
        onOpenChange={setScheduleFollowupModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Schedule Follow-up for {currentActionLead?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {followupDate ? format(followupDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={followupDate}
                  onSelect={setFollowupDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Input
              type="time"
              value={followupTime}
              onChange={(e) => setFollowupTime(e.target.value)}
            />
            <Select value={followupChannel} onValueChange={setFollowupChannel}>
              <SelectTrigger>
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chat">Chat</SelectItem>
                <SelectItem value="call">Call</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setScheduleFollowupModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveFollowup}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Demo Modal */}
      <Dialog
        open={scheduleDemoModalOpen}
        onOpenChange={setScheduleDemoModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Schedule Demo for {currentActionLead?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {followupDate ? format(followupDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={followupDate}
                  onSelect={setFollowupDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Input
              type="time"
              value={followupTime}
              onChange={(e) => setFollowupTime(e.target.value)}
            />
            <Textarea placeholder="Demo notes or agenda..." />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setScheduleDemoModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveDemo}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Chat Modal */}
      <Dialog open={viewChatModalOpen} onOpenChange={setViewChatModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Chat Conversation — {currentChatLead?.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewChatModalOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {currentChatLead && getChatHistory(currentChatLead)?.length > 0 ? (
              getChatHistory(currentChatLead).map(
                (msg: TimelineEntry, idx: number) => (
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
                      <div className="text-xs opacity-70 mt-1">{msg.time}</div>
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
        </DialogContent>
      </Dialog>

      {/* View Transcript Modal */}
      <Dialog
        open={viewTranscriptModalOpen}
        onOpenChange={setViewTranscriptModalOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Call Transcript — {currentTranscriptLead?.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewTranscriptModalOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 max-h-96 overflow-y-auto">
            <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
              {currentTranscriptLead
                ? getTranscript(currentTranscriptLead)
                : "No transcript available."}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportedData;
