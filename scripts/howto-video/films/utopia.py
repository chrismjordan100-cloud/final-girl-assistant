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
    shortName='utopia',
    name='Utopia',
    heading='UTOPIA',
    film="Don't Make a Sound",
    background=G+'S3-location-utopia-art.png', flavour=G+'S3-location-utopia-flavour.png',
    scenes=[
        dict(title='Utopia',
             kind='intro',
             images=[(G+'S3-location-utopia-board.jpg', None)],
             lines=[('Utopia: where can you find it? Nowhere. Just desert, a few buildings, and things under the sand.', None),
                    ("Here's how the location plays.", None)]),
        dict(title='Special setup',
             bullets=['Shuffle the 12 Sand Snake cards', "That's the Sand Snake deck"],
             images=[(S+'sand-snake.png', None)],
             lines=[("Shuffle the twelve Sand Snake cards to make the Sand Snake deck. That's all the extra setup.", None)]),
        dict(title='Sand Snake attack!',
             bullets=['End of every Killer phase: draw 2', 'Each hits ONE target in its space', 'Victim → Final Girl → Minion → Killer', '1 damage each', 'Then they burrow away'],
             images=[(S+'sand-snake.png', None)],
             lines=[('Each turn the Sand Snakes rise up and attack. At the end of the Killer phase, draw two Sand Snake cards and follow them.', None),
                    ('Each snake does one damage to one target in the named space, in this order: a Victim first, then you, then a Minion, then the Killer.', None),
                    ('For example, this one attacks the Crossroads, or the Bunker if the Crossroads has collapsed.', None),
                    ('Then they burrow back underground.', None)]),
        dict(title="Snakes can't be fought",
             bullets=['Not Minions', "Can't be attacked or killed", 'Reactions and Items CAN block damage', 'Reshuffle card: after the others'],
             images=[(S+'sand-snake.png', None)],
             lines=[("Sand Snakes aren't Minions. You can't attack, kill or otherwise deal with them, except that Reaction cards and Item effects can prevent their damage to you.", None),
                    ('One card tells you to reshuffle the discard pile into the deck. Do that after resolving any other Sand Snake cards drawn with it.', None)]),
        dict(title='Boulder spaces',
             bullets=['Safe from Sand Snakes', 'Some cards use them', 'Six-Shooter & Scoped Rifle: extra range'],
             icons=[R+'S3-location-utopia-icon-boulder-space.png'],
             images=[(G+'S3-location-utopia-board.jpg', None)],
             lines=[('Boulder spaces, with this icon, are safe from Sand Snake attacks, and some cards refer to them.', None),
                    ('Some ranged weapons reach further from a Boulder: the Six-Shooter gets range two, and the Scoped Rifle range four.', None)]),
        dict(title='Sinkholes',
             bullets=['A space Collapses', 'Victims there die', 'You and Enemies take damage', 'Survivors panic until they leave', 'Sinkhole token: closed for good'],
             icons=[R+'S3-location-utopia-icon-sinkhole.png'],
             images=[(S+'earthquake.png', None), (P+'19', (0.0, 0.52, 0.5, 0.66))],
             lines=[('Some Terror and Event cards make a space collapse. Earthquake!, for example: roll a die, one to three the Crossroads, four to six the Trailer Park.', None),
                    ("When a space collapses, every Victim in it is killed. You and any Enemies there take damage, and anyone left panics until they're out.", None),
                    ('Put a Sinkhole token there. Nobody can move into or through that space for the rest of the game. There are four Sinkholes.', None)]),
        dict(title='Desert cards',
             bullets=['Dehydration: Time resets to 5', 'Stalkers: draw 3 Sand Snakes', 'Landslide!: Mountain Pass closed', 'Bulldozer Keys: ignore Sand Snakes'],
             images=[(S+'bulldozer.png', None)],
             lines=[('Dehydration resets your Time to five at the end of each Planning phase, unless you have some left over. The Canteen cures it.', None),
                    ('Stalkers makes you draw three Sand Snakes each turn instead of two. Landslide! closes the Mountain Pass exit.', None),
                    ("The Bulldozer Keys let you drive the Bulldozer: while you're with it, you and Victims in your space ignore the Sand Snakes.", None)]),
        dict(title='Tips',
             bullets=['Treat the snakes as a second Killer', 'Fight from the Boulders', 'Plan routes around Sinkholes', 'Find the Canteen early'],
             images=[(G+'S3-location-utopia-art.png', None)],
             lines=[('A few tips. Treat the Sand Snakes as a second Killer and check which spaces they hit.', None),
                    ("Fight from the Boulders, where you're safe and ranged weapons reach further.", None),
                    ('And Sinkholes are permanent, so keep your route to the exits open. Good luck.', None)]),
    ])
