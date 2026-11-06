# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Series 3 Feature Film rulebook in the project root; P + 'N' is page N.
P = os.path.join(A, '..', '..', 'FeatureFilmRules_S3.pdf') + '#'
# Sharp 600 dpi crops of small cards from that rulebook.
S = os.path.join(os.path.dirname(os.path.abspath(__file__)), 's3img') + '/'

FILM = dict(
    type='location',
    season=3,
    shortName='hellscape',
    name='The Hellscape',
    heading='THE HELLSCAPE',
    film='Hell to Pay',
    background=G+'S3-location-hellscape-art.png', flavour=G+'S3-location-hellscape-flavour.png',
    scenes=[
        dict(title='The Hellscape',
             kind='intro',
             images=[(G+'S3-location-hellscape-board.jpg', None)],
             lines=[('The Hellscape: a landscape that toys with everyone who enters it.', None),
                    ("Here's how the location plays.", None)]),
        dict(title='Special setup',
             bullets=['Deal the 4 tiles onto the blank spaces', 'Symbol top-left', '1 Victim on each tile space (8)', 'Then the Setup card', 'Hellshift into the Tableau'],
             images=[(G+'S3-location-hellscape-board.jpg', None)],
             lines=[('Shuffle the four Hellscape tiles and deal one onto each blank space of the board, with its symbol at the top left so the Panic numbers read the right way up.', None),
                    ('Put one Victim on each space of each tile, eight in all. Then reveal the Setup card for the other Victims, you and the Killer.', None),
                    ('Add the Hellshift Action card to the Tableau.', None)]),
        dict(title='Moving tiles',
             bullets=['Everything on a tile moves with it', 'Shift: each tile one step round', 'Swap: two tiles trade places', 'Flip: turn over, pieces to matching colours', 'Rearrange: any layout, no flipping'],
             icons=[R+'S3-location-hellscape-icon-tile-star.png', R+'S3-location-hellscape-icon-tile-bars.png', R+'S3-location-hellscape-icon-tile-cog.png', R+'S3-location-hellscape-icon-tile-circle.png'],
             images=[(P+'7', (0.51, 0.08, 1.0, 0.52))],
             lines=[('The four double-sided tiles each have a symbol: star, square, hourglass and clover. They move during the game, and everything on a tile, you, Enemies, Victims and tokens, moves with it.', None),
                    ('Shift: move every tile one step clockwise or anticlockwise, as the card says. Swap: two tiles trade places.', None),
                    ("Flip: take everything off, noting the colour of each space, flip the tile and put the pieces back on the matching colours. Rearrange: set all the tiles however you like, but you can't flip them.", None)]),
        dict(title='Hellscape dice',
             bullets=['Every Upkeep: roll both dice', 'Same symbol: FLIP that tile', 'Different: SWAP those two tiles'],
             icons=[R+'S3-location-hellscape-icon-hellscape-dice.png'],
             images=[(P+'8', (0.0, 0.0, 0.5, 0.42))],
             lines=[('Once in every Upkeep you must roll the two Hellscape dice.', None),
                    ("If they match, flip that tile. If they're different, swap those two tiles.", None),
                    ('In this example both dice show the same symbol, so Ryan flips that tile: he lifts off himself and three Victims, flips it, and puts the purple pieces back on purple and the red one on red.', None)]),
        dict(title='Walls',
             bullets=['Tiles have 1–2 wall sides', 'Areas can be cut off completely', 'Panic into a wall: stay put', 'Wait or shift tiles to get through'],
             images=[(G+'S3-location-hellscape-board.jpg', None)],
             lines=[('Each tile has one or two wall sides that nobody can cross. Depending on the layout, a tile or a whole area can be completely cut off from you or the Enemies.', None),
                    ("You'll need to move tiles, or wait for the dice, to get through.", None),
                    ('Anyone who panics into a wall, or a direction with no connection, simply stays put.', None)]),
        dict(title='Range and targeting',
             bullets=['Count spaces along real paths', "No path: Killer doesn't move", '…but still attacks its own space', 'Closest/farthest: reachable only', '"Place" ignores walls; "move" doesn\'t'],
             images=[(P+'8', (0.0, 0.42, 0.5, 0.67))],
             lines=[('Range and targeting always count the spaces needed to actually move from one to the other.', None),
                    ("If there's no valid path to a Killer Action's target, the Killer doesn't move, but still resolves its attacks in its own space.", None),
                    ('Closest and farthest only consider reachable Victims. If none can be reached, ignore the tile walls and use your judgement. The same goes for things like the nearest exit.', None),
                    ("Effects that place someone ignore walls. Effects that move them don't.", None)]),
        dict(title='Hellshift',
             bullets=['2 Time to buy', '2 successes: Rearrange all tiles', '1 success: Swap 2 tiles, −1 Time', 'No successes: −2 Time'],
             images=[(S+'hellshift.png', None)],
             lines=[('Hellshift lets you reshape the board. It costs two Time to buy.', None),
                    ('Two successes: rearrange all the tiles as you like. One success: swap any two tiles, and lose a Time. No successes: lose two Time.', None),
                    ('Use it to bring Victims to an exit, or to wall the Killer off from you and everyone else.', None)]),
        dict(title='Hellish cards',
             bullets=['Spiral of Death/Horrors: tiles shift', 'Stare Into The Abyss: −1 Health per tile', 'Torture Chambers: deaths add Horror', 'Bone Key: ride the Chariot anywhere'],
             images=[(S+'spiral.png', None)],
             lines=[('Spiral of Death shifts every tile one step anticlockwise, adds a Victim on the star and square tiles, then the Killer targets you or a Victim, moves and attacks. Spiral of Horrors shifts them clockwise.', None),
                    ('Stare Into The Abyss costs you a health whenever you move onto a tile. And the Bone Key item lets you ride the Bone Chariot to any tile space for two Time.', None)]),
        dict(title='Tips',
             bullets=['Strand the Killer behind walls', 'Check exits before you shift', 'Upkeep dice can cut you off', 'Discipline of Courage: health for Horror'],
             images=[(G+'S3-location-hellscape-art.png', None)],
             lines=[('A few tips. Use Hellshift to strand the Killer on a tile with no Victims.', None),
                    ('Check your route to the exits before shifting, because the Upkeep dice can cut you off right after a rescue.', None),
                    ("It's one of the best-rated boards in the game. Good luck.", None)]),
    ])
