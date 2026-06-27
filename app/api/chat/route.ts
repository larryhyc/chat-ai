import { streamText, convertToModelMessages } from 'ai';
// import { google } from '@ai-sdk/google';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
// import { generateText } from 'ai';
// import { createDeepSeek } from '@ai-sdk/deepseek';

export async function POST(req: Request) {
  // try {

  // }catch
  // console.log(await req.json());
  // const { messages }: { messages: UIMessage[] } = await req.json();
  const body = await req.json();
  // console.log('完整请求体:', body);
  const { messages } = body;

  const provider = messages[messages.length - 1]?.metadata?.provider;
  const model = messages[messages.length - 1]?.metadata?.model.toLowerCase();

  // messages.map((item) => {
  //   console.log(item);
  // });

  let LLM;

  // const baseURL = {
  //   ZAI: 'https://open.bigmodel.cn/api/coding/paas/v4',
  //   XIAOMI: 'https://api.xiaomimimo.com/v1',
  // };

  switch (provider) {
    case 'Google':
      console.log('触发google');
      LLM = createOpenAICompatible({
        name: model,
        apiKey: process.env.GOOGLE_GIMINI_AI_API_KEY,
        baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai',
      });
      break;
    case 'ZAI':
      console.log('触发zai');
      LLM = createOpenAICompatible({
        name: model,
        apiKey: process.env.ZAI_AI_API_KEY,
        baseURL: 'https://open.bigmodel.cn/api/coding/paas/v4',
      });
      break;
    case 'Xiaomi':
      console.log('触发Xiaomi');
      LLM = createOpenAICompatible({
        name: model,
        apiKey: process.env.XIAOMI_AI_API_KEY,
        baseURL: 'https://api.xiaomimimo.com/v1',
      });
  }

  try {
    // if (LLM!) {
    //   throw new Error(`未找到匹配的供应商 [${provider}] 配置`);
    // }

    const result = streamText({
      model: LLM!(model),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('后端捕获大模型异常:', error);
    const clientMessage = '大模型服务暂时不可用，可尝试切换其他模型。';
    return new Response(JSON.stringify({ messages: clientMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
