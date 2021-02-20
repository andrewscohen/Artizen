from .db import db
from .user import User
from .photo import Photo

class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False,)
    photo_id = db.Column(db.Integer, db.ForeignKey("photos.id"), nullable = False)
    street_address = db.Column(db.String(100), nullable = False,)
    city = db.Column(db.String(50), nullable = False)
    state = db.Column(db.String(25), nullable = False)
    zip_code = db.Column(db.Integer, nullable = False) #String or Int?
    title = db.Column(db.String(50))
    description = db.Column(db.Text)
    artist = db.Column(db.String(50))
