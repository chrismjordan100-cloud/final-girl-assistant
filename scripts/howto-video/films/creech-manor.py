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
        dict(title='Creech Manor', kind='intro', images=[(P+'6', (0.01, 0.33, 0.37, 0.555))],
             lines=[("Creech Manor: over a hundred years old, full of historic charm, and every room has a horrifying story.", None),
                    ("Here's how the location plays.", None)]),
        dict(title='Setup', bullets=['No special setup', 'One-way spaces', 'Window spaces', 'Inside and Outside'],
             images=[(P+'6', (0.01, 0.30, 0.99, 0.76))],
             lines=[("Creech Manor has no special setup, but the house itself has a few rules of its own.", None)]),
        dict(title='One-way spaces', bullets=['3 spaces exit one way only', 'No one moves against an arrow', 'Still adjacent both ways', 'Rope Ladder undoes it'],
             images=[(P+'7', (0.30, 0.32, 0.68, 0.56))],
             lines=[("Three spaces only exit one way, shown by white arrows. You can't climb back up the tyre swing, or up through the washroom ceiling.", None),
                    ("Victims and Enemies follow the same rule, though the spaces still count as adjacent both ways.", None),
                    ("The Rope Ladder item is the only exception: it turns a one-way space back into a normal one.", None)]),
        dict(title='Windows and the Ladder', bullets=['3 Window spaces', 'Many cards target Windows', '"The Ladder" = outside ladder', 'Only the 3 exits are Outside'],
             icons=[R+'S1-location-creech-manor-icon-window-space.png'],
             images=[(P+'7', (0.02, 0.62, 0.98, 0.92))],
             lines=[("There are three Window spaces. They have no rules of their own, but lots of Terror and Event cards target them.", None),
                    ("The Ladder always means the outside ladder up to the third-floor washroom, never the attic ladder.", None),
                    ("And every space is Inside except the three exits, which are Outside.", None)]),
        dict(title='Tips', bullets=['Bring Victims down early', 'Avoid the Attic', 'Keep a Flashlight or Candle', 'A tough location'],
             images=[(P+'6', (0.05, 0.76, 1.0, 1.0))],
             lines=[("A few tips. The exits are at street level, so bring Victims down early.", None),
                    ("Avoid the Attic: Victims sent there tend to die in bulk.", None),
                    ("If Lights Out comes up, a Flashlight or Candle keeps you moving.", None),
                    ("It's one of the tougher locations, especially against the Poltergeist and the Birds. Good luck.", None)]),
    ])
