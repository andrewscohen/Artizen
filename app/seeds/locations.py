from app.models import db, Location


# Adds a demo user, you can add other users here if you want
def seed_locations():
    locations = [
        {'user_id': 1 ,
        'photo_id': 1,
        'street_address': '304 E Cesar Chavez St',
        'city': 'Austin',
        'state': 'TX',
        'zip_code': 78701,
        'lat': 30.262937,
        'long': -97.741687,
        'title': '',
        'description': 'Local legend!',
        'artist': ''},
        ]

    users.append(demo)

    for user in users:
        db.session.add(user)

    db.session.commit()

db.engine.execute(user.__table__.insert(), locations)
