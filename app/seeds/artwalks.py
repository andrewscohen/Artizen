from app.models import db, ArtWalk

def seed_artwalks():
    artwalks = [
        {'user_id': 1,
        'name': 'Sunday Walk in Austin'
        },
        ]

    for artwalk in artwalks:
        new_artwalk = ArtWalk(**artwalk)
        db.session.add(new_artwalk)

    db.session.commit()

def undo_artwalks():
    db.session.execute('TRUNCATE art_walks RESTART IDENTITY CASCADE;')
    db.session.commit()
