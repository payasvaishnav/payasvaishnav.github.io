"use client";

import { FormEvent, useEffect, useState } from "react";

type SubmitState = "idle" | "sending" | "success" | "error";

export default function HireForm() {
  const apiBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [serviceDown, setServiceDown] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function openModal() {
    setFeedback("");
    setStatus("idle");
    setServiceDown(false);
    setIsOpen(true);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setFeedback("");
    setServiceDown(false);

    try {
      const response = await fetch(`${apiBasePath}/api/hire`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          role: formData.get("role"),
          message: formData.get("message"),
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      let data: { error?: string; success?: boolean; serviceDown?: boolean } = {};

      if (contentType.includes("application/json")) {
        data = (await response.json()) as { error?: string; success?: boolean; serviceDown?: boolean };
      } else {
        await response.text();
        data = {
          success: false,
          serviceDown: true,
          error: "Contact form service is unavailable here. Please message on LinkedIn or email directly.",
        };
      }

      if (!response.ok || !data.success) {
        if (data.serviceDown) {
          setServiceDown(true);
          setStatus("error");
          setFeedback("");
          return;
        }
        throw new Error(data.error || "Unable to send your message right now.");
      }

      form.reset();
      setStatus("success");
      setFeedback("Thanks, your message has been sent.");
    } catch (error) {
      setStatus("error");
      if (serviceDown) {
        setFeedback("");
      } else {
        setFeedback(error instanceof Error ? error.message : "Something went wrong.");
      }
    }
  }

  return (
    <>
      <button className="profile-hire-button" type="button" onClick={openModal}>
        Hire Me
      </button>

      {isOpen ? (
        <div className="hire-modal-backdrop" role="presentation" onClick={() => setIsOpen(false)}>
          <section
            className="hire-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hire-form-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="hire-modal-close"
              type="button"
              aria-label="Close form"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

            <div className="hire-form-wrap">
              <p className="hire-form-kicker">Hiring for a role?</p>
              <h3 id="hire-form-title">Hire Me</h3>

              {isStaticExport ? (
                <p className="hire-form-note hire-form-fallback" aria-live="polite">
                  This site is running in static mode. Please message me on{" "}
                  <a href="https://linkedin.com/in/payasv" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>{" "}
                  or email directly at <a href="mailto:replypkv@gmail.com">replypkv@gmail.com</a>.
                </p>
              ) : null}

              {!isStaticExport ? (
                <form className="hire-form" onSubmit={onSubmit}>
                <label className="hire-form-field">
                  Name
                  <input name="name" type="text" required autoComplete="name" />
                </label>
                <label className="hire-form-field">
                  Work Email
                  <input name="email" type="email" required autoComplete="email" />
                </label>
                <label className="hire-form-field">
                  Company
                  <input name="company" type="text" required autoComplete="organization" />
                </label>
                <label className="hire-form-field">
                  Role
                  <input name="role" type="text" required />
                </label>
                <label className="hire-form-field">
                  Message
                  <textarea name="message" rows={3} required />
                </label>
                <button className="profile-hire-button hire-form-submit" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send"}
                </button>
                </form>
              ) : null}

              {serviceDown ? (
                <p className="hire-form-note hire-form-note-error hire-form-fallback" aria-live="polite">
                  Mailing service is down. Please message me on{" "}
                  <a href="https://linkedin.com/in/payasv" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>{" "}
                  or email directly at <a href="mailto:replypkv@gmail.com">replypkv@gmail.com</a>.
                </p>
              ) : null}

              {feedback ? (
                <p
                  className={status === "error" ? "hire-form-note hire-form-note-error" : "hire-form-note"}
                  aria-live="polite"
                >
                  {feedback}
                </p>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}