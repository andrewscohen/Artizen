from .db import db
from .user import User

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, nullable = False, db.ForeignKey("users.id"))
    url = db.Column(db.String(255), nullable = False, unique = True)
