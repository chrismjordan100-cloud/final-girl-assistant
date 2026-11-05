# Series 4 Tips – ready to add to the Tips tab

Researched 5 Nov 2026. What's out there so far:

- **One proper source per film:** Dude Take Your Turn (dudetakeyourturn.ca), the same blog
  the existing Strategy Tips Handbook leaned on most. It has reviews of all six Series 4
  films, based on 3–4 plays each.
- **Difficulty ratings** from Redesign Insert's box guide.
- **No published tips yet for Series 4 killers at other locations** (cross-pairings).
  Every reviewer played each killer at its own location. The "pairing ideas" below
  are reviewers' suggestions, not tested results, and are worded that way.
- Where the official rules sheet or Chris's card photos confirm a tip, it's marked
  `'confirmed'`. Everything else uses no confidence, so the app shows "Reported".

---

## Instruction for Kiro

Add the entries below to `src/data/games.js`, using the existing `tip(text, source, confidence)` helper.
- The `KILLER` entries go into `killerTips`, under keys `billy`, `grimlash`, `berith`, `volkar`, `raptors`, `mort`.
- The `LOCATION` entries go into `locationTips`, under keys `buddyland`, `'shady-acres'`, `'larmes-abbey'`, `'pesadilla-verde'`, `'isla-lagarto'`, `megabgcon`.
- If a key already exists, append to it. Don't touch tips for other killers or locations.

Check that the Tips tab shows them for each Series 4 killer and location.

```js
// ---------- killerTips additions ----------
billy: [
  tip('Billy only heals while at least one Power Source is Active. Switching them off is your first job.', 'Bad Times at Buddyland rules', 'confirmed'),
  tip('You can switch off a Power Source for 1 Time just by moving through its space. Plan routes that pass through them.', 'Bad Times at Buddyland rules', 'confirmed'),
  tip('Buddies act before Billy and hit anything in their space. Killing one gives a small reward (movement or less Horror), but don’t get swarmed.', 'Dude Take Your Turn · Buddyland review'),
  tip('Billy Jr. sits in Billy’s space and has to die before you can hit Billy.', 'Dude Take Your Turn · Buddyland review'),
  tip('Watch for terror cards that turn Power Sources back on or add a fifth one. They undo your progress.', 'Dude Take Your Turn · Buddyland review'),
  tip('One of the easier Series 4 killers. The reviewer beat him before the Finale in two of three games.', 'Dude Take Your Turn · Buddyland review'),
  tip('Pairing idea (untested): try Billy at a tougher location, e.g. the USS Konrad, if he feels too easy at Buddyland.', 'Dude Take Your Turn · Buddyland review'),
],
grimlash: [
  tip('Harvest Madness is push-your-luck: higher levels give better bonuses, but reaching the skull is an instant loss.', 'Dude Take Your Turn · Rotten Harvest review; Redesign Insert'),
  tip('A heart symbol either heals you OR lowers Madness, never both. Choose based on which track is closer to killing you.', 'Dude Take Your Turn · Rotten Harvest review'),
  tip('Grimlash’s terror cards add Horror directly. Keep Horror-reducing cards in hand.', 'Dude Take Your Turn · Rotten Harvest review'),
  tip('Rite of the Corrupted raises Madness every turn unless your actions already did. Plan for it.', 'Dude Take Your Turn · Rotten Harvest review'),
  tip('Get out of a space with Flaming Eyes as soon as you can.', 'Dude Take Your Turn · Rotten Harvest review'),
  tip('Burning Sickle kills a victim and hits you in one go. Don’t stand with victims when it’s likely.', 'Dude Take Your Turn · Rotten Harvest review'),
  tip('Joy did much better than Vicky here. The reviewer won with Joy and lost twice with Vicky.', 'Dude Take Your Turn · Rotten Harvest review'),
],
berith: [
  tip('Winning takes two steps: kill possessed Ursula, then she must come back to life. You win only if at least one Divine Blessing token shows health.', 'A Demon in the Shadows rules', 'confirmed'),
  tip('Don’t rush the kill. Every Expel Demon you land before she dies adds a Blessing token and improves your odds.', 'A Demon in the Shadows rules', 'confirmed'),
  tip('Odds are poor if you only expel a few times: only a few of the black Final Health tokens carry health. Aim to fill as much of the Blessings sheet as you can.', 'Dude Take Your Turn · Demon in the Shadows review'),
  tip('Expel Demon can only be played in Ursula’s space, so you’ll be close to her a lot. Bring health and reactions.', 'A Demon in the Shadows rules', 'confirmed'),
  tip('Save victims early. Lamb to the Slaughter can wipe out victims later in the game.', 'Dude Take Your Turn · Demon in the Shadows review'),
  tip('Rejecting God stops you stocking Action cards. Keep reaction cards in hand before it lands.', 'Dude Take Your Turn · Demon in the Shadows review'),
  tip('Blowing up the USS Konrad also kills Ursula, so that shortcut loses the game.', 'Dude Take Your Turn · Demon in the Shadows review'),
  tip('Berith is fast unless you keep Bloodlust low.', 'Dude Take Your Turn · Demon in the Shadows review'),
],
volkar: [
  tip('Attacking her while Concealed means guessing where her Path ends. A wrong guess triggers that card’s Ambush Penalty.', 'Green Terror rules; Dude Take Your Turn review', 'confirmed'),
  tip('The Track action reveals her hidden Movement cards. A big roll can reveal the Origin card and make your attack almost certain to land.', 'Dude Take Your Turn · Green Terror review'),
  tip('Self-Destruct is a race. Kill her and reach an Exit before the last Countdown token goes. It nearly beat the reviewer.', 'Dude Take Your Turn · Green Terror review'),
  tip('Guerilla Warfare is the most punishing Finale.', 'Dude Take Your Turn · Green Terror review'),
  tip('A Booby Trap placed on her likely Path is very effective.', 'Dude Take Your Turn · Green Terror review'),
  tip('Rated Expert difficulty, the hardest Series 4 killer.', 'Redesign Insert box guide'),
],
raptors: [
  tip('The Pack’s health is the number of raptors in it, starting at 5 with no upper limit. Thin it out early before it snowballs.', 'Raptor Games rules', 'confirmed'),
  tip('Kill the Pack and you win, even if loose raptors are still on the board.', 'Raptor Games rules', 'confirmed'),
  tip('Loose raptors have 1 health. Kill them before they rejoin the Pack and add to its health.', 'Raptor Games rules', 'confirmed'),
  tip('Scaly Hide stops Retaliate hurting the Pack, so don’t rely on it.', 'Dude Take Your Turn · Raptor Games review'),
  tip('In most Finales the Pack moves at full speed and attacks twice. Have a Net or protection ready.', 'Dude Take Your Turn · Raptor Games review'),
  tip('Tough: the reviewer lost all four games, one narrowly.', 'Dude Take Your Turn · Raptor Games review'),
],
mort: [
  tip('Clear suspects as early as you can. A cleared suspect’s Killer action does nothing.', 'Dude Take Your Turn · Shriek review'),
  tip('Reveal all five clues before the Terror deck runs out. Every unrevealed clue doubles Anonymous Terror in the Finale.', 'Dude Take Your Turn · Shriek review'),
  tip('Minor Dark Powers such as Notorious Reputation go away after a successful Interrogate or Coerce. Do one quickly.', 'Dude Take Your Turn · Shriek review'),
  tip('Mort has lots of ways to raise Horror, so keep Horror-reducing cards coming.', 'Dude Take Your Turn · Shriek review'),
  tip('Pairing idea (untested): the reviewer wants to try a simple killer such as Hans or Krampus at Mega Board Game Con.', 'Dude Take Your Turn · Shriek review'),
],

// ---------- locationTips additions ----------
buddyland: [
  tip('Items are in the Dining Area, Prize Counter and Ball Pit, and searching here is worth it.', 'Dude Take Your Turn · Buddyland review'),
  tip('The Extension Cord lets you hit enemies in the Arcade from in or next to it. The Fire Axe one-shots the toughest Buddy.', 'Dude Take Your Turn · Buddyland review'),
  tip('Nick the Janitor deals 2 damage when led into an enemy’s space, enough to kill most Buddies.', 'Dude Take Your Turn · Buddyland review'),
  tip('Exits are close together, so rescues are easier than usual. The Party Room is a safe spot for the Birthday Girl.', 'Dude Take Your Turn · Buddyland review'),
  tip('It’s Play Time is brutal without enough Activity cards, and Earthquake can strike just as you reach an Exit.', 'Dude Take Your Turn · Buddyland review'),
  tip('Gwynn shines anywhere Horror climbs fast. The reviewer suggests her for the Sacred Groves.', 'Dude Take Your Turn · Buddyland review'),
],
'shady-acres': [
  tip('Setup uses 14 victims, not 12, on a cramped map, so they die fast. Rescue early.', 'Dude Take Your Turn · Rotten Harvest review'),
  tip('All three search spaces need detours. Plan your search route before you set off.', 'Dude Take Your Turn · Rotten Harvest review'),
  tip('Combine Keys harvest corn fields and add a space to Walk (not Sprint). Sally McCoy gives you the keys.', 'Dude Take Your Turn · Rotten Harvest review'),
  tip('Save the Harvest Cultist for Horror removal before he walks to you and the Killer. His death has no penalty.', 'Dude Take Your Turn · Rotten Harvest review'),
  tip('Children come back after you kill them, and three sacrifices bring out an Ancient Curse. Keep the Cornhusk Effigy for a curse you can’t avoid.', 'Dude Take Your Turn · Rotten Harvest review'),
],
'larmes-abbey': [
  tip('Fourteen Malice tokens on the board is an instant loss. Use Benediction (1 Time) to clear your space and the ones next to it.', 'Dude Take Your Turn · Demon in the Shadows review; Redesign Insert'),
  tip('Any Horror Roll in a Malice room swaps a die for the cursed die. Blessed and cursed dice cancel out.', 'Dude Take Your Turn · Demon in the Shadows review'),
  tip('Two branches meet at the Cloister and the search spaces are far apart, so routing matters.', 'Dude Take Your Turn · Demon in the Shadows review'),
  tip('Keep Father Damian close: he gives the blessed die and removes Malice. But if he dies in your space, you take 3 Horror.', 'Dude Take Your Turn · Demon in the Shadows review'),
  tip('Black Mass floods the board with Malice. Treat it as an emergency.', 'Dude Take Your Turn · Demon in the Shadows review'),
  tip('Rated one of the best boards in the whole game.', 'Redesign Insert box guide; Strategy Tips Handbook'),
],
'pesadilla-verde': [
  tip('The river only flows one way. You can cross it and go downstream, but going upstream needs the Wet Suit.', 'Pesadilla Verde cards (photo-checked)', 'confirmed'),
  tip('Keep Sgt. Weathers alive. His death gives +2 Horror.', 'Pesadilla Verde cards (photo-checked)', 'confirmed'),
  tip('The Rebel Leader has no death penalty, so you can let him go.', 'Dude Take Your Turn · Green Terror review'),
  tip('"Get to the Choppa!" is the best event. It brings the Huey back, and every Victim saved with it earns a reward.', 'Dude Take Your Turn · Green Terror review'),
  tip('A Grenade in your backpack adds 2 damage to a Compound Bow shot.', 'Pesadilla Verde cards (photo-checked)', 'confirmed'),
  tip('Mini-Gun and M16 are the strongest weapons. Two Bowie Knives together are a solid budget option.', 'Dude Take Your Turn · Green Terror review'),
  tip('Avoid the Cursed Idol. Once it’s faceup you can’t use Search Action cards until you dump it at the Cursed Temple.', 'Pesadilla Verde cards (photo-checked)', 'confirmed'),
  tip('Alois and Dakota pay Health or Horror to save victims, but their Ultimates are very strong. Unlock early.', 'Dude Take Your Turn · Green Terror review'),
  tip('Pairing idea (untested): the reviewer wants to try this board with a more ordinary killer.', 'Dude Take Your Turn · Green Terror review'),
],
'isla-lagarto': [
  tip('Electric fences switch each Upkeep and can cut the island in two. Check them before planning a move.', 'Dude Take Your Turn · Raptor Games review'),
  tip('Once the T-Rex is free it rampages after the Killer moves. Try to lure the Pack into its path, and stay out of it yourself.', 'Dude Take Your Turn · Raptor Games review'),
  tip('Don’t kill the Terrified Child: it maxes Bloodlust. Saving her unlocks your Ultimate whatever your victim count.', 'Dude Take Your Turn · Raptor Games review'),
  tip('Search spaces are close together, which helps.', 'Dude Take Your Turn · Raptor Games review'),
  tip('Best items: Tranquilizer Gun (stops an adjacent Killer), Net (cancels a second attack), Enhanced Goggles, Shotgun.', 'Dude Take Your Turn · Raptor Games review'),
  tip('Stay spread out near the Airstrip: a Brontosaurus stampede punishes clustering.', 'Dude Take Your Turn · Raptor Games review'),
],
megabgcon: [
  tip('Don’t forget booth Upkeep: roll a die. On 1–3 a victim joins a booth, on 4–6 draw a booth event.', 'Dude Take Your Turn · Shriek review'),
  tip('Victims in booths won’t follow you. Use Create a Panic (or the Deodorant) to get them moving first.', 'Dude Take Your Turn · Shriek review'),
  tip('Moving from a double blue arrow space into a blue arrow space gives an extra Horror die. Hallways and back rooms are good for this.', 'Dude Take Your Turn · Shriek review'),
  tip('You can search anywhere. Pick the item pile that matches your room type.', 'Dude Take Your Turn · Shriek review'),
  tip('Best item: the Giant Board Game (two uses, +2 damage each).', 'Dude Take Your Turn · Shriek review'),
  tip('Maureen and Adrianne need saved victims to work. The reviewer would avoid using them at Station 2891.', 'Dude Take Your Turn · Shriek review'),
],
```

## Sources
- Dude Take Your Turn reviews of Bad Times at Buddyland, A Demon in the Shadows,
  A Rotten Harvest, The Green Terror, The Raptor Games and Shriek: dudetakeyourturn.ca/final-girl-reviews/
- Redesign Insert, "All 20+ Feature Film Boxes Compared": difficulty ratings
- Official Series 4 rules sheets (in `s4-rules-pdf/`) and Chris's Pesadilla Verde card photos: the `'confirmed'` tips
