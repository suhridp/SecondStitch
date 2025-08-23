import { NextResponse } from "next/server";

type ContactBody = { name: string; email: string; message: string };

export async function POST(req: Request) {
  try {
    let payload: ContactBody;

    if (req.headers.get("content-type")?.includes("application/json")) {
      payload = (await req.json()) as ContactBody;
    } else {
      const form = await req.formData();
      payload = {
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        message: String(form.get("message") || ""),
      };
    }

    const { name, email, message } = payload;
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // TODO: send email / store in DB
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const err = e as Error;
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
