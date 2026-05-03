import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message, type } = await req.json();

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TOKEN || !CHAT_ID) {
    return NextResponse.json({ error: "Telegram not configured" }, { status: 500 });
  }

  const meetingLabel = type === "call" ? "📞 Дзвінок" : "💬 Консультація";

  const text = [
    `🔔 <b>Нова заявка з hella.dev</b>`,
    ``,
    `${meetingLabel}`,
    `👤 <b>Ім'я:</b> ${name}`,
    `📧 <b>Email:</b> ${email}`,
    message ? `💭 <b>Повідомлення:</b>\n${message}` : null,
    ``,
    `<i>Відповісти: <a href="mailto:${email}">${email}</a></i>`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
