"use client";

import { useEffect, useState } from "react";

const LINES = [
  "$ grokbuild connect --repo tyler/my-saas-app",
  "✓ Connected to GitHub repo: tyler/my-saas-app",
  "✓ Grok agent initialized",
  "",
  "> Agent: Analyzing open issues...",
  "> Agent: Found 3 bugs in /src/api/auth.py",
  "> Agent: Writing fix for issue #42...",
  "",
  "[====================] 100%",
  "",
  "> Agent: Fix complete. Opening PR...",
  "✓ PR #87 opened: \"Fix: JWT token expiry handling\"",
  "> Agent: Awaiting your review.",
  "",
  "$ _",
];

const TYPING_SPEED = 28; // ms per char
const LINE_PAUSE = 420; // pause after finishing a line
const LOOP_DELAY = 1800; // pause before restarting

export default function Terminal() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const typeNext = () => {
      if (currentLineIndex >= LINES.length) {
        // Finished all lines — wait then reset
        timeout = setTimeout(() => {
          setDisplayedLines([]);
          setCurrentLineIndex(0);
          setCurrentCharIndex(0);
        }, LOOP_DELAY);
        return;
      }

      const currentLine = LINES[currentLineIndex];

      if (currentCharIndex <= currentLine.length) {
        // Still typing this line
        const partial = currentLine.slice(0, currentCharIndex);
        const newLines = [...displayedLines.slice(0, currentLineIndex), partial];
        setDisplayedLines(newLines);

        if (currentCharIndex < currentLine.length) {
          timeout = setTimeout(() => {
            setCurrentCharIndex(currentCharIndex + 1);
          }, TYPING_SPEED);
        } else {
          // Line complete
          timeout = setTimeout(() => {
            setCurrentLineIndex(currentLineIndex + 1);
            setCurrentCharIndex(0);
          }, LINE_PAUSE);
        }
      }
    };

    timeout = setTimeout(typeNext, 40);

    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, displayedLines]);

  // Helper to style each line
  const renderLine = (line: string, index: number) => {
    const isLast = index === displayedLines.length - 1 && currentLineIndex < LINES.length;
    const cursor = isLast ? <span className="cursor" /> : null;

    if (line.startsWith("$")) return <span className="prompt">{line}{cursor}</span>;
    if (line.startsWith("✓")) return <span className="success">{line}{cursor}</span>;
    if (line.startsWith("> Agent:")) return <span className="agent">{line}{cursor}</span>;
    return <span className="text">{line}{cursor}</span>;
  };

  return (
    <div className="code-window w-full max-w-[560px] rounded-xl overflow-hidden font-mono text-[13px] border border-[#222]">
      {/* Code window chrome matching x.ai .code-window-chrome */}
      <div className="terminal-header flex items-center gap-2 px-3 py-2 text-[11px] text-[#666]">
        <div className="flex gap-1.5">
          <div className="traffic-light red" />
          <div className="traffic-light yellow" />
          <div className="traffic-light green" />
        </div>
        <div className="flex-1 text-center tracking-[0.5px] text-[#666]">
          grokbuild-agent — bash
        </div>
      </div>

      {/* Body with x.ai shiki .line styling (padding, line-height etc.) */}
      <div className="terminal-body min-h-[310px] overflow-hidden p-0">
        {displayedLines.map((line, index) => (
          <div key={index} className="line whitespace-pre-wrap break-all">
            {renderLine(line, index)}
          </div>
        ))}
        {displayedLines.length === 0 && (
          <div className="line">
            <span className="prompt">$ <span className="cursor" /></span>
          </div>
        )}
      </div>
    </div>
  );
}
