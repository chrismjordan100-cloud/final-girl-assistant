# Rule-sheet icon library – Series 4 added

This folder holds the icons that appear on the individual Killer/Location rule
sheets (not the core-game icons). Series 1–3 were already here; **Series 4 adds
62 icons across 12 rule sets**, in exactly the same format.

## Files

| File | What it is |
|---|---|
| `rule-icons.json` | One record per icon (141 total: 79 S1–S3 + 62 S4). Source of truth. |
| `rule-icons.csv` | Same data as the JSON, for spreadsheets. |
| `rulesets.json` | One record per Killer/Location (45 total), listing its icon ids and a note (e.g. "uses core icons only"). |
| `S4-*-icon-*.png` | The new icons: 256×256 transparent PNGs. |
| `_preview-S4.png` | Contact sheet of the S4 icons for a quick visual check. |

Rule-sheet page images for Series 4 are in `src/assets/games/` using the existing
naming (`S4-killer-<name>-<page>.png`, `S4-location-<name>-<page>.png`).
Each icon's `source_sheet` field points at the page it came from.

## Record fields (unchanged from S1–S3)

`file`, `id`, `series` (`S4`), `type` (`killer`/`location`), `ruleset` (slug),
`ruleset_name`, `rule_source`, `icon` (slug), `label`, `description` (plain-English
meaning), `source_sheet`, `reuses_core_icon`, `low_res_source`, `recreated`.

## Series 4 rule sets

| ruleset slug | name | icons |
|---|---|---|
| billy-the-bear | Billy the Bear | 5 |
| buddyland | Buddyland | 5 |
| grimlash | Grimlash | 2 |
| shady-acres | Shady Acres | 8 |
| berith | Berith | 1 |
| larmes-abbey | L'Armes Abbey | 6 |
| volkar | The Volk'ar | 6 |
| pesadilla-verde | Pesadilla Verde | 7 |
| raptors | The Raptors | 3 |
| isla-lagarto | Isla Lagarto | 11 |
| mort | Mort (Shriek Special Feature) | 2 |
| mega-board-game-con | Mega Board Game Con (Shriek Special Feature) | 6 |

## Instruction for Kiro

> In the Icons tab, load `src/assets/icons/rules/rule-icons.json` and
> `rulesets.json` and render every record, grouped by `series` then `ruleset_name`,
> showing the PNG from `file`, the `label` and the `description`. Series 4 entries
> have `series: "S4"`, so add S4 to any series filter or tab list that is currently
> hard-coded to S1–S3. Show a small "low-res source" badge where
> `low_res_source` is true. Rule sets with `icon_count: 0` (or a `note`) should
> still appear with their note. Don't hard-code icon names: everything should come
> from the JSON so future series drop in the same way.

## Notes

- 22 S4 icons are flagged `low_res_source`: they are printed very small on the
  sheets, so they look soft when enlarged.
- The Volk'ar damage token was cut from a stack of overlapping tokens, so one edge
  shows a faint seam.
- Board tokens from the box contents (e.g. Isla Lagarto's parachute, goat and tail;
  Mega Board Game Con's bag, sign, price tag and crowd) are included, but the rule sheets
  don't explain them; the cards that place them do. Their descriptions say so.
- Five tokens are too small on the sheets to identify and are named `unidentified-token…`
  (2 Buddyland, 2 Pesadilla Verde, 1 Shady Acres). Rename them once you've checked the
  physical tokens. The Shady Acres Combine token is labelled "(likely)".
- Where a box has several identical tokens (Buddyland's green token, Shady Acres'
  Harvested token), only one icon is kept and the label says "(x3)".
