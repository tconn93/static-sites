import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "waitlist.json");

interface WaitlistEntry {
  email: string;
  timestamp: string;
}

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, "[]", "utf-8");
    }
  } catch (e) {
    console.error("Failed to ensure data file", e);
  }
}

async function readWaitlist(): Promise<WaitlistEntry[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as WaitlistEntry[];
  } catch {
    return [];
  }
}

async function addToWaitlist(email: string): Promise<{ added: boolean; total: number }> {
  const entries = await readWaitlist();
  const normalized = email.toLowerCase().trim();

  const exists = entries.some((e) => e.email.toLowerCase() === normalized);
  if (exists) {
    return { added: false, total: entries.length };
  }

  const newEntry: WaitlistEntry = {
    email: normalized,
    timestamp: new Date().toISOString(),
  };

  entries.push(newEntry);
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
  return { added: true, total: entries.length };
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    const result = await addToWaitlist(email);

    return NextResponse.json({
      success: true,
      message: result.added
        ? "You're on the list. We'll notify you when GrokBuild launches."
        : "You're already on the waitlist.",
      total: result.total,
    });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
