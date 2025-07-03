import { useTheme } from "@/components/theme/ThemeProvider";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import { Info, ChevronDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-groups";
import type { Lead } from "@/components/agents/AgentModal";
import type { TimelineEntry } from "@/pages/Dashboard";
import { InfoIcon } from "@/components/ui/info-icon";

// Consistent color palette
const COLORS = ["#1A6262", "#91C499", "#E1A940", "#FF6700", "#6366f1"];

// Sample data for the new charts
const leadsOverTimeData = [
  {
    date: "Jan 1",
    chatLeads: 45,
    callLeads: 32,
    total: 77,
  },
  {
    date: "Jan 2",
    chatLeads: 52,
    callLeads: 28,
    total: 80,
  },
  {
    date: "Jan 3",
    chatLeads: 48,
    callLeads: 35,
    total: 83,
  },
  {
    date: "Jan 4",
    chatLeads: 61,
    callLeads: 42,
    total: 103,
  },
  {
    date: "Jan 5",
    chatLeads: 55,
    callLeads: 38,
    total: 93,
  },
  {
    date: "Jan 6",
    chatLeads: 68,
    callLeads: 45,
    total: 113,
  },
  {
    date: "Jan 7",
    chatLeads: 72,
    callLeads: 51,
    total: 123,
  },
];
const interactionsOverTimeData = [
  {
    date: "Jan 1",
    chat: 156,
    call: 89,
    total: 245,
  },
  {
    date: "Jan 2",
    chat: 142,
    call: 95,
    total: 237,
  },
  {
    date: "Jan 3",
    chat: 168,
    call: 102,
    total: 270,
  },
  {
    date: "Jan 4",
    chat: 185,
    call: 118,
    total: 303,
  },
  {
    date: "Jan 5",
    chat: 172,
    call: 125,
    total: 297,
  },
  {
    date: "Jan 6",
    chat: 194,
    call: 142,
    total: 336,
  },
  {
    date: "Jan 7",
    chat: 201,
    call: 156,
    total: 357,
  },
];
const leadQualityData = [
  {
    name: "Hot",
    chatCount: 45,
    callCount: 32,
    color: COLORS[0],
  },
  {
    name: "Warm",
    chatCount: 68,
    callCount: 48,
    color: COLORS[1],
  },
  {
    name: "Cold",
    chatCount: 34,
    callCount: 22,
    color: COLORS[2],
  },
];
const engagementFunnelData = [
  {
    name: "Leads Captured",
    value: 1000,
    fill: COLORS[0],
  },
  {
    name: "Interacted",
    value: 856,
    fill: COLORS[1],
  },
  {
    name: "Qualified",
    value: 654,
    fill: COLORS[2],
  },
  {
    name: "Demo Booked",
    value: 423,
    fill: COLORS[3],
  },
  {
    name: "Converted",
    value: 289,
    fill: COLORS[4],
  },
];
const interactionsToConvertData = [
  {
    interactions: "1-2",
    chatCount: 12,
    callCount: 8,
  },
  {
    interactions: "3-4",
    chatCount: 25,
    callCount: 18,
  },
  {
    interactions: "5-6",
    chatCount: 34,
    callCount: 28,
  },
  {
    interactions: "7-8",
    chatCount: 22,
    callCount: 15,
  },
  {
    interactions: "9+",
    chatCount: 8,
    callCount: 5,
  },
];
const timeToConvertData = [
  {
    period: "0-1 days",
    count: 15,
  },
  {
    period: "2-3 days",
    count: 32,
  },
  {
    period: "4-7 days",
    count: 45,
  },
  {
    period: "1-2 weeks",
    count: 28,
  },
  {
    period: "2+ weeks",
    count: 12,
  },
];
const sourceBreakdownData = [
  {
    name: "Inbound",
    value: 512,
    color: COLORS[0],
  },
  {
    name: "Outbound",
    value: 324,
    color: COLORS[1],
  },
  {
    name: "Customer Referral",
    value: 156,
    color: COLORS[2],
  },
];
const chartInfo = [
  {
    title: "Leads Over Time",
    description:
      "Shows how many new leads were captured across days, weeks, or months",
  },
  {
    title: "Total Interactions Over Time (Chat/Call)",
    description: "All conversations happening across agents",
  },
  {
    title: "Lead Quality Distribution (Hot/Warm/Cold)",
    description: "Current spread of lead quality to prioritize outreach",
  },
  {
    title: "Engagement Funnel",
    description:
      "Visual representation of how leads progress through key engagement stages",
  },
  {
    title: "Avg. Interactions to Convert",
    description:
      "Distribution of how many interactions it typically takes to convert a lead",
  },
  {
    title: "Avg. Time to Convert a Lead",
    description:
      "The average time duration from first interaction to customer conversion",
  },
  {
    title: "Inbound vs Outbound vs Customer Source Breakdown",
    description:
      "Comparison of how many leads are coming from inbound, outbound, or customers",
  },
];

interface TimelineCardProps {
  entry: TimelineEntry;
  onViewChat?: (entry: TimelineEntry) => void;
}

interface TooltipPayload {
  name: string;
  value: number;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

interface CustomFunnelTooltipProps {
  active?: boolean;
  payload?: { payload: { name: string; value: number }; color: string }[];
}

export default function OverviewCharts({ filters, onSegmentClick }) {
  const { theme } = useTheme();
  const [chartViews, setChartViews] = useState({
    leadsOverTime: "line",
    interactionsOverTime: "line",
    leadQuality: "bar",
    engagementFunnel: "funnel",
    interactionsToConvert: "bar",
    timeToConvert: "bar",
    sourceBreakdown: "pie",
  });
  const [agentFilter, setAgentFilter] = useState({
    leadQuality: "chat",
    interactionsToConvert: "both",
  });
  const [selectedContact, setSelectedContact] = useState<Lead | null>(null);
  const cardClass = `rounded-xl p-6 border shadow transition-all duration-300 bg-card text-card-foreground`;
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`p-3 rounded-lg border shadow-lg ${
            theme === "dark"
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          <div className="font-medium">{label}</div>
          {payload.map((entry, index) => (
            <div key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  const CustomFunnelTooltip = ({
    active,
    payload,
  }: CustomFunnelTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className={`p-3 rounded-lg border shadow-lg ${
            theme === "dark"
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          <div className="font-medium">{data.name}</div>
          <div className="text-sm" style={{ color: payload[0].color }}>
            Count: {data.value.toLocaleString()}
          </div>
        </div>
      );
    }
    return null;
  };
  const getChartTypeOptions = (chartKey: string) => {
    const optionMap = {
      leadsOverTime: [
        {
          value: "line",
          label: "Line Chart",
        },
        {
          value: "area",
          label: "Area Chart",
        },
        {
          value: "bar",
          label: "Bar Chart",
        },
        {
          value: "combo",
          label: "Combo Chart",
        },
      ],
      interactionsOverTime: [
        {
          value: "line",
          label: "Line Chart",
        },
        {
          value: "bar",
          label: "Bar Chart",
        },
        {
          value: "area",
          label: "Area Chart",
        },
        {
          value: "combo",
          label: "Combo Chart",
        },
      ],
      leadQuality: [
        {
          value: "bar",
          label: "Bar Chart",
        },
        {
          value: "line",
          label: "Line Chart",
        },
        {
          value: "pie",
          label: "Pie Chart",
        },
        {
          value: "donut",
          label: "Donut Chart",
        },
      ],
      engagementFunnel: [
        {
          value: "funnel",
          label: "Funnel Chart",
        },
        {
          value: "bar",
          label: "Bar Chart",
        },
        {
          value: "pie",
          label: "Pie Chart",
        },
        {
          value: "line",
          label: "Line Chart",
        },
      ],
      interactionsToConvert: [
        {
          value: "bar",
          label: "Bar Chart",
        },
        {
          value: "line",
          label: "Line Chart",
        },
        {
          value: "area",
          label: "Area Chart",
        },
        {
          value: "pie",
          label: "Pie Chart",
        },
      ],
      timeToConvert: [
        {
          value: "bar",
          label: "Bar Chart",
        },
        {
          value: "line",
          label: "Line Chart",
        },
        {
          value: "area",
          label: "Area Chart",
        },
        {
          value: "pie",
          label: "Pie Chart",
        },
      ],
      sourceBreakdown: [
        {
          value: "pie",
          label: "Pie Chart",
        },
        {
          value: "donut",
          label: "Donut Chart",
        },
        {
          value: "bar",
          label: "Bar Chart",
        },
        {
          value: "line",
          label: "Line Chart",
        },
      ],
    };
    return optionMap[chartKey] || [];
  };
  type ChartData = Record<string, unknown>;
  const renderChart = (
    chartType: string,
    data: ChartData[],
    chartKey: string
  ) => {
    const filter = agentFilter[chartKey] || "both";
    switch (chartType) {
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
            />
            <XAxis
              dataKey={
                chartKey === "interactionsToConvert"
                  ? "interactions"
                  : chartKey === "timeToConvert"
                  ? "period"
                  : "date"
              }
              stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
              tick={{
                fontSize: 12,
              }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
              tick={{
                fontSize: 12,
              }}
              width={60}
              label={{
                value:
                  chartKey === "leadQuality"
                    ? "Lead Count"
                    : chartKey === "interactionsToConvert"
                    ? "Number of Leads"
                    : "Count",
                angle: -90,
                position: "insideLeft",
                offset: -25,
              }}
            />
            <ReTooltip content={<CustomTooltip />} />
            <Legend />
            {chartKey === "leadsOverTime" && (
              <>
                <Line
                  type="monotone"
                  dataKey="chatLeads"
                  stroke={COLORS[0]}
                  strokeWidth={3}
                  name="Chat Leads"
                />
                <Line
                  type="monotone"
                  dataKey="callLeads"
                  stroke={COLORS[1]}
                  strokeWidth={3}
                  name="Call Leads"
                />
              </>
            )}
            {chartKey === "interactionsOverTime" && (
              <>
                <Line
                  type="monotone"
                  dataKey="chat"
                  stroke={COLORS[0]}
                  strokeWidth={3}
                  name="Chat"
                />
                <Line
                  type="monotone"
                  dataKey="call"
                  stroke={COLORS[1]}
                  strokeWidth={3}
                  name="Call"
                />
              </>
            )}
            {chartKey === "leadQuality" && (
              <>
                {filter === "chat" && (
                  <Line
                    type="monotone"
                    dataKey="chatCount"
                    stroke={COLORS[0]}
                    strokeWidth={3}
                    name="Chat Leads"
                  />
                )}
              </>
            )}
          </LineChart>
        );
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
            />
            <XAxis
              dataKey={
                chartKey === "interactionsToConvert"
                  ? "interactions"
                  : chartKey === "timeToConvert"
                  ? "period"
                  : "date"
              }
              stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
              tick={{
                fontSize: 12,
              }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
              tick={{
                fontSize: 12,
              }}
              width={60}
              label={{
                value:
                  chartKey === "leadQuality"
                    ? "Lead Count"
                    : chartKey === "interactionsToConvert"
                    ? "Number of Leads"
                    : "Count",
                angle: -90,
                position: "insideLeft",
                offset: -25,
              }}
            />
            <ReTooltip content={<CustomTooltip />} />
            <Legend />
            {chartKey === "leadsOverTime" && (
              <>
                <Area
                  type="monotone"
                  dataKey="chatLeads"
                  stackId="1"
                  stroke={COLORS[0]}
                  fill={COLORS[0]}
                />
                <Area
                  type="monotone"
                  dataKey="callLeads"
                  stackId="1"
                  stroke={COLORS[1]}
                  fill={COLORS[1]}
                />
              </>
            )}
            {chartKey === "interactionsOverTime" && (
              <>
                <Area
                  type="monotone"
                  dataKey="chat"
                  stackId="1"
                  stroke={COLORS[0]}
                  fill={COLORS[0]}
                />
                <Area
                  type="monotone"
                  dataKey="call"
                  stackId="1"
                  stroke={COLORS[1]}
                  fill={COLORS[1]}
                />
              </>
            )}
          </AreaChart>
        );
      case "bar": {
        console.log("BarChart data:", data, "chartKey:", chartKey);
        return (
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
            />
            <XAxis
              dataKey={
                chartKey === "interactionsToConvert"
                  ? "interactions"
                  : chartKey === "timeToConvert"
                  ? "period"
                  : chartKey === "leadQuality"
                  ? "name"
                  : "date"
              }
              stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
              tick={{
                fontSize: 12,
              }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={80}
              label={{
                value:
                  chartKey === "leadQuality"
                    ? ""
                    : chartKey === "interactionsToConvert"
                    ? ""
                    : "",
                position: "insideBottom",
                offset: -25,
              }}
            />
            <YAxis
              stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
              tick={{
                fontSize: 12,
              }}
              width={60}
              label={{
                value:
                  chartKey === "leadQuality"
                    ? "Lead Count"
                    : chartKey === "interactionsToConvert"
                    ? "Number of Leads"
                    : "Count",
                angle: -90,
                position: "insideLeft",
                offset: -25,
              }}
            />
            <ReTooltip content={<CustomTooltip />} />
            <Legend />
            {/* Always show both bars for debugging */}
            {chartKey === "interactionsToConvert" && (
              <>
                <Bar dataKey="chatCount" fill={COLORS[0]} name="Chat" />
                <Bar dataKey="callCount" fill={COLORS[1]} name="Call" />
              </>
            )}
            {chartKey === "timeToConvert" && (
              <Bar dataKey="count" fill={COLORS[0]} />
            )}
            {chartKey === "leadQuality" && (
              <>
                <Bar dataKey="chatCount" fill={COLORS[0]} name="Chat Leads" />
                <Bar dataKey="callCount" fill={COLORS[1]} name="Call Leads" />
              </>
            )}
            {chartKey === "engagementFunnel" && (
              <Bar dataKey="value" fill={COLORS[0]} />
            )}
          </BarChart>
        );
      }
      case "pie":
        const pieData =
          chartKey === "leadQuality"
            ? filter === "chat"
              ? leadQualityData.map((d) => ({
                  name: d.name,
                  value: d.chatCount,
                  color: d.color,
                }))
              : leadQualityData.map((d) => ({
                  name: d.name,
                  value: d.chatCount + d.callCount,
                  color: d.color,
                }))
            : data;
        return (
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              onClick={onSegmentClick}
              label
            >
              {pieData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ReTooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" />
          </PieChart>
        );
      case "donut":
        const donutData =
          chartKey === "leadQuality"
            ? filter === "chat"
              ? leadQualityData.map((d) => ({
                  name: d.name,
                  value: d.chatCount,
                  color: d.color,
                }))
              : leadQualityData.map((d) => ({
                  name: d.name,
                  value: d.chatCount + d.callCount,
                  color: d.color,
                }))
            : data;
        return (
          <PieChart>
            <Pie
              data={donutData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              onClick={onSegmentClick}
              label
            >
              {donutData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ReTooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" />
          </PieChart>
        );
      case "funnel":
        return (
          <ResponsiveContainer width="100%" height={280}>
            <FunnelChart>
              <Funnel
                dataKey="value"
                data={data}
                isAnimationActive
                width="100%"
              >
                <LabelList
                  position="center"
                  fill="#fff"
                  stroke="none"
                  dataKey="name"
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                />
              </Funnel>
              <ReTooltip content={<CustomFunnelTooltip />} />
            </FunnelChart>
          </ResponsiveContainer>
        );
      case "combo": {
        console.log("ComboChart data:", data, "chartKey:", chartKey);
        return (
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
            />
            <XAxis
              dataKey="date"
              stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
              tick={{
                fontSize: 12,
              }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
              tick={{
                fontSize: 12,
              }}
              width={60}
            />
            <ReTooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="total" fill={COLORS[2]} name="Total" />
            <Line
              type="monotone"
              dataKey="chatLeads"
              stroke={COLORS[0]}
              strokeWidth={3}
              name="Chat Trend"
            />
            <Line
              type="monotone"
              dataKey="callLeads"
              stroke={COLORS[1]}
              strokeWidth={3}
              name="Call Trend"
            />
          </LineChart>
        );
      }
      default:
        return null;
    }
  };
  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Leads Over Time */}
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="font-bold">{chartInfo[0].title}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={16}
                    className="text-muted-foreground cursor-help"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  {chartInfo[0].description}
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <select
                value={chartViews.leadsOverTime}
                onChange={(e) =>
                  setChartViews((prev) => ({
                    ...prev,
                    leadsOverTime: e.target.value,
                  }))
                }
                className="appearance-none bg-background border rounded px-3 py-1 pr-8 text-sm border-slate-600"
              >
                {getChartTypeOptions("leadsOverTime").map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            {renderChart(
              chartViews.leadsOverTime,
              leadsOverTimeData,
              "leadsOverTime"
            )}
          </ResponsiveContainer>
        </div>

        {/* Total Interactions Over Time */}
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="font-bold">{chartInfo[1].title}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={16}
                    className="text-muted-foreground cursor-help"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  {chartInfo[1].description}
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <select
                value={chartViews.interactionsOverTime}
                onChange={(e) =>
                  setChartViews((prev) => ({
                    ...prev,
                    interactionsOverTime: e.target.value,
                  }))
                }
                className="appearance-none bg-background border rounded px-3 py-1 pr-8 text-sm border-slate-600"
              >
                {getChartTypeOptions("interactionsOverTime").map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            {renderChart(
              chartViews.interactionsOverTime,
              interactionsOverTimeData,
              "interactionsOverTime"
            )}
          </ResponsiveContainer>
        </div>

        {/* Lead Quality Distribution */}
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="font-bold">{chartInfo[2].title}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={16}
                    className="text-muted-foreground cursor-help"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  {chartInfo[2].description}
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <ToggleGroup
                type="single"
                value={agentFilter.leadQuality}
                onValueChange={(value) =>
                  value &&
                  setAgentFilter((prev) => ({
                    ...prev,
                    leadQuality: value,
                  }))
                }
                className="bg-muted p-1 rounded-lg"
              ></ToggleGroup>
              <div className="relative">
                <select
                  value={chartViews.leadQuality}
                  onChange={(e) =>
                    setChartViews((prev) => ({
                      ...prev,
                      leadQuality: e.target.value,
                    }))
                  }
                  className="appearance-none bg-background border rounded px-3 py-1 pr-8 text-sm border-slate-600"
                >
                  {getChartTypeOptions("leadQuality").map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            {renderChart(
              chartViews.leadQuality,
              leadQualityData,
              "leadQuality"
            )}
          </ResponsiveContainer>
        </div>

        {/* Engagement Funnel */}
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="font-bold">{chartInfo[3].title}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={16}
                    className="text-muted-foreground cursor-help"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  {chartInfo[3].description}
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <select
                value={chartViews.engagementFunnel}
                onChange={(e) =>
                  setChartViews((prev) => ({
                    ...prev,
                    engagementFunnel: e.target.value,
                  }))
                }
                className="appearance-none bg-background border rounded px-3 py-1 pr-8 text-sm border-slate-600"
              >
                {getChartTypeOptions("engagementFunnel").map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          <div className="w-full h-80">
            {renderChart(
              chartViews.engagementFunnel,
              engagementFunnelData,
              "engagementFunnel"
            )}
          </div>
        </div>

        {/* Avg. Interactions to Convert */}
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="font-bold">{chartInfo[4].title}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={16}
                    className="text-muted-foreground cursor-help"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  {chartInfo[4].description}
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={chartViews.interactionsToConvert}
                  onChange={(e) =>
                    setChartViews((prev) => ({
                      ...prev,
                      interactionsToConvert: e.target.value,
                    }))
                  }
                  className="appearance-none bg-background border rounded px-3 py-1 pr-8 text-sm border-slate-600"
                >
                  {getChartTypeOptions("interactionsToConvert").map(
                    (option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    )
                  )}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            {renderChart(
              chartViews.interactionsToConvert,
              interactionsToConvertData,
              "interactionsToConvert"
            )}
          </ResponsiveContainer>
        </div>

        {/* Avg. Time to Convert a Lead */}
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="font-bold">{chartInfo[5].title}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={16}
                    className="text-muted-foreground cursor-help"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  {chartInfo[5].description}
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <select
                value={chartViews.timeToConvert}
                onChange={(e) =>
                  setChartViews((prev) => ({
                    ...prev,
                    timeToConvert: e.target.value,
                  }))
                }
                className="appearance-none bg-background border rounded px-3 py-1 pr-8 text-sm border-slate-600"
              >
                {getChartTypeOptions("timeToConvert").map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            {renderChart(
              chartViews.timeToConvert,
              timeToConvertData,
              "timeToConvert"
            )}
          </ResponsiveContainer>
        </div>

        {/* Source Breakdown */}
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold">{chartInfo[6].title}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={16}
                    className="text-muted-foreground cursor-help flex-shrink-0"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  {chartInfo[6].description}
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <select
                value={chartViews.sourceBreakdown}
                onChange={(e) =>
                  setChartViews((prev) => ({
                    ...prev,
                    sourceBreakdown: e.target.value,
                  }))
                }
                className="appearance-none bg-background border rounded px-3 py-1 pr-8 text-sm border-slate-600"
              >
                {getChartTypeOptions("sourceBreakdown").map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            {renderChart(
              chartViews.sourceBreakdown,
              sourceBreakdownData,
              "sourceBreakdown"
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </TooltipProvider>
  );
}
