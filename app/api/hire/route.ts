import nodemailer from "nodemailer";

export const dynamic = "force-static";

type HirePayload = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  message?: string;
};

function clean(input: unknown): string {
  return typeof input === "string" ? input.trim() : "";
}

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  to: string;
  secure: boolean;
};

function getSmtpConfig(): { ok: true; config: SmtpConfig } | { ok: false } {
  const host = clean(process.env.HIRE_SMTP_HOST);
  const portRaw = clean(process.env.HIRE_SMTP_PORT);
  const user = clean(process.env.HIRE_SMTP_USER);
  const pass = clean(process.env.HIRE_SMTP_PASS).replace(/\s+/g, "");
  const to = clean(process.env.HIRE_TO_EMAIL);
  const secure = process.env.HIRE_SMTP_SECURE === "true";

  if (!host || !portRaw || !user || !pass || !to) {
    return { ok: false };
  }

  const port = Number(portRaw);

  if (!Number.isFinite(port)) {
    return { ok: false };
  }

  return {
    ok: true,
    config: {
      host,
      port,
      user,
      pass,
      to,
      secure,
    },
  };
}

export async function GET() {
  const smtp = getSmtpConfig();

  if (!smtp.ok) {
    return Response.json({ available: false });
  }

  try {
    const transport = nodemailer.createTransport({
      host: smtp.config.host,
      port: smtp.config.port,
      secure: smtp.config.secure,
      auth: { user: smtp.config.user, pass: smtp.config.pass },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 8000,
    });

    await transport.verify();
    return Response.json({ available: true });
  } catch {
    return Response.json({ available: false });
  }
}

export async function POST(request: Request) {
  const payload = (await request.json()) as HirePayload;

  const name = clean(payload.name);
  const email = clean(payload.email);
  const company = clean(payload.company);
  const role = clean(payload.role);
  const message = clean(payload.message);

  if (!name || !email || !company || !role || !message) {
    return Response.json({ success: false, error: "Please fill all required fields." }, { status: 400 });
  }

  const smtp = getSmtpConfig();

  if (!smtp.ok) {
    return Response.json(
      { success: false, serviceDown: true, error: "Mailing service is down. Please message on LinkedIn or email directly." },
      { status: 500 }
    );
  }

  const transport = nodemailer.createTransport({
    host: smtp.config.host,
    port: smtp.config.port,
    secure: smtp.config.secure,
    auth: { user: smtp.config.user, pass: smtp.config.pass },
  });

  try {
    await transport.sendMail({
      from: `Hiring Form <${smtp.config.user}>`,
      to: smtp.config.to,
      replyTo: email,
      subject: `New hiring inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company}`,
        `Role: ${role}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { success: false, serviceDown: true, error: "Mailing service is down. Please message on LinkedIn or email directly." },
      { status: 500 }
    );
  }
}