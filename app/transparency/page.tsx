import { connectDB } from "@/lib/db";
import Issue from "@/app/model/Issue";

type IssueType = {
  _id: string;
  description: string;
  issueType: string;
  status: string;
  createdAt: Date;
};

export default async function TransparencyPage() {
  await connectDB();

  const resolvedIssues = (await Issue.find({ status: "Resolved" })
    .sort({ createdAt: -1 })
    .lean()) as IssueType[];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 ">
        ✅ Resolved Civic Issues (Transparency Wall)
      </h1>

      {resolvedIssues.length === 0 && (
        <p className="text-gray-500">No resolved issues yet.</p>
      )}

      <div className="space-y-4">
        {resolvedIssues.map((issue) => (
          <div
            key={issue._id}
            className="border rounded p-4 bg-green-50"
          >
            <p className="font-semibold text-green-700">
              {issue.issueType}
            </p>
            <p className="text-sm text-gray-700">
              {issue.description}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Resolved on{" "}
              {new Date(issue.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
