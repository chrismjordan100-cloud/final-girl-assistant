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
        dict(title='Houses and quadrants', bullets=['12 Houses in 4 quadrants', 'Every House is a Search space', 'Search once, then mark it X', 'Street spaces: cards refer to them'],
             icons=[R+'S1-location-maple-lane-icon-house-space.png', R+'S1-location-maple-lane-icon-searched-house-x.png'],
             images=[(G+'S1-location-maple-lane-board.jpg', None)],
             lines=[("There are twelve Houses, three in each quadrant, and every House counts as a Search space.", None),
                    ("A successful search draws from that quadrant's deck, then the House gets an X token and can't be searched again.", None)]),
        dict(title='Convince', bullets=['Can\'t walk into an occupied House', 'Use a Convince card to get in', 'Leave with normal movement', 'Empty Houses: move freely'],
             images=[(P+'24', (0.42, 0.43, 0.67, 0.575))],
             lines=[("The residents are suspicious, so you can't walk into a House with Victims in it.", None),
                    ("Use a Convince card from the next Street space to get in. Leaving is normal movement, empty Houses are open, and panicking Victims and Enemies go where they like.", None)]),
        dict(title='Tips', bullets=['Spread searches across quadrants', 'Boost Convince with the Bible', 'Three Horror dice: take an Item'],
             images=[(G+'S1-location-maple-lane-art.png', None)],
             lines=[("A few tips. Each House can only be searched once, so plan routes across all four quadrants.", None),
                    ("The Bible adds two dice to Convince, and with three successes you can take the top Item without searching. Good luck.", None)]),
    ])
