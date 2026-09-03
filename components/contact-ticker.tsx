const LINKEDIN_URL = "https://linkedin.com/in/payasv";
const EMAIL_URL = "mailto:replypkv@gmail.com";

function TickerMessage({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <span className="contact-ticker-message" aria-hidden={duplicate || undefined}>
      <span>Have an opportunity or want to discuss something?</span>
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" tabIndex={duplicate ? -1 : undefined}>
        Message me on LinkedIn
      </a>
      <span>or</span>
      <a href={EMAIL_URL} tabIndex={duplicate ? -1 : undefined}>
        email me.
      </a>
    </span>
  );
}

export default function ContactTicker() {
  return (
    <aside className="contact-ticker" aria-label="Contact Payas">
      <div className="contact-ticker-track">
        {Array.from({ length: 8 }, (_, index) => (
          <TickerMessage key={index} duplicate={index > 0} />
        ))}
      </div>
    </aside>
  );
}
