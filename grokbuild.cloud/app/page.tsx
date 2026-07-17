"use client";

import { useState, useEffect } from "react";
import Terminal from "./components/Terminal";

export default function GrokBuildLanding() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [maskVisible, setMaskVisible] = useState(false);

  // Show the large transparent access mask after 2.4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMaskVisible(true);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const showWaitlistMask = () => {
    setMaskVisible(true);
    // Focus the input after it appears
    setTimeout(() => {
      const input = document.getElementById("waitlist-email") as HTMLInputElement | null;
      input?.focus();
    }, 120);
  };

  const scrollToWaitlist = () => {
    showWaitlistMask();
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("https://n8n.tyler.ag/webhook/grok-build-waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://grokbuild.cloud",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "You're on the list.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Navbar — styled like x.ai/cli */}
      <nav className="navbar sticky top-0 z-50 flex items-center justify-between px-6 md:px-8 h-16">
        <a
          href="https://x.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[20px] font-semibold tracking-[-0.02em] text-white hover:opacity-80 transition-opacity"
        >
          xAI
        </a>

        <button
          onClick={scrollToWaitlist}
          className="btn-secondary px-5 py-1.5 rounded-full text-sm border-[hsl(var(--border))] hover:border-[hsl(var(--foreground)/.4)]"
        >
          Join Waitlist
        </button>
      </nav>

      {/* Hero */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center px-6 md:px-8 pt-12 pb-16">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-center hero-grid">
            {/* Left column - Value prop */}
            <div className="max-w-[560px]">
              <div className="eyebrow mb-4">CLOUD CODING AGENTS</div>

              <h1 className="text-[44px] md:text-[56px] leading-[1.05] tracking-[-1.5px] font-bold mb-6">
                Build with Grok.<br />
                From anywhere.<br />
                No setup required.
              </h1>

              <p className="text-[hsl(var(--secondary))] text-[15px] md:text-[15.5px] leading-relaxed mb-8 max-w-[42ch]">
                GrokBuild gives SuperGrok subscribers a persistent cloud environment where AI agents
                manage your GitHub repos — writing code, opening PRs, fixing bugs, and shipping
                features autonomously.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <button
                  onClick={scrollToWaitlist}
                  className="btn-primary h-11 px-8 rounded-full text-[15px] inline-flex items-center justify-center"
                >
                  Join the Waitlist
                </button>
                <button
                  onClick={scrollToHowItWorks}
                  className="btn-secondary h-11 px-6 rounded-full text-[15px]"
                >
                  Learn How It Works ↓
                </button>
              </div>

              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full status-badge text-xs font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
                Pending xAI Partnership Approval — Access opening soon
              </div>
            </div>

            {/* Right column - Terminal */}
            <div className="flex justify-center lg:justify-end">
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 md:px-8 py-16 md:py-20 border-t border-[hsl(var(--border))]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">THREE SIMPLE STEPS</div>
            <h2 className="text-3xl md:text-4xl tracking-[-0.6px]">How GrokBuild works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Step A */}
            <div className="step-card rounded-2xl p-7">
              <div className="text-3xl mb-5">⚡</div>
              <h3 className="font-semibold text-lg mb-2.5 tracking-[-0.2px]">Connect Your Repo</h3>
              <p className="text-[hsl(var(--secondary))] text-[14.5px] leading-relaxed">
                Link your GitHub account and select a repository. GrokBuild spins up a secure cloud
                environment instantly — no Docker, no local installs.
              </p>
            </div>

            {/* Step B */}
            <div className="step-card rounded-2xl p-7">
              <div className="text-3xl mb-5">🤖</div>
              <h3 className="font-semibold text-lg mb-2.5 tracking-[-0.2px]">Activate Your Grok Agent</h3>
              <p className="text-[hsl(var(--secondary))] text-[14.5px] leading-relaxed">
                Your SuperGrok subscription powers the agent. Give it a task in plain English — fix a
                bug, build a feature, refactor a module — and watch it work.
              </p>
            </div>

            {/* Step C */}
            <div className="step-card rounded-2xl p-7">
              <div className="text-3xl mb-5">🚀</div>
              <h3 className="font-semibold text-lg mb-2.5 tracking-[-0.2px]">Review &amp; Ship</h3>
              <p className="text-[hsl(var(--secondary))] text-[14.5px] leading-relaxed">
                The agent opens pull requests, explains its changes, and waits for your approval.
                You stay in control. Grok does the heavy lifting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features — fully visible until mask appears */}
      <section className="px-6 md:px-8 pt-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="eyebrow mb-3">CAPABILITIES</div>
            <h2 className="text-3xl md:text-4xl tracking-[-0.6px]">Everything you need to ship with Grok</h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="feature-card rounded-2xl p-6">
              <div className="text-white/70 text-xl mb-4">{"</>"}</div>
              <h3 className="font-semibold text-[15px] mb-1.5">GitHub Native</h3>
              <p className="text-[hsl(var(--secondary))] text-[13.5px] leading-snug">
                Full read/write access to your repos via GitHub OAuth
              </p>
            </div>

            <div className="feature-card rounded-2xl p-6">
              <div className="text-white/70 text-xl mb-4">☁</div>
              <h3 className="font-semibold text-[15px] mb-1.5">Fully Cloud</h3>
              <p className="text-[hsl(var(--secondary))] text-[13.5px] leading-snug">
                No local environment needed. Runs on secure cloud infrastructure
              </p>
            </div>

            <div className="feature-card rounded-2xl p-6">
              <div className="text-white/70 text-xl mb-4">🔒</div>
              <h3 className="font-semibold text-[15px] mb-1.5">SuperGrok Auth</h3>
              <p className="text-[hsl(var(--secondary))] text-[13.5px] leading-snug">
                Access gated to active Grok/SuperGrok subscribers via xAI login
              </p>
            </div>

            <div className="feature-card rounded-2xl p-6">
              <div className="text-white/70 text-xl mb-4">⚡</div>
              <h3 className="font-semibold text-[15px] mb-1.5">Parallel Agents</h3>
              <p className="text-[hsl(var(--secondary))] text-[13.5px] leading-snug">
                Run multiple agents across multiple repos simultaneously
              </p>
            </div>

            <div className="feature-card rounded-2xl p-6">
              <div className="text-white/70 text-xl mb-4">📋</div>
              <h3 className="font-semibold text-[15px] mb-1.5">PR Workflow</h3>
              <p className="text-[hsl(var(--secondary))] text-[13.5px] leading-snug">
                All changes go through pull requests — nothing ships without your review
              </p>
            </div>

            <div className="feature-card rounded-2xl p-6">
              <div className="text-white/70 text-xl mb-4">🔄</div>
              <h3 className="font-semibold text-[15px] mb-1.5">Always On</h3>
              <p className="text-[hsl(var(--secondary))] text-[13.5px] leading-snug">
                Agents can run async while you sleep. Wake up to finished PRs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Large transparent centered access mask — appears after delay, 80% size */}
      <div
        className={`fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-500 ${maskVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="access-mask w-[80vw] h-[80vh] max-w-[1080px] max-h-[82vh] flex items-center justify-center">
          <div
            id="waitlist-modal"
            className="mask-card w-full h-full max-w-[780px] max-h-[520px] rounded-2xl px-8 md:px-12 py-9 md:py-10 flex flex-col justify-center text-center"
          >
            <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-2xl">
              ⏳
            </div>

            <h3 className="text-[21px] font-semibold tracking-[-0.3px] mb-3">
              Access Pending Partnership Approval
            </h3>

            <p className="text-[hsl(var(--secondary))] text-[14px] leading-relaxed mb-6 max-w-[38ch] mx-auto">
              GrokBuild has submitted a formal partnership request to xAI to operate as an authorized
              Bundled Service integrator. We&apos;re committed to launching in full compliance with
              xAI&apos;s terms. Access will open once approved.
            </p>

            <div className="text-[11px] text-[hsl(var(--secondary))]/70 mb-6">
              Built by Tyler's AI Company — Pensacola, FL
            </div>

            <div className="h-px bg-white/10 my-1" />

            {/* Waitlist form */}
            <form onSubmit={handleSubmit} className="space-y-3 mt-5">
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="waitlist-input w-full h-11 rounded-lg px-4 text-sm"
                disabled={status === "loading" || status === "success"}
                required
              />

              <button
                type="submit"
                disabled={status === "loading" || status === "success" || !email}
                className="btn-waitlist w-full h-11 rounded-lg text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Joining..." : "Notify Me When We Launch"}
              </button>
            </form>

            {message && (
              <p
                className={`mt-4 text-sm ${status === "success" ? "text-[#28c840]" : "text-[hsl(var(--accent))]"
                  }`}
              >
                {message}
              </p>
            )}

            <p className="mt-4 text-[11px] text-[hsl(var(--secondary))]/60">
              We&apos;ll only email you when GrokBuild opens. No spam.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 md:px-8 py-8 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-y-2 text-[hsl(var(--secondary))]">
          <div>© 2026 Grok Build — Built by XAI</div>
          <div>
            <a
              href="https://x.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[hsl(var(--foreground))] transition-colors"
            >
              Powered by xAI API
            </a>
          </div>
          <div>Built with Grok</div>
        </div>
      </footer>
    </div>
  );
}
