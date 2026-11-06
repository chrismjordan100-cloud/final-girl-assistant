# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Series 4 rule sheet for this film in s4-rules-pdf; P + 'N' is page N.
P = os.path.join(A, '..', '..', 's4-rules-pdf', 'FF18_Abbey.pdf') + '#'
# Sharp 600 dpi crops of cards from the Series 4 rule sheets.
S = os.path.join(os.path.dirname(os.path.abspath(__file__)), 's4img') + '/'

FILM = dict(
    type='location',
    season=4,
    shortName='larmes-abbey',
    name="L'Armes Abbey",
    heading="L'ARMES ABBEY",
    film='A Demon in the Shadows',
    background=G+'S4-location-larmes-abbey-art.png', flavour=G+'S4-location-larmes-abbey-flavour.png',
    scenes=[
        dict(title="L'Armes Abbey",
             kind='intro',
             images=[(G+'S4-location-larmes-abbey-art.png', None)],
             lines=[("L'Armes Abbey: built on cursed land, where you may end up blessed, or cursed.", 'Larm Abbey: built on cursed land, where you may end up blessed, or cursed.'),
                    ("Here's how the location plays.", None)]),
        dict(title='Special setup',
             bullets=["4 Malice tokens: Killer's space + 3 adjacent", 'Only 2 adjacent? Next closest space', 'Donkey token in the Cloister', 'Benediction cards into the Tableau'],
             icons=[R+'S4-location-larmes-abbey-icon-malice-token.png', R+'S4-location-larmes-abbey-icon-donkey-token.png'],
             images=[(P+'2', (0.0, 0.0, 1.0, 0.2))],
             lines=[("Put a Malice token in the Killer's start space and in three spaces next to it. If there are only two adjacent spaces, put the third in the next closest space of your choice. That's four Malice tokens.", None),
                    ('Put the Donkey token in the Cloister; cards refer to it.', None),
                    ('Add the Benediction Action cards to the Tableau.', None)]),
        dict(title='Blessed and Cursed dice',
             bullets=['Icon shown: swap 1 normal die', 'Blessed: more stars', 'Cursed: fewer, and a broken heart', 'Never both: the majority wins', 'Equal numbers: they cancel'],
             icons=[R+'S4-location-larmes-abbey-icon-blessed-die.png', R+'S4-location-larmes-abbey-icon-cursed-die.png', R+'S4-location-larmes-abbey-icon-cursed-wound-result.png'],
             images=[(S+'dice.png', None)],
             lines=[('The Blessed and Cursed dice sometimes replace a normal die in your Horror Rolls. When you see one of their icons, swap one normal die for that one.', None),
                    ('The Blessed die is kinder: it shows two stars on a six. The Cursed die has fewer good faces, and a broken-heart symbol on its one.', None),
                    ("You never roll both. If there are more of one icon than the other, use that die. If they're equal, they cancel out and you roll normally.", None),
                    ("If your final Horror Roll shows the broken heart, you lose a health. And the Improvise card's effects also apply to the five on the Cursed die.", None)]),
        dict(title='Malice',
             bullets=["Malice icon: token in the Killer's space", 'Taken? Closest empty space to the Killer', 'Several Killers: the one nearest you', "No Killer: random Setup card's K space", 'Malice space: roll the Cursed die'],
             icons=[R+'S4-location-larmes-abbey-icon-malice.png'],
             images=[(P+'2', (0.0, 0.58, 1.0, 0.86))],
             lines=[("When you see the Malice icon, put a Malice token in the Active Killer's space. If it already has one, use the closest space to the Killer without one.", None),
                    ('With more than one Active Killer, use the one closest to you. With no Killer on the board, reveal a random Setup card and use its Killer space.', None),
                    ('Malice tokens carry the cursed symbol, so any Horror Roll you make in a Malice space swaps a die for the Cursed die.', None)]),
        dict(title='Fourteen and out',
             bullets=['Only 14 Malice tokens', 'All 14 out and you need another: you LOSE', 'Removed tokens go back to the pool'],
             images=[(P+'2', (0.0, 0.897, 1.0, 0.975))],
             lines=[('There are fourteen Malice tokens. If all fourteen are on the board and you need to place another, you lose immediately.', None),
                    ('Tokens you remove go back into the pool, so keep clearing them.', None)]),
        dict(title='Benediction',
             bullets=['Costs 1 Time', 'Clears Malice near you', 'Best: your space + all adjacent', 'Middle: your space + 1 adjacent', 'Low: your space OR 1 adjacent'],
             images=[(S+'benediction.png', None)],
             lines=[('Benediction is how you clear Malice. It costs one Time.', None),
                    ('The best result removes a Malice token from your space and every adjacent space. The next removes one from your space and one adjacent space. A weaker result removes one from your space or one adjacent space.', None),
                    ("The card's bottom row shows the cost of failing.", None)]),
        dict(title='Abbey cards',
             bullets=['Black Mass: Malice every Upkeep', 'Father Damian: Blessed die, clears Malice', 'Lust: a Victim near Malice dies', 'Rosary: 2 Time to ignore an effect'],
             images=[(S+'lust.png', None)],
             lines=[('Black Mass adds a Malice token every Upkeep in which none was added. Treat it as an emergency.', None),
                    ("Father Damian follows you even into the Killer's space and gives you the Blessed die while he's with you.", None),
                    ("Lust kills the Victim closest to you in a Malice space, and hurts you if you're in one.", None)]),
        dict(title='Tips',
             bullets=['Clear Malice every chance you get', 'Keep Victims out of cursed rooms', 'Keep Father Damian close', 'Plan routes: search spaces are far apart'],
             images=[(G+'S4-location-larmes-abbey-art.png', None)],
             lines=[('A few tips. Use Benediction often: fourteen Malice tokens is an instant loss.', None),
                    ('Keep Victims out of the cursed rooms, and keep Father Damian close.', None),
                    ("The search spaces are far apart, so plan your route. It's rated one of the best boards in the game. Good luck.", None)]),
    ])
