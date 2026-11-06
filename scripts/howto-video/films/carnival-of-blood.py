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
        dict(title='Item Traps', bullets=['One hidden in each Item deck', 'Found by searching', 'You must resolve it first', 'You can still take the Item'],
             images=[(P+'19', (0.02, 0.10, 0.98, 0.37))],
             lines=[("Each Item deck hides one Item Trap, found only by searching.", None),
                    ("If you draw one, you must resolve it, unless something like Zappo protects you. If the search also found an Item, you can still take it, after the trap.", None)]),
        dict(title='Terror Traps', bullets=['3 Terror Trap cards', 'Trap token goes in YOUR space', 'Victims there are killed', 'Tokens stay all game', 'Enemies ignore them'],
             images=[(P+'18', (0.765, 0.53, 0.90, 0.655))],
             lines=[("Three Terror cards are Terror Traps. When one is drawn, place its Trap token in your space: it hits you and kills any Victims there, straight away.", None),
                    ("Trap tokens stay for the rest of the game, and trigger whenever you or a Victim enter. Enemies ignore them completely.", None)]),
        dict(title='Tips', bullets=['Zappo or Asami dodge Item Traps', 'Charlie can power through', 'One of the hardest locations'],
             images=[(G+'S1-location-carnival-of-blood-art.png', None)],
             lines=[("A few tips. Zappo the monkey or Asami let you avoid Item Traps.", None),
                    ("Charlie can trade health for big Critical Blows once she's made her rescues.", None),
                    ("It's one of the hardest locations in logged games, so map where the Trap tokens land. Good luck.", None)]),
    ])
