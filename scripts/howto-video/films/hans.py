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
    type='killer', season=1, shortName='hans', name='Hans the Butcher', heading='HANS', film='The Happy Trails Horror',
    background=G+'S1-location-camp-happy-trails-art.png', flavour=G+'S1-killer-hans-flavour.png',
    scenes=[
        dict(title='Hans', kind='intro', images=[(G+'S1-killer-hans-art.png', None)],
             lines=[("Hans the Butcher: seven feet tall, a pig-faced iron mask, and a sledgehammer that could crush an elephant's skull.", None),
                    ("Here's how he plays.", None)]),
        dict(title='No special rules', bullets=['No special setup', 'No special rules', 'Plays on the core rules', 'The ideal learning killer'],
             images=[(P+'4', (0.52, 0.32, 0.90, 0.71))],
             lines=[("Hans has no special setup and no special rules. He plays purely on the core rules, which makes him the ideal killer to learn with.", None),
                    ("He's slow and weak at low Bloodlust, but every Victim he kills makes him faster and deadlier.", None)]),
        dict(title='What to watch for', bullets=['Dark Obsession: he attacks twice', 'Blood Frenzy: punishes every kill', 'Hammer Rush Terror card'],
             images=[(P+'4', (0.08, 0.33, 0.47, 0.67))],
             lines=[("Watch his Dark Powers. With Dark Obsession, whenever he attacks you, he attacks an extra time.", None),
                    ("His Epic Dark Power, Blood Frenzy, punishes you for every Victim he kills.", None),
                    ("And his Hammer Rush Terror card hurts more for each Victim caught in the attack.", None)]),
        dict(title='Tips', bullets=['Rescue fast to starve his Bloodlust', 'Then trade blows with a weapon', 'Recycle Guard and Retaliate', 'Never end your turn next to him'],
             images=[(P+'4', (0.50, 0.62, 1.0, 1.0))],
             lines=[("A few tips. He barely moves early on, so spend the opening turns rescuing Victims before he reaches them.", None),
                    ("A low-Bloodlust Hans is weak, so with a decent weapon you can stand and trade blows.", None),
                    ("If he gets strong anyway, he's predictable: cycle Guard and Retaliate. And never end your turn in or next to his space.", None)]),
        dict(title='By the numbers', bullets=['Final Girls win about 63%', 'Hardest: Sacred Groves, Carnival', 'Toughest Dark Power: Dark Obsession'],
             icons=[I+'S1-killer-hans-icon.png'],
             images=[(G+'S1-killer-hans-art.png', None)],
             lines=[("On Final Girl Stats, Final Girls win about sixty-three percent of games against Hans, close to average.", None),
                    ("He's hardest at the Sacred Groves and the Carnival of Blood, and Dark Obsession is his most punishing Dark Power. Good luck.", None)]),
    ])
