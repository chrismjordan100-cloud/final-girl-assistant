# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Rule sheet for this Special Feature (s4-rules-pdf); P + 'N' is page N.
P = os.path.join(A, '..', '..', 's4-rules-pdf', 'FS2_Mort.pdf') + '#'
# Sharp 600 dpi crops of cards, plus publisher photos, for the Special Features.
S = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'spimg') + '/'

FILM = dict(
    type='location',
    season=0,
    shortName='santas-village',
    name="Santa's Village",
    heading="SANTA'S VILLAGE",
    film='North Pole Nightmare',
    background=G+'S0-location-santas-village-art.png', flavour=G+'S0-location-santas-village-flavour.png',
    scenes=[
        dict(title="Santa's Village",
             kind='intro',
             images=[(G+'S0-location-santas-village-art.png', None)],
             lines=[("Santa's Village: snow, lights, and a workshop full of elves who really should have gone home.", None),
                    ("Here's how the location plays.", None)]),
        dict(title='No special setup',
             bullets=['Normal setup from the Setup card'],
             images=[(G+'S0-location-santas-village-art.png', None)],
             lines=[("Santa's Village has no special setup.", None)]),
        dict(title="Santa's Elves",
             bullets=['The Victims here are elves', 'Move INTO a space with Victims:', 'lose 1 Time per normal Victim there', 'Not when they follow, panic or are placed', 'Workshop Hammer: only 1 Time'],
             images=[(G+'S0-location-santas-village-art.png', None)],
             lines=[("The Victims here are Santa's elves, busy and in the way. Each time you move into a space with normal yellow Victims, you lose one Time for each Victim there.", None),
                    ("It only applies when you move in. It doesn't apply when Victims follow you, panic into your space, or are placed with you.", None),
                    ('So crowded spaces are expensive. The Workshop Hammer item caps it at one Time, however many elves there are.', None)]),
        dict(title='Village events',
             bullets=["It's Santa!: unlimited followers", 'Head Elf: a free Search', 'Blizzard: blocks spaces round the centre', 'Yeti: wanders the exits', 'Caroling: −2 Horror with 3+ Victims'],
             images=[(G+'S0-location-santas-village-art.png', None)],
             lines=[("It's Santa! places Santa in Santa's House. While he's with you, any number of Victims will follow you. If he dies, Bloodlust and Horror both go up two.", None),
                    ("The Head Elf lets you resolve a Search card once a turn as if it were in your hand. Blizzard puts tokens round the Village Centre that you can't move into, and they circle each Upkeep.", None),
                    ("The Yeti can't be targeted or killed, panics every Upkeep, and does two damage in its space, hitting the Killer first.", None)]),
        dict(title='Terror cards',
             bullets=['Fire!: a search space burns', 'Where Did It Go?: Killer vanishes…', '…then appears in your space', 'Prayer Vigil: 3 Victims in the centre'],
             images=[(G+'S0-location-santas-village-art.png', None)],
             lines=[("Fire! rolls for Santa's House, Santa's Workshop or the Stables. Every Victim there dies and its Items are discarded.", None),
                    ('Where Did It Go? takes the Killer off the board, and at the start of the next Killer phase places him right in your space.', None)]),
        dict(title='Tips',
             bullets=['Plan routes round crowded spaces', 'Let Victims come to you', 'Find Santa: unlimited followers', 'Milk and Cookies: full heal'],
             images=[(G+'S0-location-santas-village-art.png', None)],
             lines=[('A few tips. Plan routes around crowded spaces, because each elf costs you Time.', None),
                    ('Let Victims follow or panic to you rather than walking into them. And if Santa turns up, use him to lead everyone out at once. Good luck.', None)]),
    ])
