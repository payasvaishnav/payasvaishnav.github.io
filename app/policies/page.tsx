import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Policies | Payas Vaishnav",
  description: "Copyright, content-use, and privacy policies for Payas Vaishnav's website.",
};

export default function PoliciesPage() {
  return (
    <main className="page">
      <SiteHeader />

      <h2 className="collection-title">Policies</h2>
      <p className="muted">
        How this website handles content, attribution, privacy, and personal views.
      </p>
      <hr className="collection-sep" aria-hidden="true" />

      <article className="policy-page">
        <p className="policy-updated">Last updated: September 18, 2026</p>

        <section>
          <h3>Purpose of this website</h3>
          <p>
            This is my personal space for sharing articles, write-ups, project
            notes, and ideas. My goal is to share useful information about the
            many nuances, details, and rabbit holes I explore so that others can
            learn from them too.
          </p>
          <p>
            The internet, technical documentation, AI tools, social media,
            experimentation, and conversations are among my preferred ways to
            learn. What I publish here is my own understanding and synthesis of
            that learning, and it may evolve as I learn more.
          </p>
        </section>

        <section>
          <h3>Copyright and use of content</h3>
          <p>
            Unless another creator or source is clearly credited, I own the
            copyright to all original content that I create and publish on this
            website and on every page under{" "}
            <a href="https://payasvaishnav.github.io">
              payasvaishnav.github.io
            </a>
            . This applies to content in any form, including, but not limited to,
            articles, write-ups, text, images, graphics, project descriptions,
            code samples, and other original materials.
          </p>
          <p>&copy; 2026 Payas Vaishnav. All rights reserved.</p>
          <p className="policy-notice">
            <strong>No reuse without permission.</strong> Content published on
            this website must not be copied, reproduced, republished,
            redistributed, modified, scraped, sold, or reused in any other form,
            in whole or in part, without my prior written permission, except
            where applicable law permits.
          </p>
          <p>
            Any unauthorized reproduction or reuse is without consent and may
            result in a removal request or other appropriate action.
          </p>
        </section>

        <section>
          <h3>References and attribution</h3>
          <p>
            When I use or discuss someone else&apos;s work, I aim to identify the
            source and provide a link wherever reasonably possible. Third-party
            names, trademarks, quotations, images, and other materials remain the
            property of their respective owners.
          </p>
          <p>
            If you own referenced material and believe attribution is missing or
            inaccurate, or you would like that referenced material removed,
            please email me. I will review the request and address it as
            appropriate.
          </p>
        </section>

        <section>
          <h3>Privacy and data</h3>
          <p>
            This website does not require an account, accept form submissions,
            use analytics or advertising trackers, or collect or sell visitors&apos;
            personal information. External websites and services linked from
            this site operate under their own terms and privacy practices.
          </p>
        </section>

        <section>
          <h3>Personal views and disclaimer</h3>
          <p>
            All articles, write-ups, opinions, and other content on this website
            reflect my personal views only. They do not represent the views of
            any current or former employer, client, educational institution, or
            other organization with which I am or have been associated.
          </p>
          <p>
            The content is shared for general information and personal
            knowledge-sharing, not as professional advice. Although I try to be
            accurate and link relevant sources, I do not guarantee that every
            page is complete, current, or error-free. Readers should independently
            verify information before relying on it.
          </p>
        </section>

        <section>
          <h3>Discussion, opportunities, and contact</h3>
          <p>
            If you would like to discuss an idea, suggest a correction, explore
            an interesting rabbit hole, collaborate, or speak with me about a
            professional opportunity, including hiring, contact me at{" "}
            <a href="mailto:replypkv@gmail.com">replypkv@gmail.com</a>.
          </p>
          <p>
            Please use the same address for content-use permission, attribution
            concerns, or questions about these policies.
          </p>
        </section>
      </article>
    </main>
  );
}
