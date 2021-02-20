from .db import db
from .user import User

class ArtWalk(db.Model):
    __tablename__ = 'art_walks'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, nullable = False, db.ForeignKey("users.id"))
    name = db.Column(db.String(50), nullable = False)
