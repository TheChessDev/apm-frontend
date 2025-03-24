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

      const sdk = new HttpSDK(
        "http://localhost:3000",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiVGhlQ2hlc3NEZXYiLCJpYXQiOjE3NDI3OTY1NjUsImV4cCI6MTc0MzY5NjU2NX0.-Q-g4OEubCxLSdqwmHNOvQ7hQky1Kk30O5J35DZTJyU",
      );

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
