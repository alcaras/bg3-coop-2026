# BG3 Build Plan - Project Documentation

## Project Overview

Co-op BG3 playthrough for two players with four characters, optimized gear allocation, and chronological playthrough routing. Published as a GitHub Pages site.

## Co-Op Setup

**Player 1:** Shadowheart + Minthara (melee characters)
**Player 2:** Varria + Astarion (ranged characters)
**Temporary:** Lae'zel fills in until Minthara joins permanently in Act 2

## GitHub Pages

- **Site:** https://alcaras.github.io/bg3-coop-2026/
- **Repo:** alcaras/bg3-coop-2026
- **Theme:** just-the-docs (dark mode) with custom CSS in `docs/_includes/head_custom.html`
- **Build:** GitHub Actions workflow (`.github/workflows/pages.yml`) using Ruby/Bundler
- **Source:** `docs/` directory

## File Structure

### Source Material
- `guides/shadowheart.md` - Reddit SSB guide (Smite Swords Bard)
- `guides/visara.md` - Reddit Fire Sorlock guide (character renamed to Varria)
- `guides/minthara.md` - Reddit Sorcadin guide
- `guides/astarion.txt` - Gloom Stalker Assassin guide (web)

### Reference Data
- `reference/Gear Locator Guide - Act One.csv` - Item locations + sources
- `reference/Gear Locator Guide - Act Two.csv`
- `reference/Gear Locator Guide - Act Three.csv`
- `reference/act1.html`, `act2.html`, `act3.html` - Detailed HTML item guides

### GitHub Pages Site (docs/)
- `docs/_config.yml` - Jekyll config (just-the-docs theme, dark mode)
- `docs/Gemfile` - Ruby dependencies
- `docs/_includes/head_custom.html` - Custom dark CSS (gold accents, styled tables, sticky headers, act section styles)
- `docs/_includes/footer_custom.html` - Loads `checkboxes.js` for interactive gear tracking
- `docs/assets/js/checkboxes.js` - localStorage-based checkbox persistence + collapsible act state
- `docs/index.md` - Landing page with guide links
- `docs/playthrough.md` - Master playthrough guide with checkable gear pickups and collapsible acts
- `docs/combat.md` - Combat cheat sheet (rotations, toggles, elixirs for second monitor)
- `docs/gear.md` - Final gear assignments (BiS) for all characters
- `docs/coop.md` - Co-op coordination (positioning, Counterspell priority, Command coordination)
- `docs/shadowheart.md` - SSB 10/2 Paladin leveling guide
- `docs/varria.md` - Fire Sorlock 11/1 leveling guide
- `docs/astarion.md` - Gloom Stalker Assassin leveling guide
- `docs/minthara.md` - Dark Knight Sorcadin leveling guide
- `docs/laezel.md` - Temporary Battle Master Fighter guide

### Working Copies (dist/)
- `dist/` contains the same guides without Jekyll front matter
- `dist/old/` contains superseded files from v1

## Interactive Features

- **Gear checkboxes:** All `- [ ]` items in playthrough.md are interactive. Check off items as acquired — state persists via localStorage.
- **Collapsible acts:** ACT 1/2/3 sections in playthrough.md collapse independently. State persists via localStorage.
- **Sticky table headers:** Long gear tables keep column headers visible when scrolling.
- **Implementation:** External JS file (`docs/assets/js/checkboxes.js`) loaded via `footer_custom.html`. Replaces kramdown's disabled checkboxes with interactive clones.

## Party Configuration

**Gear Priority:** Varria > Shadowheart > Astarion > Minthara

### Characters
1. **Varria** (Priority #1) - Fire Sorcerer 11 / Fiend Warlock 1
   - Role: Ranged caster — Scorching Ray burst, Fireball AoE, Extended Command control
   - Core Items: Hat of Fire Acuity, Markoheshkir, Rhapsody, Cloak of the Weave, Hellrider Longbow
   - Warlock dip at Level 7
   - No Hag's Hair (goes to SH)

2. **Shadowheart** (Priority #2) - Smite Swords Bard 10 / Paladin 2
   - Role: Melee burst carry + crowd control
   - Core Items: Shar's Spear, Bhaalist Armour, Helmet of Arcane Acuity, Band of Mystic Scoundrel
   - Respec at Level 7 (1 Pal → 6 Bard for Heavy Armor)
   - Hag's Hair: +1 STR (more impactful than Varria's CHA due to Bhaalist piercing doubling)
   - Cloak of Protection (Cloak of the Weave goes to Varria)

3. **Astarion** (Priority #3) - Ranger 5 / Rogue 4 / Fighter 2 / Cleric 1
   - Role: Ranged burst striker (Titanstring Bow + surprise rounds)
   - Core Items: Titanstring Bow, Club of Hill Giant Strength
   - Uses STR elixirs or Club for Titanstring scaling

4. **Minthara** (Priority #4) - Oathbreaker Paladin 7 / White Draconic Sorcerer 5
   - Role: Melee tank/support (Aura of Protection is the key party buff)
   - Core Items: Balduran's Giantslayer, Helldusk Armour, Gauntlets of Hill Giant Strength
   - Joins permanently in Act 2, immediate respec needed
   - Note: Aura of Hate only buffs Minthara herself (not party members)

5. **Lae'zel** (Temporary) - Battle Master Fighter
   - Frontliner for Act 1 + early Act 2
   - Gear transfers to Minthara when she joins

## Key Gear Conflicts Resolved

| Item | Wanted By | Goes To | Alternative |
|------|-----------|---------|-------------|
| Cloak of the Weave | Varria, SH | Varria | SH → Cloak of Protection |
| Hellrider Longbow | Varria, SH | Varria | SH → Bow of Awareness |
| Hag's Hair | Varria, SH | SH (+1 STR) | Varria accepts 19 CHA (DC still 28+ with Acuity) |
| Helldusk Boots | Minthara, Ast | Minthara | Ast → Boots of Persistence |
| Shar's Spear | SH, Min | SH | Min → Balduran's Giantslayer |
| Bhaalist Armour | SH | SH | Min → Helldusk Armour |

## Jekyll / Kramdown Notes

- `theme: just-the-docs` in _config.yml (NOT `remote_theme` — that doesn't work with custom Actions workflow)
- Kramdown requires blank lines between headings and tables, otherwise tables render as raw text
- `<details>` with `<div markdown="1">` enables markdown inside HTML spoiler blocks
- Task list checkboxes (`- [ ]`) render as `<input type="checkbox" disabled>` — the JS replaces them with interactive clones
- Custom CSS goes in `head_custom.html` (inline `<style>` tag), custom JS goes in `footer_custom.html` (external `<script>` tag)

## Usage

1. **During gameplay:** Open https://alcaras.github.io/bg3-coop-2026/ on second monitor
2. **Playthrough guide:** Check off gear as you acquire it — persists between sessions
3. **Combat cheat sheet:** Quick-reference rotations, toggles, elixirs during fights
4. **Co-op coordination:** Positioning rules, Counterspell/Command/concentration assignments
5. **At level-ups:** Click character name in sidebar for leveling reference
6. **Contested items:** Follow priority order (Varria > SH > Ast > Min)
7. **Story spoilers:** Behind collapsible `<details>` tags on the site

**Version:** v4
**Updated:** February 2026
**Difficulty Target:** Normal Mode (Player 2 is newer to BG3)
