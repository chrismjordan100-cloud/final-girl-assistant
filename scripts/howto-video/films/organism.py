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
    type='killer', season=2, shortName='organism', name='The Organism', heading='THE ORGANISM', film='Panic at Station 2891',
    background=G+'S2-location-station-2891-art.png', flavour=G+'S2-killer-organism-flavour.png',
    scenes=[
        dict(title='The Organism', kind='intro', images=[(G+'S2-killer-organism-art.png', None)],
             lines=[("The Organism: it's hiding inside someone. Maybe the person standing right next to you.", None),
                    ("Here's how it plays.", None)]),
        dict(title='Special setup', bullets=['Red, Black and Grey meeples replace 3 Victims', 'These are Exposed Victims', 'No Killer on the board', 'A Test Kit above each Item deck', 'Test Results deck · Exposed Victim cards on board'],
             images=[(S+'org-testkit.png', None)],
             lines=[("When placing Victims, randomly swap three of them for the Red, Black and Grey Killer meeples. These are Exposed Victims. Nothing goes on the Killer's start space. Away from Station 2891, put the Lab token there instead.", None),
                    ("Put a Test Kit Item card face up above each Item deck, shuffle the three Test Results cards face down, and lay the Exposed Victim cards face down on the Killer board.", None)]),
        dict(title='How you win', bullets=['Test the Exposed Victims', 'Find who\'s been ASSIMILATED', 'Kill every Mutated Organism', 'At least 1, up to 3 of them'],
             images=[(S+'org-board.png', None)],
             lines=[("To win, you must test the Exposed Victims to find out which ones have been assimilated, then destroy every Mutated Organism.", None),
                    ("There will always be at least one, and there could be as many as three.", None)]),
        dict(title='Exposed Victims', bullets=['Never targeted or killed by Organisms', 'Can\'t be saved', 'Can\'t become Special Victims', 'ALWAYS panic in the Panic phase', '"Killed" by anything else? Test them'],
             images=[(P+'15', (0.0, 0.55, 1.0, 0.82))],
             lines=[("Exposed Victims count as Victims, with five exceptions.", None),
                    ("They can never be targeted or killed by a Mutated Organism. They can't be saved. They can't be replaced by Special Victims. They always panic in the Panic phase, even if no one died.", None),
                    ("And if any other effect would kill one, immediately draw a Test Results card for it instead.", None)]),
        dict(title='Testing', bullets=['Free: no card, no Time', 'Be in their space', 'Discard a Test Kit, or be in the Lab', 'Draw a Test Results card', 'Search success: also take that deck\'s Test Kit'],
             images=[(S+'org-testkit.png', None)],
             lines=[("Testing is free: it needs no Action card and costs no Time. Be in the same space as an Exposed Victim, then either discard a Test Kit, or do it in the Lab, and draw a Test Results card.", None),
                    ("You get Test Kits by searching: whenever you take an Item from a Search, you may also take the Test Kit at that location, if one is there.", None)]),
        dict(title='Safe or Assimilated', bullets=['SAFE: swap in a normal Victim', '...and remove that card from the game', 'ASSIMILATED: reveal a Mutated Organism', 'Apply its Bloodlust effects, bottom up', 'Shuffle ASSIMILATED back in!'],
             images=[(S+'org-results.png', None)],
             lines=[("If the result is Safe, remove that card from the game and replace the meeple with a normal Victim. If they were tested because they'd been killed, they really are dead now: remove them and raise Bloodlust.", None),
                    ("If it's Assimilated, reveal the rightmost card on the Killer board and swap it for the matching Mutated Organism card. Put the meeple's token above it, set up its health and Final Health token, then apply all of its Bloodlust effects, from the lowest level up to the current one.", None),
                    ("Then shuffle the Assimilated card back into the Test Results deck. Others may be infected too.", None)]),
        dict(title='Mutated Organisms', bullets=['Fast 5 · Strong 6 · Tough 7 health', 'They\'re Killers, not Minions', 'Several? Act left to right', 'After the Finale: extra F actions', 'Bonus Adrenaline die only once'],
             images=[(S+'org-mutated.png', None)],
             lines=[("There are three Mutated Organisms, Fast, Strong and Tough, with five, six and seven health. Each has its own Bloodlust effects.", None),
                    ("They are Killers, not Minions. Each takes the Killer Action and Terror card actions as normal. With several in play, resolve them one at a time, left to right on the Killer board.", None),
                    ("Once the Finale is triggered, they also perform the extra actions marked F, straight after their normal ones.", None)]),
        dict(title='Killing them', bullets=['Lost its last health? Lay it on its side', 'Finish the phase first', 'Then check its Final Health token', 'Blank or white: dead · health: back up', 'Minor Dark Powers go to the closest one'],
             images=[(S+'org-mutated.png', None)],
             lines=[("When a Mutated Organism loses its final health and another is still on the board, lay it on its side and finish the current phase before checking its Final Health token.", None),
                    ("If the token is blank, or it was a white token, it's dead: remove it. Otherwise restore its health as normal.", None),
                    ("You only get the plus-one Adrenaline die once, however many are on their Final Health. And Minor Dark Powers attach to the Organism closest to you, or wait for the next one revealed.", None)]),
        dict(title='Finales', bullets=['All: remaining Exposed Victims assimilated', 'Regenerative: Horror above 6 = you lose', 'Reductive: in the last one\'s space = you lose', 'Cognitive: discard 2 Action cards or lose', 'Final: by a full-health one = you lose'],
             images=[(S+'org-finale.png', None)],
             lines=[("Every Finale immediately assimilates any Exposed Victims still untested, and adds a way to lose.", None),
                    ("Regenerative Assimilation: with one Organism left, raise Horror by two each Killer phase, and if Horror is ever above six, you lose.", None),
                    ("Reductive: with one left, you lose if you're in its space at the start of the Killer phase. Cognitive: with one left, discard two Action cards each Killer phase or lose. And the Epic Finale: you lose if you're ever with an Organism at full health during the Killer phase.", None)]),
        dict(title='Tips', bullets=['Test early, while it\'s safe', 'Grab Test Kits as you search', 'Fight one Organism at a time', 'Watch Horror once the Finale lands'],
             images=[(G+'S2-killer-organism-art.png', None)],
             lines=[("A few tips. Test early, before the Finale assimilates everyone at once.", None),
                    ("Take a Test Kit every time you search, so you can test wherever you are.", None),
                    ("Try to reveal and kill Organisms one at a time, rather than facing all three together. Good luck.", None)]),
    ])
