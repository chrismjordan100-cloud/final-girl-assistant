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
    type='location', season=1, shortName='camp-happy-trails', name='Camp Happy Trails', heading='CAMP HAPPY TRAILS', film='The Happy Trails Horror',
    background=G+'S1-location-camp-happy-trails-art.png', flavour=G+'S1-location-camp-happy-trails-flavour.png',
    scenes=[
        dict(title='Camp Happy Trails', kind='intro', images=[(P+'2', (0.05, 0.35, 0.42, 0.60))],
             lines=[("Camp Happy Trails: fishing on the lake, archery, ghost stories round the firepit, and screams in the distance.", None),
                    ("Here's how the location plays.", None)]),
        dict(title='No special rules', bullets=['No special setup', 'No special rules', 'Plays on the core rules'],
             images=[(P+'2', (0.03, 0.31, 0.98, 0.70))],
             lines=[("Camp Happy Trails has no special setup and no special rules, so it's the classic place to learn the game.", None),
                    ("The box brings ten Events, five Setup cards, eight Terror cards and eighteen Items.", None)]),
        dict(title='Achievements to chase', bullets=['Bear Trap the Killer using Fireworks', 'Defeat the Killer in the Lake', 'Save 5 Victims in one turn'],
             images=[(P+'3', (0.02, 0.195, 0.98, 0.78))],
             lines=[("It does have fun achievements to chase, like luring the Killer into the Bear Trap with the Fireworks, or defeating the Killer in the Lake.", None)]),
        dict(title='Tips', bullets=['Grab the boat keys', 'Bow and Bear Trap stand out', 'One of the easier locations'],
             images=[(P+'2', (0.10, 0.69, 1.0, 1.0))],
             lines=[("A few tips. Get the boat keys: ferrying Victims across the lake speeds up rescues.", None),
                    ("The Bow and the Bear Trap are the other standout items.", None),
                    ("And it's one of the easier locations in logged games, so it's a good place to try a tough killer. Good luck.", None)]),
    ])
