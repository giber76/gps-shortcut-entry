// The GPS Swears It Was a Shortcut — one line, in the GPS's own voice:
// its excuse for sending the driver down the wrong road. The excuse is
// the whole entry: no setup, no dialogue tags, just the line itself.
// The gate wants /output/entry.txt to be UTF-8 text of 1 to 200 characters,
// not only white space.
//
// The line, written to win a pairwise judge on funny + GPS voice:
//   - smug and defensive, caught red-handed and blaming the map — "the map
//     swore", not "I made a mistake";
//   - a real joke with a turn nobody sees coming: the excuse slides from
//     the map's promise to taking the ducks' word for it — ducks cannot
//     talk, which is exactly why a GPS trusting them is funny;
//   - a fresh, specific detail (a lake, and ducks on it) instead of the
//     usual "recalculating" joke the brief warns against;
//   - reads cleanly aloud in one breath, well inside 200 characters.
// Run outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";

const EXCUSE =
  "The map swore the lake was a shortcut, and the ducks looked so confident I took their word for it.";

// The gate refuses anything outside 1–200 characters or whitespace-only,
// so fail loudly here instead of writing an entry the judge never sees.
if (EXCUSE.length < 1 || EXCUSE.length > 200 || !/\S/.test(EXCUSE)) {
  throw new Error(`excuse fails the gate at ${EXCUSE.length} characters`);
}
if (EXCUSE.includes("\n")) {
  throw new Error("excuse must be a single line");
}

const dest = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// In the grader /output is a mount point: create it when it is missing,
// never remove it and never empty it wholesale.
mkdirSync(dest, { recursive: true });
writeFileSync(`${dest}/entry.txt`, EXCUSE, "utf8");

console.log(`wrote ${dest}/entry.txt (${EXCUSE.length} characters)`);
