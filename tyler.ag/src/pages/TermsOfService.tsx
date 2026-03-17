import { Link } from 'react-router-dom'

export default function TermsOfService() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">tyler.ag</Link>
        </div>
      </header>

      <main>
        <div className="legal-page">
          <h1>Terms of Service</h1>
          <span className="legal-date">Effective Date: March 17, 2026</span>

          <section className="legal-section">
            <h2>1. Acceptance</h2>
            <p>By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, you may not use the Service.</p>
          </section>

          <section className="legal-section">
            <h2>2. Service Description</h2>
            <p>Tyler's AI Company provides an AI agent designed for executive support, utilizing supervised learning to achieve gradual autonomy in administrative tasks.</p>
          </section>

          <section className="legal-section">
            <h2>3. User Obligations</h2>
            <p>You agree to provide accurate data and authorize necessary OAuth scopes for the Service to function. You shall not use the Service for any unlawful purpose or in any manner that causes harm via the agent.</p>
          </section>

          <section className="legal-section alert-box">
            <h2>4. Disclaimers and Limitation of Liability</h2>
            <p><strong>SERVICE PROVIDED "AS IS."</strong> No warranty is made regarding the accuracy of AI actions, suggestions, or bookings. <strong>The Service utilizes generative AI which may produce "hallucinations" or inaccurate outputs</strong> (e.g., incorrect drafts, suggestions, or bookings).</p>
            <p>You are <strong>solely responsible</strong> for reviewing, verifying, and approving all AI-generated content, calendar events, bookings, and actions before finalization or execution. Tyler's AI Company is not liable for indirect, consequential, or punitive damages. Our total liability is capped at fees paid in the prior 12 months, or a <strong>$100.00 floor</strong> if the Service is provided free of charge.</p>
          </section>

          <section className="legal-section">
            <h2>5. Representative Capacity and Authorization</h2>
            <p>By authorizing the AI Agent to interact with third parties (e.g., send emails, book travel), you represent and warrant that such actions are <strong>legally considered your own actions</strong>, and you have full authority to bind yourself (or your organization) thereby.</p>
          </section>

          <section className="legal-section">
            <h2>6. Indemnification</h2>
            <p>You agree to indemnify and hold harmless Tyler's AI Company for any claims, damages, or losses arising from your data, your instructions to the AI, or your misuse of the Service.</p>
          </section>

          <section className="legal-section">
            <h2>7. Termination</h2>
            <p>We reserve the right to suspend or terminate your access to the Service at any time for violations of these Terms.</p>
          </section>

          <section className="legal-section highlighted-box">
            <h2>8. Governing Law and Dispute Resolution</h2>
            <p>These Terms are governed by <strong>Florida law</strong>. Any dispute arising out of or relating to these Terms shall be resolved via <strong>Mandatory Binding Arbitration</strong> in Escambia County, Florida, under AAA rules.</p>
            <p><strong>Class Action Waiver:</strong> Arbitration shall proceed on an <strong>individual basis only</strong>. You waive any right to a jury trial or to participate in class, collective, or representative actions. You may opt out of this arbitration agreement within 30 days of first use by providing written notice to <a href="mailto:support@tyler.ag">support@tyler.ag</a>.</p>
          </section>

          <section className="legal-section">
            <h2>9. Miscellaneous</h2>
            <p>These Terms constitute the entire agreement between the parties. If any provision is found unenforceable, the remaining provisions shall remain in full force and effect.</p>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span className="nav-logo">tyler.ag</span>
          <div className="footer-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
          </div>
          <span className="footer-copy">© 2026 Tyler. All rights reserved.</span>
        </div>
      </footer>
    </>
  )
}
