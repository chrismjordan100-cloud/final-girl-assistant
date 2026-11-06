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
    type='location', season=1, shortName='creech-manor', name='Creech Manor', heading='CREECH MANOR', film='The Haunting of Creech Manor',
    background=G+'S1-location-creech-manor-art.png', flavour=G+'S1-location-creech-manor-flavour.png',
    scenes=[
        dict(title='Creech Manor', kind='intro', images=[(G+'S1-location-creech-manor-board.jpg', None)],
             lines=[("Creech Manor: over a hundred years old, full of historic charm, and every room has a horrifying story.", None),
                    ("Here's how the location plays.", None)]),
        dict(title='Setup', bullets=['No special setup', 'One-way spaces', 'Window spaces', 'Inside and Outside'],
             images=[(G+'S1-location-creech-manor-board.jpg', None)],
             lines=[("Creech Manor has no special setup, but the house itself has a few rules of its own.", None)]),
        dict(title='One-way spaces', bullets=['3 spaces exit in one direction only', 'White arrows show the way', 'No one moves against an arrow', 'Still adjacent both ways', 'Rope Ladder makes it a normal space'],
             images=[(P+'7', (0.30, 0.32, 0.68, 0.56))],
             lines=[("Creech Manor has three one-way spaces. White arrows and lines show the only direction you can leave them.", None),
                    ("You can't move against an arrow. So you can't climb up the tyre swing and back in through the window, and you can't climb up through the hole in the washroom ceiling on the left of the board.", None),
                    ("Victims and Enemies follow the same rule. But the spaces still count as adjacent in both directions, for attacks and anything else that checks adjacency.", None),
                    ("The one exception is the Rope Ladder item. Once used, it turns a one-way space into a normal two-way space.", None)]),
        dict(title='Window spaces', bullets=['3 Window spaces: 2 right, 1 left', 'No rules of their own', 'Many cards target them', 'e.g. Victims jumping to their deaths'],
             icons=[R+'S1-location-creech-manor-icon-window-space.png'],
             images=[(G+'S1-location-creech-manor-board.jpg', (0.0, 0.18, 1.0, 0.75))],
             lines=[("Window spaces are marked with a window icon. There are two on the right side of the house and one on the left.", None),
                    ("They have no rules of their own, but many Terror and Event cards target them, for example sending panicking Victims out of a window to their death. So keep an eye on who is standing by one.", None)]),
        dict(title='The Ladder', bullets=['"The Ladder" = the outside ladder', 'Left exit ↔ third-floor washroom', 'The attic ladder is just art'],
             images=[(P+'7', (0.02, 0.69, 0.98, 0.86))],
             lines=[("Whenever a card mentions The Ladder, it means the ladder on the outside of the building, joining the left exit space to the third-floor washroom.", None),
                    ("The ladder drawn up to the attic is just artwork. No game effect ever touches it.", None)]),
        dict(title='Inside and Outside', bullets=['Every space is Inside...', '...except the 3 exit spaces', 'Cards check Inside / Outside', 'e.g. doors and windows slam shut'],
             images=[(G+'S1-location-creech-manor-board.jpg', None)],
             lines=[("Every space counts as Inside, except the three exit spaces, which are Outside.", None),
                    ("Several cards check this. For example, when the windows and doors slam shut: if you're Inside, you can't move during your next Action phase; if you're Outside, you can't enter the house.", None),
                    ("And the Lights Out event makes you roll one fewer die whenever an Action card lets you move, unless you have a Flashlight or a Candle.", None)]),
        dict(title='Tips', bullets=['Bring Victims down early', 'Avoid the Attic', 'Keep a Flashlight or Candle', 'A tough location'],
             images=[(P+'6', (0.05, 0.76, 1.0, 1.0))],
             lines=[("A few tips. The exits are at street level, so bring Victims down early.", None),
                    ("Avoid the Attic: Victims sent there tend to die in bulk.", None),
                    ("If Lights Out comes up, a Flashlight or Candle keeps you moving.", None),
                    ("It's one of the tougher locations, especially against the Poltergeist and the Birds. Good luck.", None)]),
    ])
