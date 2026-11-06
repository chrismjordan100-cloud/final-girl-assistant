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
    type='location', season=1, shortName='maple-lane', name='Maple Lane', heading='MAPLE LANE', film='Frightmare on Maple Lane',
    background=G+'S1-location-maple-lane-art.png', flavour=G+'S1-location-maple-lane-flavour.png',
    scenes=[
        dict(title='Maple Lane', kind='intro', images=[(G+'S1-location-maple-lane-board.jpg', None)],
             lines=[("Maple Lane: a quiet suburban street in Spring Hill, at least until someone got murdered.", None),
                    ("Here's how the location plays.", None)]),
        dict(title='Special setup', bullets=['4 Item decks of 3 cards', 'One deck per quadrant', 'Both Convince cards in the Tableau'],
             images=[(P+'24', (0.38, 0.31, 0.99, 0.71))],
             lines=[("Make four Item decks of three cards instead of the usual setup, one for each quadrant of houses, with the top card face up.", None),
                    ("Then add both Convince Action cards to the Action Tableau.", None)]),
        dict(title='Houses and quadrants', bullets=['12 Houses: 3 in each quadrant', 'Every House is a Search space', 'Draw from that quadrant\'s deck', 'Then mark it with an X token'],
             icons=[R+'S1-location-maple-lane-icon-house-space.png', R+'S1-location-maple-lane-icon-searched-house-x.png'],
             images=[(G+'S1-location-maple-lane-board.jpg', None)],
             lines=[("Maple Lane has twelve Houses, three in each quadrant: north-west, south-west, north-east and south-east. Every House is a search space, coloured orange to remind you.", None),
                    ("When you search a House successfully, draw from that quadrant's Item deck. Then put an X token on the House. It can't be searched again.", None)]),
        dict(title='Searching details', bullets=['Two Items found? Keep one', 'Other: face up on top, or face down under', 'Quadrant fully searched?', 'New Items go to the nearest open quadrant'],
             icons=[R+'S1-location-maple-lane-icon-searched-house-x.png'],
             images=[(G+'S1-location-maple-lane-board.jpg', (0.0, 0.2, 0.55, 0.65))],
             lines=[("If a search finds two Items, keep the one you want. Put the other face up on top of that quadrant's deck, or face down at the bottom, as normal.", None),
                    ("If an Item ever needs adding to a quadrant where every House already has an X, add it to the nearest quadrant that isn't fully searched.", None)]),
        dict(title='Occupied Houses', bullets=['Victims inside? You can\'t walk in', 'Walk, Sprint, any movement: no', 'Panicking Victims & Enemies can', 'Empty House: move in and out freely'],
             images=[(G+'S1-location-maple-lane-board.jpg', (0.45, 0.2, 1.0, 0.65))],
             lines=[("The residents are suspicious of outsiders. You can't enter a House with any Victims in it using Walk, Sprint, or any other card that moves you.", None),
                    ("Panicking Victims and Enemies aren't restricted, so they can move into occupied Houses freely.", None),
                    ("An empty House follows the normal movement rules, in and out.", None)]),
        dict(title='Convince', bullets=['Only way into an occupied House', 'Use it from the next Street space', 'Leaving: normal movement', '3+ successes: may take the top Item', 'Then mark that House searched'],
             images=[(P+'24', (0.42, 0.43, 0.67, 0.575))],
             lines=[("To get into an occupied House, use a Convince Action card from the adjacent Street space. It can only be used for that: never to leave, which is normal movement.", None),
                    ("Convince has an extra line for three or more successes: you enter, and you may also take the top Item from that quadrant. If you do, mark the House with an X.", None)]),
        dict(title='Streets', bullets=['Normal spaces + exits = Street spaces', 'The Intersection too', 'No rules of their own', 'Cards target them, e.g. hit by a car'],
             images=[(G+'S1-location-maple-lane-board.jpg', (0.15, 0.35, 0.85, 0.8))],
             lines=[("Every normal space and exit, plus the Intersection, is a Street space. They have no rules of their own, but cards refer to them.", None),
                    ("For example, one Terror card kills a Victim of your choice on a Street space. Keep Victims moving off the roads.", None)]),
        dict(title='Tips', bullets=['Spread searches across quadrants', 'Boost Convince with the Bible', 'Three Horror dice: take an Item'],
             images=[(G+'S1-location-maple-lane-art.png', None)],
             lines=[("A few tips. Each House can only be searched once, so plan routes across all four quadrants.", None),
                    ("The Bible adds two dice to Convince, and with three successes you can take the top Item without searching. Good luck.", None)]),
    ])
