# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Series 4 rule sheet for this film in s4-rules-pdf; P + 'N' is page N.
P = os.path.join(A, '..', '..', 's4-rules-pdf', 'FF18_Berith.pdf') + '#'
# Sharp 600 dpi crops of cards from the Series 4 rule sheets.
S = os.path.join(os.path.dirname(os.path.abspath(__file__)), 's4img') + '/'

FILM = dict(
    type='killer',
    season=4,
    shortName='berith',
    name='Berith',
    heading='BERITH',
    film='A Demon in the Shadows',
    background=G+'S4-location-larmes-abbey-art.png', flavour=G+'S4-killer-berith-flavour.png',
    scenes=[
        dict(title='Berith',
             kind='intro',
             images=[(G+'S4-killer-berith-art.png', None)],
             lines=[('Berith, the fallen angel, has possessed Ursula, a nun. You have to kill her, and then bring her back.', 'Berrith, the fallen angel, has possessed Ursula, a nun. You have to kill her, and then bring her back.'),
                    ("Here's how he plays.", None)]),
        dict(title='Special setup',
             bullets=['Divine Blessings sheet by the board', 'Heavenly side: normal', 'Hellish side: hard', 'Expel Demon cards into the Tableau'],
             images=[(S+'blessings.png', None)],
             lines=[('Put the Divine Blessings sheet beside the board, Heavenly side up for a normal game or Hellish side for a hard one.', None),
                    ('Add the Expel Demon Action cards to the Tableau.', None)]),
        dict(title='Possessed Ursula',
             bullets=["The Killer meeple is Ursula's body", 'Health, Attack, Movement: hers', 'Kill her body: Berith leaves', 'But she must come back to win'],
             images=[(S+'berith-board.png', None)],
             lines=[("The Killer meeple, its health, Attack and Movement Values are all Ursula's body, controlled by Berith.", "The Killer meeple, its health, Attack and Movement Values are all Ursula's body, controlled by Berrith."),
                    ("When possessed Ursula is killed, Berith leaves her. But that's only half the job.", "When possessed Ursula is killed, Berrith leaves her. But that's only half the job.")]),
        dict(title='Divine Blessings',
             bullets=['Blessing icon:', 'Black Final Health token, face down', 'Topmost empty space on the sheet', "Resolve that space's effect", "Can't be removed or peeked at"],
             icons=[R+'S4-killer-berith-icon-divine-blessing.png'],
             images=[(S+'blessings.png', None)],
             lines=[("When you see the Divine Blessing icon, put a black Final Health token face down on the topmost empty space of the Blessings sheet, and resolve that space's effect.", None),
                    ('There are seven spaces, from Wisdom down to Fear of the Lord. Their individual effects are printed too small on the rule sheet to read, so check the sheet itself.', None),
                    ("Tokens on the sheet can't be removed or revealed unless a card says so. And the supply is limited: tokens used by the Killer, by you, or removed by effects mean fewer for the sheet.", None)]),
        dict(title='Expel Demon',
             bullets=["Only in Ursula's space", 'Costs 2 Time', 'Best: 2 Blessings, −1 Time', 'Good: 1 Blessing, −1 Time', 'Partial: 1 Blessing + health or Horror'],
             images=[(S+'expel.png', None)],
             lines=[("Blessings mostly come from Expel Demon, which you can only play in Ursula's space. It costs two Time.", None),
                    ('Three successes: two Blessings, and lose a Time. Two successes: one Blessing, lose a Time.', None),
                    ('One success: one Blessing, but choose to lose a health or raise Horror, and lose a Time.', None),
                    ('With no successes you still get a Blessing, but the card shows a heavier cost in health and Time.', None)]),
        dict(title='Winning the game',
             bullets=['First: kill possessed Ursula normally', 'Including her black Final Health', 'Then reveal every Blessing token', 'Any shows health: she lives, you WIN', 'All blank: you lose'],
             images=[(P+'2', (0.0, 0.66, 1.0, 0.93))],
             lines=[('First, kill possessed Ursula under the normal rules, including revealing her black Final Health token and healing her if it shows health.', None),
                    ('Then Berith leaves her body, and Ursula must come back from the dead. Reveal every token on the Blessings sheet.', 'Then Berrith leaves her body, and Ursula must come back from the dead. Reveal every token on the Blessings sheet.'),
                    ("If any of them shows health, her life is restored and you win. If they're all blank, her soul is lost, and so are you.", None),
                    ("You don't need all seven before the kill, but the more Blessings, the better your odds.", None)]),
        dict(title='Dark Powers',
             bullets=['Rejecting God: −2 Time per Blessing', 'Keeping Ursula Alive: she heals each Upkeep', 'Lamb to the Slaughter: drags a Victim to her', 'Epic Satanic Influence: hurt by your Victims'],
             images=[(S+'berith-dp-a.png', None), (S+'berith-dp-b.png', None)],
             lines=[("Rejecting God: lose two Time every time a Divine Blessing is resolved. It's his toughest power.", None),
                    ("Keeping Ursula Alive: in each Upkeep she recovers a health, or if she's already full, Horror goes up one.", None),
                    ('Lamb to the Slaughter: each Upkeep, the Victim farthest from Ursula is placed in her space.', None),
                    ('The Epic Satanic Influence: during Upkeep, take damage equal to the number of normal Victims in your space.', None)]),
        dict(title='Minor powers and Finales',
             bullets=['Blasphemy: no Expel Demon', 'Demonic Curse: hand limit 6', 'It Wants You!: attacks twice', 'Hell on Earth: Bloodlust maxed', 'Epic Legions of Hell: two hunts'],
             images=[(S+'berith-finales-a.png', None), (S+'berith-finales-b.png', None)],
             lines=[("Two Minor Dark Powers: Blasphemy stops you resolving Expel Demon while it's in play, and Demonic Curse cuts your hand limit to six.", None),
                    ('Finales: It Wants You! targets, moves, and attacks twice. Hell on Earth pushes Bloodlust to the top when revealed. Spiritual Attack makes you lose an extra health whenever she attacks you.', None),
                    ('The Epic Legions of Hell hunts twice each Killer phase, and every Victim killed raises Horror.', None)]),
        dict(title='Tips',
             bullets=["Don't rush the kill", 'Expel as often as you can', 'Save Victims early', 'Bring health and Reactions'],
             images=[(G+'S4-killer-berith-art.png', None)],
             lines=[("A few tips. Don't rush the kill: every Blessing you add before she dies improves your odds.", None),
                    ('Expel Demon keeps you close to her, so bring health and Reaction cards, and save Victims early before Lamb to the Slaughter takes them.', None),
                    ('Players win about sixty-two per cent of games against him. Good luck.', None)]),
    ])
