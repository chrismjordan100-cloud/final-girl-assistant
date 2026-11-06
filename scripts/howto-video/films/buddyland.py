# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Series 4 rule sheet for this film in s4-rules-pdf; P + 'N' is page N.
P = os.path.join(A, '..', '..', 's4-rules-pdf', 'FF16_Buddyland.pdf') + '#'
# Sharp 600 dpi crops of cards from the Series 4 rule sheets.
S = os.path.join(os.path.dirname(os.path.abspath(__file__)), 's4img') + '/'

FILM = dict(
    type='location',
    season=4,
    shortName='buddyland',
    name='Buddyland',
    heading='BUDDYLAND',
    film='Bad Times at Buddyland',
    background=G+'S4-location-buddyland-art.png', flavour=G+'S4-location-buddyland-flavour.png',
    scenes=[
        dict(title='Buddyland',
             kind='intro',
             images=[(G+'S4-location-buddyland-board.jpg', None)],
             lines=[('Buddyland: where everything is awesome, and the toughest question is what to play next.', None),
                    ("Here's how the location plays.", None)]),
        dict(title='No special setup',
             bullets=['Normal setup', 'No extra components to place'],
             images=[(G+'S4-location-buddyland-board.jpg', None)],
             lines=[('Buddyland has no special setup. Set up from the Setup card as normal.', None)]),
        dict(title='Arcade spaces',
             bullets=['4 spaces in the middle', 'Marked with the Arcade icon', 'Cards and Items refer to them'],
             icons=[R+'S4-location-buddyland-icon-arcade-space.png'],
             images=[(G+'S4-location-buddyland-board.jpg', (0.33, 0.43, 0.7, 0.9))],
             lines=[('Its only special rule: the four spaces in the middle of the board with the joystick icon are Arcade spaces. Several cards and Items use them.', None),
                    ('The Arcade Token, for example, is discarded in an Arcade space to trade three Time for the reward the card shows.', None)]),
        dict(title='What to watch for',
             bullets=['Birthday Girl: +4 Time if saved', 'Buddy Up: save 2+ at a time', 'Sing-A-Long: Horror every Upkeep', 'Nick the Janitor: 2 damage', "How'd They Sneak In?: new Victims"],
             images=[(S+'bl-terror.png', None)],
             lines=[('The Birthday Girl gives four Time if you save her, but raises Bloodlust if she dies. Buddy Up makes you save two or more Victims at a time.', None),
                    ('Sing-A-Long raises Horror every Upkeep until it reaches the red. Nick the Janitor deals two damage to any Enemy whose space he enters.', None),
                    ("How'd They Sneak In? rolls three dice and adds a Victim for each: one or two the Jungle Gym, three or four the Dining Area, five or six the Party Room.", None)]),
        dict(title='Tips',
             bullets=['Search: Dining Area, Prize Counter, Ball Pit', 'Exits are close together', 'Use Arcade items in Arcade spaces', 'Lead Nick into Enemies'],
             images=[(G+'S4-location-buddyland-art.png', None)],
             lines=[('A few tips. The Items here are worth it: search the Dining Area, Prize Counter and Ball Pit.', None),
                    ('Exits are close together, so rescues are easier than usual. Use Arcade items in Arcade spaces, and lead Nick the Janitor into Buddies. Good luck.', None)]),
    ])
