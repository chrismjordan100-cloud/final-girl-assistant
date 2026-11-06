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
    type='location', season=1, shortName='sacred-groves', name='The Sacred Groves', heading='THE SACRED GROVES', film='Slaughter in the Groves',
    background=G+'S1-location-sacred-groves-art.png', flavour=G+'S1-location-sacred-groves-flavour.png',
    scenes=[
        dict(title='The Sacred Groves', kind='intro', images=[(G+'S1-location-sacred-groves-board.jpg', None)],
             lines=[("The Sacred Groves: the gods are furious with the tourists, and they've made a pact with the Killer.", None),
                    ("Here's how the location plays.", None)]),
        dict(title='Special setup', bullets=['Divine Wrath card at level 2', 'Groves Bloodlust track by Killer board', 'Finale token set aside', 'Both Atonement cards in the Tableau'],
             images=[(P+'12', (0.37, 0.28, 0.99, 0.73))],
             lines=[("Put the Divine Wrath card out with a tracking marker on level two, and line the Sacred Groves Bloodlust track up beside the Killer's board.", None),
                    ("Set the Finale token aside, and add both Atonement cards to the Action Tableau. They come in the Inkanyamba box.", None)]),
        dict(title='Divine Wrath', bullets=['Increase / Decrease moves the marker', 'Always between 1 and 10', 'Unleash: apply the current level'],
             icons=[R+'S1-location-sacred-groves-icon-divine-wrath.png'],
             images=[(P+'12', (0.77, 0.285, 0.91, 0.455))],
             lines=[("Divine Wrath is the gods' anger. Increase and Decrease move the marker on the Divine Wrath card, always between one and ten.", None),
                    ("Unleash means apply whatever the current level says.", None)]),
        dict(title='Bloodlust and the Finale', bullets=['Bloodlust up: check the Groves track', 'Finale: token on the Finale card', 'Each Killer phase: Unleash, then +1'],
             images=[(P+'12', (0.71, 0.585, 0.83, 0.73))],
             lines=[("Whenever Bloodlust rises, also apply the matching line on the Sacred Groves Bloodlust track.", None),
                    ("If the Finale is revealed, put the Finale token on it. Each Killer phase, after the Killer Action, Unleash Divine Wrath, then increase it by one.", None)]),
        dict(title='Sacred spaces', bullets=['Burial Ground, Shrine, Holy Groves', 'More Victims there = angrier gods', 'Atonement cards bring Wrath down'],
             icons=[R+'S1-location-sacred-groves-icon-sacred-space.png'],
             images=[(G+'S1-location-sacred-groves-board.jpg', None)],
             lines=[("The Burial Ground, Sacred Shrine and Holy Groves are Sacred spaces. The more Victims on them, the more likely Divine Wrath rises.", None),
                    ("Atonement Action cards are your main way to bring it down.", None)]),
        dict(title='Tips', bullets=['Keep Victims off Sacred spaces', 'The Setup card matters', 'Barbara starts strong', 'One of the hardest locations'],
             images=[(G+'S1-location-sacred-groves-art.png', None)],
             lines=[("A few tips. Keep Victims off the Sacred spaces to stop Divine Wrath climbing.", None),
                    ("The Setup card matters here: there's a big win-rate gap between the easiest and hardest.", None),
                    ("Barbara's extra health helps you hit hard early. It's one of the hardest locations in logged games, so good luck.", None)]),
    ])
