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
    type='killer', season=1, shortName='inkanyamba', name='Inkanyamba', heading='INKANYAMBA', film='Slaughter in the Groves',
    background=G+'S1-location-sacred-groves-art.png', flavour=G+'S1-killer-inkanyamba-flavour.png',
    scenes=[
        dict(title='Inkanyamba', kind='intro', images=[(G+'S1-killer-inkanyamba-art.png', None)],
             lines=[("Inkanyamba: whoever he used to be no longer matters. He has become a creature of pure wrath.",
                     "Ink-an-yarm-ba: whoever he used to be no longer matters. He has become a creature of pure wrath."),
                    ("Here's how he plays.", None)]),
        dict(title='Special setup', bullets=['Killer Wrath card at level 2', 'Both Atonement cards in the Tableau'],
             images=[(P+'15', (0.15, 0.83, 0.40, 0.985)), (P+'15', (0.67, 0.625, 0.78, 0.745))],
             lines=[("Put the Killer Wrath card out with a tracking marker on level two, and add both Atonement Action cards to the Action Tableau.", None)]),
        dict(title='Killer Wrath', bullets=['Increase / Decrease moves the marker', 'Always between 1 and 10', 'Unleash: apply the current level', 'Horror, healing or attacks'],
             icons=[R+'S1-killer-inkanyamba-icon-killer-wrath.png'],
             images=[(P+'15', (0.55, 0.315, 0.90, 0.585))],
             lines=[("Killer Wrath is his rising anger. Increase and Decrease move the marker, always between one and ten.", None),
                    ("Unleash means apply the current level, which can raise Horror, heal him, make him take a Killer Action, or all three.", None)]),
        dict(title='Atonement', bullets=['Lowers Killer or Divine Wrath', 'Extra line for 3+ successes', 'Your main way to calm him'],
             images=[(P+'15', (0.15, 0.83, 0.40, 0.985))],
             lines=[("Atonement cards are your main way to lower his Wrath, or Divine Wrath at the Sacred Groves.", None),
                    ("They have an extra success line for three or more successes on a Horror roll.", None)]),
        dict(title='What to watch for', bullets=['Wrath of Death: + your health', 'Volatile Temper: Unleash rolls', 'Dark Lightning: double kills'],
             images=[(P+'15', (0.10, 0.315, 0.46, 0.69))],
             lines=[("Wrath of Death raises his Wrath by your current health, so being at full health hurts here.", None),
                    ("Volatile Temper adds a Horror roll at the end of each Upkeep that can Unleash him, and Dark Lightning kills a second Victim nearby whenever he kills one.", None)]),
        dict(title='Tips', bullets=['Try him away from the Groves first', 'Lower Horror before Atonement', 'Hunt dual-purpose weapons', 'Savage Whirlwind: toughest Finale'],
             images=[(P+'16', (0.0, 0.70, 1.0, 1.0))],
             lines=[("A few tips. At the Sacred Groves two Wrath tracks stack, and it's the hardest box in the game, so try him elsewhere first.", None),
                    ("Atonement is unreliable on one or two dice, so get Horror down first and roll three.", None),
                    ("Look for weapons that hurt him and lower Wrath at once. And beware Savage Whirlwind, his toughest Finale. Good luck.", None)]),
    ])
