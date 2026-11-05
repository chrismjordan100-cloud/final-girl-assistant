# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
C = os.path.join(A, 'cards') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'

FILM = dict(
    type='location', season=4, shortName='pesadilla-verde', name='Pesadilla Verde', film='The Green Terror',
    background=G+'S4-location-pesadilla-verde-art.png', flavour=G+'S4-location-pesadilla-verde-flavour.png',
    scenes=[
        dict(title='Pesadilla Verde', kind='intro', images=[(G+'S4-location-pesadilla-verde-1.png', (30, 700, 465, 1100))],
             lines=[("Pesadilla Verde: a suffocating South American jungle, a one-way river, and a squad of soldiers who'd rather fight than be rescued.",
                     "Pessa-dee-ya Vair-day. A suffocating South American jungle, a one-way river, and a squad of soldiers who'd rather fight than be rescued."),
                    ("Here's how the location plays.", None)]),
        dict(title='Special setup', bullets=['Huey token in the Clearing', 'Train cards into the Action Tableau', 'Soldiers card + Action cubes', '2 starting Upgrades unlocked, 6 locked'],
             icons=[R+'S4-location-pesadilla-verde-icon-huey-token.png', R+'S4-location-pesadilla-verde-icon-upgrade-unlocked.png', R+'S4-location-pesadilla-verde-icon-upgrade-locked.png'],
             images=[(G+'S4-location-pesadilla-verde-2.png', (860, 70, 1120, 492))],
             lines=[("Put the Huey token in the Clearing, and the two Train cards into your Action Tableau.", None),
                    ("Lay out the Soldiers card and Action cubes, then the eight Upgrade tokens: the two green starters unlocked, the other six locked.", None)]),
        dict(title='The Soldiers', bullets=['Every normal Victim is a Soldier', 'They WILL follow you into the Killer\'s space', 'You can give them orders', 'Archeologist & Rebel Leader aren\'t Soldiers'],
             images=[(C+'pesadilla_verde_setup_river_rats.png', None)],
             lines=[("Every normal Victim is a Soldier. Unlike normal Victims, they'll follow you into the Killer's space, and you can order them about.", None),
                    ("The Archeologist and the Rebel Leader are not Soldiers, and can't be ordered.", None)]),
        dict(title='Ordering Soldiers', bullets=['Pick a space with Soldiers', 'Cube on a free Action Upgrade', 'Everyone in that space acts', 'Upkeep: cubes slide right'],
             images=[(G+'S4-location-pesadilla-verde-4.png', (60, 35, 1120, 375))],
             lines=[("In the Action phase, choose a space with Soldiers, and drop an Action cube on the leftmost slot of a free Action Upgrade, like Move or Attack.", None),
                    ("Every Soldier there carries it out.", None),
                    ("In Upkeep, cubes slide one slot right. Once a cube falls off, that action is free again.", None)]),
        dict(title='Raw recruits', bullets=['Saving a Soldier costs 2 Time', 'Friendly fire on a 1–2', 'Range: own space only', 'Damage = Soldiers ÷ 2, rounded DOWN'],
             images=[(G+'S4-location-pesadilla-verde-2.png', (860, 70, 1120, 492))],
             lines=[("Your squad starts out green. Saving one costs two Time.", None),
                    ("When they attack, roll for each Soldier: a one or two means one of them gets shot.", None),
                    ("They can only hit their own space, and damage is the number of Soldiers halved, rounded down. A lone Soldier does nothing.", None)]),
        dict(title='Train them up', bullets=['Train card unlocks an Upgrade', 'Free saves, no friendly fire', 'Hit adjacent spaces', 'Damage rounds UP'],
             icons=[R+'S4-location-pesadilla-verde-icon-upgrade-locked.png', R+'S4-location-pesadilla-verde-icon-upgrade-unlocked.png'],
             images=[(G+'S4-location-pesadilla-verde-1.png', (40, 1300, 470, 1545)), (G+'S4-location-pesadilla-verde-3.png', (770, 50, 1125, 125))],
             lines=[("Use the Train card to unlock Upgrades: free rescues, no friendly fire, attacks into adjacent spaces, and damage rounded up, so even one Soldier hurts.", None),
                    ("Some effects can lock them again.", None)]),
        dict(title='The Huey', bullets=['Huey space counts as an escape space', 'Save any number of Victims there', 'Then it flies away — one use'],
             icons=[R+'S4-location-pesadilla-verde-icon-huey-token.png'],
             images=[(G+'S4-location-pesadilla-verde-4.png', (36, 692, 1160, 920))],
             lines=[("While the Huey is in the Clearing, it's an escape space. Stand there and you can save any number of Victims at once.", None),
                    ("Then the Huey leaves, so pick your moment.", None)]),
        dict(title='The River', bullets=['Waterfall → Upper → Central → Lower', 'Downriver: as far as you like for 1 move', 'You pass through — resolve every space', 'Enemies: one step. Nobody goes upriver'],
             icons=[R+'S4-location-pesadilla-verde-icon-river-space.png', R+'S4-location-pesadilla-verde-icon-piranhas-token.png'],
             images=[(G+'S4-location-pesadilla-verde-1.png', (30, 700, 465, 1100))],
             lines=[("The river runs one way, from the Waterfall down. Moving downriver, one space of movement takes you or your Soldiers as far as you like.", None),
                    ("But you pass through every space on the way, piranhas included.", None),
                    ("Enemies only drift one space, and no one moves upriver.", None)]),
        dict(title='Tips', bullets=['Unlock No Friendly Fire early', 'Keep Soldiers in one big group', 'Fill the Clearing before the Huey goes', 'Do upriver jobs first'],
             images=[(C+'pesadilla_verde_setup_high_ground.png', None)],
             lines=[("A few tips. Unlock No Friendly Fire early, or your squad thins itself out.", None),
                    ("Keep Soldiers together: damage is half the group, so one big squad hits far harder than scattered pairs.", None),
                    ("Gather Victims in the Clearing before you use the Huey.", None),
                    ("And finish anything upriver first. The river's a fast lane with no way back.", None)]),
    ])
