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
    type='location', season=2, shortName='wingard-cottage', name='Wingard Cottage', heading='WINGARD COTTAGE', film='A Knock at the Door',
    background=G+'S2-location-wingard-cottage-art.png', flavour=G+'S2-location-wingard-cottage-flavour.png',
    scenes=[
        dict(title='Wingard Cottage', kind='intro', images=[(G+'S2-location-wingard-cottage-board.jpg', None)],
             lines=[("Wingard Cottage: a perfect family getaway on a pristine lake, with a long history of tragedy.", None),
                    ("Here's how the location plays.", None)]),
        dict(title='Special setup', bullets=['4 Supply Item cards face up', 'Shuffle the Crafted Item cards', 'Deal 4 Crafted Items face up'],
             images=[(S+'wc-cards.png', None)],
             lines=[("Lay the four Supply Item cards face up in the play area. Shuffle the ten Crafted Item cards and deal four face up beside them. Those four are what you can build.", None)]),
        dict(title='Space types', bullets=['House: Kitchen, 2 Bedrooms, Bathroom...', '...Family Room, Foyer, Laundry, Garage', 'Indoors: the House + Shed + Boathouse', 'Outdoor: everything else'],
             images=[(G+'S2-location-wingard-cottage-board.jpg', None)],
             lines=[("The House means the Kitchen, both Bedrooms, the Bathroom, the Family Room, the Foyer, the Laundry Room and the Garage.", None),
                    ("Indoors means the House plus the Shed and the Boathouse. Everything else is an outdoor space. Lots of cards care which is which.", None)]),
        dict(title='Supply Items', bullets=['Discarded Tools · Nails · Rope · Wood', 'On a matching Supply symbol space', '1 Time to take the card', 'Not while passing through', 'Goes in a Backpack slot'],
             icons=[R+'S2-location-wingard-cottage-icon-supply-nails.png', R+'S2-location-wingard-cottage-icon-supply-rope.png', R+'S2-location-wingard-cottage-icon-supply-wood.png', R+'S2-location-wingard-cottage-icon-supply-discarded-tools.png'],
             images=[(S+'wc-supply.png', None)],
             lines=[("Some spaces show a Supply symbol: Discarded Tools, Nails, Rope or Wood.", None),
                    ("While on one of those spaces, not just passing through, you can spend one Time to take that Supply Item card. It goes in a Backpack slot.", None),
                    ("When a Supply card is discarded, it goes back face up in the play area, ready to be taken again.", None)]),
        dict(title='Crafting', bullets=['Discard the listed Items and Supplies', 'Pay the listed Time', 'Take the Crafted Item: hand or backpack', 'Discarded later? Back face up', 'Limited uses carry over'],
             images=[(S+'wc-craft.png', None)],
             lines=[("To craft, discard the Item and Supply cards listed on a face-up Crafted Item, pay its Time cost, and take it into a Hand or Backpack slot.", None),
                    ("For example: Ava has a Wooden Bat and Nails. She pays two Time to craft the Nail Bat, discards the Bat, and returns the Nails face up.", None),
                    ("Used items keep their remaining uses: a Shotgun with one shot left makes a Sawed-off Shotgun with one shot left. Discarded Crafted Items go back face up, to be crafted again.", None)]),
        dict(title='Crafted highlights', bullets=['Nail Trap & Snare: 1 Time to set, stop Enemies', 'Sawed-Off Shotgun: 3 damage + 2 to others', 'Spear: push Enemies away', 'The Obliterator: 3 damage, but costly', 'Brainstorming: more recipes'],
             images=[(S+'wc-cards.png', None)],
             lines=[("Some standouts. Nail Traps and Snares cost one Time to place in your space, and damage or stop the next Enemy that enters.", None),
                    ("The Sawed-off Shotgun spends a Time to deal three damage to its target and two to every other Enemy there. The Spear can shove an Enemy into the next space.", None),
                    ("The Obliterator hits for three but slows you, and costs you health for every one you roll. The Brainstorming event adds two more recipes to choose from.", None)]),
        dict(title='Watch for', bullets=['Booby Traps: Victims leaving the House die', 'Home Security: lock Enemies out', 'Escape Attempt: a Victim makes a run for it', '"Now get the hell out of my house!"'],
             images=[(G+'S2-location-wingard-cottage-board.jpg', (0.0, 0.25, 1.0, 1.0))],
             lines=[("Watch for Booby Traps: every Victim inside the house panics, and any Victim leaving the house is killed.", None),
                    ("Home Security can be switched on when no Enemies are in the house, keeping them out until three attempts or until you or a Victim go in or out.", None),
                    ("And one Terror card drops the Killer right into your space if you're in the house.", None)]),
        dict(title='Tips', bullets=['Collect Supplies early, while it\'s quiet', 'Craft traps on the Killer\'s path', 'Keep a weapon to upgrade', 'Check which 4 recipes are out'],
             images=[(G+'S2-location-wingard-cottage-art.png', None)],
             lines=[("A few tips. Pick up Supplies early, while the Killer is far away.", None),
                    ("Traps are cheap and great on the Killer's route to the Victims.", None),
                    ("And keep an eye on which four recipes are out before you spend items you might need. Good luck.", None)]),
    ])
