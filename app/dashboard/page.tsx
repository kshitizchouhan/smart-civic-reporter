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

export default async function UserDashboard() {
  // ✅ Use currentUser (no null string issue)
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  await connectDB();

  const issues = await Issue.find({ userId: user.id })
    .sort({ createdAt: -1 })
    .lean<IssueType[]>();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        My Reported Issues
      </h1>

      {issues.length === 0 && (
        <p className="text-gray-500">
          You have not reported any issues yet.
        </p>
      )}

      <div className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="border rounded p-4"
          >
            <p className="font-semibold">
               {issue.issueType}
            </p>

            <p className="text-sm text-gray-600">
              {issue.description}
            </p>

            <p className="text-xs mt-1">
              Status:{" "}
              <span className="font-medium">
                {issue.status}
              </span>
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {new Date(issue.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
          