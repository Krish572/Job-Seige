const OpenAi = require("openai");

const openAi = new OpenAi({
    apiKey : process.env.OPENAI_API_KEY
})

async function generateAiContext(prompt){
    const response = await openAi.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system", content : "You are an expert career coach." 
            },
            {
                role: "user", content: prompt
            }
        ],
        temperature : 0.7
    });
    return response.choices[0].message.content;
}

module.exports = {generateAiContext};