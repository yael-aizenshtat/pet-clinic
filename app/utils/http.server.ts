export function json(data: unknown, init?: ResponseInit) {
    return new Response(JSON.stringify(data), {
      ...init,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...(init?.headers ?? {}),
      },
    });
  }
  
  export function badRequest(data: unknown) {
    return json(data, { status: 400 });
  }
  
  export function notFound(data: unknown) {
    return json(data, { status: 404 });
  }
  
  export function methodNotAllowed() {
    return json({ message: "Method Not Allowed" }, { status: 405 });
  }