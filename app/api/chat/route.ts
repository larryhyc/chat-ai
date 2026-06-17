import { streamText, UIMessage, convertToModelMessages } from 'ai';
// import { google } from '@ai-sdk/google';
// import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
// import { createDeepSeek } from '@ai-sdk/deepseek';

export async function POST(req: Request) {
  // console.log(await req.json());
  const { messages }: { messages: UIMessage[] } = await req.json();

  // const gemini = createOpenAICompatible({
  //   apiKey: process.env.GEMINI_API_KEY ?? '',
  // });

  const lmmprovider = createOpenAICompatible({
    name: 'glm-4-flashx-250414',
    apiKey: process.env.LMMPROVIDER_API_KEY ?? '',
    baseURL: 'https://open.bigmodel.cn/api/coding/paas/v4',
  });

  const result = streamText({
    model: lmmprovider('glm-4-flashx-250414'),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
