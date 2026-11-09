# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Rule sheet for this Special Feature (s4-rules-pdf); P + 'N' is page N.
P = os.path.join(A, '..', '..', 's4-rules-pdf', 'FS2_Mort.pdf') + '#'
# Sharp 600 dpi crops of cards, plus publisher photos, for the Special Features.
S = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'spimg') + '/'

FILM = dict(
    type='killer',
    season=0,
    shortName='krampus',
    name='Krampus',
    heading='KRAMPUS',
    film='North Pole Nightmare',
    background=G+'S0-location-santas-village-art.png', flavour=os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'titlecards', 'krampus-titlecard.png'),
    scenes=[
        dict(title='Krampus',
             kind='intro',
             images=[(S+'krampus-minis.png', None)],
             lines=[('Krampus, the Horned Devil: he leaves presents wherever he goes, and not all of them are nice.', None),
                    ("Here's how he plays.", None)]),
        dict(title='Special setup',
             bullets=['Shuffle the 4 Krampus Presents cards', 'Shuffle the 4 Santa Presents cards', 'Present tokens face down nearby'],
             images=[(G+'S0-killer-krampus-art.png', None)],
             lines=[('Shuffle the four Krampus Presents cards into one deck and the four Santa Presents cards into another, and put both near the board.', None),
                    ('Shuffle all the Present tokens face down beside them.', None)]),
        dict(title='His Killer action',
             bullets=['Attacks his own space', 'Moves towards Victims', 'Then throws a present'],
             images=[(G+'S0-killer-krampus-art.png', None)],
             lines=[('Before the Finale, his usual Killer action attacks his own space, moves him towards Victims, then throws a present.', None)]),
        dict(title='Placing presents',
             bullets=['Gift icon: roll a die', 'Random face-down Present token', 'In or next to his space', "Use his space's Panic numbers", 'Space already has one? Nothing'],
             images=[(S+'krampus-minis.png', None)],
             lines=[("When you see the gift icon, roll a die and place a random face-down Present token in Krampus's space or next to it, using the Panic numbers on his space, just like panicking a Victim.", None),
                    ('If that space already has a Present, no new one is placed.', None)]),
        dict(title='Opening presents',
             bullets=['You: in its space, Action phase', 'Even partway through a move', 'Victims open any present they reach', '…however they got there', 'The effects hit YOU'],
             images=[(G+'S0-killer-krampus-art.png', None)],
             lines=[("Some presents were stolen from Santa, so they're not all evil. During your Action phase you can open a present in your space, even partway through a move, resolve it, and carry on.", None),
                    ("Victims are less careful: any Victim in a space with a present opens it immediately, however they got there. And its effect applies to you, even if you're somewhere else.", None)]),
        dict(title="What's inside",
             bullets=['Small treats and tricks: apply at once', 'Krampus icon: draw a Krampus Presents card', 'Santa icon: draw a Santa Presents card', 'Santa cards are the powerful good ones', 'Victim opens a Santa present: wasted'],
             images=[(S+'krampus-minis.png', None)],
             lines=[("Small rewards and tricks on a token apply straight away. A token with the Krampus icon makes you draw a Krampus Presents card, which is bad news. A token with Santa's icon draws a Santa Presents card, which is more powerful and good.", None),
                    ('But if a Victim opens a Santa present, discard the top Santa card with no effect: the Victim keeps the gift. And a Victim opening a Krampus present still draws and resolves a Krampus card.', None)]),
        dict(title='Dark Powers and Terror',
             bullets=['Explosive Gifts: opening is dangerous', 'Blood and Cookies: more presents', 'North Pole Magic: he appears by his target', 'Coal Balls: kill Victims or hurt you'],
             images=[(G+'S0-killer-krampus-art.png', None)],
             lines=[("Explosive Gifts makes opening presents dangerous. It's his most punishing power. Blood and Cookies adds more presents to the board.", None),
                    ("Watch for North Pole Magic, which places him straight in his target's space, Demonic Will, which can make his hit kill you outright, and Coal Balls, which can kill up to three Victims or deal three damage to you.", None),
                    ("The tracker doesn't have the exact wording of these cards yet, so check the card text when they come out.", None)]),
        dict(title='Finales',
             bullets=['Bamf!: appears by the farthest target', 'Unholy Gifts: eats presents to heal', 'Past Midnight: the deadliest', "Read each card as it's revealed"],
             images=[(G+'S0-killer-krampus-art.png', None)],
             lines=[("Bamf!: each Killer phase he's placed in the farthest target's space, then targets you or a Victim and attacks twice.", None),
                    ('Unholy Gifts sends him to the nearest present, which he eats to recover two health, then moves and attacks twice. Past Midnight is the hardest Finale: players win under forty per cent of games when it comes out.', None)]),
        dict(title='Tips',
             bullets=['Grab presents before Victims do', 'Hope for Santa presents', 'Keep Victims away from Krampus presents', "He's tougher than average"],
             images=[(S+'krampus-minis.png', None)],
             lines=[("A few tips. Open presents yourself before Victims reach them, so the good ones aren't wasted.", None),
                    ('Steer Victims away from presents near Krampus.', None),
                    ("He's tougher than average: players win about fifty-eight per cent of games. Good luck.", None)]),
    ])
