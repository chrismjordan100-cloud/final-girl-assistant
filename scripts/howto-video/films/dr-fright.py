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
    type='killer', season=1, shortName='dr-fright', name='Dr. Fright', heading='DR. FRIGHT', film='Frightmare on Maple Lane',
    background=G+'S1-location-maple-lane-art.png', flavour=G+'S1-killer-dr-fright-flavour.png',
    scenes=[
        dict(title='Dr. Fright', kind='intro', images=[(G+'S1-killer-dr-fright-art.png', None)],
             lines=[("Dr. Fright, the Dream Doctor: he hunts you in your nightmares, and the burns are real when you wake up.", None),
                    ("Here's how he plays.", None)]),
        dict(title='Special setup', bullets=['Shuffle the 4 Boiler Room cards', 'Awake card on top, Awake side up'],
             images=[(P+'27', (0.37, 0.35, 0.61, 0.51)), (P+'27', (0.77, 0.64, 0.94, 0.79))],
             lines=[("Shuffle the four Boiler Room cards face down, and put the Awake/Asleep card on top, Awake side up. That's the Boiler Room deck.", None)]),
        dict(title='Awake or Asleep', bullets=['The top card of the Boiler Room deck', 'shows if you\'re Awake or Asleep', 'You start Awake', 'Fall Asleep: card to bottom, flip deck', 'Short or Long Rest = you fall Asleep'],
             images=[(P+'27', (0.77, 0.64, 0.94, 0.79))],
             lines=[("Against Dr. Fright you're always either Awake or Asleep, shown by the Awake/Asleep card on top of the Boiler Room deck. You start Awake.", None),
                    ("When an effect sends you to sleep, take the Awake/Asleep card, put it unflipped on the bottom of the Boiler Room deck, then flip the whole deck over. The Asleep side is now on top.", None),
                    ("Some Terror cards send you to sleep, but you can also choose to: resolving a Short Rest or Long Rest card always sends you to sleep, whatever the result.", None)]),
        dict(title='While Awake', bullets=['Play as normal: move, search, save', 'He can\'t attack you; you can\'t hit him', 'His "attack you" actions hit Victims', 'Victims in his space still die'],
             images=[(P+'27', (0.63, 0.35, 0.97, 0.59))],
             lines=[("While Awake, you move, search, save Victims and so on as normal. But Dr. Fright can't attack you, and you can't attack him.", None),
                    ("When he resolves a Killer Action aimed at you, treat it as aimed at Victims instead, unless an effect such as his Frightmare is Inevitable Dark Power lets him attack you while you're Awake.", None),
                    ("An action aimed at you and Victims still moves him towards you, but he can't attack you. If he ends in a space with a Victim, he attacks the Victim.", None)]),
        dict(title='While Asleep', bullets=['You\'re in his Boiler Room', 'Move, search, attack him', 'He attacks you as normal', 'Victims won\'t follow or be saved', 'MUST resolve 1 Boiler Room card per Killer phase'],
             images=[(P+'29', (0.60, 0.38, 1.0, 1.0))],
             lines=[("While Asleep, you're inside his dream world, the Boiler Room. You can still move around the board, search, and attack him.", None),
                    ("But he can now attack you, resolving all his Killer Actions as normal.", None),
                    ("Victims won't follow you, and you can't save them.", None),
                    ("And at the end of every Killer phase, you must resolve exactly one Boiler Room card.", None)]),
        dict(title='Resolving Boiler Room cards', bullets=['Slide the deck up, down, left or right', 'Reveal half (or a quarter) of the next card', 'Must extend what\'s already showing', 'Dr. Fright visible? He attacks you', 'From anywhere: you may defend'],
             images=[(P+'30', (0.55, 0.03, 0.99, 1.0))],
             lines=[("To resolve a Boiler Room card, slide the deck up, down, left or right, so that half, or sometimes a quarter, of the next card shows.", None),
                    ("You can't slide in a direction that reveals nothing, and you must extend the card that's already showing.", None),
                    ("If Dr. Fright appears on the newly revealed part, he attacks you, wherever he is on the board. You can defend as normal.", None)]),
        dict(title='Waking up', bullets=['He appears in each quadrant once', 'Track what you\'ve seen to dodge him', 'Action phase: resolve as many as you like', 'Killer phase: exactly one', 'All 4 revealed: you wake; reset the deck'],
             images=[(P+'30', (0.55, 0.03, 0.99, 1.0))],
             lines=[("Dr. Fright appears in each of the four quadrants only once across the four cards, so remember where he's been. With care you can sometimes avoid every attack, though usually you'll take one or two.", None),
                    ("During your Action phase you may resolve as many Boiler Room cards as you like, including none, to control how long you stay asleep.", None),
                    ("When all four cards are revealed, you wake up. Shuffle them face down and put the Awake/Asleep card back on top, Awake side up.", None)]),
        dict(title='What to watch for', bullets=['Frightmare is Inevitable: attacks while Awake', 'Shock Factor: panic = death (max 3/turn)', 'Everyone Must Die: off the board', 'Hit him from anywhere while Asleep'],
             images=[(P+'27', (0.02, 0.33, 0.48, 0.79))],
             lines=[("Watch for The Frightmare is Inevitable, which lets him attack you even while you're Awake.", None),
                    ("His Epic Dark Power, Shock Factor: any Victim who would panic is killed instead, up to three a turn.", None),
                    ("And his Everyone Must Die Finale takes him off the board onto the card. For the rest of the game you can attack him from any space while you're Asleep.", None)]),
        dict(title='Tips', bullets=['Rescue while Awake', 'Track the quadrants', 'Keep Victims alive', 'Grab the Megaphone'],
             images=[(G+'S1-killer-dr-fright-art.png', None)],
             lines=[("A few tips. Do your rescues while Awake, and choose when to sleep.", None),
                    ("Keeping Victims alive keeps his Bloodlust low and him nearly still. The Megaphone is a great find.", None),
                    ("He's one of the easier killers: about three wins in four on Final Girl Stats. Good luck.", None)]),
    ])
