import { streamText, convertToModelMessages } from 'ai';
// import { google } from '@ai-sdk/google';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { NextResponse } from 'next/server';
// import { generateText } from 'ai';
// import { createDeepSeek } from '@ai-sdk/deepseek';

export async function POST(req: Request) {

  try {
    const body = await req.json();
    // console.log('完整请求体:', body);
    const { messages } = body;

    const provider = messages[messages.length - 1]?.metadata?.provider;
    const model = messages[messages.length - 1]?.metadata?.model.toLowerCase();

    let LLM;

    switch (provider) {
      case 'Google':
        // console.log('触发google');
        LLM = createOpenAICompatible({
          name: model,
          apiKey: process.env.GOOGLE_GIMINI_AI_API_KEY,
          baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai',
        });
        break;
      case 'ZAI':
        // console.log('触发zai');
        LLM = createOpenAICompatible({
          name: model,
          apiKey: process.env.ZAI_AI_API_KEY,
          baseURL: 'https://open.bigmodel.cn/api/coding/paas/v4',
        });
        break;
      case 'Xiaomi':
        // console.log('触发Xiaomi');
        LLM = createOpenAICompatible({
          name: model,
          apiKey: process.env.XIAOMI_AI_API_KEY,
          baseURL: 'https://api.xiaomimimo.com/v1',
        });
    }


    const result = streamText({
      model: LLM!(model),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) { 
    // console.error('Error occurred:', error);
    return new NextResponse(JSON.stringify({error:'网络请求失败，请检查网络连接或稍后重试'}), { status: 500 });
  }
}
