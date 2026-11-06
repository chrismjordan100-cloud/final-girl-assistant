# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Series 4 rule sheet for this film in s4-rules-pdf; P + 'N' is page N.
P = os.path.join(A, '..', '..', 's4-rules-pdf', 'FF16_Buddy.pdf') + '#'
# Sharp 600 dpi crops of cards from the Series 4 rule sheets.
S = os.path.join(os.path.dirname(os.path.abspath(__file__)), 's4img') + '/'

FILM = dict(
    type='killer',
    season=4,
    shortName='billy',
    name='Billy',
    heading='BILLY',
    film='Bad Times at Buddyland',
    background=G+'S4-location-buddyland-art.png', flavour=G+'S4-killer-billy-flavour.png',
    scenes=[
        dict(title='Billy the Bear',
             kind='intro',
             images=[(G+'S4-killer-billy-art.png', None)],
             lines=[("Billy the Bear: Buddyland's mascot, and his animatronic Buddies are coming out to play.", None),
                    ("Here's how he plays.", None)]),
        dict(title='Special setup',
             bullets=['BEFORE the Setup card: 4 Power Sources, Active', 'No two adjacent; 5th aside', '6 Bloodlust Track tokens face down', 'Shuffle 5 Buddies; 2 Specials aside', 'Spawn a Buddy'],
             icons=[R+'S4-killer-billy-the-bear-icon-power-source-active.png', R+'S4-killer-billy-the-bear-icon-bloodlust-token-a.png', R+'S4-killer-billy-the-bear-icon-bloodlust-token-b.png'],
             images=[(S+'power-sources.png', None), (S+'bl-tokens.png', None)],
             lines=[('Before you reveal the Setup card, place four Power Source tokens, Active side up, in four spaces, none next to another. Set the fifth aside.', None),
                    ("Shuffle the A and B Bloodlust Track tokens face down by type, and place six on the matching spaces of his Bloodlust track. The spare two aren't used; don't look at them.", None),
                    ('Shuffle the five Buddy cards into a deck, set the two Special Buddies aside, and spawn a Buddy.', None)]),
        dict(title='Bloodlust Track tokens',
             bullets=['Bloodlust reaches a token: reveal it', 'Apply its effect', 'Surprises, good or bad'],
             icons=[R+'S4-killer-billy-the-bear-icon-bloodlust-token-a.png', R+'S4-killer-billy-the-bear-icon-bloodlust-token-b.png'],
             images=[(S+'billy-board.png', None)],
             lines=[("When Bloodlust rises onto a space with a Bloodlust Track token, reveal it and apply its effect. You won't know what's coming until it happens.", None)]),
        dict(title='Power Sources',
             bullets=['Recharge icon: Billy heals 1', '…if any Power Source is Active', 'Deactivate: spend Time in its space', 'Even just passing through', 'Some cards switch them back on'],
             icons=[R+'S4-killer-billy-the-bear-icon-recharge.png', R+'S4-killer-billy-the-bear-icon-power-source-active.png', R+'S4-killer-billy-the-bear-icon-power-source-inactive.png'],
             images=[(S+'power-sources.png', None)],
             lines=[('When you see the recharge icon, Billy recovers one health, as long as at least one Power Source is still Active.', None),
                    ("To Deactivate one, spend the Time shown while in its space, even if you're just moving through. Flip it to the Inactive side.", None),
                    ("Some cards Activate them again, so check the board. Once they're all off, he can't heal this way.", None)]),
        dict(title="Billy's Buddies",
             bullets=['Minions: normal Minion rules', 'Card: health, attack, movement', 'Spawn: reveal top card + health', 'Token next to Billy (spread them out)', 'No Billy on board: no spawn'],
             images=[(S+'toby.png', None)],
             lines=[("Buddies are Minions, and each card gives that animatronic's health, Attack Value and Movement Value.", None),
                    ("To spawn a Buddy, reveal the top card of the Buddy deck, put that many Health markers on it, and place its token in a space next to Billy, one without a Buddy if possible. If Billy isn't in play, nothing spawns.", None)]),
        dict(title='Buddy order and rewards',
             bullets=['Initiative number, top right', 'Act lowest to highest', 'Spawned in Killer phase: wait a turn', 'Killed: take its Kill Reward', 'Toby: 3 health, initiative 1'],
             images=[(S+'toby.png', None), (S+'special-buddies.png', None)],
             lines=[('Each Buddy has an Initiative number in the circle, top right. Resolve Minion Actions and Terror effects for Buddies from lowest to highest.', None),
                    ("Toby, for example, has three health and Initiative one. Billy Junior, a Special Buddy, has two health, Initiative six, and is always in Billy's space.", None),
                    ('When you kill a Buddy, remove its token, take the Kill Reward on its card, then remove the card from the game. Killed outside your Action phase? Take the reward at the start of the next one.', None)]),
        dict(title='Attacking Billy',
             bullets=['Buddies protect Billy', "No attacking him while a Buddy's in his space", 'Clear his space first'],
             images=[(P+'3', (0.0, 0.79, 0.62, 0.92))],
             lines=[("Buddies protect Billy at all costs. You can't attack Billy while there's a Buddy in his space, so clear them out first.", None)]),
        dict(title='Dark Powers',
             bullets=['Deathlust: +1 Movement and Attack', 'Epic Merciless Minions: Buddies move first', 'Endless Power: better Final Health', 'Introducing… Billy Jr.!'],
             images=[(S+'billy-dp-a.png', None), (S+'billy-dp-b.png', None)],
             lines=[("Deathlust adds one to Billy's Movement and Attack.", None),
                    ("The Epic Merciless Minions adds a move before the attack in the Finale's Minion Action. It's the most punishing: players win under half their games with it.", None),
                    ("Endless Power reveals an extra Final Health token for each Active Power Source and keeps the best. Introducing Billy Junior spawns him in Billy's space.", None)]),
        dict(title='Finales',
             bullets=["It's Showtime!: no Reactions if 2+ Enemies", 'Sizzling Power and Encore: harder', 'Epic Power Surge: Boris arrives', 'Kill Billy AND Boris to win'],
             images=[(S+'billy-finales-a.png', None), (S+'billy-finales-b.png', None)],
             lines=[('In every Finale, Buddies act first, then Billy recovers a health if a Power Source is Active, before hunting.', None),
                    ("It's Showtime!: you can't play Reaction cards if more than one Enemy is in your space. Sizzling Power and Encore are harder versions.", None),
                    ('The Epic Power Surge spawns Boris, and you must kill both Billy and Boris to win.', None)]),
        dict(title='Tips',
             bullets=['Switch off Power Sources first', 'Plan routes through them', 'Take Kill Rewards', 'Kill Billy Jr. before Billy'],
             images=[(G+'S4-killer-billy-art.png', None)],
             lines=[('A few tips. Switch the Power Sources off first, routing through them as you go.', None),
                    ("Kill Buddies for their rewards, but don't get swarmed, and remember Billy Junior must go before you can hit Billy.", None),
                    ('Players win about sixty per cent of games against him. Good luck.', None)]),
    ])
