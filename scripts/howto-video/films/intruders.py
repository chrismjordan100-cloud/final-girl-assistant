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
    type='killer', season=2, shortName='intruders', name='The Intruders', heading='THE INTRUDERS', film='A Knock at the Door',
    background=G+'S2-location-wingard-cottage-art.png', flavour=G+'S2-killer-intruders-flavour.png',
    scenes=[
        dict(title='The Intruders', kind='intro', images=[(G+'S2-killer-intruders-art.png', None)],
             lines=[("The Intruders: three masked strangers who believe they're doing holy work, one home invasion at a time.", None),
                    ("Here's how they play.", None)]),
        dict(title='Special setup', bullets=['3 Killers: Trish (red), Zeke (black), Baghead (grey)', 'All start on the Setup card\'s Killer space', 'Each gets health + a Final Health token', 'Active Killer token on Trish'],
             icons=[R+'S2-killer-intruders-icon-active-killer-token.png'],
             images=[(S+'int-board.png', None)],
             lines=[("Place all three Killer meeples, Trish in red, Zeke in black and Baghead in grey, on the Killer start space from the Setup card.", None),
                    ("Give each one their starting health and their own Final Health token, and put the Active Killer token on Trish's circle on the Killer board.", None)]),
        dict(title='The Active Killer', bullets=['Only ONE acts at a time', 'For Move, Attack, and placing the Killer', 'Marked by the Active Killer token'],
             icons=[R+'S2-killer-intruders-icon-active-killer-token.png'],
             images=[(S+'int-board.png', None)],
             lines=[("The Intruders are three Killers, but only one is active at any moment: the one with the Active Killer token.", None),
                    ("Only the Active Killer resolves move and attack icons, and only it gets placed when a card says place the Killer.", None)]),
        dict(title='Changing who\'s Active', bullets=['You attack one (or hit it with an Item)', '...it becomes Active, hit or miss', 'Up / Down icons: move the token', 'Wraps round; skips dead Killers', 'Active one dies: top-most living one'],
             icons=[R+'S2-killer-intruders-icon-active-killer-up.png', R+'S2-killer-intruders-icon-active-killer-down.png'],
             images=[(P+'23', (0.0, 0.43, 1.0, 0.82))],
             lines=[("The Active Killer changes in three ways.", None),
                    ("One: when you attack a Killer, whether you damage it or not, or use an Item to damage it, that Killer becomes Active immediately.", None),
                    ("Two: the Up and Down icons on cards move the token to the next Killer up or down the board. It wraps from top to bottom, and skips dead Killers.", None),
                    ("Three: when the Active Killer is killed, the token moves to the top-most Killer still alive.", None)]),
        dict(title='All Killers effects', bullets=['"All Killers": ignore the token', 'Resolve top-most first, then down', 'The token doesn\'t move', 'Panic: Victims with ANY Killer panic', 'Minor Dark Powers apply to all'],
             images=[(P+'24', (0.0, 0.0, 1.0, 0.45))],
             lines=[("When a card says All Killers, ignore the token: resolve it for the top Killer on the board, then each one below in order. The Active Killer doesn't change.", None),
                    ("In the Panic phase, Victims in a space with any Killer, not just the Active one, panic if a Victim died that turn.", None),
                    ("Minor Dark Powers apply to all three Killers, and damage to any Killer hits the Minor Dark Power card first.", None)]),
        dict(title='Downing a Killer', bullets=['Last health gone, others still standing:', 'Lay it on its side, change Active', 'Finish the phase, THEN check its token', 'Blank: dead · health: back up, white token', 'Adrenaline +1 only once'],
             images=[(S+'int-example.png', None)],
             lines=[("When a Killer that still has its black Final Health token loses its last health, and another Killer is still on the board, the phase doesn't end.", None),
                    ("Lay it on its side, change the Active Killer, and finish the phase. Then reveal its black token. Blank means it's truly dead: remove it. Health means it stands back up with that health, and a white token replaces the black one.", None),
                    ("You get the plus-one Adrenaline die only once, however many are on their Final Health.", None)]),
        dict(title='A worked example', bullets=['Ginny shotguns Trish: Trish is Active', 'Trish attacks, Ginny Retaliates: Trish down', 'Token jumps to Baghead', '"They\'re Everywhere!": Up, Up', 'End of phase: Trish\'s token is blank'],
             images=[(S+'int-example.png', None)],
             lines=[("Here's the rulebook example. Ginny shoots Trish for three: Trish becomes Active, with one health left.", None),
                    ("In the Killer phase, Trish attacks; Ginny Retaliates and hits her for one. Trish is laid on her side and the token moves to the top-most living Killer, Baghead.", None),
                    ("The Terror card says Baghead acts, then the token moves up, skipping Trish, to Zeke, who acts, then up again to Baghead. After the phase, Trish's token is revealed: blank. She's dead.", None)]),
        dict(title='Dark Powers', bullets=['Maskaphobia: Killer enters you = +1 Horror', 'No Remorse: Upkeep roll > Killers = +1 Bloodlust', 'Strength in Numbers: +1 damage per nearby Killer', 'Won\'t Stay Down: a dead one returns once'],
             images=[(S+'int-cards.png', None)],
             lines=[("Maskaphobia: once a turn, when a Killer moves into your space, raise Horror by one, and you can't buy Focus while a Killer is with you.", None),
                    ("No Remorse: roll a die each Upkeep; if it beats the number of Killers left, raise Bloodlust. Strength in Numbers: each attack does an extra damage for every other Killer in the same or an adjacent space.", None),
                    ("And the Epic Dark Power, Won't Stay Down: the first Killer to die immediately gets two health and a random black Final Health token back.", None)]),
        dict(title='Finales', bullets=['You\'re Gonna Die: two Killers attack', 'Hunt Sweet Hunt: +1 damage per attack', 'Release the Beast: ALL Killers Active', 'We Know Where You Live: all attack on reveal'],
             images=[(S+'int-cards.png', None)],
             lines=[("Their Finales add pressure. You're Gonna Die has the Active Killer attack, then the next one down attacks too. Hunt Sweet Hunt adds a damage to every attack.", None),
                    ("Release the Beast makes all Killers Active for the rest of the game, acting from the top down. And the Epic Finale has every Killer attack the moment it's revealed.", None)]),
        dict(title='Tips', bullets=['Attack to choose who acts next', 'Finish a weakened Killer fast', 'Avoid being near two at once', 'Kill one before the Finale'],
             images=[(G+'S2-killer-intruders-art.png', None)],
             lines=[("A few tips. Attacking a Killer makes it Active, so you can choose who comes for you next.", None),
                    ("Focus on finishing one Killer at a time, and avoid standing near two at once.", None),
                    ("Every Killer you remove before the Finale makes it far less deadly. Good luck.", None)]),
    ])
