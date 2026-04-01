import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-logo"><img src="/icon2.png" alt="Tyler.ag logo" /></Link>
        </div>
      </header>

      <main>
        <div className="legal-page">
          <h1>Privacy Policy</h1>
          <span className="legal-date">Effective Date: March 17, 2026</span>

          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>Tyler's AI Company ("we", "us", or "our") operates the AI Executive Assistant service (the "Service"). This Privacy Policy explains how we collect, use, disclose, and protect personal information.</p>
          </section>

          <section className="legal-section">
            <h2>2. Sensitive Personal Information</h2>
            <p>We collect Sensitive Personal Information (SPI) as defined under applicable laws (e.g., CPRA), including precise geolocation (travel bookings), financial account credentials (budget tracking), and contents of private communications (email, calendar). We use and disclose SPI solely to perform the services reasonably expected by you (providing the executive assistant functions) and for other permitted purposes under law. We do not use SPI beyond these limited purposes, and no "Limit the Use of My Sensitive Personal Information" toggle is required.</p>
          </section>

          <section className="legal-section">
            <h2>3. Data Use and Training</h2>
            <p>We use your data to provide and improve the Service, including supervised learning via your approvals and feedback. We do not use your private data (e.g., confidential budgets, personal emails) to train foundation models shared with other users without aggregated anonymization that prevents re-identification.</p>
          </section>

          <section className="legal-section">
            <h2>4. Sharing and Third Parties</h2>
            <p>We share data with integrations (Google Workspace, Asana, travel/booking platforms) as authorized. Once data is transmitted to a third party (e.g., airline or hotel provider), it becomes subject to their privacy policy.</p>
          </section>

          <section className="legal-section">
            <h2>5. Automated Processing</h2>
            <p>The Service uses supervised AI for recommendations and actions. No fully automated significant decisions occur without meaningful human intervention (your approval). Future ADMT use (post-2027 rules) will include required disclosures and opt-outs if applicable.</p>
          </section>

          <section className="legal-section">
            <h2>6. Your Rights</h2>
            <p>California residents: Access, delete, opt-out of sale/sharing (none occurs), limit sensitive data use (addressed via limited-purpose statement). Submit requests to <a href="mailto:support@tyler.ag">support@tyler.ag</a>.</p>
          </section>

          <section className="legal-section">
            <h2>7. Data Retention and Security</h2>
            <p>Retained as needed; deleted upon request/account closure (subject to backups). Encryption and controls applied.</p>
          </section>

          <section className="legal-section">
            <h2>8. Governing Law</h2>
            <p>Florida law.</p>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <Link to="/" className="nav-logo"><img src="/icon2.png" alt="Tyler.ag" /></Link>
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
