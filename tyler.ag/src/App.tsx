import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import './App.css'

function Home() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">tyler.ag</Link>
          <nav>
            <a href="#about">About</a>
            <a href="#pepper">Pepper</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="https://pepper.tyler.ad/" target="_blank" className="btn btn-primary nav-cta">Work with me</a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero" id="about">
          <div className="hero-inner">
            <div className="badge">AI Consultant</div>
            <h1>
              I help businesses<br />
              <span className="accent">move faster with AI.</span>
            </h1>
            <p className="hero-sub">
              Strategy, implementation, and automation — from first proof of concept
              to production systems that actually stick.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">Let's talk</a>
              <a href="#pepper" className="btn btn-ghost">See Pepper →</a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="glow" />
            <div className="orb" />
          </div>
        </section>

        {/* Services */}
        <section className="services">
          <div className="section-inner">
            <h2 className="section-label">What I do</h2>
            <div className="cards">
              <div className="card">
                <div className="card-icon">⚡</div>
                <h3>AI Strategy</h3>
                <p>
                  Identify the highest-leverage opportunities for AI in your business.
                  Roadmap, prioritization, and vendor evaluation — no hype, just results.
                </p>
              </div>
              <div className="card">
                <div className="card-icon">🔧</div>
                <h3>Implementation</h3>
                <p>
                  From LLM integrations to custom agents, I build and ship production-ready
                  AI systems that your team can own and maintain.
                </p>
              </div>
              <div className="card">
                <div className="card-icon">🤖</div>
                <h3>Automation</h3>
                <p>
                  Eliminate the repetitive work eating your team's time. Intelligent
                  workflows that handle the routine so people can focus on what matters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pepper */}
        <section className="pepper-section" id="pepper">
          <div className="section-inner pepper-inner">
            <div className="pepper-text">
              <div className="badge badge-pepper">New Product</div>
              <h2>
                Meet <span className="accent">Pepper</span>
              </h2>
              <p className="pepper-sub">
                Your AI executive assistant. Pepper handles your inbox and calendar
                so you can focus on the work that actually needs you.
              </p>
              <ul className="pepper-features">
                <li>
                  <span className="feature-icon">✉️</span>
                  <div>
                    <strong>Email management</strong>
                    <p>Reads, triages, drafts, and sends on your behalf — matching your voice exactly.</p>
                  </div>
                </li>
                <li>
                  <span className="feature-icon">📅</span>
                  <div>
                    <strong>Calendar intelligence</strong>
                    <p>Schedules meetings, resolves conflicts, and protects your focus time automatically.</p>
                  </div>
                </li>
                <li>
                  <span className="feature-icon">🔗</span>
                  <div>
                    <strong>Context-aware actions</strong>
                    <p>Pepper connects the dots between your emails and calendar so nothing falls through the cracks.</p>
                  </div>
                </li>
              </ul>
              <a href="https://pepper.tyler.ad" className="btn btn-primary">Get early access</a>
            </div>
            <div className="pepper-demo" aria-hidden="true">
              <div className="demo-card">
                <div className="demo-header">
                  <div className="demo-dot red" />
                  <div className="demo-dot yellow" />
                  <div className="demo-dot green" />
                  <span className="demo-title">Pepper</span>
                </div>
                <div className="demo-body">
                  <div className="demo-msg assistant">
                    <div className="demo-avatar">P</div>
                    <div className="demo-bubble">
                      Good morning! You have 3 emails needing replies and a conflict
                      on Thursday at 2pm. Want me to handle it?
                    </div>
                  </div>
                  <div className="demo-msg user">
                    <div className="demo-bubble">Yes, move Thursday and draft replies.</div>
                  </div>
                  <div className="demo-msg assistant">
                    <div className="demo-avatar">P</div>
                    <div className="demo-bubble">
                      Done. Thursday rescheduled to 4pm, all parties notified.
                      3 reply drafts ready for your review. ✓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="contact-section" id="contact">
          <div className="section-inner contact-inner">
            <h2>Ready to move faster?</h2>
            <p>Whether it's a consulting engagement or early access to Pepper — let's talk.</p>
            <a href="mailto:tyler@tyler.ag" className="btn btn-primary btn-lg">
              tyler@tyler.ag
            </a>
          </div>
        </section>
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
