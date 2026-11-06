/* The prompt to give Claude each time a new season of How-to-play videos is
   wanted. Shown (with a Copy button) in Asset Admin → Training videos, and
   kept in VIDEO-PROMPT.md at the project root. Fill in [SEASON] first. */
export const VIDEO_PROMPT = `Make the How-to-play videos for every Killer and every Location in Final Girl Season [SEASON] that doesn't have one yet, for my Final Girl Rule Assistant, in exactly the same format as the existing videos. Do the whole season in one go: don't stop to ask me between videos.

1. Work in the GitHub repo chrismjordan100-cloud/final-girl-assistant and push to main yourself. Don't hand me commands to run. Use the task list so I can see progress.

2. Which videos: every entry in src/data/games.js (killers and locations, including that season's vignettes) with season [SEASON] whose src/assets/videos/S[SEASON]-[killer|location]-[shortName]-video.mp4 is missing. List them first, then make one film script each.

3. Use the existing builder, unchanged: run scripts/howto-video/setup.sh, then for each entry copy the closest existing film script in scripts/howto-video/films/ (dr-fright.py or volkar.py for a Killer, maple-lane.py or pesadilla-verde.py for a Location) to scripts/howto-video/films/[shortName].py. Don't edit build.py: it fixes the house style (voice, layout, fonts, colours, subtitles). There is no length limit.

4. Rules come first, and must be thorough. The point of the video is that I can play from it without stopping to check the rulebook. Take the rules from the rule-sheet pages in src/assets/games/S[SEASON]-[killer|location]-[shortName]-1.png, -2.png… and the Feature Film rulebook PDFs in the project root (FeatureFilmRules.pdf, _S2, _S3, and the s4-rules-pdf folder), cross-checked against the rulespal.com rulebook for that film. Then:
   - Cover every special rule, in the order you meet it in play, one idea per scene, with as many scenes as it takes.
   - Explain how each mechanic actually works: when it triggers, what you do step by step, the exceptions and edge cases, and what happens to Victims and Enemies. Give the actual numbers from the cards (costs, levels, rolls, ranges, damage). Use a short worked example when a rule is fiddly.
   - Include the killer's Dark Powers, Epic Dark Power, Finale cards and any Terror or Event cards that change the rules, saying exactly what each does.
   - Never water a rule down to make it simpler. If a card's wording is unclear to you, say what the card shows rather than guessing, and list those spots in your reply.
   - Setup and Tips stay brief (one scene each), because the app covers them elsewhere. A Killer or Location with no special rules says so briefly, then covers what to watch for.

5. Graphics: from the tracker: the -art and -flavour images, crops of the rule-sheet pages and rulebook PDF pages (write P + 'N' for page N; see the Season 1 film scripts), token icons in src/assets/icons/ and src/assets/icons/rules/, and setup cards in src/assets/cards/. No other web images, except the location boards below.

   Location boards must be sharp. Never use a board cropped from a rule sheet or rulebook page: they are far too low-res. Use src/assets/games/S[SEASON]-location-[shortName]-board.jpg. If it doesn't exist yet, make it: the publisher's shop (vanrydergames.com, a Shopify store; /products.json lists every image) has a 3000x2000 "FFn-compview.png" for most Feature Films with the board laid out at an angle. Ask me once, for the whole season, before downloading them; download them through the in-app browser on my PC into Downloads, straighten each board with a perspective warp (see the Season 1 boards, about 1580 px wide), and save it under that name so the app keeps it too. If no sharp board can be found, tell me rather than using a blurry one. Show the board in the intro and in the scenes about the board's spaces.

6. Tips: 3 or 4, from src/data/communityTips.js and src/data/games.js for that entry first. In your reply, tell me which tips are your own reasoning rather than sourced.

7. Narration: British spelling, plain friendly English. Spell tricky names phonetically in the spoken text only; the subtitles keep the real spelling (the builder already says "Mr." and "Dr." properly).

8. Check before rendering: run the builder in "frames" mode for every film and look at every frame. Fix any image that is tiny, cut off, blank or blurry.

9. Render each in "video" mode. It writes src/assets/videos/S[SEASON]-[killer|location]-[shortName]-video.mp4, which the This Game tab and the Training videos checklist in Asset Admin pick up automatically. Commit and push as each video finishes (video, film script and its .srt), then send me all the MP4s at the end with a one-line summary of each.`;
