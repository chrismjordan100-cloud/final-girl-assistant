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
    type='location', season=2, shortName='station-2891', name='Station 2891', heading='STATION 2891', film='Panic at Station 2891',
    background=G+'S2-location-station-2891-art.png', flavour=G+'S2-location-station-2891-flavour.png',
    scenes=[
        dict(title='Station 2891', kind='intro', images=[(G+'S2-location-station-2891-board.jpg', None)],
             lines=[("Station 2891: an Arctic research base where you never, ever let go of the guide line.", None),
                    ("Here's how the location plays.", None)]),
        dict(title='Special setup', bullets=['Helicopter card beside the board', 'Helicopter token on its exit space', 'Skidozer outdoors, next to a search space', 'Start with a Two-Way Radio'],
             icons=[R+'S2-location-station-2891-icon-vehicle-skidozer.png'],
             images=[(S+'stn-heli.png', None)],
             lines=[("Put the Helicopter card near the board and the Helicopter token on its exit space. Place the Skidozer token in any outdoor space next to a search space.", None),
                    ("And before building the Item decks, find a Two-Way Radio and put it in your inventory.", None)]),
        dict(title='Space types', bullets=['Outdoor: the 5 outside spaces, incl. the exit', 'Everything else is indoors', 'Main Building: indoors, except Hut and Shed', 'Hallways: the long spaces (use Holding boards)'],
             images=[(G+'S2-location-station-2891-board.jpg', None)],
             lines=[("The five outside spaces, including the Helicopter exit, are Outdoor. Everything else is indoors.", None),
                    ("The Main Building is every indoor space except the Commander's Hut and the Tool Shed. The long corridors in it are Hallway spaces; use the Victim Holding boards from the Core Box for them. Many cards refer to these types.", None)]),
        dict(title='Saving by Helicopter', bullets=['The only way to save Victims', 'Helicopter on its exit: load up to 3 Victims', 'They move to Station 2891 on the card', 'Can\'t come back until it has unloaded', 'Victims on board can\'t be harmed'],
             icons=[R+'S2-location-station-2891-icon-helicopter-move.png'],
             images=[(S+'stn-heli.png', None)],
             lines=[("Victims are saved by helicopter, which has to fly them to the Arctic Airport.", None),
                    ("When the Helicopter token is on its exit space, you may move it and up to three Victims with it onto the Arctic Station 2891 space of the Helicopter card.", None),
                    ("Once it has Victims aboard, it can't return to the station until it has dropped them at the Airport. Victims on the Helicopter card can't be targeted or killed.", None)]),
        dict(title='Flying', bullets=['Helicopter icon: move it 1 space on the card', 'Fly Faster!: new Action card, 1 Time', '2 successes: 2 moves · 1 success: 1 move', 'Or pay 2 Time to resolve it again', 'Reaches the Airport: Victims saved'],
             icons=[R+'S2-location-station-2891-icon-helicopter-move.png'],
             images=[(S+'stn-fly.png', None)],
             lines=[("Each Helicopter icon moves it one space along the Helicopter card. Your main way to do that is the new Fly Faster! Action card, which costs one Time.", None),
                    ("Two successes fly it two spaces, one success flies it one space, and each result also costs you a Time. Or you can pay two Time to resolve the card again.", None),
                    ("Some Terror cards move it too. When it reaches the Airport, the Victims are saved; if that happens outside your Action phase, take the save rewards at the start of your next one. Then it can fly back and land freely.", None)]),
        dict(title='Frostbite', bullets=['Frostbite icon hits everyone OUTDOORS', 'No token yet: gain a Frostbite token', 'Already have one: lose 1 health', 'You, Victims AND Enemies', 'Upkeep: indoors? Discard your token'],
             icons=[R+'S2-location-station-2891-icon-frostbite.png'],
             images=[(G+'S2-location-station-2891-board.jpg', (0.0, 0.45, 1.0, 1.0))],
             lines=[("When the Frostbite icon comes up, you, every Victim, and every Enemy in an outdoor space gains a Frostbite token, or loses one health if they already have one.", None),
                    ("During each Upkeep, anyone indoors discards their Frostbite token. So stepping inside to warm up resets it.", None),
                    ("Victims killed by Frostbite still count as killed, and it can hurt the Killer too.", None)]),
        dict(title='The Skidozer and Radio', bullets=['Skidozer Keys: Skidozer moves you', '...to any outdoor space', 'Or blow a Hole into the Lab', 'Two-Way Radio: 1 Time, move a Victim 1 space'],
             icons=[R+'S2-location-station-2891-icon-vehicle-skidozer.png'],
             images=[(S+'stn-skidozer.png', None)],
             lines=[("If you find the Skidozer Keys, the Skidozer can take you to any outdoor space. It must always stay outdoors. Or, from the space just outside the Lab, place the Hole token to make the two spaces adjacent.", None),
                    ("Your Two-Way Radio lets you pay one Time to move a Victim one space, but not the same Victim twice in a turn.", None)]),
        dict(title='Tips', bullets=['Fill the Helicopter: 3 Victims a trip', 'Fly Faster! early and often', 'Get indoors before Upkeep', 'Lure the Killer outside in the cold'],
             images=[(G+'S2-location-station-2891-art.png', None)],
             lines=[("A few tips. Every trip is slow, so only launch the Helicopter with a full load of three.", None),
                    ("Buy Fly Faster! early, because the Helicopter is your only way to save anyone.", None),
                    ("Get back indoors before Upkeep to shed Frostbite, and remember the Killer freezes outside too. Good luck.", None)]),
    ])
