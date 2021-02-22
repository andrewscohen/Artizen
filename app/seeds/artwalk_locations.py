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
        ]

    for artwalk_location in artwalk_locations:
        db.session.execute(Artwalk_Location.insert(),
                        params=artwalk_location)

    db.session.commit()

def undo_artwalk_locations():
    db.session.execute('TRUNCATE artwalk_locations RESTART IDENTITY CASCADE;')
    db.session.commit()
