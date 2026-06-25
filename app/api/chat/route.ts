import { streamText, UIMessage, convertToModelMessages } from 'ai';
// import { google } from '@ai-sdk/google';
// import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
// import { createDeepSeek } from '@ai-sdk/deepseek';

export async function POST(req: Request) {
  // console.log(await req.json());
  // const { messages }: { messages: UIMessage[] } = await req.json();
  const body = await req.json();
  console.log('完整请求体:', body);
  const { messages } = body;

  // 从第一条用户消息的 metadata 中提取 provider 和 model
  // console.log('messages 类型:', typeof messages);
  // console.log('messages 是数组吗:', Array.isArray(messages));
  // console.log('第一条消息:', messages[0]);
  const provider = messages[0]?.metadata?.provider;
  const model = messages[0]?.metadata?.model;

  console.log('提取的 provider:', provider);
  console.log('提取的 model:', model);

  const modelMap: { [key: string]: string } = {
    'Gemini-2.5Pro': 'gemini-2.5pro',
    'Gemini-2.5Flash': 'gemini-2.5flash',
    'GLM-4.7': 'glm-4.7',
    'GLM-5': 'glm-5',
    'GLM-4-FlashX-250414': 'glm-4-flashx-250414',
  };

  // 使用映射后的模型名称
  // const actualModel = modelMap[model as keyof typeof modelMap] || model;

  // console.log('前端模型名称:', model);
  // console.log('映射后的模型名称:', modelMap[model]);

  // const gemini = createOpenAICompatible({
  //   apiKey: process.env.GEMINI_API_KEY ?? '',
  // });

  const lmmprovider = createOpenAICompatible({
    name: modelMap[model],
    apiKey: process.env.LMMPROVIDER_API_KEY,
    baseURL: 'https://open.bigmodel.cn/api/coding/paas/v4',
  });

  const result = streamText({
    model: lmmprovider(modelMap[model]),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
