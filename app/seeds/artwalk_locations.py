from app.models.artwalk_location import db, Artwalk_Location

def seed_artwalk_locations():
    artwalk_locations = [
        {'artwalk_id': 1,
        'location_id': 1,
        },
        ]

    for artwalk_location in artwalk_locations:
        new_artwalk_location = ArtWalk_Location(**artwalk_location)
        db.session.add(new_artwalk_location)

    db.session.commit()

def undo_artwalk_locations():
    db.session.execute('TRUNCATE artwalk_locations RESTART IDENTITY CASCADE;')
    db.session.commit()
