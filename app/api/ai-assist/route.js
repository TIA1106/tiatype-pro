import { NextResponse } from 'next/server';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function POST(req) {
  try {
    const { input, type } = await req.json();

    let systemPrompt = "";

    switch (type) {
      case "rephrase":
        systemPrompt = "Rephrase the following text to make it clearer and more polished, without changing the meaning. Only return the revised version.";
        break;
      case "friendly":
        systemPrompt = "Make the following blog content sound more friendly, warm, and conversational. Return only the updated text.";
        break;
      case "formal":
        systemPrompt = "Rewrite the following text in a more formal and professional tone. Return only the modified version.";
        break;
      case "title":
        systemPrompt = "Suggest a short and catchy blog post title for the content below. Return only the title.";
        break;
      case "next":
        systemPrompt = "Continue writing the following blog post in a natural and engaging style. Add 2–3 sentences to extend it.";
        break;
      case "summary":
        systemPrompt = "Summarize the following blog content into 2–3 concise sentences. Return only the summary.";
        break;
      case "keywords":
        systemPrompt = "Extract 5–10 relevant SEO keywords or tags from the following blog post. Return them as a comma-separated list.";
        break;
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(input)
    ];

    const model = new ChatOpenAI({
      temperature: 0.7,
      modelName: "mistralai/mistral-7b-instruct",
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "TiaType Assistant",
        },
      },
      openAIApiKey: process.env.OPENROUTER_API_KEY,
    });

    const res = await model.invoke(messages);

    return NextResponse.json({ result: res.content });
  } catch (err) {
    console.error("AI Assist Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
