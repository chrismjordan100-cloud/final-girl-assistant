/* The prompt to give Claude each time a new How-to-play video is wanted.
   Shown (with a Copy button) in Asset Admin → Training videos, and kept in
   VIDEO-PROMPT.md at the project root. Replace the [square brackets] first. */
export const VIDEO_PROMPT = `Make a How-to-play video for the Final Girl [Killer / Location] "[NAME]" (Series [N], [FEATURE FILM]) for my Final Girl Rule Assistant, in exactly the same format as the Volk'ar and Pesadilla Verde videos.

1. Work in the GitHub repo chrismjordan100-cloud/final-girl-assistant and push to main yourself when done. Don't hand me commands to run.

2. Use the existing builder, unchanged: run scripts/howto-video/setup.sh, then copy scripts/howto-video/films/volkar.py (for a Killer) or scripts/howto-video/films/pesadilla-verde.py (for a Location) to scripts/howto-video/films/[shortName].py, taking the season and shortName from src/data/games.js. Don't edit build.py: it fixes the house style (voice, layout, fonts, colours, subtitles, length limit).

3. Rules: take them from the rule-sheet pages in src/assets/games/S[season]-[killer|location]-[shortName]-1.png, -2.png… and the Feature Film rulebook PDFs in the project root (FeatureFilmRules.pdf, _S2, _S3, and the s4-rules-pdf folder), cross-checked against the rulespal.com rulebook for that film. Rulebook PDF pages can be used as images too: write P + 'N' for page N (see the Season 1 film scripts).

4. Graphics: from the tracker: the -art and -flavour images, crops of the rule-sheet pages, token icons in src/assets/icons/ and src/assets/icons/rules/, and setup cards in src/assets/cards/. No other web images, except the location board below.

   Location boards must be sharp. Never use a board cropped from a rule sheet or rulebook page: they are far too low-res. Use src/assets/games/S[season]-location-[shortName]-board.jpg. If it doesn't exist yet, make it: the publisher's shop (vanrydergames.com, a Shopify store; /products.json lists every image) has a 3000x2000 "FFn-compview.png" for most Feature Films with the board laid out at an angle. Ask me before downloading it, download it through the in-app browser on my PC into Downloads, straighten the board with a perspective warp (see the Season 1 boards, about 1580 px wide), and save it under that name so the app keeps it too. If no sharp board can be found, tell me rather than using a blurry one. Show the board in the intro and in the scene about the board's spaces.

5. Structure, in this order:
   - Intro: flavour + key art, a one-line hook, then "Here's how she/he/it plays."
   - Special setup.
   - 4 to 6 scenes on the special rules, in the order you meet them in play.
   - A Tips scene with 3 or 4 tips. Use the tips already in src/data/communityTips.js and src/data/games.js for this entry first. In your reply, tell me which tips are your own reasoning rather than sourced.
   Each scene: a short title, 3 to 5 bullets of about 6 words, 1 or 2 cropped tracker images, and token icons where they help.

6. Narration: British spelling, plain friendly English, under 2 minutes in total (the builder stops if it's longer). Spell tricky names phonetically in the spoken text only; the subtitles keep the real spelling.

7. Check before rendering: run the builder in "frames" mode and look at every frame. Fix any image that is tiny, cut off or blurry.

8. Render in "video" mode. It writes src/assets/videos/S[season]-[killer|location]-[shortName]-video.mp4, which the This Game tab and the Training videos checklist in Asset Admin pick up automatically. Commit the video, the film script and its .srt, push, and send me the MP4 too.`;
