import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message, type, social } = await req.json();

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TOKEN || !CHAT_ID) {
    return NextResponse.json({ error: "Telegram not configured" }, { status: 500 });
  }

  const meetingLabel = type === "call" ? "📞 Дзвінок" : "💬 Консультація";

  let socialLink = "";
  if (social) {
    const clean = social.trim();
    if (clean.startsWith("http://") || clean.startsWith("https://")) {
      socialLink = clean;
    } else if (clean.startsWith("@")) {
      socialLink = `https://t.me/${clean.slice(1)}`;
    } else if (/^[a-zA-Z0-9_.]+$/.test(clean)) {
      socialLink = `https://t.me/${clean}`;
    }
  }

  const replyHtml = [
    `<i>Відповісти: <a href="mailto:${email}">${email}</a>`,
    socialLink ? ` або <a href="${socialLink}">${social.trim()}</a>` : social ? ` (Контакт: ${social.trim()})` : "",
    `</i>`
  ].join("");

  const text = [
    `🔔 <b>Нова заявка з hella.dev</b>`,
    ``,
    `${meetingLabel}`,
    `👤 <b>Ім'я:</b> ${name}`,
    `📧 <b>Email:</b> ${email}`,
    social ? `📱 <b>Telegram/Instagram:</b> ${social}` : null,
    message ? `💭 <b>Повідомлення:</b>\n${message}` : null,
    ``,
    replyHtml,
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
