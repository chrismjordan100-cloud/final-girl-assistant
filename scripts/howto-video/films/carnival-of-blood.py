# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Series 1 Feature Film rulebook in the project root; 'P + "12"' is page 12.
P = os.path.join(A, '..', '..', 'FeatureFilmRules.pdf') + '#'

FILM = dict(
    type='location', season=1, shortName='carnival-of-blood', name='The Carnival of Blood', heading='THE CARNIVAL OF BLOOD', film='Carnage at the Carnival',
    background=G+'S1-location-carnival-of-blood-art.png', flavour=G+'S1-location-carnival-of-blood-flavour.png',
    scenes=[
        dict(title='The Carnival of Blood', kind='intro', images=[(G+'S1-location-carnival-of-blood-board.jpg', None)],
             lines=[("The Carnival of Blood: a travelling show where some visitors never make it home.", None),
                    ("Here's how the location plays.", None)]),
        dict(title='Special setup', bullets=['Set the 3 Item Traps aside', '3 decks: 2 Items + 1 Trap each', 'Shuffle each deck', '1 Item face up on top'],
             images=[(P+'18', (0.74, 0.40, 0.92, 0.515))],
             lines=[("Set the three Item Trap cards aside and shuffle the other Items.", None),
                    ("Deal three face-down decks of two Items, add one Item Trap to each, and shuffle each deck. Then put one Item face up on top of each.", None)]),
        dict(title='Item Traps', bullets=['One hidden in each Item deck', 'Found only by searching', 'Drawn? You MUST resolve it', 'Found an Item too? Trap first, then take it', 'Discarded after (unless it says)'],
             images=[(P+'19', (0.02, 0.10, 0.98, 0.37))],
             lines=[("There are two kinds of trap here. First, Item Traps: one is hidden somewhere in each Item deck, and you only find them by searching.", None),
                    ("If a successful search draws an Item Trap, you must resolve it, unless something protects you, like Zappo the monkey.", None),
                    ("If the same search also found an Item, you can still keep the Item, but resolve the trap first. Item Traps are discarded afterwards unless the card says otherwise.", None)]),
        dict(title='Hidden Cobra and friends', bullets=['Hidden Cobra: sits by your Final Girl card', 'Lose health every Upkeep', 'Next time you\'d heal: discard it instead'],
             images=[(P+'18', (0.74, 0.40, 0.92, 0.515))],
             lines=[("For example, the Hidden Cobra trap stays next to your Final Girl card. It hurts you every Upkeep, and the next time you would recover health, you discard the trap instead of healing.", None)]),
        dict(title='Terror Traps', bullets=['3 Terror Trap cards in the Terror deck', 'Place the Trap token in YOUR space', 'It hits you and kills Victims there', 'Then finish the Terror card'],
             images=[(P+'18', (0.765, 0.53, 0.90, 0.655))],
             lines=[("Second, Terror Traps. Three of the location's Terror cards are traps, drawn in the Killer phase like any other Terror card.", None),
                    ("When one tells you to place its Trap token, put it in your current space. It goes off immediately, on you and on every Victim there.", None),
                    ("Victims are always killed. What it does to you depends on the trap. Then finish resolving the Terror card and discard it as normal.", None)]),
        dict(title='The three Terror Traps', bullets=['Rope Trap: discard a random Action card', 'Floor Blades: roll 2 dice', '1–4: take 1 damage · 5–6: may move 1', 'Acid Pitfall: costs you straight away'],
             images=[(P+'18', (0.765, 0.53, 0.90, 0.655))],
             lines=[("The Terror Trap reference card lists them. The Rope Trap makes you discard one Action card at random.", None),
                    ("The Spinning Floor Blade trap makes you roll two dice: each one to four does one damage, and each five or six lets you move one space.", None),
                    ("And the Acid Pitfall hurts you straight away, as shown on the reference card.", None)]),
        dict(title='Trap tokens stay', bullets=['Tokens stay all game', 'Enter a trapped space: it fires again', 'Victims entering are killed', 'Enemies ignore traps completely'],
             images=[(G+'S1-location-carnival-of-blood-board.jpg', None)],
             lines=[("Trap tokens are never discarded. They stay on the board for the rest of the game.", None),
                    ("Every time you, or a Victim, enter or are in a space with a Trap token, it goes off again. Victims are killed; you suffer its effect.", None),
                    ("Enemies are never affected by traps, so the Killer walks straight through them. Plan your routes, and your Victims' routes, around trapped spaces.", None)]),
        dict(title='Tips', bullets=['Zappo or Asami dodge Item Traps', 'Charlie can power through', 'One of the hardest locations'],
             images=[(G+'S1-location-carnival-of-blood-art.png', None)],
             lines=[("A few tips. Zappo the monkey or Asami let you avoid Item Traps.", None),
                    ("Charlie can trade health for big Critical Blows once she's made her rescues.", None),
                    ("It's one of the hardest locations in logged games, so map where the Trap tokens land. Good luck.", None)]),
    ])
