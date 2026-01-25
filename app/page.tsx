import { Footer } from "@/components/footer";
import { GlowingBadge } from "@/components/glowing-badge";
import { Navbar } from "@/components/navbar";
import { IssuesWall } from "@/components/public-issue-wall";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WhyCivicFix } from "@/components/why-civic-fix";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO SECTION WITH GRADIENT */}
      <section className="relative overflow-hidden min-h-screen flex justify-center items-center ">
        <div className="absolute inset-0 bg-linear-to-br  from-indigo-500/10 via-sky-500/10 to-emerald-500/10" />

        <div className="relative container mx-auto px-4 py-24 text-center justify-center items-center">

          <GlowingBadge  className=" " >
            <div >AI Powered Civic Platform</div>
          </GlowingBadge>
          


          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Report Civic Issues <br /> Easily & Transparently
          </h2>

          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Upload an image, let AI identify the issue, and track its resolution
            in real-time. Making cities smarter and governance accountable.
          </p>

          <div className="mt-8 flex justify-center flex-wrap gap-4">

            {/* ✅ FIX: Logged-in users go DIRECTLY to /report */}




            <Link href="/sign-in">
              <Button
                variant="gradient"
                size="lg"
                className="bg-linear-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700"
              >
                Get Started
              </Button>
            </Link>


            {/* Public page */}
            <Link href="/transparency">
              <Button size="lg" variant="outline">
                View Resolved Issues
              </Button>
            </Link>

          </div>
        </div>
      </section>

      <Separator />

      {/* FEATURES SECTION */}
      <section className="container mx-auto  py-20 px-20">
        <h3 className="text-3xl font-semibold text-center mb-12">
          Key Features
        </h3>
        <div className="grid gap-6 md:grid-cols-3">

          <Card className="hover:shadow-md transition gap-y-4 hover:border-blue-500 ">
            <CardContent className="p-6 text-center">
              <h4 className="font-semibold mb-2 text-indigo-600">
                AI Issue Detection
              </h4>
              <p className="text-sm text-muted-foreground">
                Upload an image and AI automatically identifies
                the civic problem.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition gap-y-4 hover:border-blue-500 ">
            <CardContent className="p-6 text-center">
              <h4 className="font-semibold mb-2 text-sky-600">
                Auto Geo-Tagging
              </h4>
              <p className="text-sm text-muted-foreground">
                Issues are mapped instantly using real-time
                location capture.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition gap-y-4 hover:border-blue-500 ">
            <CardContent className="p-6 text-center">
              <h4 className="font-semibold mb-2 text-emerald-600">
                Transparent Tracking
              </h4>
              <p className="text-sm text-muted-foreground">
                Track complaints from submission to resolution
                with full visibility.
              </p>
            </CardContent>
          </Card>

        </div>
      </section>

      <Separator />

      <WhyCivicFix />

      <Separator />

      <IssuesWall />

      <Footer />


    </main>
  );
}
