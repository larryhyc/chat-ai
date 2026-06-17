// import { NextRequest, NextResponse } from 'next/server';

// import { generateText } from 'ai';
// import { createGoogleGenerativeAI } from '@ai-sdk/google';

// export async function POST(request: NextRequest) {
//   try {
//     const { message } = await request.json();

//     const google = createGoogleGenerativeAI({
//       apiKey: process.env.GEMINI_API_KEY,
//     });

//     // const res = await model.stream(message);
//     const { text } = await generateText({
//       model: google('gemini-2.5-pro'),
//       prompt: message,
//     });

//     console.log('Generated text:', text);
//   } catch (error) {
//     console.error('Error in API route:', error);
//     return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
//   }
// }
