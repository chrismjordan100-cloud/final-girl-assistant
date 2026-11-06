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
        dict(title='The Puppets', bullets=['3 Puppets: they\'re Minions', '1 health, attack 1', 'Move as fast as Geppetto', 'Killed: onto the "Exhausted" space'],
             images=[(P+'21', (0.61, 0.33, 0.96, 0.595))],
             lines=[("Geppetto's three Puppets are Minions, so the core Minion rules apply, plus a few of their own.", None),
                    ("Each Puppet has one health and an attack of one. Their Movement Value matches Geppetto's, so they speed up as his Bloodlust rises.", None),
                    ("There are only ever three, on the board and the Puppets card combined. When one is killed, put it on the card's Exhausted space.", None)]),
        dict(title='Spawning Puppets', bullets=['Each Killer phase, before the Finale:', 'Spawn: Ready Puppet → Geppetto\'s space', 'None Ready? No spawn', 'Then all Exhausted → Ready'],
             images=[(P+'21', (0.415, 0.515, 0.53, 0.635))],
             lines=[("Until the Finale is revealed, the first step of every Killer phase is to spawn a Puppet. Take one from the Ready space and place it in Geppetto's space.", None),
                    ("If there's none on Ready, nothing spawns.", None),
                    ("Either way, then move every Puppet on the Exhausted space back to Ready. So a Puppet you kill comes back two Killer phases later.", None)]),
        dict(title='Who resolves Terror cards', bullets=['Card says "Puppets only"? Just them', 'Otherwise: every Puppet does the action', 'One at a time, in your chosen order', 'Then Geppetto does it too'],
             images=[(P+'21', (0.02, 0.33, 0.34, 0.78))],
             lines=[("Some of his Terror cards say an action line is for the Puppets only. Many don't, and nor do your location's Terror cards.", None),
                    ("When a Killer Action doesn't say it's only for Puppets, every Puppet on the board resolves the full action, one at a time, in the order you choose. Then Geppetto resolves it as well.", None),
                    ("That's why each extra Puppet on the board makes him much more dangerous.", None)]),
        dict(title='On a string', bullets=['Must END movement within 2 of him', 'Can pass further away on the way', 'Pushed too far? Next time: head back', 'Out of movement? Stop where it is'],
             images=[(P+'21', (0.415, 0.515, 0.53, 0.635))],
             lines=[("Puppets are on strings. They must end their movement within two spaces of Geppetto, though they can pass further away while moving.", None),
                    ("If a Puppet must stop because going on would end it more than two spaces away, any movement it has left is lost.", None),
                    ("If an effect leaves a Puppet more than two spaces away, the next time it chooses a target, it targets Geppetto instead, and stops as soon as it's exactly two spaces from him.", None)]),
        dict(title='What to watch for', bullets=['Immortal Master: can\'t die with all 3 out', 'Join the Family: 3 Puppets on you', 'Remember Them?: all Puppets spawn', 'That Finale: Puppets move 1 less'],
             images=[(P+'21', (0.02, 0.33, 0.34, 0.78))],
             lines=[("Immortal Master: while all three Puppets are on the board, Geppetto can't be killed. Damage that would remove his Final Health token is ignored.", None),
                    ("Join the Family, his Epic Dark Power: if all three Puppets are in your space during the Killer phase, you lose all your remaining health, though you still reveal your Final Health token.", None),
                    ("And his Remember Them? Finale spawns every remaining Puppet, though from then on they move one space less than normal.", None)]),
        dict(title='Tips', bullets=['Kill Puppets to cut his output', 'Keep at least one Puppet dead', 'Pick one plan early', 'Rescuing beat searching'],
             images=[(G+'S1-killer-geppetto-art.png', None)],
             lines=[("A few tips. Every Puppet copies his actions, so killing them cuts his damage, and keeping one dead stops Immortal Master.", None),
                    ("Pick one plan early, rescuing or attacking, rather than splitting your effort.", None),
                    ("Watch for Puppets gathering round groups of Victims. Good luck.", None)]),
    ])
