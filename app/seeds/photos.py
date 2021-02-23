from app.models import db, Photo
import datetime

def seed_photos():
    photos = [
        {'user_id': 1,
        'location_id': 1,
        'url': 'https://streetartcities.com/media/7/7ae6fd92-3705-4532-b91f-50731d56febb/2048.jpg',
        'created_at': datetime.datetime.now()
        },
        {'user_id': 12,
        'location_id': 2,
        'url': 'https://streetartcities.com/media/c/c585b0dc-c303-47fb-9a9f-523b97d99bc8/2048.jpg',
        'created_at': datetime.datetime.now()
        },
        {'user_id': 27,
        'location_id': 3,
        'url': 'https://streetartcities.com/media/e/eca2a0d6-efaf-4719-b806-8c725aed61ce/2048.jpg',
        'created_at': datetime.datetime.now()
        },
        {'user_id': 38,
        'location_id': 4,
        'url': 'https://streetartcities.com/media/b/b7177be8-af9c-40b8-9e38-52bbb1c8dbe5/2048.jpg',
        'created_at': datetime.datetime.now()
        },
        {'user_id': 41,
        'location_id': 5,
        'url': 'https://streetartcities.com/media/7/7002f645-4573-4ba3-97c6-9fb6e0ec306d/2048.jpg',
        'created_at': datetime.datetime.now()
        },
        {'user_id': 19,
        'location_id': 6,
        'url': 'https://streetartcities.com/media/0/08ee9882-2f7c-4e92-bce7-6fcd0d689edb/2048.jpg',
        'created_at': datetime.datetime.now()
        },
        {'user_id': 28,
        'location_id': 7,
        'url': 'https://streetartcities.com/media/f/fcf27ad1-f135-4858-a984-bb2c8f5e7312/2048.jpg',
        'created_at': datetime.datetime.now()
        },
        {'user_id': 10,
        'location_id': 8,
        'url': 'https://streetartcities.com/media/8/81fac086-328e-4d2e-b65b-aef3bc2cffb4/2048.jpg',
        'created_at': datetime.datetime.now()
        },
        {'user_id': 5,
        'location_id': 9,
        'url': 'https://streetartcities.com/media/2/22afe1b1-9917-4452-bb19-ba97ca4bad76/2048.jpg',
        'created_at': datetime.datetime.now()
        },
        {'user_id': 22,
        'location_id': 10,
        'url': 'https://streetartcities.com/media/9/9fb1d351-da33-4766-b326-04e969a2f9d3/2048.jpg',
        'created_at': datetime.datetime.now()
        },
        {'user_id': 37,
        'location_id': 11,
        'url': 'https://streetartcities.com/media/6/653b9219-b324-4fe4-9d20-5f520f96ed22/2048.jpg',
        'created_at': datetime.datetime.now()
        }
        ]

    for photo in photos:
        new_photo = Photo(**photo)
        db.session.add(new_photo)

    db.session.commit()


def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
