# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Series 4 rule sheet for this film in s4-rules-pdf; P + 'N' is page N.
P = os.path.join(A, '..', '..', 's4-rules-pdf', 'FF17_Grimlash.pdf') + '#'
# Sharp 600 dpi crops of cards from the Series 4 rule sheets.
S = os.path.join(os.path.dirname(os.path.abspath(__file__)), 's4img') + '/'

FILM = dict(
    type='killer',
    season=4,
    shortName='grimlash',
    name='Grimlash',
    heading='GRIMLASH',
    film='A Rotten Harvest',
    background=G+'S4-location-shady-acres-art.png', flavour=G+'S4-killer-grimlash-flavour.png',
    scenes=[
        dict(title='Grimlash',
             kind='intro',
             images=[(G+'S4-killer-grimlash-art.png', None)],
             lines=[('Grimlash: an ancient harvest god, reawakened, and hungry for a grim and bountiful harvest.', None),
                    ("Here's how he plays.", None)]),
        dict(title='Special setup',
             bullets=['Harvest Madness cards: 3 decks by level', 'Shuffle each deck', 'Marker on the orange start space', '(top of the Killer board)'],
             icons=[R+'S4-killer-grimlash-icon-harvest-madness.png'],
             images=[(S+'madness-track.png', None)],
             lines=[('Sort the fifteen Harvest Madness cards by level into three decks, and shuffle each.', None),
                    ('Put the Harvest Madness marker on the start space of the track, outlined in orange, at the top of the Killer board.', None)]),
        dict(title='Harvest Madness',
             bullets=['Pumpkin icon: marker 1 right', 'Levels 0, 1, 2 and 3', 'New level: draw 2, keep 1', 'Powers last while at that level or above', 'Past Level 3 (skull): you LOSE'],
             icons=[R+'S4-killer-grimlash-icon-harvest-madness.png', R+'S4-killer-grimlash-icon-harvest-madness-skull-space.png'],
             images=[(S+'madness-track.png', None)],
             lines=[('Madness gives you power, at a price. Whenever you see the pumpkin icon, move the marker one space right.', None),
                    ("When it reaches a new level, draw two cards from that level's deck, keep one and discard the other. Its ability lasts as long as you stay at that level or higher.", None),
                    ('But if Madness goes beyond Level Three, onto the skull, you lose immediately.', None)]),
        dict(title='Bringing it down',
             bullets=['Heart icon: heal OR lower Madness', '1 space left per heart', 'Never both', 'Drop a level: discard its card', 'Climb back: draw 2, keep 1 again'],
             images=[(P+'2', (0.0, 0.66, 1.0, 0.92))],
             lines=[('When you resolve a heart, choose: recover health as normal, or move the Madness marker one space left for each heart. Never both.', None),
                    ('If you drop to a lower level, discard the card for the level you just left. If you climb back up, draw two and keep one again. If a deck runs short, reshuffle its discards.', None)]),
        dict(title='Harvest Madness cards',
             bullets=['Level 1: Thorn-Choked Veins (+1 max health)', 'Level 2: Blood of the Reaper (reroll)', 'Level 3: One With the Land (+3 max health)', 'Once-per-turn: flip face down', 'Upkeep: flip back up'],
             images=[(S+'madness-cards.png', None)],
             lines=[('For example, Thorn-Choked Veins at Level One raises your maximum health by one and heals one. Blood of the Reaper at Level Two lets you flip it and lose a health to reroll all your dice. One With the Land at Level Three adds three maximum health.', None),
                    ('Health bonuses go when the card is discarded, and any health above your new maximum is lost.', None),
                    ('Once-per-turn powers are used by flipping the card face down. Flip them back up in the Upkeep.', None)]),
        dict(title='His movement',
             bullets=['Killer action: moves 1 space', 'Boot on a Terror card: full speed', 'Full speed depends on Madness level'],
             images=[(S+'grim-board.png', None)],
             lines=[('Grimlash only moves one space with his normal Killer action. But a move icon on a Terror card moves him at full speed, and his speed depends on your current Harvest Madness level, as shown on his board.', None)]),
        dict(title='Dark Powers',
             bullets=['Epic Fields of Madness: dice follow Madness', 'Rite of the Old One: skip a Terror card', 'Rite of the Corrupted: Madness creeps up', 'Root-Bound Curse: your healing heals him'],
             images=[(S+'grim-dp-a.png', None), (S+'grim-dp-b.png', None)],
             lines=[('Fields of Madness, his Epic Dark Power: at Madness Level nought or one, roll one die fewer, minimum one. Level two, no change. Level three, one die more.', None),
                    ("Rite of the Old One: whenever your Madness reaches a new level, discard the next Terror card. Rite of the Corrupted: each Upkeep, Madness goes up one if it didn't rise that turn.", None),
                    ("Root-Bound Curse: whenever you resolve hearts, to heal or lower Madness, Grimlash recovers half that much, rounded up. It's his nastiest power.", None)]),
        dict(title='Minor powers and Finales',
             bullets=['Flaming Eyes: +2 Madness when he reaches you', 'Burning Sickle: hurts Victims with you', 'God of Blood and Grain: kills all Victims', 'Ancient Abomination: Madness adds to attack'],
             images=[(S+'grim-finales-a.png', None), (S+'grim-finales-b.png', None)],
             lines=[('Minor powers: Flaming Eyes adds two Madness whenever he enters your space, and Burning Sickle deals one damage to every Victim with you whenever he hurts you.', None),
                    ('Finales: Withered Harbinger costs you a Time for every space he moves. Hunger of the Old Gods pulls Victims towards him. Ancient Abomination adds your Madness level to his attack.', None),
                    ('And the Epic God of Blood and Grain kills every Victim when revealed, then hunts you and attacks twice.', None)]),
        dict(title='Tips',
             bullets=['Push your luck, but watch the skull', 'Choose heal or Madness by the closer danger', 'Keep Horror reducers in hand', 'Leave his space fast'],
             images=[(G+'S4-killer-grimlash-art.png', None)],
             lines=[('A few tips. Higher Madness gives better powers, but the skull is an instant loss.', None),
                    ('When you get hearts, spend them on whichever track is closer to killing you.', None),
                    ("He's one of the easier killers: players win nearly eighty per cent of games. Good luck.", None)]),
    ])
