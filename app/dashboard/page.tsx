

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, CheckCircle2, LoaderPinwheel, FileText } from "lucide-react";
import { connectDB } from "@/lib/db";
import Issue from "@/app/model/Issue";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type IssueType = {
  _id: string;
  description: string;
  issueType: string;
  status: string;
  createdAt: Date;
};

const getStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case "in-progress":
      return {
        label: "In Progress",
        icon: LoaderPinwheel,
        className: "bg-yellow-50 text-yellow-600 border-yellow-200",
      };
    case "resolved":
      return {
        label: "Resolved",
        icon: CheckCircle2,
        className: "bg-green-50 text-green-600 border-green-200",
      };
    case "submitted":
      return {
        label: "Submitted",
        icon: FileText,
        className: "bg-blue-50 text-blue-600 border-blue-200",
      };
    default:
      return {
        label: status,
        icon: AlertCircle,
        className: "bg-muted text-muted-foreground",
      };
  }
};

const formatDate = (dateString: Date | string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

export default async function UserDashboard() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  await connectDB();
  const issues = await Issue.find({ userId: user.id })
    .sort({ createdAt: -1 })
    .lean<IssueType[]>();



  const formattedIssues = issues.map(issue => ({
    ...issue,
    _id: issue._id.toString(),
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-linear-to-b from-blue-100 to-blue-50 ">


        <div className="  max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mt-15 mb-8 ">
            <div className="flex items-center gap-3 mb-2">
              <div className=" rounded-xl bg-blue-500/10 p-3 ">
                <FileText className="h-6 w-6 bg-white-100  text-blue-500" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                My Reported Issues
              </h1>
            </div>
            <p className="text-muted-foreground mt-1">
              Track and manage all your submitted issues in one place
            </p>
          </div>

          {/* Empty State */}
          {formattedIssues.length === 0 && (
            <Card className="border-dashed border-2 border-border">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  No issues reported
                </h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  You haven't reported any issues yet. When you do, they'll appear here.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Issues List */}
          <div className="space-y-4">
            {formattedIssues.map((issue) => {
              const statusConfig = getStatusConfig(issue.status);
              const StatusIcon = statusConfig.icon;

              return (
                <Card
                  key={issue._id}
                  className="group border border-border/50 transition-all duration-200 hover:border-border hover:shadow-md"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground truncate">
                            {issue.issueType}
                          </h3>
                          <Badge
                            variant="outline"
                            className={`${statusConfig.className} border font-medium shrink-0`}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                          {issue.description}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <time dateTime={issue.createdAt.toString()}>
                            {formatDate(issue.createdAt)}
                          </time>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}