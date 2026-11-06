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
    type='location', season=2, shortName='uss-konrad', name='The USS Konrad', heading='THE USS KONRAD', film='Into the Void',
    background=G+'S2-location-uss-konrad-art.png', flavour=G+'S2-location-uss-konrad-flavour.png',
    scenes=[
        dict(title='The USS Konrad', kind='intro', images=[(G+'S2-location-uss-konrad-board.jpg', None)],
             lines=[("The USS Konrad: a mining freighter drifting in deep space. Current whereabouts: unknown.", None),
                    ("Here's how the location plays.", None)]),
        dict(title='Special setup', bullets=['2 Keycard tokens on the board (Setup card)', '1 Keycard in your inventory, token on it', '2 Keycards set aside, 3 shuffled into Items', 'Super Loader card aside, token in Hangar', '3 Maintenance cards face up'],
             icons=[R+'S2-location-uss-konrad-icon-keycard-token.png'],
             images=[(S+'konrad-keycard.png', None)],
             lines=[("Place two Keycard tokens where the Setup card shows. Start with one Keycard Item in your inventory, with a token on it. Set two more Keycard cards aside with the spare tokens, and shuffle the last three into the Item decks.", None),
                    ("Put the Super Loader card beside the board with its token in the Hangar, and lay out the three Maintenance cards face up.", None)]),
        dict(title='Keycards', bullets=['Start or end a move on a Keycard token', 'Spend Time to take it', 'Take a set-aside Keycard card, token on it', 'Using a Keycard costs no Time', 'Empty Keycard cards stay: never discarded'],
             icons=[R+'S2-location-uss-konrad-icon-keycard-token.png'],
             images=[(S+'konrad-keycard.png', None)],
             lines=[("Keycards open shafts and run the ship's machinery.", None),
                    ("If you start or end your movement on a space with a Keycard token, not just passing through, you can spend Time to take it. Take one of the set-aside Keycard Item cards and put the token on it.", None),
                    ("Any Keycard card you get by searching or from an event also gets a token.", None),
                    ("Using a Keycard means placing its token on the board or a Maintenance card. That costs no Time. You keep the empty Keycard card, and it can never be discarded: ignore it for any discard effect. Once placed, tokens stay put unless a card says otherwise.", None)]),
        dict(title='Maintenance Shafts', bullets=['4 shafts, each with an empty Keycard slot', 'Inactive: you and Victims can\'t pass', 'Adjacent? Place a Keycard to activate', 'Active: you and followers pass freely', 'Enemies NEVER use shafts (unless a card says)'],
             icons=[R+'S2-location-uss-konrad-icon-maintenance-space.png'],
             images=[(S+'konrad-shafts.png', None)],
             lines=[("There are four Maintenance Shafts on the board, each with an empty Keycard spot beside it.", None),
                    ("While a shaft is inactive, neither you nor Victims can pass through it.", None),
                    ("When you're next to an inactive shaft, place a Keycard token on it to activate it. From then on you, and any Victims following you, can travel through it freely.", None),
                    ("Enemies can't move through shafts at all, unless a card allows it. That makes active shafts your safe shortcuts.", None)]),
        dict(title='Maintenance functions', bullets=['4 purple rooms with a gear icon', 'Trash Compactor = Crusher', 'Furnace = Incinerator', 'Hangar = Airlock · Bridge = Self Destruct', 'Be IN the room · fill the Keycard slots'],
             images=[(G+'S2-location-uss-konrad-board.jpg', None)],
             lines=[("Four rooms are highlighted in purple with a gear icon: the Trash Compactor, the Furnace, the Hangar and the Bridge. Each runs a ship function shown on the Maintenance cards: the Crusher, the Incinerator, the Airlock and the Self Destruct.", None),
                    ("To use one, you must be in that room, not passing through. Place Keycard tokens in the slots on its Maintenance card. Each function needs a different number, shown by the slots. When it's full, follow that function's instructions.", None),
                    ("If any effect later removes Keycard tokens from a function you've already activated, it's cancelled immediately, along with any tokens it placed.", None)]),
        dict(title='Self Destruct and the Airlock', bullets=['Self Destruct: 4 Keycards, at the Bridge', 'Countdown token moves right each Upkeep', 'Reaches the end: ship explodes', 'Not at an Escape Pod exit? You lose', 'Die with the Killer = you still lose'],
             icons=[R+'S2-location-uss-konrad-icon-self-destruct-countdown.png'],
             images=[(S+'konrad-selfdestruct.png', None)],
             lines=[("The Self Destruct takes four Keycards at the Bridge. Once activated, put the radiation token at the start of the Countdown track. Every Upkeep, move it one space right.", None),
                    ("When it reaches the explosion, the ship blows up, killing everything. If you're not standing at an Escape Pod exit, you lose.", None),
                    ("The Airlock and the Self Destruct can both kill you along with the Killer. If that happens, you lose, even though the Killer died too.", None)]),
        dict(title='The Super Loader', bullets=['Starts in the Hangar', 'Needs the Super Loader Key item', 'Equipped: Victims won\'t follow', 'Movement and damage taken: −1 (min 1)', 'No Short/Long Rest, no Search'],
             icons=[R+'S2-location-uss-konrad-icon-super-loader-token.png'],
             images=[(S+'konrad-superloader.png', None)],
             lines=[("The Super Loader exo-suit starts in the Hangar, but you can only use it once you've found the Super Loader Key item. Then, in its space, take and equip the Super Loader card.", None),
                    ("While equipped, Victims won't follow you, all your movement is reduced by one, all damage you take is reduced by one, both to a minimum of one, and you can't play Short Rest, Long Rest or Search.", None),
                    ("If you unequip it or lose the Key, leave the token in your space and return the card beside the board. It can't go in your backpack.", None)]),
        dict(title='Ship hazards', bullets=['Hull Breach: farthest exit becomes deadly', 'Anyone in or entering it dies', 'Gas Leak and Faulty Wiring: rolls hurt', 'System Reboot: Keycards go back', 'Slippery: Killer uses shafts'],
             images=[(S+'konrad-shafts.png', None)],
             lines=[("Watch for a few ship cards. Catastrophic Hull Breach puts a Skull token on the exit farthest from you. Anyone who is in or enters that space dies instantly, the Killer included.", None),
                    ("Gas Leak and Faulty Wiring make you roll for damage near the shafts, the Furnace and the Trash Compactor.", None),
                    ("System Reboot returns every placed Keycard to its card, cancelling activated functions. And the Slippery Minor Dark Power lets the Killer use every shaft.", None)]),
        dict(title='Tips', bullets=['Plan Keycards before you spend them', 'Activate a shaft to block pursuit', 'Self Destruct only near an Escape Pod', 'Super Loader: great vs damage, bad for rescues'],
             images=[(G+'S2-location-uss-konrad-art.png', None)],
             lines=[("A few tips. Keycards are scarce, so decide early whether you want shafts, a ship function, or both.", None),
                    ("Enemies can't follow you through an active shaft, so it's a great escape route.", None),
                    ("Only trigger the Self Destruct when you can reach an Escape Pod before the countdown ends. Good luck.", None)]),
    ])
