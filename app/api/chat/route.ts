// import { initChatModel } from 'langchain/chat_models/universal';
import { toBaseMessages, toUIMessageStream } from '@ai-sdk/langchain';
// import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { NextRequest, NextResponse } from 'next/server';
import { createUIMessageStreamResponse } from 'ai';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const provider = messages[messages.length - 1]?.metadata?.provider;

    const name = messages[messages.length - 1]?.metadata?.model?.toLowerCase();
    // console.log('provider:', provider, 'model:', name);

    const providerConfig = {
      ZAI: 'ai_config_zai',
      Xiaomi: 'ai_config_xiaomi',
      Google: 'ai_config_google',
    };

    // 支持多端不能写死，写个配置对象
    const rawConfigCookie = req.cookies.get(
      providerConfig[provider as keyof typeof providerConfig],
    )?.value;

    console.log('rawConfigCookie:', rawConfigCookie);

    let apiKey = '';
    let baseUrl = '';

    if (rawConfigCookie) {
      try {
        // 如果存储时进行了 URI 编码，先 decodeURIComponent 再 JSON.parse
        const parsedConfig = JSON.parse(decodeURIComponent(rawConfigCookie));
        apiKey = parsedConfig.apiKey;
        baseUrl = parsedConfig.baseUrl;
      } catch (e) {
        console.error('Cookie 解析 JSON 失败:', e);
        return new NextResponse(
          JSON.stringify({ error: '提供商配置解析失败，请检查提供商配置' }),
          {
            status: 400,
          },
        );
      }
    } else {
      return new NextResponse(JSON.stringify({ error: '缺少提供商配置' }), {
        status: 400,
      });
    }
    // 把sdk格式的消息转换为langchain格式
    const langchainMessages = await toBaseMessages(messages);

    const model = new ChatOpenAI({
      modelName: name,
      temperature: 0.7,
      apiKey: apiKey,
      configuration: {
        baseURL: baseUrl,
      },
    });

    // 使用流式调用模型
    const stream = await model.stream(langchainMessages);

    // 回答完成后转换成为ai-sdk格式返回前端
    return createUIMessageStreamResponse({
      stream: toUIMessageStream(stream),
    });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse(
      JSON.stringify({ error: '网络请求失败，请检查网络连接或稍后重试' }),
      { status: 500 },
    );
  }
}
