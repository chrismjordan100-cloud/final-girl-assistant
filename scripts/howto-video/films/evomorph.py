# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Series 2 Feature Film rulebook in the project root; P + 'N' is page N.
P = os.path.join(A, '..', '..', 'FeatureFilmRules_S2.pdf') + '#'
# Sharp 600 dpi crops of small cards from that rulebook.
S = os.path.join(os.path.dirname(os.path.abspath(__file__)), 's2img') + '/'

FILM = dict(
    type='killer', season=2, shortName='evomorph', name='The Evomorph', heading='THE EVOMORPH', film='Into the Void',
    background=G+'S2-location-uss-konrad-art.png', flavour=G+'S2-killer-evomorph-flavour.png',
    scenes=[
        dict(title='The Evomorph', kind='intro', images=[(G+'S2-killer-evomorph-art.png', None)],
             lines=[("The Evomorph: something hid in the cargo from Titan-6, and now it's loose on the ship, and it's growing.",
                     "The Evo-morf: something hid in the cargo from Titan-6, and now it's loose on the ship, and it's growing."),
                    ("Here's how it plays.", None)]),
        dict(title='Special setup', bullets=['Evolution card by the Killer board', 'Marker on Hatchling', 'Terror deck: only 8 cards (not 10)', 'Ambush deck: Youngling side up', 'Starts with only 4 health'],
             images=[(S+'evo-evolution.png', None)],
             lines=[("Put the Evolution card by the Killer board with its marker on Hatchling.", None),
                    ("Shuffle the Evomorph's and the location's Terror cards as normal, but use only eight cards, not ten. Shuffle the Ambush cards face down with the light green Youngling side readable. And the Evomorph starts with just four health.", "Shuffle the Evo-morf's and the location's Terror cards as normal, but use only eight cards, not ten. Shuffle the Ambush cards face down with the light green Youngling side readable. And the Evo-morf starts with just four health.")]),
        dict(title='Evolution', bullets=['3 stages: Hatchling → Youngling → Adult', 'EVOLVE is printed on the Bloodlust track', 'Bloodlust reaches EVOLVE: next stage', 'Apply that stage\'s rules at once'],
             images=[(S+'evo-board.png', None)],
             lines=[("The Evomorph has three stages: Hatchling, Youngling and Adult.", "The Evo-morf has three stages: Hatchling, Youngling and Adult."),
                    ("The word EVOLVE appears twice in the effects column of its Bloodlust track. When Bloodlust rises onto an EVOLVE, move the Evolution marker to the next stage and apply that stage's rules straight away.", None)]),
        dict(title='Hatchling', bullets=['Very slow but deadly', 'Bloodlust ONLY rises if it kills a Victim itself', 'Any other Bloodlust increase: ignore it', 'Instead lose 1 Time for each one'],
             images=[(S+'evo-evolution.png', None)],
             lines=[("The Hatchling is slow but very deadly. Attack it at your own risk.", None),
                    ("Bloodlust only goes up when the Hatchling kills a Victim itself. Every other Bloodlust increase, from Terror cards, Events, or Victims dying some other way, is ignored. Instead, you lose one Time for each increase you ignored.", None)]),
        dict(title='Youngling and Adult', bullets=['Youngling: Vanishes at once', 'Bloodlust now rises normally', 'Adult: max health 4 → 10, heals fully', 'Reveal its Dark Power', 'Turn the Ambush deck to the Adult side'],
             images=[(S+'evo-evolution.png', None)],
             lines=[("When it evolves into a Youngling, it immediately Vanishes, and from then on Bloodlust rises normally.", None),
                    ("When the Youngling evolves into an Adult, its maximum health goes from four to ten and it recovers all its health. Reveal its Dark Power card, and rotate the Ambush deck so the dark green Adult side is readable.", None)]),
        dict(title='Vanishing', bullets=['Vanish icon: it disappears at once', 'Killer phase ends there', 'Meeple goes on top of the Terror deck', 'While gone: no Finale action, no Terror card', 'Draw an Ambush card instead'],
             icons=[R+'S2-killer-evomorph-icon-vanish.png'],
             images=[(S+'evo-ambush.png', None)],
             lines=[("Whenever you see the Vanish icon, the Evomorph disappears into the shadows and the Killer phase ends. Take its meeple off the board and put it on top of the Terror deck.", "Whenever you see the Vanish icon, the Evo-morf disappears into the shadows and the Killer phase ends. Take its meeple off the board and put it on top of the Terror deck."),
                    ("While it has vanished, skip every normal step of the Killer phase: no Finale Killer Action and no Terror card. Instead draw one Ambush card and follow the side for its current stage.", None),
                    ("Each side has a red Danger number from one to ten. The higher the number, the nastier the effect. Many Ambush cards bring it back out of nowhere, often in your space, attacking. Reshuffle the Ambush discards if the deck runs out.", None)]),
        dict(title='Scan', bullets=['Only while it has Vanished · costs 1 Time', '3 successes: it appears in YOUR space', '...skip next Killer phase; card removed', '2: Scan token here, −1 Horror', '1: Scan token here, −1 Time'],
             icons=[R+'S2-killer-evomorph-icon-scan-token.png'],
             images=[(S+'evo-scan.png', None)],
             lines=[("You get three new Scan Action cards, and they can only be played while the Evomorph has vanished.", "You get three new Scan Action cards, and they can only be played while the Evo-morf has vanished."),
                    ("With two successes, place a Scan token in your space and lower Horror by one. With one success, place a Scan token and lose one Time. With none, your Horror rises, you lose a Time and your turn ends.", None),
                    ("A Scan token means you know it isn't hiding there, and many Ambush cards can't place it in a space with a Scan token. One token per space; if you run out, move the farthest one.", None),
                    ("With three successes, you ambush it: place the Evomorph in your space, skip the next Killer phase, and remove that Scan card from the game.", "With three successes, you ambush it: place the Evo-morf in your space, skip the next Killer phase, and remove that Scan card from the game.")]),
        dict(title='Dark Powers', bullets=['Each places it near you or by Victims', '...without a Scan token; then clear all Scans', 'Razor Claws: hits cost you an Action card', 'Acid Blood: hurting it in your space costs 1 health', 'Symbiotic Camouflage: draw 2 Ambush, take the worst'],
             images=[(S+'evo-darkpowers.png', None)],
             lines=[("Its Dark Power appears when it becomes an Adult. Each one places it in the closest space to you without a Scan token, then removes all Scan tokens.", None),
                    ("Razor Claws: whenever it damages you, discard a random Action card. Acid Blood: whenever you damage it in your space, you lose one health. Symbiotic Camouflage: draw an extra Ambush card and use the one with the highest Danger.", None),
                    ("Its Epic Dark Power, Razor Tail, kills every Victim in the most crowded unscanned space, and whenever it attacks, it also attacks every adjacent space.", None)]),
        dict(title='Finales', bullets=['Perfect Organism: move twice, attack twice', 'Blitz of Death: two full attacks', 'Death in the Dark: attack, then Vanish', 'Impenetrable Armor: damage to it −2 (min 1)'],
             images=[(S+'evo-darkpowers.png', None)],
             lines=[("Its Finales change its Killer Action. The Perfect Organism moves twice and attacks twice. Blitz of Death attacks two separate targets.", None),
                    ("Death in the Dark attacks and then Vanishes every Killer phase, drawing an extra Ambush card and keeping the worst.", None),
                    ("And its Epic Finale, Impenetrable Armor, reduces all damage you deal it by two, to a minimum of one.", None)]),
        dict(title='Tips', bullets=['Hatchling: avoid fights; starve its Bloodlust', 'Save Scan for when it Vanishes', 'Scan the space you\'ll stand in', '3-success Scan = a free strike'],
             images=[(G+'S2-killer-evomorph-art.png', None)],
             lines=[("A few tips. Don't fight the Hatchling: keep Victims away from it so it can't evolve, and the Time penalty is cheaper than a stronger monster.", None),
                    ("Hold your Scan cards for when it vanishes, and scan the space you plan to stand in.", None),
                    ("A three-success Scan drops it into your space with a skipped Killer phase: the perfect moment to hit it hard. Good luck.", None)]),
    ])
