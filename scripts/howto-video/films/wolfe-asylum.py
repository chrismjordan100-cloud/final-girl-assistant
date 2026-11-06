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
    type='location', season=2, shortName='wolfe-asylum', name='Wolfe Asylum', heading='WOLFE ASYLUM', film='Madness in the Dark',
    background=G+'S2-location-wolfe-asylum-art.png', flavour=G+'S2-location-wolfe-asylum-flavour.png',
    scenes=[
        dict(title='Wolfe Asylum', kind='intro', images=[(G+'S2-location-wolfe-asylum-board.jpg', None)],
             lines=[("Wolfe Asylum: built for three hundred patients, home to two and a half thousand, and never free of its dark past.", None),
                    ("Here's how the location plays.", None)]),
        dict(title='Special setup', bullets=['Stun tokens in a pile', 'Pill tokens face down in a pool', '4 Pills on the board (Setup card)', '1 Pill face up under your Pill Effects card', 'Amped and Side Effects decks ready'],
             icons=[R+'S2-location-wolfe-asylum-icon-pill-token.png', R+'S2-location-wolfe-asylum-icon-stun-token.png'],
             images=[(S+'wa-tokens.png', None)],
             lines=[("Put the Stun tokens in a pile, and shuffle the Pill tokens face down in a pool.", None),
                    ("Place four Pills face down on the board where the Setup card shows. Put the Pill Effects card by your Player board, with one Pill face up beneath it. Five Pills stay in the pool. Then shuffle the Amped and Side Effects cards.", None)]),
        dict(title='Pills', bullets=['3 yellow · 3 blue · 3 pink · 1 wild', 'End a move on a Pill: 1 Time to take it', 'Not while passing through', 'Face up under your Pill Effects card', 'Pool empty? Reshuffle the used ones'],
             icons=[R+'S2-location-wolfe-asylum-icon-pill-yellow.png', R+'S2-location-wolfe-asylum-icon-pill-blue.png', R+'S2-location-wolfe-asylum-icon-pill-pink.png', R+'S2-location-wolfe-asylum-icon-pill-wild.png'],
             images=[(S+'wa-tokens.png', None)],
             lines=[("There are ten Pills: three yellow, three blue, three pink, and one wild, which can be any colour.", None),
                    ("When you end your movement on a space with a Pill, not just passing through, you can spend one Time to pick it up. Put it face up beneath your Pill Effects card.", None)]),
        dict(title='Taking Pills', bullets=['Any time in your Action phase', 'One pill: no Side Effects', 'Two different: draw 2 Side Effects', 'All three colours: draw 3, plus an Amped card', 'Mix and match as you like'],
             icons=[R+'S2-location-wolfe-asylum-icon-pill-wild.png'],
             images=[(S+'wa-pill.png', None)],
             lines=[("At any point in your Action phase, you can take any number of the Pills you've collected, discarding their tokens.", None),
                    ("Look up the combination on the Pill Effects card. A single Pill is safe. Two different Pills at once give a bigger benefit, but then you draw two Side Effects cards. Taking all three colours together draws an Amped card, and three Side Effects.", None),
                    ("You can take them in any order, for example one Pill on its own, then a pair.", None)]),
        dict(title='The Pill Effects card', bullets=['Yellow: heal 1', 'Blue: move 1 space', 'Pink: icon shown on the card', 'Yellow + Blue: heal fully', 'Yellow + Pink: +5 Time', 'Blue + Pink: three of pink\'s icon'],
             images=[(S+'wa-pill.png', None)],
             lines=[("Here's the card. Yellow alone heals one. Blue alone moves you one space. Pink alone gives the grey icon shown; it looks like one Horror down, but check your card.", None),
                    ("Yellow and blue together heal you fully. Yellow and pink give five Time. Blue and pink give three of pink's icon.", None),
                    ("Every pair draws two Side Effects cards, and all three colours together draw an Amped card plus three Side Effects.", None)]),
        dict(title='Side Effects and Amped', bullets=['Side Effects: draw one at a time', 'Some stop further draws', 'Panic Attack: discard 2 Terror cards', 'Brain Fog, Paralysis: lose items or moves', 'Amped: powerful lasting boosts'],
             images=[(S+'wa-cards.png', None)],
             lines=[("Draw Side Effects one at a time and apply each. Some are harmless, like Normal or Panic Attack, which discards two Terror cards. Several also say to stop drawing.", None),
                    ("The bad ones can make you discard a random Item, or every Action card that moves you.", None),
                    ("Amped cards are strong lasting boosts, such as an extra die on every Horror roll, ignoring all Dark Powers, or healing each Upkeep.", None)]),
        dict(title='Stunned', bullets=['Some Items Stun an Enemy', 'Stun token under it', 'Next Killer phase: no moving', 'It still attacks', 'Upkeep: discard Stun tokens'],
             icons=[R+'S2-location-wolfe-asylum-icon-stun-token.png'],
             images=[(G+'S2-location-wolfe-asylum-board.jpg', None)],
             lines=[("Some Items Stun. Only Enemies can be Stunned: put a Stun token under it. During the next Killer phase, it ignores all movement, but it still attacks.", None),
                    ("In Upkeep, discard any Stun tokens still under Enemies.", None)]),
        dict(title='Watch for', bullets=['Powerful Meds: +1 Side Effect per dose', 'Dr. Death: kills a Victim each Upkeep', 'Hannibal: kills in Solitary', 'Hospital Gurney: ram for big damage'],
             images=[(G+'S2-location-wolfe-asylum-board.jpg', (0.0, 0.0, 1.0, 0.6))],
             lines=[("Watch for Powerful Meds, which adds a Side Effects card to every dose.", None),
                    ("Dr. Death and Hannibal kill a Victim in their space every Upkeep. And the Hospital Gurney can carry two Victims, or be rammed into an Enemy for extra damage, killing anyone on it.", None)]),
        dict(title='Tips', bullets=['Single Pills are free and safe', 'Save pairs for big moments', 'Go for all three for an Amped card', 'Stun the Killer before a rescue'],
             images=[(G+'S2-location-wolfe-asylum-art.png', None)],
             lines=[("A few tips. Single Pills have no Side Effects, so use them freely.", None),
                    ("Save pairs, like the full heal, for when you really need them.", None),
                    ("An Amped card can win the game, so it's worth collecting one of each colour. Good luck.", None)]),
    ])
