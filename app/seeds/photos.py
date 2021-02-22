from app.models import db, Photo

def seed_photos():
    photos = [
        {'user_id': 1 ,
        'url': 'https://streetartcities.com/media/7/7ae6fd92-3705-4532-b91f-50731d56febb/2048.jpg'
        }
        ]

    for photo in photos:
        new_photo = Photo(**photo)
        db.session.add(new_photo)

    db.session.commit()

# db.engine.execute(user.__table__.insert(), photos)

def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
