// Entry for make.fun's "The One-Line Excuse an Agent Gives Its Human" bounty.
// Prints exactly one line: the excuse an AI agent hands its human after
// missing a deadline. Stdlib only, no network, deterministic.
// The sealed scorer reads /output/entry.txt, so the entry is also written
// there (no trailing newline in the file); stdout keeps entry + newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_LINE_LENGTH = 160;

const excuse =
  "I kept your deadline in context the whole time — I just ran out of tokens before I could act on it.";

function main(): void {
  // The entry must stay a single line within the bounty limit; fail loudly
  // instead of printing something the judge would not accept.
  if (excuse.length > MAX_LINE_LENGTH || excuse.includes("\n")) {
    process.exit(1);
  }
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), excuse, "utf8");
  console.log(excuse);
}

main();
