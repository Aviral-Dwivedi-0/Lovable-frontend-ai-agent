import { useState } from "react";
import {
  Users,
  TrendingUp,
  Target,
  MessageCircle,
  AlertTriangle,
  Calendar,
  Info,
  BarChart2,
  ChevronDown,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  Legend,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/ThemeProvider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import type { TooltipProps } from "recharts";
import { InfoIcon } from "@/components/ui/info-icon";

const CALL_ANALYTICS_COLORS = [
  "#1A6262",
  "#91C499",
  "#E1A940",
  "#FF6700",
  "#a855f7",
];

interface TooltipEntry {
  name: string;
  value: number;
  color?: string;
  [key: string]: unknown;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

interface CustomScatterTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
}

const CallAnalytics = () => {
  const { theme } = useTheme();
  const [chartViews, setChartViews] = useState({
    leadQuality: "pie",
    funnelChart: "funnel",
    intentBudget: "scatter",
    sourceChart: "pie",
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedDateOption, setSelectedDateOption] = useState("30 days");
  const [showCustomRange, setShowCustomRange] = useState(false);
  const dateOptions = [
    "7 days",
    "30 days",
    "90 days",
    "6 months",
    "1 year",
    "Custom range",
  ];
  const handleDateOptionChange = (option: string) => {
    setSelectedDateOption(option);
    if (option === "Custom range") {
      setShowCustomRange(true);
    } else {
      setShowCustomRange(false);
      setDateRange(undefined);
    }
  };
  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      setSelectedDateOption(
        `${format(range.from, "dd MMM yyyy")} - ${format(
          range.to,
          "dd MMM yyyy"
        )}`
      );
      setShowCustomRange(false);
    }
  };
  const kpiData = [
    {
      title: "Total Calls Made",
      value: "1,203",
      change: "+12.5%",
      changeValue: "+45",
      icon: Users,
      positive: true,
      color: "text-blue-400",
    },
    {
      title: "Successful Conversations",
      value: "856",
      change: "+8.2%",
      changeValue: "+68",
      icon: TrendingUp,
      positive: true,
      color: "text-blue-400",
    },
    {
      title: "Call Connection Rate",
      value: "71%",
      change: "+3.8%",
      changeValue: "+5%",
      icon: Target,
      positive: true,
      color: "text-blue-400",
    },
    {
      title: "Avg. Call Duration",
      value: "4m 52s",
      change: "+15s",
      changeValue: "+6%",
      icon: MessageCircle,
      positive: true,
      color: "text-blue-400",
    },
    {
      title: "Call-to-Lead Conversion",
      value: "34%",
      change: "+2.1%",
      changeValue: "+8%",
      icon: MessageCircle,
      positive: true,
      color: "text-blue-400",
    },
    {
      title: "Pending Follow-ups",
      value: "42",
      change: "+8",
      changeValue: "+23%",
      icon: AlertTriangle,
      positive: false,
      color: "text-blue-400",
    },
  ];
  const additionalMetrics = [
    {
      title: "Missed Calls",
      value: "89",
      change: "-12%",
      changeValue: "-15%",
      positive: true,
      icon: Info,
      color: "text-blue-400",
    },
    {
      title: "Demo Scheduled",
      value: "28",
      change: "+18%",
      changeValue: "+42%",
      positive: true,
      icon: Calendar,
      color: "text-blue-400",
    },
    {
      title: "Hot Leads Generated",
      value: "156",
      change: "+25%",
      changeValue: "+31%",
      positive: true,
      icon: BarChart2,
      color: "text-blue-400",
    },
  ];
  const leadQualityData = [
    {
      name: "Hot Lead",
      value: 38,
      color: CALL_ANALYTICS_COLORS[0],
    },
    {
      name: "Warm - Nurture",
      value: 32,
      color: CALL_ANALYTICS_COLORS[1],
    },
    {
      name: "Cold / Low Budget",
      value: 15,
      color: CALL_ANALYTICS_COLORS[2],
    },
    {
      name: "Follow-Up Later",
      value: 10,
      color: CALL_ANALYTICS_COLORS[3],
    },
    {
      name: "Needs Human Help",
      value: 5,
      color: CALL_ANALYTICS_COLORS[4],
    },
  ];
  const funnelData = [
    {
      name: "Total Calls",
      value: 1203,
      fill: CALL_ANALYTICS_COLORS[0],
    },
    {
      name: "Connected",
      value: 856,
      fill: CALL_ANALYTICS_COLORS[1],
    },
    {
      name: "Conversation",
      value: 654,
      fill: CALL_ANALYTICS_COLORS[2],
    },
    {
      name: "Interest Shown",
      value: 423,
      fill: CALL_ANALYTICS_COLORS[3],
    },
    {
      name: "Lead Generated",
      value: 289,
      fill: CALL_ANALYTICS_COLORS[4],
    },
  ];
  const intentBudgetData = [
    {
      intent: 9,
      budget: 8,
      leads: 15,
      name: "Segment 1",
      color: CALL_ANALYTICS_COLORS[0],
    },
    {
      intent: 8,
      budget: 6,
      leads: 20,
      name: "Segment 2",
      color: CALL_ANALYTICS_COLORS[1],
    },
    {
      intent: 7,
      budget: 9,
      leads: 12,
      name: "Segment 3",
      color: CALL_ANALYTICS_COLORS[2],
    },
    {
      intent: 6,
      budget: 7,
      leads: 18,
      name: "Segment 4",
      color: CALL_ANALYTICS_COLORS[3],
    },
    {
      intent: 10,
      budget: 5,
      leads: 8,
      name: "Segment 5",
      color: CALL_ANALYTICS_COLORS[0],
    },
    {
      intent: 5,
      budget: 8,
      leads: 25,
      name: "Segment 6",
      color: CALL_ANALYTICS_COLORS[1],
    },
    {
      intent: 9,
      budget: 10,
      leads: 30,
      name: "Segment 7",
      color: CALL_ANALYTICS_COLORS[2],
    },
  ];
  const sourceChartData = [
    {
      name: "Inbound",
      value: 52,
      color: CALL_ANALYTICS_COLORS[0],
    },
    {
      name: "Outbound",
      value: 48,
      color: CALL_ANALYTICS_COLORS[1],
    },
  ];
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`p-3 rounded-lg border shadow-lg ${
            theme === "dark"
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}
        >
          <p
            className={`font-medium ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {label}
          </p>
          {payload.map((entry: TooltipEntry) => (
            <p
              key={entry.name}
              style={{
                color: entry.color,
              }}
              className="text-sm"
            >
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  const CustomScatterTooltip = ({
    active,
    payload,
  }: CustomScatterTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as {
        name: string;
        intent: number;
        budget: number;
        leads: number;
      };
      return (
        <div
          className={`p-3 rounded-lg border shadow-lg ${
            theme === "dark"
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}
        >
          <p
            className={`font-medium ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {data.name}
          </p>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-slate-300" : "text-gray-600"
            }`}
          >
            Intent: {data.intent}
          </p>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-slate-300" : "text-gray-600"
            }`}
          >
            Budget: {data.budget}
          </p>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-slate-300" : "text-gray-600"
            }`}
          >
            Leads: {data.leads}
          </p>
        </div>
      );
    }
    return null;
  };
  const renderChart = (
    type: string,
    data: unknown[],
    dataKey: string,
    chartType?: string
  ) => {
    if (chartType === "intentBudget") {
      return (
        <ScatterChart
          data={
            data as {
              intent: number;
              budget: number;
              leads: number;
              name: string;
            }[]
          }
          margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
          />
          <XAxis
            dataKey="intent"
            name="Intent"
            stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
            domain={[0, 10]}
            label={{
              value: "Intent Level",
              position: "insideBottom",
              offset: -10,
            }}
          />
          <YAxis
            dataKey="budget"
            name="Budget"
            stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
            domain={[0, 10]}
            label={{
              value: "Budget Level",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip content={<CustomScatterTooltip />} />
          <Scatter dataKey="leads" fill={CALL_ANALYTICS_COLORS[0]} />
        </ScatterChart>
      );
    }
    if (chartType === "funnel") {
      return (
        <FunnelChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <Funnel dataKey="value" data={data} isAnimationActive>
            <LabelList
              position="center"
              fill="#fff"
              stroke="none"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
              }}
            />
          </Funnel>
          <Tooltip content={<CustomTooltip />} />
        </FunnelChart>
      );
    }
    switch (type) {
      case "bar":
        return (
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 60, bottom: 80 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
            />
            <XAxis
              dataKey="month"
              stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
              tick={{ fontSize: 12 }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={dataKey} fill={CALL_ANALYTICS_COLORS[0]} />
          </BarChart>
        );
      case "line":
        return (
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
            />
            <XAxis
              dataKey="month"
              stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke={theme === "dark" ? "#9CA3AF" : "#6b7280"}
              tick={{ fontSize: 12 }}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={CALL_ANALYTICS_COLORS[0]}
              strokeWidth={3}
            />
          </LineChart>
        );
      case "pie":
        return (
          <PieChart margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              outerRadius={100}
              dataKey="value"
              label={({ name, value }: { name: string; value: number }) =>
                `${name} ${value}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={(entry as TooltipEntry).color}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );
      default:
        return null;
    }
  };
  return (
    <div className="space-y-6 min-h-full p-6">
      {/* Global Filters */}
      <div className="bg-transparent">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label
              className={`text-sm mb-2 block ${
                theme === "dark" ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Date Range
            </label>
            <div className="relative">
              <select
                value={selectedDateOption}
                onChange={(e) => handleDateOptionChange(e.target.value)}
                className="appearance-none bg-background border rounded px-3 py-1 pr-8 text-sm border-slate-600 w-full"
              >
                {dateOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>

            <Popover open={showCustomRange} onOpenChange={setShowCustomRange}>
              <PopoverTrigger asChild>
                <div></div>
              </PopoverTrigger>
              <PopoverContent
                className={`w-auto p-0 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-gray-200"
                }`}
                align="start"
              >
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={handleDateRangeSelect}
                  numberOfMonths={2}
                  className={`${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  } pointer-events-auto`}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label
              className={`text-sm mb-2 block ${
                theme === "dark" ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Call Status
            </label>
            <div className="relative">
              <select className="appearance-none bg-background border rounded px-3 py-1 pr-8 text-sm border-slate-600 w-full">
                <option>All Calls</option>
                <option>Connected</option>
                <option>Missed</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
          <div>
            <label
              className={`text-sm mb-2 block ${
                theme === "dark" ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Channel Source
            </label>
            <div className="relative">
              <select className="appearance-none bg-background border rounded px-3 py-1 pr-8 text-sm border-slate-600 w-full">
                <option>All Channels</option>
                <option>Phone</option>
                <option>VoIP</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
          <div>
            <label
              className={`text-sm mb-2 block ${
                theme === "dark" ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Call Type
            </label>
            <div className="relative">
              <select className="appearance-none bg-background border rounded px-3 py-1 pr-8 text-sm border-slate-600 w-full">
                <option>All Types</option>
                <option>Inbound</option>
                <option>Outbound</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4 space-x-4">
          <Button
            variant="outline"
            size="sm"
            className={
              theme === "dark"
                ? "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }
          >
            Reset All
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-2 rounded-lg ${
                    theme === "dark"
                      ? "bg-slate-700/50 group-hover:bg-slate-600/50"
                      : "bg-gray-100 group-hover:bg-gray-200"
                  } transition-colors ${kpi.color}`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-md ${
                      kpi.positive
                        ? "text-green-400 bg-green-500/10"
                        : "text-red-400 bg-red-500/10"
                    }`}
                  >
                    {kpi.positive ? "▲" : "▼"}
                    {kpi.changeValue}
                  </span>
                  <p
                    className={`text-xs mt-1 ${
                      theme === "dark" ? "text-slate-400" : "text-gray-500"
                    }`}
                  >
                    vs last week
                  </p>
                </div>
              </div>
              <h3
                className={`text-sm mb-2 transition-colors ${
                  theme === "dark"
                    ? "text-slate-400 group-hover:text-slate-300"
                    : "text-gray-600 group-hover:text-gray-700"
                }`}
              >
                {kpi.title}
              </h3>
              <p
                className={`text-2xl font-bold transition-colors ${
                  theme === "dark"
                    ? "text-white group-hover:text-blue-200"
                    : "text-gray-900 group-hover:text-blue-600"
                }`}
              >
                {kpi.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {additionalMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`p-2 rounded-lg ${
                    theme === "dark"
                      ? "bg-slate-700/50 group-hover:bg-slate-600/50"
                      : "bg-gray-100 group-hover:bg-gray-200"
                  } transition-colors ${metric.color}`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-md ${
                    metric.positive
                      ? "text-green-400 bg-green-500/10"
                      : "text-red-400 bg-red-500/10"
                  }`}
                >
                  {metric.positive ? "▲" : "▼"}
                  {metric.changeValue}
                </span>
              </div>
              <h3
                className={`text-sm mb-2 transition-colors ${
                  theme === "dark"
                    ? "text-slate-400 group-hover:text-slate-300"
                    : "text-gray-600 group-hover:text-gray-700"
                }`}
              >
                {metric.title}
              </h3>
              <p
                className={`text-2xl font-bold transition-colors ${
                  theme === "dark"
                    ? "text-white group-hover:text-blue-200"
                    : "text-gray-900 group-hover:text-blue-600"
                }`}
              >
                {metric.value}
              </p>
              <p
                className={`text-xs mt-1 ${
                  theme === "dark" ? "text-slate-400" : "text-gray-500"
                }`}
              >
                vs last week
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                Lead Quality Distribution
              </h3>
              <InfoIcon description="Distribution of lead quality based on call outcomes and engagement" />
            </div>
            <div className="relative">
              <select
                value={chartViews.leadQuality}
                onChange={(e) =>
                  setChartViews((prev) => ({
                    ...prev,
                    leadQuality: e.target.value,
                  }))
                }
                className="appearance-none bg-background border border-border rounded px-3 py-1 pr-8 text-sm text-foreground"
              >
                <option value="pie">Pie Chart</option>
                <option value="bar">Bar Chart</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={340}>
            {renderChart(chartViews.leadQuality, leadQualityData, "value")}
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                Funnel Drop-off
              </h3>
              <InfoIcon description="Conversion funnel showing drop-off rates at each stage of the calling process" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={340}>
            {renderChart("funnel", funnelData, "value", "funnel")}
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                Intent vs Budget Heatmap
              </h3>
              <InfoIcon description="Correlation between prospect intent level and budget constraints from call data" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={340}>
            {renderChart("scatter", intentBudgetData, "leads", "intentBudget")}
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                Inbound vs Outbound Source Chart
              </h3>
              <InfoIcon description="Breakdown of leads by inbound calls vs outbound call campaigns" />
            </div>
            <div className="relative">
              <select
                value={chartViews.sourceChart}
                onChange={(e) =>
                  setChartViews((prev) => ({
                    ...prev,
                    sourceChart: e.target.value,
                  }))
                }
                className="appearance-none bg-background border border-border rounded px-3 py-1 pr-8 text-sm text-foreground"
              >
                <option value="pie">Pie Chart</option>
                <option value="bar">Bar Chart</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={340}>
            {renderChart(chartViews.sourceChart, sourceChartData, "value")}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default CallAnalytics;
