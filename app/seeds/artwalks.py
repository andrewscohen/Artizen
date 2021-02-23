from app.models import db, ArtWalk

def seed_artwalks():
    artwalks = [
        {'user_id': 1,
        'name': 'Sunday Walk in Austin'
        },
        {'user_id': 1,
        'name': 'Favorite Spots'
        },
        {'user_id': 22,
        'name': 'Exploring Art'
        },
        {'user_id': 15,
        'name': 'New Places'
        },
        ]

    for artwalk in artwalks:
        new_artwalk = ArtWalk(**artwalk)
        db.session.add(new_artwalk)

    db.session.commit()

def undo_artwalks():
    db.session.execute('TRUNCATE art_walks RESTART IDENTITY CASCADE;')
    db.session.commit()
