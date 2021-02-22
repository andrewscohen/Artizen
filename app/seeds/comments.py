import datetime
from app.models import db, Comment

def seed_comments():
    comments = [
        {'user_id': 1,
        'location_id': 1,
        'comment': '',
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
