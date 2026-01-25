"use client"

import { useState } from "react";
import { IssueCard } from "./issue-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const mockIssues = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
    category: "Garbage" as const,
    area: "Sector 17, Chandigarh",
    daysAgo: 2,
    status: "Pending" as const,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400&h=300&fit=crop",
    category: "Road" as const,
    area: "MG Road, Bangalore",
    daysAgo: 5,
    status: "In Progress" as const,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    category: "Light" as const,
    area: "Connaught Place, Delhi",
    daysAgo: 1,
    status: "Resolved" as const,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&h=300&fit=crop",
    category: "Water" as const,
    area: "Andheri West, Mumbai",
    daysAgo: 3,
    status: "Pending" as const,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=400&h=300&fit=crop",
    category: "Road" as const,
    area: "Salt Lake, Kolkata",
    daysAgo: 7,
    status: "In Progress" as const,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1495556650867-99590cea3657?w=400&h=300&fit=crop",
    category: "Garbage" as const,
    area: "Koramangala, Bangalore",
    daysAgo: 0,
    status: "Pending" as const,
  },
];

export function IssuesWall() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredIssues = mockIssues.filter((issue) => {
    const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-500  to-emerald-400 bg-clip-text text-transparent">
              🧱 Public Issues Wall
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time civic issues reported by citizens. Track progress and stay informed.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-45 bg-card/50 border-border/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Garbage">🗑️ Garbage</SelectItem>
              <SelectItem value="Road">🛣️ Road</SelectItem>
              <SelectItem value="Light">💡 Light</SelectItem>
              <SelectItem value="Water">💧 Water</SelectItem>
              <SelectItem value="Other">📦 Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-45 bg-card/50 border-border/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">🔴 Pending</SelectItem>
              <SelectItem value="In Progress">🔵 In Progress</SelectItem>
              <SelectItem value="Resolved">🟢 Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <IssueCard key={issue.id} {...issue} />
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No issues found matching your filters.
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="gradient" size="lg" className="group">
            View All Issues
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
