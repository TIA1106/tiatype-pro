import { NextResponse } from 'next/server';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function POST(req) {
  try {
    const { input } = await req.json();

    const model = new ChatOpenAI({
      temperature: 0.5,
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
      new SystemMessage("Extract 5 to 10 relevant keywords from the following blog post. Return them as a comma-separated list. Do not explain anything."),
      new HumanMessage(input),
    ];

    const res = await model.invoke(messages);

    const cleaned = res.content.trim().replace(/^"|"$/g, '');
    const keywordArray = cleaned.split(',').map(k => k.trim());

    console.log("🔑 Keywords Returned:", keywordArray);

    return NextResponse.json({ keywords: keywordArray });

  } catch (err) {
    console.error("❌ Keyword Extraction Failed:", err);
    return NextResponse.json({ error: "Keyword generation failed" }, { status: 500 });
  }
}
