import { NextResponse } from 'next/server';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function POST(req) {
  try {
    const { input } = await req.json();

    const model = new ChatOpenAI({
      temperature: 0.4,
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
      new SystemMessage("You're a tone analyzer. Identify the overall tone (e.g., formal, friendly, sad, excited, sarcastic, confident) of the given blog content in one word."),
      new HumanMessage(input),
    ];

    const res = await model.invoke(messages);
    return NextResponse.json({ tone: res.content });

  } catch (err) {
    console.error("❌ Tone Detection Failed:", err);
    return NextResponse.json({ error: "Tone detection failed" }, { status: 500 });
  }
}
