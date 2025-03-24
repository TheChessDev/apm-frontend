import { refreshToken } from "@/lib/refreshToken";
import { HttpSDK, Message } from "@chessdev/apm-sdk-demo";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic");

  if (!topic) {
    return NextResponse.json({ error: "Missing topic" }, { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const send = (data: unknown) => {
        const sse = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(sse));
      };

      let aborted = false;
      req.signal.addEventListener("abort", () => {
        aborted = true;
        controller.close();
      });

      const accessToken = await refreshToken();
      const sdk = new HttpSDK(process.env.SDK_BASE_URL!, accessToken);

      sdk.listen(topic, async (message: Message) => {
        if (aborted) {
          return;
        }

        send(message);
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
