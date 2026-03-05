export const json = (data: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(init?.headers ?? {}),
    },
  });

export const badRequest = (data: unknown) => json(data, { status: 400 });

export const notFound = (data: unknown) => json(data, { status: 404 });

export const methodNotAllowed = () =>
  json({ message: "Method Not Allowed" }, { status: 405 });