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
        dict(title='Winning', bullets=['No Killer to defeat', 'Save ALL the Special Victims', 'Easy 1 · Medium 2 · Hard 3', 'Your Final Girl affects difficulty too'],
             images=[(P+'33', (0.02, 0.0, 0.98, 0.13))],
             lines=[("There's no Killer to defeat. To win, you must save all of the Special Victims, using the normal saving rules.", None),
                    ("Choose your difficulty: one Special Victim for easy, two for medium, three for hard. How hard your Final Girl's Ultimate Ability is to unlock matters too.", None)]),
        dict(title='Special Victims', bullets=['Hidden at the start', 'Appear when you unlock your Ultimate', 'or when no normal Victims are left', 'Farthest Search spaces, one per space', 'Birds can never harm them'],
             images=[(P+'33', (0.02, 0.13, 0.98, 0.42))],
             lines=[("The Special Victims stay hidden until one of two things happens: you unlock your Ultimate Ability, or there are no normal Victims left on the board.", None),
                    ("Then place them in the search spaces farthest from you, no more than one per space.", None),
                    ("They can never be attacked or killed, but otherwise they behave like normal Victims.", None)]),
        dict(title='Losing', bullets=['3 Birds on EVERY space', 'or your Final Girl dies'],
             images=[(P+'33', (0.02, 0.42, 0.98, 0.52))],
             lines=[("You lose immediately if every space on the board has three Birds, or if your Final Girl dies.", None)]),
        dict(title='Spawning Birds', bullets=['Birds are Minions that never move', 'Spawn icon: roll 2 dice', 'One die: how many · other: where', 'You choose which is which', 'At least once every round'],
             icons=[R+'S1-killer-the-birds-icon-spawn-birds.png'],
             images=[(P+'32', (0.03, 0.31, 0.17, 0.49))],
             lines=[("Birds are tokens, and they count as Minions. They never move on their own; only special effects, such as some items, move them.", None),
                    ("When a card shows the Spawn Birds icon, roll two dice. Use one die for how many Birds appear, and the other for where, using the chart on the Bird Spawn card. You choose which die does which.", None),
                    ("Depending on the roll, the chart spreads them across any spaces, puts them all in one space, at the nearest of certain spaces shown on the card, in the nearest Victim's space, or in your own space.", None),
                    ("Birds always spawn at least once a round, as the first step of the Killer phase, and Terror cards often spawn more.", None)]),
        dict(title='Full spaces', bullets=['Max 3 Birds per space', 'Overflow: an adjacent space', 'Keep spreading outward until placed', 'Killer moves on a card? Spawn instead', 'Killer placed? 3 Birds there'],
             images=[(P+'32', (0.03, 0.49, 0.25, 0.58))],
             lines=[("A space holds at most three Birds. If Birds need placing in a full space, put them in an adjacent space of your choice, spreading further out if needed until they're all placed.", None),
                    ("Some cards mention the Killer. If a card moves the Killer, spawn Birds instead. If it places the Killer somewhere, place three Birds there.", None),
                    ("Event cards that need Special Victim meeples are discarded and redrawn.", None)]),
        dict(title='Bird attacks', bullets=['Your space: if any Birds there', 'Every space with 3 Birds', 'One target, damage = number of Birds', 'Victims before you', 'Your Reactions can protect Victims'],
             icons=[R+'S1-killer-the-birds-icon-bird-attack.png'],
             images=[(P+'33', (0.63, 0.60, 0.87, 0.71))],
             lines=[("When the Bird Attack icon resolves, Birds attack in your space, if there's at least one Bird there, and in every space with three Birds.", None),
                    ("Birds attack one target in their space, dealing damage equal to the number of Birds there. They always go for normal Victims before you.", None),
                    ("Unusually, your Reaction cards can protect anyone in your space. But to save a Victim, you must prevent all the damage, because one point kills them.", None)]),
        dict(title='Fighting back', bullets=['Attack a space with Birds', '1 Bird removed per damage', 'Extra damage is lost', 'Melanie: Bird-clearing Ultimate'],
             images=[(P+'32', (0.03, 0.49, 0.25, 0.58))],
             lines=[("You can attack Birds in a space. Each point of damage removes one Bird, and any extra damage is lost.", None),
                    ("Some items are useless against Birds, like a Bear Trap. That's part of the challenge, though you may swap them out if you prefer.", None)]),
        dict(title='Tips', bullets=['Race to the exits', 'Kill Birds only when you must', 'Melanie suits this', 'Avoid small boards'],
             images=[(P+'32', (0.03, 0.49, 0.25, 0.58))],
             lines=[("A few tips. Birds spread rather than chase, so race for the exits and only kill them when you must.", None),
                    ("Melanie's Ultimate removes Birds cheaply, and small boards like Storybook Woods fill up fast. Good luck.", None)]),
    ])
