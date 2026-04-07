import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, business, email, pack, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Propulse <noreply@propulse.ma>",
    to: "contact@propulse.ma",
    replyTo: email,
    subject: `Nouveau message de ${name}${business ? ` — ${business}` : ""}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4361EE;">Nouveau message via propulse.ma</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 120px;"><strong>Nom</strong></td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          ${business ? `
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Entreprise</strong></td>
            <td style="padding: 8px 0;">${business}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Email</strong></td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          ${pack ? `
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Formule</strong></td>
            <td style="padding: 8px 0;">${pack}</td>
          </tr>` : ""}
        </table>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
        <h3 style="color: #333;">Message</h3>
        <p style="color: #444; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
