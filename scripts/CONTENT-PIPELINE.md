# Content Pipeline & Publishing Cadence

## Files

- **`content-pipeline.csv`** — the queue. 37 articles prioritized across 3 tiers.
- **`next-content-brief.mjs`** — prints the next Queued item as JSON.
- **`mark-content-drafted.mjs`** — marks a row as Drafted or Published after work is done.

## Cadence

**Tuesday 06:00 ET + Thursday 06:00 ET** (10:00 UTC). Two articles per week. At 37 articles in the pipeline, this clears in ~18 weeks.

This cadence is Google-friendly:
- **Consistent** — Google's freshness signals reward predictable publishing patterns over bursts.
- **Sustainable** — 2/week is the upper bound for a single-author site without quality degradation.
- **Topic-cluster aware** — Tier 1 items front-load the highest commercial intent and topical authority work; Tier 3 long-tail items follow.
- **Avoids content-farm signals** — never publishes 5+ articles in a single day.

## How the routine works

A scheduled remote agent fires twice weekly. On each firing, it:

1. Runs `node scripts/next-content-brief.mjs` to pick the highest-priority Queued item.
2. Drafts the article in `src/content/blog/<slug>.md` with `draft: true` in frontmatter, target word count, TOC at top, internal links to existing posts, target keyword used naturally throughout.
3. Runs `node scripts/mark-content-drafted.mjs <slug>` to update the pipeline row to `Drafted` with today's date.
4. Commits the draft + pipeline update to a `content-drafts` branch (never master).
5. Returns a summary.

The user reviews the draft in the `content-drafts` branch, edits as needed, flips `draft: false`, merges to master. The Tuesday cadence is publishing-day; Thursday cadence is for the next-up review.

## Manual override

To draft an article ahead of schedule or out of order: pick a slug from the CSV, run `node scripts/next-content-brief.mjs` to get the brief, write it manually, then `node scripts/mark-content-drafted.mjs <slug>`.

## Adding new gaps

Append rows to `content-pipeline.csv` keeping the priority numeric ordering. Lower number = higher priority. The next-brief script orders strictly by Priority field.

## Pausing the schedule

If you want to pause publishing (vacation, content review backlog, etc.), update the schedule routine via the Schedule skill rather than letting drafts pile up.
