"use server";

export async function runAgent() {
  const stream = new ReadableStream({
    start(controller) {
      const message = "Hello";

      controller.enqueue(message);
    },
  });

  console.log({ stream });
  return stream;
}
