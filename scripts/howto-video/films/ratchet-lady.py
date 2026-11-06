# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Series 2 Feature Film rulebook in the project root; P + 'N' is page N.
P = os.path.join(A, '..', '..', 'FeatureFilmRules_S2.pdf') + '#'
# Sharp 600 dpi crops of small cards from that rulebook.
S = os.path.join(os.path.dirname(os.path.abspath(__file__)), 's2img') + '/'

FILM = dict(
    type='killer', season=2, shortName='ratchet-lady', name='The Ratchet Lady', heading='THE RATCHET LADY', film='Madness in the Dark',
    background=G+'S2-location-wolfe-asylum-art.png', flavour=G+'S2-killer-ratchet-lady-flavour.png',
    scenes=[
        dict(title='The Ratchet Lady', kind='intro', images=[(G+'S2-killer-ratchet-lady-art.png', None)],
             lines=[("The Ratchet Lady: she once loved helping people. Now there's still a smile, but it's a hateful one.", None),
                    ("Here's how she plays.", None)]),
        dict(title='Special setup', bullets=['Maniac meeples beside the Victims', '2 Maniacs in her starting space', 'Calm cards in the Action Tableau'],
             images=[(S+'rl-calm.png', None)],
             lines=[("Put the six red Maniac meeples in a pile next to the Victims, and place two Maniacs in the Ratchet Lady's starting space. Her two Calm Action cards go in the Action Tableau.", None)]),
        dict(title='Her health', bullets=['Starts with only 6', 'NO upper limit', 'Many ways to heal', 'Board: "recovers" icons on Bloodlust'],
             images=[(S+'rl-board.png', None)],
             lines=[("She starts with only six health, but she has no upper limit, and lots of her cards heal her. Her Bloodlust track also heals her at certain levels. She can grow far beyond where she started.", None)]),
        dict(title='Maniacs', bullets=['Minions: 1 health, attack 1, move 1', 'Won\'t follow you, can\'t be saved', 'Max 6 on the board', 'Victim → Maniac: no Bloodlust', 'Maniac killed: no Bloodlust'],
             images=[(P+'37', (0.0, 0.25, 1.0, 0.72))],
             lines=[("Maniacs are Victims driven mad. They're Minions, with one health, and attack and movement of one. They won't follow you, and can't be saved.", None),
                    ("When a Victim becomes a Maniac, swap in a red meeple. Bloodlust doesn't rise, as no one died. When you kill a Maniac, it goes back in the pool, and again no Bloodlust.", None),
                    ("Only normal Victims turn, never Special Victims. And there's a limit of six on the board: ignore any extra spawns.", None)]),
        dict(title='Leaving a Maniac\'s space', bullets=['1 Maniac with you: leave freely', 'More than 1: lose 1 health per extra', '3 Maniacs = 2 damage to leave'],
             images=[(P+'37', (0.0, 0.25, 1.0, 0.72))],
             lines=[("Maniacs grab at you. If there are Maniacs in your space and you leave, you lose one health for each Maniac beyond the first.", None),
                    ("So one Maniac is no problem, but with three, leaving costs you two health.", None)]),
        dict(title='Calm', bullets=['New Action card, 2 Time', '2 successes: up to 2 Maniacs → Victims', '1: one Maniac → Victim, end turn', '0: one turns, +1 Bloodlust, end turn', 'Your space or an adjacent one'],
             images=[(S+'rl-calm.png', None)],
             lines=[("Calm turns Maniacs back into Victims. It costs two Time, and works on Maniacs in your space or an adjacent one.", None),
                    ("Two successes calm up to two Maniacs. One success calms one, and ends your turn. With no successes, one still calms, but Bloodlust rises and your turn ends, or instead you can take a Horror and lose two Time.", None),
                    ("Calmed Victims follow you, can be saved, and can be killed by Enemies again.", None)]),
        dict(title='Dark Powers', bullets=['Bloodfear: first Horror/Bloodlust rise heals her', 'Dark Injection: first heal heals 1 more', 'Manic Burst: new Maniacs act at once', 'Shield of Madness: no damage while Maniacs live'],
             images=[(S+'rl-cards.png', None)],
             lines=[("Her Dark Powers. Bloodfear: in each Killer phase, the first time Horror or Bloodlust goes up, she heals one. Dark Injection: the first time she heals each Killer phase, she heals one more.", None),
                    ("Manic Burst: every new Maniac immediately takes its Minion action.", None),
                    ("And her Epic Dark Power, Shield of Madness: she can't lose health while any Maniac is on the board.", None)]),
        dict(title='Finales', bullets=['Feed the Madness: heals 1, spawns if none', 'It\'s Raining Maniacs: 2 more each phase', 'Hold Her Down: all Victims turn; Calm gone', 'Enter the Madhouse: 4 Maniacs, heals 6'],
             images=[(S+'rl-cards.png', None)],
             lines=[("Her Finales. Feed the Madness heals her every Killer phase and spawns a Maniac whenever there are none. It's Raining Maniacs spawns two more every Killer phase.", None),
                    ("Hold Her Down turns every remaining Victim into a Maniac and removes your Calm cards. And the Epic Finale spawns four Maniacs and heals her six.", None)]),
        dict(title='Tips', bullets=['Calm Maniacs, then save them', 'Killing Maniacs costs no Bloodlust', 'Hit her hard before she heals', 'Clear Maniacs before Shield of Madness'],
             images=[(G+'S2-killer-ratchet-lady-art.png', None)],
             lines=[("A few tips. Calmed Maniacs become Victims you can save, so Calm and rescue together.", None),
                    ("Killing a Maniac doesn't raise Bloodlust, so it's often the quicker option.", None),
                    ("And strike her early with big attacks, before her healing snowballs. Good luck.", None)]),
    ])
