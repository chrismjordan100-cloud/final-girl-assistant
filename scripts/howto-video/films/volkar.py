# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
C = os.path.join(A, 'cards') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'

FILM = dict(
    type='killer', season=4, shortName='volkar', name="Volk'ar", heading="THE VOLK'AR", film='The Green Terror',
    background=G+'S4-location-pesadilla-verde-art.png', flavour=G+'S4-killer-volkar-flavour.png',
    scenes=[
        dict(title='The Volk\'ar', kind='intro', images=[(G+'S4-killer-volkar-art.png', None)],
             lines=[("The Volk'ar: an alien hunter, cloaked and invisible, stalking the jungle.",
                     "The Volkar. An alien hunter, cloaked and invisible, stalking the jungle."),
                    ("Here's how she plays.", None)]),
        dict(title='Special setup', bullets=['Track cards into the Action Tableau', 'Attack Resolution card + tokens nearby', 'Deal 1 Movement card face down', 'Meeple goes on the Finale card', 'Origin markers: start space + that card'],
             images=[(G+'S4-killer-volkar-2.png', (40, 540, 1150, 770))],
             lines=[("Add the two Track cards to your Action Tableau, and put the Attack Resolution card and tokens beside the board.", None),
                    ("Shuffle the Movement deck and deal one card face down.", None),
                    ("Her meeple doesn't go on the board. It sits on the Finale card.", None),
                    ("One Origin marker goes where she'd start; the other goes on that face-down card.", None)]),
        dict(title='Concealed or Visible', bullets=['No Movement Value', 'Concealed: meeple on Finale card', 'Concealed → upper Killer Action', 'Visible → lower Killer Action'],
             images=[(G+'S4-killer-volkar-2.png', (740, 1090, 1160, 1460))],
             lines=[("She has no Movement Value. For most of the game she's Concealed: always on the board somewhere, but hidden.", None),
                    ("If she's Concealed at the start of the Killer phase, resolve the upper Killer Action on the Finale card. If Visible, the lower one.", None)]),
        dict(title='Building her Path', bullets=['Open eye: add a card face up', 'Crossed eye: add a card face down', 'Crossed eye while Visible = she vanishes'],
             icons=[R+'S4-killer-volkar-icon-path-faceup.png', R+'S4-killer-volkar-icon-path-facedown-conceal.png', R+'S4-killer-volkar-icon-origin-marker.png'],
             images=[(G+'S4-killer-volkar-5.png', (50, 40, 650, 440))],
             lines=[("Her route is a hidden Path of Movement cards.", None),
                    ("An open eye icon adds a card face up. A crossed-out eye adds one face down.", None),
                    ("If she was Visible, she vanishes again: the Origin markers go on the new card and her current space.", None)]),
        dict(title='Revealing the Path', bullets=['Reveal icon resolved', '6th Movement card added', 'An attack on her would do damage', 'Then play every card in order'],
             icons=[R+'S4-killer-volkar-icon-reveal.png'],
             images=[(G+'S4-killer-volkar-5.png', (40, 800, 1170, 1640))],
             lines=[("She breaks cover when you resolve the Reveal icon, when a sixth Movement card joins the Path, or when an attack on her would do damage.", None),
                    ("Place her on the Origin space, then play out each card in order, moving her, and attacking wherever a card shows a Killer Action line.", None),
                    ]),
        dict(title='Tracking her', bullets=['Track card flips Movement cards', 'All face up = you know exactly', 'Never search the discard pile'],
             images=[(G+'S4-killer-volkar-4.png', (910, 1230, 1140, 1545))],
             lines=[("The Track action card lets you flip Movement cards over. If every card in the Path is face up, you know exactly where she is.", None),
                    ("And you're never allowed to look through the discarded Movement cards.", None)]),
        dict(title='Attacking blind', bullets=['Place the Attack token on your guess', 'Damage waits on the Attack Resolution card', 'She ends there: damage lands', 'She ends elsewhere: Ambush Penalty'],
             icons=[R+'S4-killer-volkar-icon-attack-token.png', R+'S4-killer-volkar-icon-damage-token.png'],
             images=[(G+'S4-killer-volkar-7.png', (520, 120, 1140, 760)), (G+'S4-killer-volkar-6.png', (890, 375, 1130, 745))],
             lines=[("You can attack a space you think she's in. Place the Attack token, roll, and park the damage on the Attack Resolution card.", None),
                    ("Any damage makes her Path resolve. If she ends on your target, the damage lands.", None),
                    ("If not, she ambushes you. Take the Ambush Penalty on the last Movement card.", None)]),
        dict(title='While she\'s hidden', bullets=['"Relative to the Killer" = Origin space', '"Place the Killer" = ignore it', 'Killer Action line = crossed eye', 'Victims don\'t panic'],
             images=[(G+'S4-killer-volkar-3.png', (30, 700, 1182, 1654))],
             lines=[("While she's Concealed, anything measured from the Killer uses the Origin space, and effects that place the Killer are ignored.", None),
                    ("Killer Action lines count as a crossed eye, and Victims don't panic.", None),
                    ]),
        dict(title='Tips', bullets=['Flip cards with Track before you swing', 'Strike while the Path is short', 'Self Destruct: her toughest Finale', 'Keep the rule sheet to hand'],
             images=[(G+'S4-killer-volkar-1.png', (755, 605, 1155, 965))],
             lines=[("A few tips. Use Track to flip cards before a blind attack: every face-up card narrows the guess.", None),
                    ("Strike while the Path is short, when she can't have gone far.", None),
                    ("She's very beatable: about three wins in four on Final Girl Stats. But Self Destruct is her toughest Finale.", None),
                    ("Keep the rule sheet handy, and good hunting.", None)]),
    ])
