"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MapPin, Send, Upload } from "lucide-react";
import { useState } from "react";

export default function ReportPage() {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Location access denied")
    );
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(reader.result?.toString().split(",")[1] || "");
      reader.onerror = reject;
    });

  const submitIssue = async () => {
    if (!image || !description || !location) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      const imageBase64 = await toBase64(image);

      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          location,
          imageBase64,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Detected issue: " + data.issueType);
        setDescription("");
        setLocation(null);
        setImage(null);
      } else {
        alert("Submission failed");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background">
      <div className="overflow-hidden min-h-screen flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl mx-auto mt-12">
          <div className="mb-8 sm:mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold bg-linear-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent mb-3 tracking-tight">
              Report an Issue
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Help improve your community by reporting civic issues
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-3">
              {/* File Upload */}
              <div className="space-y-2 md:col-span-1  flex items-center flex-col">

                <label className="text-sm font-medium text-foreground">
                  Photo Evidence
                </label>
                <div className="relative hover:shadow-md transition hover:border-blue-500">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-border rounded-xl p-6 sm:p-8 text-center hover:border-blue-500 hover:bg-accent/30 transition-all">
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-muted-foreground" />
                    {image ? (
                      <p className="text-xs sm:text-sm text-foreground font-medium wrap-break-words">{image.name}</p>
                    ) : (
                      <>
                        <p className="text-xs sm:text-sm text-foreground font-medium mb-1">
                          Click to upload
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground ml-2 ">
                  Description
                </label>
                <Textarea
                  placeholder="Describe the issue you've observed..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-35 sm:min-h-43 resize-none bg-card border-border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm  lg:text-lg sm:font-medium text-foreground ml-2 ">
                Location
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-sm text-muted-foreground">
                  {location ? `📍 ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Click on Get Location"}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={getLocation}
                  className="gap-2 border-border hover:bg-accent hover:text-accent-foreground w-full sm:w-auto"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Location</span>
                </Button>
              </div>
            </div>

            {/* Submit */}
            <Button
              onClick={submitIssue}
              disabled={loading}
              className="w-full h-12 gap-2 bg-blue-500 hover:bg-blue-500/90 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Report
                </>
              )}
            </Button>
          </div>

          <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6 sm:mt-8">
            Your report helps us build a better community
          </p>
        </div>
      </div>
    </div>
  );
}