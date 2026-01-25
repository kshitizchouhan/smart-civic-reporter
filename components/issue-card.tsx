import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface IssueCardProps {
  image: string;
  category: "Garbage" | "Road" | "Light" | "Water" | "Other";
  area: string;
  daysAgo: number;
  status: "Pending" | "In Progress" | "Resolved";
}

const categoryColors: Record<string, string> = {
  Garbage: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Road: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Light: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Water: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Other: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const statusColors: Record<string, string> = {
  Pending: "bg-red-500/20 text-red-400 border-red-500/30",
  "In Progress": "bg-sky-500/20 text-sky-400 border-sky-500/30",
  Resolved: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export function IssueCard({ image, category, area, daysAgo, status }: IssueCardProps) {
  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={`${category} issue in ${area}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className={cn("border", categoryColors[category])}>
            {category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className={cn("border", statusColors[status])}>
            {status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{area}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4 text-accent" />
          <span className="text-sm">
            Reported {daysAgo === 0 ? "today" : daysAgo === 1 ? "yesterday" : `${daysAgo} days ago`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
