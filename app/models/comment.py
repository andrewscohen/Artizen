from .db import db
from .user import User
from .comment import Comment

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, nullable = False, db.ForeignKey("users.id"))
    location_id = db.Column(db.Integer, nullable = False, db.ForeignKey("locations.id"))
    comment = db.Column(db.Text, nullable = False)
    created_at = db.Column(db.Date, nullable = False)
    updated_at = db.Column(db.Date, nullable = False)
