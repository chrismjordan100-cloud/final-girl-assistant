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
    type='killer', season=2, shortName='big-bad-wolf', name='The Big Bad Wolf', heading='THE BIG BAD WOLF', film='Once Upon a Full Moon',
    background=G+'S2-location-storybook-woods-art.png', flavour=G+'S2-killer-big-bad-wolf-flavour.png',
    scenes=[
        dict(title='The Big Bad Wolf', kind='intro', images=[(G+'S2-killer-big-bad-wolf-art.png', None)],
             lines=[("The Big Bad Wolf: red glowing eyes, terrible noises, and very bad breath.", None),
                    ("Here's how it plays.", None)]),
        dict(title='Setup', bullets=['No special setup', 'Starts with 9 health', 'Starts in TRACK mode'],
             images=[(S+'bbw-board.png', None)],
             lines=[("There's no special setup for the Wolf. It starts with nine health, in Track mode.", None)]),
        dict(title='Track and Slay', bullets=['Always in one mode: TRACK or SLAY', 'Many Terror cards have both lines', 'Check the mode at the START of the Killer phase', 'Use only that mode\'s lines', 'Unmarked effects always apply'],
             icons=[R+'S2-killer-big-bad-wolf-icon-track-mode.png', R+'S2-killer-big-bad-wolf-icon-slay-mode.png'],
             images=[(P+'31', (0.0, 0.0, 1.0, 0.47))],
             lines=[("The Wolf is always in one of two modes, Track or Slay, each with its own icon.", None),
                    ("Most of its Terror cards have different effects for each mode. At the start of the Killer phase, check which mode it's in, and apply only that mode's lines, ignoring the other.", None),
                    ("Effects without a mode icon always apply, whichever mode it's in.", None)]),
        dict(title='Changing mode', bullets=['Starts in TRACK', 'Dark Power revealed: switches to SLAY', 'Switched mid-phase? SLAY from NEXT Killer phase', 'Killing Machine: both at once'],
             icons=[R+'S2-killer-big-bad-wolf-icon-slay-mode.png'],
             images=[(S+'bbw-board.png', None)],
             lines=[("The Wolf starts in Track mode. When its Dark Power is revealed, it switches to Slay mode.", None),
                    ("If that happens during a Killer phase that started in Track mode, keep using Track effects for the rest of that phase. Slay effects start next Killer phase.", None),
                    ("The only exception is the Epic Dark Power, A Killing Machine, which makes it resolve both the Track and Slay lines for the rest of the game.", None)]),
        dict(title='An example', bullets=['The Claws that Scratch', 'TRACK: target, move, +Bloodlust per person there', 'SLAY: target, move, then attack', 'Damage spread over as many Victims as possible', 'You take what\'s left'],
             images=[(S+'bbw-claws.png', None)],
             lines=[("Take The Claws That Scratch. In Track mode, the Wolf targets the closest Victim, or you if you're closer, and moves towards them. Then Bloodlust rises once for you and each Victim in its space, up to three. The Slay line is ignored.", None),
                    ("In Slay mode, it still goes after the closest target, but then attacks, dealing its damage one point at a time to as many Victims as it can. If you're in the space, you take whatever damage is left over.", None)]),
        dict(title='Dark Powers', bullets=['Destructive Roar: an Item deck loses its top card', '...when revealed and every Upkeep', 'Ravenous Hunger: kills the biggest group', 'Sixth Sense: immune to Reaction damage'],
             images=[(S+'bbw-cards.png', None)],
             lines=[("Its Dark Powers: Destructive Roar removes the top card of the Item deck closest to the Wolf from the game, when revealed and every Upkeep.", None),
                    ("Ravenous Hunger places it in the space with the most Victims and kills them all. And Sixth Sense makes it ignore damage from Reaction cards like Retaliate.", None)]),
        dict(title='Its minor powers', bullets=['Big ears: start or enter its space, −1 health', 'Big eyes: same, lose a random Action card', 'Big teeth: block it all, still −1 health'],
             images=[(S+'bbw-cards.png', None)],
             lines=[("Its Minor Dark Powers are the fairytale lines. What big ears you have: entering or starting in its space costs you a health.", None),
                    ("What big eyes: the same, but you discard a random Action card. What big teeth: if it attacks you and you block all the damage, you lose a health anyway.", None)]),
        dict(title='Finales', bullets=['Tasty Treats: heals 1 per dead Victim', 'Thrill of the Hunt: heals 1 when it moves', 'Rampant Growth: attacks on you add Horror', 'One More Bite: never misses an attack'],
             images=[(S+'bbw-cards.png', None)],
             lines=[("Its Finales: Tasty Treats heals it one for every dead Victim. Thrill of the Hunt heals it one whenever it moves.", None),
                    ("Rampant Growth attacks twice and raises your Horror each time it hits you. And the Epic Finale, One More Bite, always finds someone to attack.", None)]),
        dict(title='Tips', bullets=['Hit it hard while in TRACK mode', 'Slay mode shreds groups of Victims', 'Spread Victims out, or keep them away', 'Don\'t rely on Retaliate'],
             images=[(G+'S2-killer-big-bad-wolf-art.png', None)],
             lines=[("A few tips. Track mode is your window: it hurts with Bloodlust, not damage, so attack then.", None),
                    ("Once it's in Slay mode, keep Victims out of its reach: it tears through groups.", None),
                    ("And Sixth Sense can make Retaliate useless, so don't build around it. Good luck.", None)]),
    ])
