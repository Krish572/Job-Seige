const OpenAi = require("openai");

const openAi = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 10_000, // 10 second max timeout
  maxRetries: 2, // retry max 2 times
});

async function generateAiContext(prompt) {
  try {
    if (!prompt || prompt.length > 2000) {
      throw new Error("Invalid or too long prompt");
    }

    const response = await openAi.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert career coach.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const aiText = response.choices?.[0]?.message?.content || "";

    //Usage logging basic
    console.log("[AI USAGE]", {
      inputLength: prompt.length,
      outputLength: aiText.length,
      timestamp: new Date().toISOString(),
    });

    return aiText;
  } catch (error) {
    console.log(error);
    console.error("[AI ERROR]", error.message);

    // Safe fallback (VERY important)
    return "AI guidance is temporarily unavailable. Please try again later.";
  }
}

module.exports = { generateAiContext };
