import { useTheme } from "@/components/theme/ThemeProvider";
import { ArrowUp, ArrowDown, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const kpis = [
  {
    label: "Total Unique Leads",
    value: 1738,
    delta: +8.2,
    compare: "vs last week",
    description:
      "Total number of new leads captured during the selected date range.",
  },
  {
    label: "Total Interactions",
    value: 2456,
    delta: +12.5,
    compare: "vs last week",
    description: "Sum of all chat and call-based interactions across agents.",
  },
  {
    label: "Leads Converted",
    value: 82,
    percentage: 4.7,
    delta: +3.4,
    compare: "vs last week",
    description: "Number and percentage of leads who became paying customers.",
  },
  {
    label: "Avg. Conversations per Hour",
    value: 6.3,
    delta: +0.8,
    compare: "vs last week",
    description: "Average number of interactions handled per hour by agents.",
    efficiency: "high",
  },
  {
    label: "Avg. Time to Convert a Lead",
    value: "1.8 days",
    delta: -0.2,
    compare: "vs last week",
    description:
      "Average time taken from first interaction to lead conversion.",
  },
  {
    label: "Avg. No. of Interactions to Convert",
    value: 4.6,
    delta: -0.3,
    compare: "vs last week",
    description:
      "Average number of chat/call interactions needed to convert a lead.",
  },
];

export default function OverviewKPIs({ filters }) {
  const { theme } = useTheme();

  const getEfficiencyColor = (efficiency) => {
    switch (efficiency) {
      case "high":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <TooltipProvider>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {kpis.map((kpi, idx) => {
          const isPositive = typeof kpi.delta === "number" && kpi.delta > 0;
          const isNegative = typeof kpi.delta === "number" && kpi.delta < 0;

          return (
            <div
              key={kpi.label}
              className={`rounded-lg p-4 flex flex-col shadow border
                bg-card border-border text-card-foreground
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  {kpi.label}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>{kpi.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">
                  {kpi.value}
                </span>
                {kpi.percentage && (
                  <span className="text-sm text-muted-foreground">
                    ({kpi.percentage}%)
                  </span>
                )}
              </div>

              <div className="flex items-center text-xs mt-1">
                {isPositive && (
                  <ArrowUp className="w-4 h-4 mr-1 text-emerald-500" />
                )}
                {isNegative && (
                  <ArrowDown className="w-4 h-4 mr-1 text-red-500" />
                )}
                <span
                  className={
                    isPositive
                      ? "text-emerald-500 font-medium"
                      : isNegative
                      ? "text-red-500 font-medium"
                      : "text-muted-foreground font-medium"
                  }
                >
                  {kpi.delta > 0 && "+"}
                  {kpi.delta === 0 ? "0.0" : Math.abs(kpi.delta)}
                  {typeof kpi.delta === "number" && "%"}
                </span>
                <span className="ml-2 text-muted-foreground">
                  {kpi.compare}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
