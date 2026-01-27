import { connectDB } from "@/lib/db";
import Issue from "@/app/model/Issue";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// ✅ Strong typing
type IssueType = {
  _id: string;
  description: string;
  issueType: string;
  status: string;
  createdAt: Date;
};

export default async function AdminPage() {
  // ✅ Get logged-in user
  const user = await currentUser();

  // ✅ Admin guard
  if (!user || user.publicMetadata.role !== "admin") {
    redirect("/unauthorized");
  }

  // ✅ Connect DB only after authorization
  await connectDB();

  const issues = (await Issue.find()
    .sort({ createdAt: -1 })
    .lean()) as IssueType[];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{issue.issueType}</p>
              <p className="text-sm text-gray-600">
                {issue.description}
              </p>
              <p className="text-xs text-gray-500">
                Status: {issue.status}
              </p>
            </div>

            <form
              action={`/api/admin/update-status?id=${issue._id}`}
              method="POST"
            >
              <select
                name="status"
                defaultValue={issue.status}
                className="border p-1 mr-2"
              >
                <option>Submitted</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>.

              <button className="bg-blue-600 text-white px-3 py-1 rounded">
                Update
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
