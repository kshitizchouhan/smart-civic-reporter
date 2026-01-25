import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function detectIssueWithOpenAI(imageBase64: string) {
  console.log("🧠 OPENAI VISION CALLED");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Identify the civic issue in this image.
Reply with ONLY ONE WORD from:
Pothole, Garbage, Streetlight, Other.`,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${imageBase64}`,
            },
          },
        ],
      },
    ],
    max_tokens: 10,
  });

  const result =
    response.choices[0]?.message?.content?.trim() || "Other";

  console.log("✅ OPENAI RESULT:", result);

  return result;
}
