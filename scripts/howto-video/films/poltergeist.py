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
    type='killer', season=1, shortName='poltergeist', name='The Poltergeist', heading='THE POLTERGEIST', film='The Haunting of Creech Manor',
    background=G+'S1-location-creech-manor-art.png', flavour=G+'S1-killer-poltergeist-flavour.png',
    scenes=[
        dict(title='The Poltergeist', kind='intro', images=[(G+'S1-killer-poltergeist-art.png', None)],
             lines=[("The Poltergeist: how do you fight something you can't see? You don't. You run.", None),
                    ("Here's how she plays.", None)]),
        dict(title='Special setup', bullets=['Use 10 Location Items, not 12', 'Set 1 aside per Item deck', 'Shuffle in Carolyn + Mr. Floppy', 'Deal face down, set-asides on top'],
             images=[(P+'9', (0.55, 0.60, 0.93, 0.715))],
             lines=[("Carolyn and Mr. Floppy are always in the game, hidden in the Item decks, and neither can start face up.", None),
                    ("Take ten of the Location's Items, set one aside for each deck, shuffle the rest with Carolyn and Mr. Floppy, deal them face down, then put a set-aside card face up on each deck.", None)]),
        dict(title='She can\'t be hurt', bullets=['No health: can\'t be damaged', 'Win by escaping with Carolyn', 'Carolyn joins: remove Minor Dark Powers', 'Carolyn can\'t be killed or discarded'],
             images=[(P+'9', (0.53, 0.29, 0.93, 0.545))],
             lines=[("The Poltergeist has no health and can't be attacked, damaged or killed.", None),
                    ("To win, find Carolyn and reach an exit with her. When Carolyn joins you, remove all Minor Dark Power cards.", None),
                    ("Carolyn can't be killed, discarded or put in your backpack, though she can be shuffled back into a deck.", None)]),
        dict(title='Mr. Floppy', bullets=['Usable once her Dark Power is out', 'Discard to ignore "Carolyn? Where are you?"', '"Forgetting Something?": need him too'],
             images=[(P+'9', (0.03, 0.62, 0.50, 0.75))],
             lines=[("Mr. Floppy can't be used until her Dark Power is revealed. After that, you can remove him to ignore 'Carolyn? Where are you?'", None),
                    ("If her Epic Dark Power, Forgetting Something?, comes out, you need Mr. Floppy as well as Carolyn to win.", None)]),
        dict(title='Tips', bullets=['Search first, rescue second', 'Selena is a great pick', 'Carry Guard', 'Don\'t chase weapons'],
             images=[(G+'S1-killer-poltergeist-art.png', None)],
             lines=[("A few tips. Searching matters more than saving Victims here, so head for a Search space straight away.", None),
                    ("Selena is a great pick: an early Ultimate and extra search dice.", None),
                    ("Carry Guard for her Unstoppable Evil attacks, and don't waste Time on weapons.", None),
                    ("She's tougher than average: Final Girls win about fifty-seven percent of logged games. Good luck.", None)]),
    ])
