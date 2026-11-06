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
    type='killer', season=1, shortName='geppetto', name='Geppetto', heading='GEPPETTO', film='Carnage at the Carnival',
    background=G+'S1-location-carnival-of-blood-art.png', flavour=G+'S1-killer-geppetto-flavour.png',
    scenes=[
        dict(title='Geppetto', kind='intro', images=[(G+'S1-killer-geppetto-art.png', None)],
             lines=[("Geppetto, the Puppet Master: he runs his show for a few days, then adds as many people to his family as he can.",
                     "Jeh-petto, the Puppet Master: he runs his show for a few days, then adds as many people to his family as he can."),
                    ("Here's how he plays.", None)]),
        dict(title='Special setup', bullets=['Puppets card by the Killer board', '3 Puppet tokens on "Ready"'],
             images=[(P+'21', (0.415, 0.515, 0.53, 0.635)), (P+'21', (0.36, 0.69, 0.585, 0.785))],
             lines=[("Put the Puppets card next to his Killer board, with all three Puppet tokens on its Ready space.", None)]),
        dict(title='The Puppets', bullets=['Minions: 1 health, attack 1', 'Same Movement Value as him', 'Must end within 2 spaces of him', 'Killed: back to "Exhausted"'],
             images=[(P+'21', (0.61, 0.33, 0.96, 0.595))],
             lines=[("The Puppets are Minions with one health and an attack of one. They move as fast as Geppetto, which rises with his Bloodlust.", "The Puppets are Minions with one health and an attack of one. They move as fast as Jeh-petto, which rises with his Bloodlust."),
                    ("They're on strings, so they must end their movement within two spaces of him. When one is killed, it goes on the Exhausted space.", None)]),
        dict(title='Spawning and acting', bullets=['Spawn 1 each Killer phase', 'Exhausted Puppets go back to Ready', 'Unmarked actions: every Puppet acts', 'Then Geppetto does it too'],
             images=[(P+'21', (0.0, 0.31, 0.99, 0.79))],
             lines=[("Until the Finale, each Killer phase spawns a Ready Puppet in his space, then moves any Exhausted Puppets back to Ready.", None),
                    ("When a Terror card's Killer Action doesn't say it's for Puppets only, every Puppet resolves it in turn, then Geppetto does it too.", "When a Terror card's Killer Action doesn't say it's for Puppets only, every Puppet resolves it in turn, then Jeh-petto does it too.")]),
        dict(title='What to watch for', bullets=['Immortal Master: can\'t die with 3 out', 'Join the Family: 3 Puppets on you', 'Remember Them?: all Puppets spawn'],
             images=[(P+'21', (0.02, 0.33, 0.34, 0.78))],
             lines=[("With Immortal Master, he can't be killed while all three Puppets are on the board.", None),
                    ("His Epic Dark Power, Join the Family, drops you to your Final Health if all three Puppets reach your space.", None)]),
        dict(title='Tips', bullets=['Kill Puppets to cut his output', 'Keep at least one Puppet dead', 'Pick one plan early', 'Rescuing beat searching'],
             images=[(G+'S1-killer-geppetto-art.png', None)],
             lines=[("A few tips. Every Puppet copies his actions, so killing them cuts his damage, and keeping one dead stops Immortal Master.", None),
                    ("Pick one plan early, rescuing or attacking, rather than splitting your effort.", None),
                    ("Watch for Puppets gathering round groups of Victims. Good luck.", None)]),
    ])
