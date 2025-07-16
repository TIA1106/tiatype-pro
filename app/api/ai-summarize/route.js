import { NextResponse } from 'next/server';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function POST(req) {
  try {
    const { input } = await req.json();

    const model = new ChatOpenAI({
      temperature: 0.3,
      modelName: 'mistralai/mistral-7b-instruct',
      configuration: {
        baseURL: 'https://openrouter.ai/api/v1',
        defaultHeaders: {
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'TiaType AI Assistant',
        },
        apiKey: process.env.OPENROUTER_API_KEY,
      },
    });

    const messages = [
      new SystemMessage("You are a helpful assistant. Summarize the blog content below in 3-4 concise sentences."),
      new HumanMessage(input),
    ];

    const res = await model.invoke(messages);
    const cleanedSummary = res.content.trim().replace(/^"|"$/g, '');
    console.log("📝 Summary Returned:", cleanedSummary);

    return NextResponse.json({ summary: cleanedSummary });

  } catch (err) {
    console.error("❌ Summarization Failed:", err);
    return NextResponse.json({ error: "Summarization failed" }, { status: 500 });
  }
}
