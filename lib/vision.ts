import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

export async function detectIssueFromImage(imageBase64: string) {
  console.log("📸 VISION API CALLED");

  const [result] = await client.labelDetection({
    image: { content: imageBase64 },
  });

  console.log("🧠 RAW LABELS:", result.labelAnnotations);

  return "VisionTestOK";
}
