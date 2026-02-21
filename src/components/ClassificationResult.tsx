import { Leaf, Recycle, Trash2, Loader2 } from "lucide-react";

interface ClassificationResultProps {
  label: string | null;
  confidence: number | null;
  subType: string | null;
  isLoading: boolean;
}

const categoryConfig = {
  Biodegradable: {
    icon: Leaf,
    colorClass: "text-biodegradable",
    bgClass: "bg-biodegradable-bg",
    borderClass: "border-biodegradable/30",
    tip: "Compost or dispose in organic waste bins.",
  },
  Recyclable: {
    icon: Recycle,
    colorClass: "text-recyclable",
    bgClass: "bg-recyclable-bg",
    borderClass: "border-recyclable/30",
    tip: "Clean and place in recycling bins.",
  },
  "Non-Biodegradable": {
    icon: Trash2,
    colorClass: "text-non-biodegradable",
    bgClass: "bg-non-biodegradable-bg",
    borderClass: "border-non-biodegradable/30",
    tip: "Dispose responsibly at designated collection points.",
  },
};

const ClassificationResult = ({ label, confidence, subType, isLoading }: ClassificationResultProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Analyzing waste...</p>
      </div>
    );
  }

  if (!label || confidence === null) return null;

  const config = categoryConfig[label as keyof typeof categoryConfig];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className={`rounded-2xl border ${config.borderClass} ${config.bgClass} p-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4`}>
      <div className="flex items-center gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${config.bgClass} border ${config.borderClass}`}>
          <Icon className={`h-7 w-7 ${config.colorClass}`} />
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-heading font-bold ${config.colorClass}`}>{label}</h3>
          {subType && subType !== "General" && (
            <span className="text-xs font-medium text-muted-foreground bg-muted rounded-full px-2 py-0.5 inline-block mt-0.5">
              {subType}
            </span>
          )}
          <p className="text-sm text-muted-foreground mt-0.5">{config.tip}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="text-muted-foreground">Confidence</span>
          <span className={`font-semibold ${config.colorClass}`}>{confidence.toFixed(1)}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              label === "Biodegradable" ? "bg-biodegradable" :
              label === "Recyclable" ? "bg-recyclable" : "bg-non-biodegradable"
            }`}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClassificationResult;
