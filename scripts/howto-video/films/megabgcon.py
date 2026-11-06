# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Rule sheet for this Special Feature (s4-rules-pdf); P + 'N' is page N.
P = os.path.join(A, '..', '..', 's4-rules-pdf', 'FS2_MegaBGCon.pdf') + '#'
# Sharp 600 dpi crops of cards, plus publisher photos, for the Special Features.
S = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'spimg') + '/'

FILM = dict(
    type='location',
    season=0,
    shortName='megabgcon',
    name='Mega Boardgame Con',
    heading='MEGA BOARDGAME CON',
    film='Shriek',
    background=G+'S0-location-megabgcon-art.png', flavour=G+'S0-location-megabgcon-flavour.png',
    scenes=[
        dict(title='Mega Boardgame Con',
             kind='intro',
             images=[(G+'S0-location-megabgcon-art.png', None)],
             lines=[('Mega Boardgame Con: the best week of gaming, packed with attendees who refuse to leave.', 'Mega Board Game Con: the best week of gaming, packed with attendees who refuse to leave.'),
                    ("Here's how the location plays.", None)]),
        dict(title='Special setup',
             bullets=['Shuffle the 12 Booth cards', 'Shuffle the 10 Booth Event cards', 'Create a Panic cards into the Tableau', 'Finale Reminder card under the Finale'],
             images=[(S+'bg-booth.png', None)],
             lines=[('Shuffle the twelve Booth cards into a face-down deck, and the ten Booth Event cards into another.', None),
                    ('Add the two Create a Panic cards to the Tableau, and tuck the Finale Reminder card under the Finale card, reminder side up.', None)]),
        dict(title='Three areas',
             bullets=['Exhibit Areas: yellow, spade icon', 'Food Court: bottom left', 'General Areas: everything else'],
             icons=[R+'S4-location-mega-board-game-con-icon-exhibit-area-space.png'],
             images=[(S+'bg-areas.png', None)],
             lines=[("The board has three kinds of area. Exhibit Areas are the yellow booth spaces with the spade icon. The Food Court is in the bottom left corner. Everything else is a General Area. There's a key on the back of the rule sheet.", None)]),
        dict(title="Victims won't leave the booths",
             bullets=['No Victim follows you OUT of an Exhibit Area', '…into a General Area', 'Scare them out with Create a Panic', 'Normal panic can move them too'],
             images=[(P+'2', (0.0, 0.57, 1.0, 0.82))],
             lines=[('Attendees are having too much fun. No Victim will follow you when you move from an Exhibit Area space into a General Area space.', None),
                    ('To get them out, use Create a Panic to scare them across, or let normal panic move them.', None)]),
        dict(title='Create a Panic',
             bullets=['Only in a space with Victims', 'Best: panic them all your way', 'Middle: panic, adjust each roll by 1', 'Worst: panic them all', 'Swap any Action card to take it'],
             images=[(S+'bg-actions.png', None)],
             lines=[('Create a Panic can only be played in a space with Victims, and you can discard any Action card in the Action phase to take it.', None),
                    ('Two successes: panic each Victim in your space in the direction of your choice. One success: panic them, but you may change each panic roll by one. No successes: just panic them. Each costs one Time.', None)]),
        dict(title='Searching anywhere',
             bullets=['Search in ANY space', 'Deck depends on the area', 'Exhibit, Food Court or General', 'Every space counts as a Search space'],
             images=[(P+'3', (0.0, 0.0, 1.0, 0.26))],
             lines=[('You can search in any space here. Which Item deck you draw from depends on the area: Exhibit Area, Food Court or General Area.', None),
                    ('There are no search icons on the board, but every space counts as a Search space for card effects.', None)]),
        dict(title='Hallways and docks',
             bullets=['Moving along the blue double arrows', '+1 die on the movement card', 'First step MUST be along one', 'Main Hallway panic: roll 2 dice'],
             icons=[R+'S4-location-mega-board-game-con-icon-hallway-dock-fast-move.png'],
             images=[(P+'3', (0.0, 0.27, 1.0, 0.46))],
             lines=[('Hallways and docks are quieter. If you move to a space connected by the blue double-arrow icon, you get one extra die on the Action card that moves you, but your first step must be along one of those connections.', None),
                    ('And when anyone panics out of the Main Hallway, roll two dice instead of one.', None)]),
        dict(title='Booths',
             bullets=['Every Upkeep: draw a Booth card', 'Roll: 1–3 a new Victim at that booth', '4–6: a Booth Event there', "Location-only draws: don't roll", 'Finale: no more Booth cards'],
             images=[(S+'bg-booth.png', None)],
             lines=[('Every Upkeep, draw a Booth card and roll a die. On one to three, a new attendee arrives: spawn a normal Victim at that booth. On four to six, draw a Booth Event and apply it at that booth.', None),
                    ('If a card only needs a Booth location, just draw the Booth card without rolling. Reshuffle the discards when the deck runs out.', None),
                    ('When the Finale is revealed, flip the Finale Reminder card onto the Booth deck: no more Booth cards from then on.', None)]),
        dict(title='Con chaos',
             bullets=['Shoulder to Shoulder: −1 die there', 'Wet Floor: your move ends there', 'Mega Sale!: +1 die searching', 'A Lot Going On Today!: more Terror'],
             icons=[R+'S4-location-mega-board-game-con-icon-crowd-token.png', R+'S4-location-mega-board-game-con-icon-wet-floor-sign-token.png'],
             images=[(G+'S0-location-megabgcon-art.png', None)],
             lines=[('Booth Events include Shoulder to Shoulder, a crowd that costs you a die there, Wet Floor, which stops your movement, and Mega Sale, an extra search die.', None),
                    ('And A Lot Going On Today! draws an Event: with one or no Events in play Horror rises by two, but with two or more you resolve another Terror card.', None)]),
        dict(title='Tips',
             bullets=["Don't forget the Booth roll each Upkeep", 'Panic Victims out of the booths first', 'Use the hallways for extra dice', 'Search the deck that suits you'],
             images=[(G+'S0-location-megabgcon-art.png', None)],
             lines=[("A few tips. Don't forget the Booth roll every Upkeep.", None),
                    ("Victims in booths won't follow you, so use Create a Panic or the Deodorant to get them moving first.", None),
                    ('Use the hallways for that extra die, and pick the search area whose Item deck you want. Good luck.', None)]),
    ])
