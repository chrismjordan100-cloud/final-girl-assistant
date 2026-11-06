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
    type='location', season=2, shortName='storybook-woods', name='Storybook Woods', heading='STORYBOOK WOODS', film='Once Upon a Full Moon',
    background=G+'S2-location-storybook-woods-art.png', flavour=G+'S2-location-storybook-woods-flavour.png',
    scenes=[
        dict(title='Storybook Woods', kind='intro', images=[(G+'S2-location-storybook-woods-board.jpg', None)],
             lines=[("Storybook Woods: fairies, flowers and a winding river. But blood flows in the woods all the same.", None),
                    ("Here's how the location plays.", None)]),
        dict(title='Setup', bullets=['No special setup', 'Fewer spaces than most boards', 'Feels easy, gets deadly fast'],
             images=[(G+'S2-location-storybook-woods-board.jpg', None)],
             lines=[("There's no special setup here.", None),
                    ("But the woods have fewer spaces than most locations. That makes it look easy, but with everything so close together, it gets dangerous very quickly.", None)]),
        dict(title='Bridges', bullets=['3 bridges cross the River', 'Poorly built: only 1 Victim follows you', 'Normally 2 would', 'Troll Bridge event: a 4th bridge, same rule'],
             images=[(S+'sw-bridges.png', None)],
             lines=[("Three rickety bridges cross the River, circled in red here. They could collapse under too much weight, so only one Victim will follow you across a bridge.", None),
                    ("The Troll Bridge event can add a fourth bridge token, with the same one-Victim limit.", None)]),
        dict(title='The Raft', bullets=['Item: place 4 Raft tokens', 'Each touches the River and a Raft space', '1 movement: to any other Raft token', '1 Time per Raft token passed (incl. ends)'],
             icons=[R+'S2-location-storybook-woods-icon-raft.png'],
             images=[(G+'S2-location-storybook-woods-board.jpg', None)],
             lines=[("If you find the Raft, place its four tokens on the marked Raft spaces, each touching both the River and a space.", None),
                    ("When you're in one of those spaces, you can use one movement to travel to any other space with a Raft token. But you pay one Time for every Raft token you pass, counting the ones you start and finish at.", None)]),
        dict(title='Woodland items', bullets=['Red Cape: in a tie, the Killer picks you', 'Songbirds: 3 Time, 3 damage within 2 spaces', 'Slingshot: refill by removing a Search card', 'Breadcrumb Path: shortcut, Victims can\'t use'],
             images=[(G+'S2-location-storybook-woods-art.png', None)],
             lines=[("A few cards change how you move and fight. The Red Cape makes the Killer target you instead of a Victim when it's a tie.", None),
                    ("The Songbirds cost three Time to hit a Killer within two spaces for three damage. The Breadcrumb Path event links two spaces as a shortcut, but only you can use it.", None)]),
        dict(title='Watch for', bullets=['Once Upon a Time: +2 Victims at Grandma\'s', 'Full Moon: Killer appears, kills everyone there', 'Carried away: Killer drags a Victim off', 'Pied Piper: kills anyone who joins him'],
             images=[(G+'S2-location-storybook-woods-board.jpg', (0.0, 0.0, 1.0, 0.6))],
             lines=[("Watch for The Full Moon is Out: roll to place the Killer in the Clearing, Meadow or Glen, killing every Victim there.", None),
                    ("Two Terror cards have the Killer carry a Victim off towards Grandmother's House. And the Pied Piper event kills any Victim who ends up with him.", None)]),
        dict(title='Tips', bullets=['Small board: keep moving', 'Plan bridge crossings: 1 at a time', 'The Raft is a fast escape', 'Use the river to slow the Killer'],
             images=[(G+'S2-location-storybook-woods-art.png', None)],
             lines=[("A few tips. The board is small, so the Killer is never far away: keep moving.", None),
                    ("Crossing a bridge takes one Victim at a time, so plan your trips. Good luck.", None)]),
    ])
