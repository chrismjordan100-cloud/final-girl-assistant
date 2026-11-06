# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Series 3 Feature Film rulebook in the project root; P + 'N' is page N.
P = os.path.join(A, '..', '..', 'FeatureFilmRules_S3.pdf') + '#'
# Sharp 600 dpi crops of small cards from that rulebook.
S = os.path.join(os.path.dirname(os.path.abspath(__file__)), 's3img') + '/'

FILM = dict(
    type='killer',
    season=3,
    shortName='razorface',
    name='Razorface',
    heading='RAZORFACE',
    film='Hell to Pay',
    background=G+'S3-location-hellscape-art.png', flavour=G+'S3-killer-razorface-flavour.png',
    scenes=[
        dict(title='Razorface',
             kind='intro',
             images=[(G+'S3-killer-razorface-art.png', None)],
             lines=[('Razorface: a priest of pain in a face full of nails, and he has come to collect.', None),
                    ("Here's how he plays.", None)]),
        dict(title='Special setup',
             bullets=['Shuffle the 8 Affliction cards', 'Draw 3, face up on the table'],
             images=[(S+'gift-of-pain.png', None)],
             lines=[('Shuffle the eight Affliction cards, draw three and lay them face up. Those are the hellish chains on your soul.', None)]),
        dict(title='Afflictions',
             bullets=['Usually 3, you can gain more', 'Top: Purge Requirement', 'Bottom: Purge Effect', 'Purge them ALL to kill him'],
             images=[(S+'gift-of-pain.png', None)],
             lines=[("To kill Razorface you must first purge every Affliction you have. Usually that's three, but cards can give you more.", None),
                    ('Each Affliction has a Purge Requirement on top, and a Purge Effect on the bottom that you resolve when you purge it.', None),
                    ('For example, The Gift of Pain: deal at least three damage to Razorface in one Action phase. Do that, and you can purge it.', None)]),
        dict(title='Purging',
             bullets=['Action phase, requirement met?', 'You MAY purge: resolve the effect', 'Then remove it from the game', "Didn't purge? Meet it again later", 'Only ONE purge per turn'],
             images=[(P+'9', (0.51, 0.3, 1.0, 0.43))],
             lines=[("During the Action phase, if you've met an Affliction's requirement, you may purge it: resolve its Purge Effect, then remove the card from the game.", None),
                    ('If you choose not to, the requirement has to be met again later before you can purge it.', None),
                    ('And you can only purge one Affliction per turn, so start early. Leaving them all to the end is a trap.', None)]),
        dict(title='Impossible Afflictions',
             bullets=["Can't be done any more?", 'e.g. no Victims left on the board', 'Remove it, draw a replacement', 'Need to draw and none left: you LOSE'],
             images=[(P+'9', (0.51, 0.44, 0.8, 0.6))],
             lines=[('Sometimes an Affliction becomes impossible, for example one that needs a Victim when none are left on the board.', None),
                    ('Remove it from the game and draw a new one to replace it.', None),
                    ('If you ever need to draw an Affliction and the deck is empty, you lose immediately.', None)]),
        dict(title='His Final Health',
             bullets=['Final Health only revealed with NO Afflictions', 'Damage that would reveal it is ignored', 'Get him low, then clear the last one', 'Then finish him'],
             images=[(P+'9', (0.51, 0.6, 1.0, 0.72))],
             lines=[("Razorface's Final Health token can only be revealed when no Afflictions are in play.", None),
                    ("If he's down to his Final Health token and you still have an Affliction, any damage that would reveal it is simply ignored.", None),
                    ('So you can wear him down first, but the killing blow only lands after your last purge.', None)]),
        dict(title='Dark Powers',
             bullets=['Soulbound: gain a new Affliction', 'Helleport: kills a Victim at any range', 'Life Drain: deadly (hardest Dark Power)', 'Epic Infinite Despair: Horror every turn'],
             images=[(S+'soulbound.png', None), (S+'despair.png', None)],
             lines=[("Soulbound: when it's revealed, you gain a new Affliction.", None),
                    ('Helleport lets him kill a Victim wherever they are, and Life Drain is his deadliest power: players win under half their games when it comes out.', None),
                    ('His Epic Dark Power, Infinite Despair, punishes you every Panic phase: one effect if at least one Victim panicked, a different one if not. The card shows the amounts as icons; expect Horror to rise every turn.', None)]),
        dict(title='Terror cards',
             bullets=['Sadistic Manifestation: jumps to the farthest Victim', 'Then attacks twice', 'Experience Unbound: purging heals him 3', 'Minor powers: Pain of Judgement & Salvation'],
             images=[(S+'sadistic.png', None)],
             lines=[('Sadistic Manifestation places Razorface with the farthest Victim, then targets a Victim and attacks twice. If there are no Victims on the board, draw the next Terror card instead.', None),
                    ('One Affliction, Experience Unbound, heals Razorface three health when you purge it, so purge that one before you start hurting him.', None),
                    ('His Minor Dark Powers, The Pain of Judgement and The Pain of Salvation, make him kill Victims more easily and punish Focus actions.', None)]),
        dict(title='Finales',
             bullets=['Chains of Torment: attacks twice', "Kills when he enters a Victim's space", 'I Feast on Your Pain: double attack', 'Taste Our Pleasures: very dangerous'],
             images=[(S+'chains.png', None)],
             lines=[('Chains of Torment: each Killer phase he targets a Victim, moves and attacks twice, and whenever he enters a space with at least one Victim, the effect shown on the card triggers.', None),
                    ('I Feast on Your Pain attacks twice with a bonus based on Bloodlust, and Taste Our Pleasures is the most dangerous of the three.', None)]),
        dict(title='Tips',
             bullets=['Purge one Affliction every turn you can', 'Purge the healing one before damaging him', 'Keep Victims around for Victim Afflictions', 'Start early: one purge per turn'],
             images=[(G+'S3-killer-razorface-art.png', None)],
             lines=[('A few tips. You can only purge one Affliction a turn, so start in turn one and keep going.', None),
                    ('Purge any Affliction that heals him before you start dealing damage.', None),
                    ("And he's one of the tougher killers: players win just over half their games. Good luck.", None)]),
    ])
