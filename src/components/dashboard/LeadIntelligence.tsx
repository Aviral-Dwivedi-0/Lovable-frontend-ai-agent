import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Download,
  MessageSquare,
  Phone,
  Calendar,
  Mail,
  UserPlus,
} from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import type { Lead, TimelineEntry } from "@/pages/Dashboard";

// Contact data with mixed interactions
const contactData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 0123",
    company: "TechCorp Solutions",
    businessType: "SaaS Startup",
    leadType: "Inbound",
    recentLeadTag: "Hot",
    interactedAgent: "Chat Agent, Call Agent",
    interactions: 8,
    lastContact: "2024-06-20",
    timeline: [
      {
        id: 1,
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-20",
        platform: "WhatsApp",
        leadType: "Inbound",
        businessType: "SaaS Startup",
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
        type: "chat",
      },
      {
        id: 2,
        interactionAgent: "Call Agent",
        interactionDate: "2024-06-19",
        platform: "Phone",
        leadType: "Inbound",
        businessType: "SaaS Startup",
        status: "Hot",
        useCase: "Follow-up call for enterprise software demo",
        messages: null,
        duration: "22:15",
        engagementLevel: "High",
        intentLevel: "High",
        budgetConstraint: "No",
        timelineUrgency: "High",
        followUpScheduled: "2024-06-22 10:30",
        demoScheduled: "2024-06-21 14:00",
        type: "call",
      },
      {
        id: 3,
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-18",
        platform: "WhatsApp",
        leadType: "Inbound",
        businessType: "SaaS Startup",
        status: "Warm",
        useCase: "Initial product inquiry",
        messages: 8,
        duration: null,
        engagementLevel: "Medium",
        intentLevel: "Medium",
        budgetConstraint: "Yes",
        timelineUrgency: "Medium",
        followUpScheduled: "2024-06-19 15:00",
        demoScheduled: "2024-06-20 16:00",
        type: "chat",
      },
      {
        id: 4,
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-17",
        platform: "Instagram",
        leadType: "Inbound",
        businessType: "SaaS Startup",
        status: "Warm",
        useCase: "Feature comparison questions",
        messages: 12,
        duration: null,
        engagementLevel: "Medium",
        intentLevel: "Medium",
        budgetConstraint: "Yes",
        timelineUrgency: "Medium",
        followUpScheduled: "2024-06-18 14:00",
        demoScheduled: "2024-06-19 11:00",
        type: "chat",
      },
      {
        id: 5,
        interactionAgent: "Call Agent",
        interactionDate: "2024-06-16",
        platform: "Phone",
        leadType: "Inbound",
        businessType: "SaaS Startup",
        status: "Cold",
        useCase: "General information call",
        messages: null,
        duration: "18:30",
        engagementLevel: "Low",
        intentLevel: "Low",
        budgetConstraint: "Yes",
        timelineUrgency: "Low",
        followUpScheduled: "2024-06-17 14:00",
        demoScheduled: "2024-06-18 11:00",
        type: "call",
      },
      {
        id: 6,
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-15",
        platform: "WhatsApp",
        leadType: "Inbound",
        businessType: "SaaS Startup",
        status: "Cold",
        useCase: "Basic website browsing assistance",
        messages: 6,
        duration: null,
        engagementLevel: "Low",
        intentLevel: "Low",
        budgetConstraint: "Yes",
        timelineUrgency: "Low",
        followUpScheduled: "2024-06-16 10:00",
        demoScheduled: "2024-06-17 15:00",
        type: "chat",
      },
      {
        id: 7,
        interactionAgent: "Call Agent",
        interactionDate: "2024-06-14",
        platform: "Phone",
        leadType: "Inbound",
        businessType: "SaaS Startup",
        status: "Warm",
        useCase: "Technical requirements discussion",
        messages: null,
        duration: "35:45",
        engagementLevel: "High",
        intentLevel: "High",
        budgetConstraint: "No",
        timelineUrgency: "High",
        followUpScheduled: "2024-06-15 09:00",
        demoScheduled: "2024-06-16 14:00",
        type: "call",
      },
      {
        id: 8,
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-13",
        platform: "Instagram",
        leadType: "Inbound",
        businessType: "SaaS Startup",
        status: "Hot",
        useCase: "Implementation timeline questions",
        messages: 20,
        duration: null,
        engagementLevel: "High",
        intentLevel: "High",
        budgetConstraint: "No",
        timelineUrgency: "High",
        followUpScheduled: "2024-06-14 11:00",
        demoScheduled: "2024-06-15 16:00",
        type: "chat",
      },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@innovatetech.com",
    phone: "+1 (555) 0456",
    company: "InnovateTech",
    businessType: "Enterprise",
    leadType: "Outbound",
    recentLeadTag: "Warm",
    interactedAgent: "Call Agent",
    interactions: 3,
    lastContact: "2024-06-19",
    timeline: [
      {
        id: 9,
        interactionAgent: "Call Agent",
        interactionDate: "2024-06-19",
        platform: "Phone",
        leadType: "Outbound",
        businessType: "Enterprise",
        status: "Warm",
        useCase: "Sales automation platform demo request",
        messages: null,
        duration: "25:30",
        engagementLevel: "Medium",
        intentLevel: "Medium",
        budgetConstraint: "Yes",
        timelineUrgency: "Medium",
        followUpScheduled: "2024-06-26 11:00",
        demoScheduled: "2024-06-24 16:00",
        type: "call",
      },
      {
        id: 10,
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-18",
        platform: "WhatsApp",
        leadType: "Outbound",
        businessType: "Enterprise",
        status: "Warm",
        useCase: "Product feature discussion",
        messages: 12,
        duration: null,
        engagementLevel: "High",
        intentLevel: "High",
        budgetConstraint: "No",
        timelineUrgency: "High",
        followUpScheduled: "2024-06-25 09:00",
        demoScheduled: "2024-06-23 15:00",
        type: "chat",
      },
      {
        id: 11,
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-17",
        platform: "Instagram",
        leadType: "Outbound",
        businessType: "Enterprise",
        status: "Cold",
        useCase: "Initial contact and introduction",
        messages: 5,
        duration: null,
        engagementLevel: "Low",
        intentLevel: "Low",
        budgetConstraint: "Yes",
        timelineUrgency: "Low",
        followUpScheduled: "2024-06-24 14:00",
        demoScheduled: "2024-06-26 10:00",
        type: "chat",
      },
    ],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@startupx.io",
    phone: "+1 (555) 0789",
    company: "StartupX",
    businessType: "Tech Startup",
    leadType: "Customer",
    recentLeadTag: "Cold",
    interactedAgent: "Chat Agent",
    interactions: 2,
    lastContact: "2024-06-18",
    timeline: [
      {
        id: 12,
        interactionAgent: "Chat Agent",
        interactionDate: "2024-06-18",
        platform: "WhatsApp",
        leadType: "Customer",
        businessType: "Tech Startup",
        status: "Cold",
        useCase: "Lead generation tools for startups",
        messages: 8,
        duration: null,
        engagementLevel: "Low",
        intentLevel: "Low",
        budgetConstraint: "Yes",
        timelineUrgency: "Low",
        followUpScheduled: "2024-06-25 16:00",
        demoScheduled: "2024-06-27 13:00",
        type: "chat",
      },
      {
        id: 13,
        interactionAgent: "Call Agent",
        interactionDate: "2024-06-17",
        platform: "Phone",
        leadType: "Customer",
        businessType: "Tech Startup",
        status: "Warm",
        useCase: "Pricing and package discussion",
        messages: null,
        duration: "15:20",
        engagementLevel: "Medium",
        intentLevel: "Medium",
        budgetConstraint: "No",
        timelineUrgency: "Medium",
        followUpScheduled: "2024-06-24 11:00",
        demoScheduled: "2024-06-26 14:00",
        type: "call",
      },
    ],
  },
];

interface LeadIntelligenceProps {
  onOpenProfile: (contact: Lead) => void;
}

const LeadIntelligence = ({ onOpenProfile }: LeadIntelligenceProps) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [leadTypeFilter, setLeadTypeFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState<Lead | null>(null);
  const [contacts, setContacts] = useState(contactData);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

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

  const handleLeadTypeChange = (contactId: number, newLeadType: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? { ...contact, leadType: newLeadType }
          : contact
      )
    );
  };

  const handleSelectContact = (contactId: number, checked: boolean) => {
    if (checked) {
      setSelectedContacts((prev) => [...prev, contactId]);
    } else {
      setSelectedContacts((prev) => prev.filter((id) => id !== contactId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(filteredContacts.map((contact) => contact.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLeadType =
      leadTypeFilter === "all" || contact.leadType === leadTypeFilter;
    const matchesTag =
      tagFilter === "all" || contact.recentLeadTag === tagFilter;

    return matchesSearch && matchesLeadType && matchesTag;
  });

  const handleContactClick = (contact: Lead) => {
    setSelectedContact(contact);
  };

  const handleBackToList = () => {
    setSelectedContact(null);
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
                className="bg-teal-600 hover:bg-teal-700 text-white"
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
                <Calendar className="w-4 h-4 mr-1" />
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
                          <TableCell className="text-foreground">
                            {interaction.engagementLevel || "—"}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {interaction.intentLevel || "—"}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {interaction.budgetConstraint || "—"}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {interaction.timelineUrgency || "—"}
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

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-6 border-b bg-card">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-foreground">
            Lead Intelligence
          </h1>
          <p className="text-muted-foreground">
            Comprehensive view of all contacts from chat and call interactions
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border text-foreground"
              />
            </div>
          </div>

          <Select value={leadTypeFilter} onValueChange={setLeadTypeFilter}>
            <SelectTrigger className="w-40 bg-background border-border">
              <SelectValue placeholder="Lead Type" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Inbound">Inbound</SelectItem>
              <SelectItem value="Outbound">Outbound</SelectItem>
              <SelectItem value="Customer">Customer</SelectItem>
            </SelectContent>
          </Select>

          <Select value={tagFilter} onValueChange={setTagFilter}>
            <SelectTrigger className="w-40 bg-background border-border">
              <SelectValue placeholder="Lead Tag" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">All Tags</SelectItem>
              <SelectItem value="Hot">Hot</SelectItem>
              <SelectItem value="Warm">Warm</SelectItem>
              <SelectItem value="Cold">Cold</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="border-border">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-muted/30">
        <div className="p-6">
          <div className="bg-card rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedContacts.length === filteredContacts.length &&
                        filteredContacts.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Contact
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Business Type
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Lead Type
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Recent Lead Tag
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    No. of Interactions
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Interacted Agent
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Last Interaction
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow
                    key={contact.id}
                    className="border-border hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleContactClick(contact)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={(checked) =>
                          handleSelectContact(contact.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">
                        {contact.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {contact.email}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {contact.phone}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {contact.company}
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">
                      {contact.businessType}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Select
                        value={contact.leadType}
                        onValueChange={(value) =>
                          handleLeadTypeChange(contact.id, value)
                        }
                      >
                        <SelectTrigger className="w-32 bg-background border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          <SelectItem value="Inbound">Inbound</SelectItem>
                          <SelectItem value="Outbound">Outbound</SelectItem>
                          <SelectItem value="Customer">Customer</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTagColor(contact.recentLeadTag)}>
                        {contact.recentLeadTag}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground">
                      {contact.interactions}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {contact.interactedAgent}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {contact.lastContact}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredContacts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No contacts found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadIntelligence;
