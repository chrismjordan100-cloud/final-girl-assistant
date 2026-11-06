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
    type='killer', season=1, shortName='the-birds', name='The Birds', heading='THE BIRDS', film='Terror From Above',
    background=G+'S1-killer-the-birds-art.png', flavour=G+'S1-killer-the-birds-flavour.png',
    scenes=[
        dict(title='The Birds', kind='intro', images=[(G+'S1-killer-the-birds-art.png', None)],
             lines=[("The Birds: when the skies darken, pure animal terror follows.", None),
                    ("Here's how this vignette plays.", None)]),
        dict(title='Special setup', bullets=['No Killer board', 'Bloodlust + Bird Spawn cards', 'Horror starts at 4', 'Birds on every empty space'],
             images=[(P+'32', (0.03, 0.31, 0.99, 0.58))],
             lines=[("There's no Killer board: put the Bloodlust and Bird Spawn cards next to the Location, and start Horror at four.", None),
                    ("Put a three-Bird token on the Killer's start space, then one Bird on every empty space.", None)]),
        dict(title='Winning and losing', bullets=['Save every Special Victim', 'They appear later', 'Lose: 3 Birds on every space', 'Or if you die'],
             images=[(P+'33', (0.02, 0.0, 0.98, 0.60))],
             lines=[("To win, save all the Special Victims: one, two or three, depending on difficulty.", None),
                    ("They come out when you unlock your Ultimate Ability or no normal Victims are left. You lose if every space has three Birds, or you die.", None)]),
        dict(title='Spawning Birds', bullets=['Birds are Minions', 'They never move on their own', 'Roll 2 dice: how many and where', 'Spawn at least once a round'],
             icons=[R+'S1-killer-the-birds-icon-spawn-birds.png'],
             images=[(P+'32', (0.03, 0.31, 0.17, 0.49))],
             lines=[("Birds are Minions, and they never move on their own.", None),
                    ("To spawn, roll two dice and choose which one sets how many and which sets where, using the Bird Spawn card. Full spaces overflow to neighbours.", None)]),
        dict(title='Bird attacks', bullets=['Your space, and every 3-Bird space', 'Damage = number of Birds', 'Victims first', 'Each damage removes 1 Bird'],
             icons=[R+'S1-killer-the-birds-icon-bird-attack.png'],
             images=[(P+'33', (0.63, 0.60, 0.87, 0.71))],
             lines=[("Birds attack in your space and in every space with three Birds, one target each, for damage equal to the number of Birds. Victims go first.", None),
                    ("Your Reactions can protect anyone in your space, and each damage you deal removes one Bird.", None)]),
        dict(title='Tips', bullets=['Race to the exits', 'Kill Birds only when you must', 'Melanie suits this', 'Avoid small boards'],
             images=[(P+'32', (0.03, 0.49, 0.25, 0.58))],
             lines=[("A few tips. Birds spread rather than chase, so race for the exits and only kill them when you must.", None),
                    ("Melanie's Ultimate removes Birds cheaply, and small boards like Storybook Woods fill up fast. Good luck.", None)]),
    ])
