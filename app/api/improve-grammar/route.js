import { NextResponse } from 'next/server';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function POST(req) {
  try {
    const { input } = await req.json();

    const messages = [
      new SystemMessage("Fix the grammar, spelling, and tone of the following text. Only return the corrected version."),
      new HumanMessage(input)
    ];
    const model = new ChatOpenAI({
      temperature: 0.3,
      modelName: 'mistralai/mistral-7b-instruct',
      configuration: {
        baseURL: 'https://openrouter.ai/api/v1',
        defaultHeaders: {
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'TiaType Grammar Fixer',
        },
        apiKey: process.env.OPENROUTER_API_KEY,
      },
    });

    const res = await model.invoke(messages);
    return NextResponse.json({ fixed: res.content });

  } catch (err) {
    console.error("Grammar Fix Error:", err);
    return NextResponse.json({ error: "AI currently unavailable. Please try again later." }, { status: 500 });
  }
}
