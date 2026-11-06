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
        dict(title='She can\'t be hurt', bullets=['No health', 'Can\'t be attacked, damaged or killed', 'Ignore effects that would damage her', 'Damage cards still help vs some Terror'],
             images=[(P+'9', (0.53, 0.29, 0.93, 0.545))],
             lines=[("The Poltergeist has no health. She can't be attacked, damaged or killed, so ignore any effect that would damage her.", None),
                    ("That doesn't make attack cards useless. Some of her Terror cards can still be fought off with Action cards that deal damage.", None)]),
        dict(title='How you win', bullets=['Find Carolyn in the Item decks', 'Reach an exit with her', 'Carolyn joins: remove Minor Dark Powers', 'Can\'t be killed, discarded or backpacked'],
             images=[(P+'9', (0.55, 0.60, 0.93, 0.715))],
             lines=[("You can't win the normal way. Instead, find Carolyn, hidden in the Item decks, and reach an exit while she's with you.", None),
                    ("When Carolyn joins you, remove all the Minor Dark Power cards from the game.", None),
                    ("Carolyn can't be killed or discarded for any reason, so ignore any effect that tries. You can't put her in your backpack either.", None),
                    ("But she can be shuffled back into an Item deck. That's what her 'Carolyn? Where are you?' Terror card does: if she's with you, she goes back into the Item deck at the nearest search space, without revealing its top card.", None)]),
        dict(title='Mr. Floppy', bullets=['Carolyn\'s stuffed rabbit, hidden in the Items', 'Usable only once her Dark Power is out', 'Remove him: ignore "Carolyn? Where are you?"', 'Discarded? Shuffle into nearest Item deck'],
             images=[(P+'9', (0.62, 0.60, 0.75, 0.74))],
             lines=[("Mr. Floppy is also hidden in the Item decks.", None),
                    ("Once her Dark Power has been revealed, you can remove him from the game to ignore the effects of 'Carolyn? Where are you?'.", None),
                    ("Until her Dark Power is revealed, Mr. Floppy can never be discarded by a game effect. And if he is discarded for any reason, shuffle him into the nearest Item deck.", None)]),
        dict(title='What to watch for', bullets=['Forgetting Something?: need Mr. Floppy too', 'Invisible Barrier: full health to exit', 'Relentless Assault: she appears on you', 'Teleporting can land her on you'],
             images=[(P+'9', (0.03, 0.29, 0.50, 0.75))],
             lines=[("Her Epic Dark Power, Forgetting Something?, means you can only win by reaching an exit with both Carolyn and the Mr. Floppy card. While it's in play, Mr. Floppy can never be discarded.", None),
                    ("Invisible Barrier stops you entering an exit with Carolyn unless you're at full health.", None),
                    ("And several of her cards place her in your space or with the nearest Victim, so she can appear right beside you just as you reach the exit.", None)]),
        dict(title='Tips', bullets=['Search first, rescue second', 'Selena is a great pick', 'Carry Guard', 'Don\'t chase weapons'],
             images=[(G+'S1-killer-poltergeist-art.png', None)],
             lines=[("A few tips. Searching matters more than saving Victims here, so head for a Search space straight away.", None),
                    ("Selena is a great pick: an early Ultimate and extra search dice.", None),
                    ("Carry Guard for her Unstoppable Evil attacks, and don't waste Time on weapons.", None),
                    ("She's tougher than average: Final Girls win about fifty-seven percent of logged games. Good luck.", None)]),
    ])
