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
        dict(title='Killer Wrath', bullets=['His anger: levels 1 to 10', 'Increase / Decrease moves the marker', 'Never below 1 or above 10', 'Unleash: apply the current level'],
             icons=[R+'S1-killer-inkanyamba-icon-killer-wrath.png'],
             images=[(P+'15', (0.67, 0.625, 0.78, 0.745))],
             lines=[("Inkanyamba's anger is tracked on the Killer Wrath card, from level one to ten.", None),
                    ("When told to Increase or Decrease Killer Wrath, move the marker up or down that many levels. It never goes below one or above ten.", None),
                    ("When told to Unleash Killer Wrath, look at the current level and apply everything printed on it.", None)]),
        dict(title='What Unleash does', bullets=['Raise Horror', 'He recovers health', 'He takes an extra Killer Action', 'Higher levels: more of all three'],
             images=[(P+'15', (0.55, 0.315, 0.90, 0.585))],
             lines=[("Depending on the level, an Unleash can raise your Horror, heal Inkanyamba, make him take an extra Killer Action, or a combination of these.", None),
                    ("The higher his Wrath, the nastier it gets, so the key to this killer is keeping Wrath low before it boils over.", None)]),
        dict(title='Atonement', bullets=['New Action cards in the Tableau', 'Lower Killer Wrath (or Divine Wrath)', '1 success: down by 1', '2: down by half, rounded up', '3+: straight down to 1'],
             images=[(P+'15', (0.15, 0.83, 0.40, 0.985))],
             lines=[("Atonement Action cards are your main way to calm him down.", None),
                    ("With one success, lower Killer Wrath by one. With two, lower it by half, rounded up. With three or more successes, drop it straight to one.", None),
                    ("At the Sacred Groves you can use Atonement on Divine Wrath instead.", None)]),
        dict(title='His Terror cards', bullets=['"Wrath of..." cards Unleash him', 'Wrath of Death: + your current health', 'No Victims left? He targets you', 'Finale: Violent Tantrum'],
             images=[(P+'15', (0.58, 0.82, 0.86, 0.98))],
             lines=[("His 'Wrath of' Terror cards Unleash his Wrath, and some push it even higher.", None),
                    ("Wrath of Death raises it by your current health, so being at full health hurts here. If there are no Victims left, it targets you instead.", None),
                    ("His Violent Tantrum Finale Unleashes Wrath and raises it by three, and keeps nudging it up whenever it falls to one or two.", None)]),
        dict(title='His Dark Powers', bullets=['Volatile Temper: Upkeep Horror roll', 'A bad roll Unleashes him', 'Dark Lightning: kills come in pairs'],
             images=[(P+'15', (0.10, 0.315, 0.46, 0.69))],
             lines=[("Volatile Temper adds a Horror roll at the end of every Upkeep. A bad result Unleashes his Wrath.", None),
                    ("His Epic Dark Power, Dark Lightning: whenever he kills a Victim, he also kills a second Victim in the same or an adjacent space, if he can.", None)]),
        dict(title='Tips', bullets=['Try him away from the Groves first', 'Lower Horror before Atonement', 'Hunt dual-purpose weapons', 'Savage Whirlwind: toughest Finale'],
             images=[(P+'16', (0.0, 0.70, 1.0, 1.0))],
             lines=[("A few tips. At the Sacred Groves two Wrath tracks stack, and it's the hardest box in the game, so try him elsewhere first.", None),
                    ("Atonement is unreliable on one or two dice, so get Horror down first and roll three.", None),
                    ("Look for weapons that hurt him and lower Wrath at once. And beware Savage Whirlwind, his toughest Finale. Good luck.", None)]),
    ])
