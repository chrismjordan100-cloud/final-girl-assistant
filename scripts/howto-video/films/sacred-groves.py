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
        dict(title='Divine Wrath', bullets=['The gods\' anger: levels 1 to 10', 'Increase / Decrease moves the marker', 'Never below 1 or above 10', 'Unleash: apply the current level'],
             icons=[R+'S1-location-sacred-groves-icon-divine-wrath.png'],
             images=[(P+'12', (0.77, 0.285, 0.91, 0.455))],
             lines=[("Here you face the gods' fury as well as the Killer. It's tracked on the Divine Wrath card, from level one to ten.", None),
                    ("When told to Increase or Decrease Divine Wrath, move the marker up or down that many levels. It never goes below one or above ten: extra steps are ignored.", None),
                    ("When told to Unleash Divine Wrath, look at the current level and apply whatever is printed there.", None)]),
        dict(title='What Unleash does', bullets=['Low levels: little or nothing', 'Higher: discard random Action cards', 'Some levels: Horror goes up', 'Level 10: lose almost your whole hand'],
             images=[(P+'12', (0.77, 0.285, 0.91, 0.455))],
             lines=[("The higher the Wrath, the worse an Unleash gets.", None),
                    ("At low levels it does little. Further up it makes you discard random Action cards from your hand, and some levels raise Horror as well.", None),
                    ("At the top level, you discard every Action card except Atonement, then lower Divine Wrath by the number of cards you discarded.", None)]),
        dict(title='Sacred spaces', bullets=['Burial Ground, Sacred Shrine, Holy Groves', 'Victims there anger the gods', 'Cards raise Wrath per Victim there', 'Several cards pull Victims onto them'],
             icons=[R+'S1-location-sacred-groves-icon-sacred-space.png'],
             images=[(G+'S1-location-sacred-groves-board.jpg', None)],
             lines=[("The Burial Ground, the Sacred Shrine and the Holy Groves are Sacred spaces, marked in red.", None),
                    ("The more Victims standing on Sacred spaces, the angrier the gods. Many cards raise Divine Wrath by one for each Victim on a Sacred space, and some Terror cards add Victims there or pull them in.", None),
                    ("So getting Victims off those spaces, or saving them quickly, keeps the Wrath down.", None)]),
        dict(title='The Groves Bloodlust track', bullets=['Sits next to the Killer\'s Bloodlust', 'Bloodlust up: apply the Killer board AND', 'the matching Groves line too', 'Lines raise Wrath and Unleash it'],
             images=[(P+'12', (0.71, 0.585, 0.83, 0.73))],
             lines=[("The Sacred Groves Bloodlust track lines up beside the Killer's own Bloodlust track.", None),
                    ("Whenever Bloodlust goes up, apply the Killer board's effects as normal, and also apply the matching line on the Groves track, if it has one.", None),
                    ("Those lines raise Divine Wrath by the number of Victims on Sacred spaces, or Unleash it.", None)]),
        dict(title='Atonement and the Finale', bullets=['Atonement cards lower Wrath', '3+ successes: an extra-strong result', 'Finale: put the token on the Finale card', 'Each Killer phase: Unleash, then +1'],
             images=[(P+'15', (0.15, 0.83, 0.40, 0.985))],
             lines=[("A few items and effects lower Divine Wrath, but your main tool is the Atonement Action card. It has an extra line for three or more successes on a Horror roll: the more successes, the bigger the drop.", None),
                    ("If the Finale is revealed, put the Sacred Groves Finale token on top of the Finale card. From then on, every Killer phase, after the Killer Action, Unleash Divine Wrath and then increase it by one.", None)]),
        dict(title='Tips', bullets=['Keep Victims off Sacred spaces', 'The Setup card matters', 'Barbara starts strong', 'One of the hardest locations'],
             images=[(G+'S1-location-sacred-groves-art.png', None)],
             lines=[("A few tips. Keep Victims off the Sacred spaces to stop Divine Wrath climbing.", None),
                    ("The Setup card matters here: there's a big win-rate gap between the easiest and hardest.", None),
                    ("Barbara's extra health helps you hit hard early. It's one of the hardest locations in logged games, so good luck.", None)]),
    ])
