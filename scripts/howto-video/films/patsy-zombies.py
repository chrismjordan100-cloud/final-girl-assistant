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
    type='killer', season=2, shortName='patsy-zombies', name='The Zombies', heading='THE ZOMBIES', film='Terror From the Grave',
    background=G+'S2-killer-patsy-zombies-art.png', flavour=G+'S2-killer-patsy-zombies-flavour.png',
    scenes=[
        dict(title='The Zombies', kind='intro', images=[(G+'S2-killer-patsy-zombies-art.png', None)],
             lines=[("Terror From the Grave: no single Killer, just the dead, rising in endless numbers.", None),
                    ("Here's how this vignette plays.", None)]),
        dict(title='Special setup', bullets=['No Killer board: 2 Bloodlust cards', 'Horror starts at 4', '1 Zombie on each exit + Killer start', 'Horde token on the Dark Power card', 'Vehicle tokens face down on exits'],
             icons=[R+'S2-killer-patsy-zombies-icon-spawn-zombies.png'],
             images=[(S+'zb-cards.png', None)],
             lines=[("There's no Killer board: line up the two Bloodlust cards instead, with the marker on the start space. Horror starts at four.", None),
                    ("No Killer is placed. Put one Zombie on each exit and on the Killer's start space. With only one exit, put one there, two on the start space and one on a search space.", None),
                    ("Put a Horde token on the face-down Dark Power card, and shuffle the four Vehicle tokens face down, spread evenly across the exits.", None)]),
        dict(title='Winning and losing', bullets=['Win: kill ALL Zombies and Hordes', 'Board clear = instant victory', 'Lose: a 4th Horde would form', 'Lose: you die'],
             images=[(P+'40', (0.0, 0.40, 1.0, 0.60))],
             lines=[("To win, kill every Zombie and every Horde. The moment none are left on the board, you win.", None),
                    ("You lose immediately if three Hordes are in play and a fourth would be created, or if you die.", None)]),
        dict(title='Spawning Zombies', bullets=['Zombies are Minions (tokens)', 'Spawn icon: number from current Bloodlust', 'One at a time onto exits', 'Fewest Zombies first', 'Ties: farthest from you'],
             icons=[R+'S2-killer-patsy-zombies-icon-spawn-zombies.png'],
             images=[(P+'40', (0.0, 0.66, 1.0, 1.0))],
             lines=[("Zombies are tokens, and count as Minions.", None),
                    ("When you see the spawn icon, spawn the number of Zombies shown at the current Bloodlust level. Place them one at a time on exit spaces, always the one with the fewest Zombies first. Ties go to the exit farthest from you.", None)]),
        dict(title='Zombie movement', bullets=['Move only ONCE: the Minion Action', 'Ignore all move icons on Terror cards', 'Normal targeting...', '...can\'t reach a target? Shamble 1 random space'],
             images=[(P+'41', (0.0, 0.0, 1.0, 0.25))],
             lines=[("Zombies are slow. They move only once per Killer phase, during the Minion Action, and ignore every move icon on Terror cards.", None),
                    ("They use the normal targeting rules, except that a Zombie that can't reach its target panics instead: it shambles one space in a random direction.", None)]),
        dict(title='Zombie attacks', bullets=['Attack as a group: ONE target', 'Damage = Zombies in the space', 'Victims before you', 'Victim killed: becomes a Zombie', '...and Bloodlust rises'],
             images=[(P+'41', (0.0, 0.0, 1.0, 0.25))],
             lines=[("Zombies in a space attack together, at one target, dealing damage equal to the number of Zombies there. They always go for Victims before you.", None),
                    ("Every Victim killed by Zombies is replaced with a Zombie token, and Bloodlust rises as normal. Losses feed the swarm.", None)]),
        dict(title='Hordes', bullets=['3+ Zombies in a space at END of Killer phase', 'Replace them with a Horde token', 'First Horde: reveal the Dark Power', 'Health = Zombies that formed it (min 3)', 'No Final Health token'],
             images=[(P+'41', (0.0, 0.25, 1.0, 0.62))],
             lines=[("At the end of the Killer phase, any space with three or more Zombies becomes a Horde. Replace them with a Horde token; the first one uses the token on the Dark Power card, revealing the Dark Power.", None),
                    ("A Horde's health equals the number of Zombies that formed it, at least three, tracked on a Victim Holding board. Hordes don't use Final Health tokens.", None)]),
        dict(title='Horde rules', bullets=['A Horde counts as a Killer', 'Move and attack values: Bloodlust card', 'Kills a Victim: +1 health', 'Absorbs Zombies it meets: +1 health', 'Never breaks up; Hordes never merge'],
             images=[(P+'41', (0.0, 0.60, 1.0, 1.0))],
             lines=[("A Horde counts as a Killer: Victims won't follow you into its space, and it uses the Movement and Attack values on the Bloodlust track. If a card moves or places the Killer, use only the Horde closest to the destination.", None),
                    ("Each Victim it kills adds a health. It has no maximum, and gains a health from any heal effect. If it shares a space with a Zombie, it absorbs it for another health.", None),
                    ("A Horde never breaks back into Zombies, even below three health, and two Hordes in a space don't combine. Effects that kill X Zombies deal X damage to a Horde instead.", None)]),
        dict(title='Vehicles', bullets=['Each location: one special vehicle', 'Hidden under the exit tokens', 'First visit to an exit: reveal its tokens', 'Found it: vehicle in your space + its card', 'Driver icon: use it from anywhere'],
             icons=[R+'S2-killer-patsy-zombies-icon-vehicle-token.png'],
             images=[(S+'zb-vehicles.png', None)],
             lines=[("Each location has one special vehicle with its own Vehicle Action card. Ignore that location's normal vehicle Item; if it turns up, swap it for a random unused Item.", None),
                    ("The first time you enter an exit, reveal its Vehicle tokens. If you find the vehicle, remove all the tokens, put the vehicle in your space, or the nearest water space for boats, and take its Action card. It then works like any Action card.", None),
                    ("If the card's title has the driver icon, you can use it from anywhere. Otherwise you must be with the vehicle, and normal moves can bring it along.", None)]),
        dict(title='Dark Powers and Finales', bullets=['Runners: Zombies obey move icons', 'Legion: +1 Zombie near you per spawn', 'Super Horde: Hordes merge; 12 health = you lose', 'Finales: everyone moves, then attacks'],
             images=[(S+'zb-cards.png', None)],
             lines=[("The Dark Powers. Runners: Zombies now follow move icons, always moving before attacks. Legion: every spawn adds one more Zombie at the exit nearest you. Super Horde: Hordes that meet merge, and any Horde with twelve health makes you lose.", None),
                    ("In every Finale, all Zombies and Hordes move before any attacks. Their Numbers Are Endless costs you a health whenever no Enemy is in your space at the end of your Action phase. They've All Been Bitten turns every remaining Victim into a Zombie.", None)]),
        dict(title='Tips', bullets=['Kill Zombies before they clump into 3s', 'Keep Victims away from Zombies', 'Find the vehicle early', 'Avoid creating a 3rd Horde'],
             images=[(G+'S2-killer-patsy-zombies-art.png', None)],
             lines=[("A few tips. Break up groups of Zombies before the end of the Killer phase, so they can't form Hordes.", None),
                    ("Keep Victims away from them: every one they kill becomes another Zombie.", None),
                    ("And hunt for the vehicle early; it's often your best weapon. Good luck.", None)]),
    ])
