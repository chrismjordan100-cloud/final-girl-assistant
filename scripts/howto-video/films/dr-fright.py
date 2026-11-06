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
        dict(title='Awake or Asleep', bullets=['Awake: neither of you can attack', 'Asleep: you\'re in the Boiler Room', 'Rest cards always send you to sleep'],
             images=[(P+'27', (0.63, 0.35, 0.97, 0.59))],
             lines=[("You start Awake. While Awake you play as normal, but he can't attack you and you can't attack him. If a Victim is in his space, he'll still attack them.", None),
                    ("You fall Asleep when a card says so, or by choice with a Short or Long Rest.", None)]),
        dict(title='While Asleep', bullets=['You can attack and search', 'He attacks as normal', 'Victims won\'t follow or be saved', '1 Boiler Room card every Killer phase'],
             images=[(P+'29', (0.60, 0.38, 1.0, 1.0))],
             lines=[("Asleep, you're in his Boiler Room. You can move, search and attack him, and he resolves his attacks as normal.", None),
                    ("Victims won't follow you and can't be saved, and you must resolve one Boiler Room card at the end of each Killer phase.", None)]),
        dict(title='The Boiler Room', bullets=['Slide the deck to reveal the next card', 'See Dr. Fright? He attacks you', 'He\'s in each quadrant once', 'Reveal all 4 to wake up'],
             images=[(P+'30', (0.55, 0.03, 0.99, 1.0))],
             lines=[("Slide the deck up, down, left or right to reveal part of the next card. If Dr. Fright is showing, he attacks you, wherever he is.", None),
                    ("He appears in each quadrant only once, so track what you've seen. Reveal all four cards and you wake up.", None)]),
        dict(title='Tips', bullets=['Rescue while Awake', 'Track the quadrants', 'Keep Victims alive', 'Grab the Megaphone'],
             images=[(G+'S1-killer-dr-fright-art.png', None)],
             lines=[("A few tips. Do your rescues while Awake, and choose when to sleep.", None),
                    ("Keeping Victims alive keeps his Bloodlust low and him nearly still. The Megaphone is a great find.", None),
                    ("He's one of the easier killers: about three wins in four on Final Girl Stats. Good luck.", None)]),
    ])
