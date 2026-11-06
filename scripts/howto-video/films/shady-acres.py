# How-to-play video script. Built by scripts/howto-video/build.py — see the
# Training videos panel in Asset Admin for the prompt that makes these.
import os
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'assets')
G = os.path.join(A, 'games') + '/'
I = os.path.join(A, 'icons') + '/'
R = I + 'rules/'
# Series 4 rule sheet for this film in s4-rules-pdf; P + 'N' is page N.
P = os.path.join(A, '..', '..', 's4-rules-pdf', 'FF17_ShadyAcres.pdf') + '#'
# Sharp 600 dpi crops of cards from the Series 4 rule sheets.
S = os.path.join(os.path.dirname(os.path.abspath(__file__)), 's4img') + '/'

FILM = dict(
    type='location',
    season=4,
    shortName='shady-acres',
    name='Shady Acres',
    heading='SHADY ACRES',
    film='A Rotten Harvest',
    background=G+'S4-location-shady-acres-art.png', flavour=G+'S4-location-shady-acres-flavour.png',
    scenes=[
        dict(title='Shady Acres',
             kind='intro',
             images=[(G+'S4-location-shady-acres-art.png', None)],
             lines=[('Shady Acres: a rural town where children keep going missing, and something lives in the fields.', None),
                    ("Here's how the location plays.", None)]),
        dict(title='Special setup',
             bullets=['Shuffle the Ancient Curse deck', 'Children card out', '1 Child on the Altar of the Old Gods', 'Others on the Children card', "Children Action token above the Finale's actions"],
             icons=[R+'S4-location-shady-acres-icon-children-action-token.png'],
             images=[(S+'children-card.png', None), (S+'children-token.png', None)],
             lines=[('Shuffle the Ancient Curse cards into a face-down deck.', None),
                    ('Put the Children card out, one Child meeple on the Altar of the Old Gods, and the others on the card.', None),
                    ('Put the Children Action token above any Minion or Killer Actions on the Finale card: the Children act first.', None)]),
        dict(title='The Children',
             bullets=['Enemies, but NOT Minions', 'Stats on the Children card', 'Own action, first in the Killer phase', 'Ignore Killer/Minion actions', 'Nearest the Altar acts first'],
             icons=[R+'S4-location-shady-acres-icon-children-action.png'],
             images=[(S+'children-card.png', None)],
             lines=[("The Children card gives their health, Attack and Movement Values. They're Enemies, but not Minions.", None),
                    ("They have their own action on the Children Action token, resolved at the start of the Killer phase, before any Minion or Killer Action. They don't resolve Killer or Minion actions on Terror cards unless a card says so.", None),
                    ('They act one at a time, starting with the Child closest to the Altar of the Old Gods.', None)]),
        dict(title='Children spawn and die',
             bullets=['Upkeep: a Child spawns on the Altar', 'Unless all are out or no Victims', 'Can be attacked and killed', 'Killed: back on the card', 'Several in a space: split your damage'],
             images=[(P+'2', (0.0, 0.7, 1.0, 0.98))],
             lines=[('In every Upkeep, a Child spawns on the Altar of the Old Gods, unless all three are already out or there are no Victims on the board.', None),
                    ('You can attack and kill Children. A dead Child goes back on the card, ready to spawn again.', None),
                    ('If several are in the space you attack, you attack them all and split the damage as you like. Any extra is lost.', None)]),
        dict(title='Children and Victims',
             bullets=["Victims follow you into Children's space", '…unless the Killer is there too', 'Panic: Victims with a Child panic', '…if a Victim died that turn'],
             images=[(P+'3', (0.0, 0.0, 1.0, 0.13))],
             lines=[('Victims will follow you into a space with Children, unless the Killer is also there.', None),
                    ('In the Panic phase, Victims in a space with a Child panic if at least one Victim was killed that turn.', None)]),
        dict(title='Abductions',
             bullets=["Abduction icon on a Victim's space: roll", '1–2: sacrificed (killed)', 'Child back to the Altar; Bloodlust up', 'Victim onto the top Ancient Curse card', '3–6: nothing; no Victim = attack'],
             icons=[R+'S4-location-shady-acres-icon-abduction.png'],
             images=[(P+'3', (0.0, 0.13, 1.0, 0.48))],
             lines=[('The Children abduct people as sacrifices. When a Child resolves the abduction icon in a space with a Victim, roll a die.', None),
                    ('On a one or two, the Victim is sacrificed and killed. Return the Child to the Altar, raise Bloodlust as normal, and put the Victim on the back of the top Ancient Curse card.', None),
                    ("On three to six, nothing happens. With no Victim in the Child's space, treat the abduction icon as an attack.", None)]),
        dict(title='Ancient Curses',
             bullets=['3 sacrifices on the top card', 'Remove them; reveal the Curse', 'It stays in play', 'Several Curses can stack up'],
             images=[(S+'curse-cards.png', None)],
             lines=[('When three sacrificed Victims sit on the top Ancient Curse card, the Old Gods have been fed. Remove the Victims and reveal the Curse, putting it into play. Several can be in play at once.', None),
                    ('Dark Fields lets Children treat all Field spaces as adjacent. Others include Decaying Earth, lose a health entering a Field, and Omen of Death, the Killer heals whenever he kills a Victim.', None)]),
        dict(title='Field spaces',
             bullets=['Spaces with the corn icon', 'Many cards target them', '"The Fields Are Moving…": 2 more', 'Combine Keys: mow them down'],
             icons=[R+'S4-location-shady-acres-icon-field-space.png', R+'S4-location-shady-acres-icon-combine-token.png'],
             images=[(S+'shady-event.png', None)],
             lines=[('Spaces with the corn icon are Field spaces, and plenty of cards hit them.', None),
                    ('The Fields Are Moving adds Field tokens to the Hayfield and Cow Pasture, making them Fields too.', None),
                    ('The Combine Keys let you drive the Combine: an extra space with Walk, and any Field you drive into is Harvested, no longer a Field.', None)]),
        dict(title='Tips',
             bullets=['Rescue early: 14 Victims, cramped map', 'Kill Children near Victims', 'Plan your search detours', 'Sally McCoy brings the Combine Keys'],
             images=[(G+'S4-location-shady-acres-art.png', None)],
             lines=[('A few tips. The setup uses fourteen Victims on a cramped map, so they die fast. Rescue early.', None),
                    ('Deal with Children next to Victims before they abduct anyone, and plan your route to the search spaces, which all need detours. Good luck.', None)]),
    ])
