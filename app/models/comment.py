from .db import db
from .user import User
from .location import Location

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False,)
    location_id = db.Column(db.Integer, db.ForeignKey("locations.id"), nullable = False,)
    comment = db.Column(db.Text, nullable = False)
    created_at = db.Column(db.Date, nullable = False)
    updated_at = db.Column(db.Date, nullable = False)
