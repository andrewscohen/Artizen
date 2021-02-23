from app.models.artwalk_location import Artwalk_Location
from app.models import db, ArtWalk, Location

def seed_artwalk_locations():
    artwalk_locations = [
        {'art_walk_id': 1,
        'location_id': 1,
        },
        {'art_walk_id': 1,
        'location_id': 3,
        },
        {'art_walk_id': 1,
        'location_id': 7,
        },
        {'art_walk_id': 1,
        'location_id': 8,
        },
        {'art_walk_id': 2,
        'location_id': 2,
        },
        {'art_walk_id': 2,
        'location_id': 6,
        },
        {'art_walk_id': 2,
        'location_id': 5,
        },
        {'art_walk_id': 2,
        'location_id': 4,
        },
        {'art_walk_id': 2,
        'location_id': 3,
        },
        {'art_walk_id': 3,
        'location_id': 9,
        },
        {'art_walk_id': 3,
        'location_id': 10,
        },
        {'art_walk_id': 3,
        'location_id': 11,
        },
        {'art_walk_id': 4,
        'location_id': 13,
        },
        {'art_walk_id': 4,
        'location_id': 15,
        },
        {'art_walk_id': 4,
        'location_id': 14,
        },
        {'art_walk_id': 4,
        'location_id': 20,
        },
        {'art_walk_id': 4,
        'location_id': 19,
        },
        ]

    for artwalk_location in artwalk_locations:
        db.session.execute(Artwalk_Location.insert(),
                        params=artwalk_location)

    db.session.commit()

def undo_artwalk_locations():
    db.session.execute('TRUNCATE artwalk_locations RESTART IDENTITY CASCADE;')
    db.session.commit()
