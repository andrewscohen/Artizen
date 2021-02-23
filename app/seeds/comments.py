import datetime
from app.models import db, Comment

def seed_comments():
    comments = [
        {'user_id': 22,
        'location_id': 1,
        'comment': 'I absolutely love this!',
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
        },
        {'user_id': 47,
        'location_id': 6,
        'comment': 'I go here every weekend.',
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
        },
        {'user_id': 18,
        'location_id': 12,
        'comment': 'Highly recommend',
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
        },
        {'user_id': 2,
        'location_id': 2,
        'comment': 'Not my favorite, but I can see why people love it.',
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
        },
        {'user_id': 20,
        'location_id': 3,
        'comment': 'I absolutely love this!',
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
        },
        {'user_id': 34,
        'location_id': 9,
        'comment': 'I could stare at this for hours',
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
        },
        {'user_id': 28,
        'location_id': 1,
        'comment': 'My friend and I walked by here today, loved it :)',
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
        },
        {'user_id': 49,
        'location_id': 20,
        'comment': '💪💪💪',
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
        },
        {'user_id': 17,
        'location_id': 11,
        'comment': 'Can I get one for my living room??',
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
        },
        {'user_id': 3,
        'location_id': 16,
        'comment': 'Yasss!',
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
        },
        ]

    for comment in comments:
        new_comment = Comment(**comment)
        db.session.add(new_comment)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
