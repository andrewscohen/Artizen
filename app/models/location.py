from .db import db
from .user import User
from .photo import Photo

class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, nullable = False, db.ForeignKey("users.id"))
    photo_id = db.Column(db.Integer, nullable = False, db.ForeignKey("photos.id"))
    street_address = db.Column(db.String(100), nullable = False,)
    city = db.Column(db.String(50), nullable = False)
    state = db.Column(db.String(25), nullable = False)
    zip_code = db.Column(db.Integer, nullable = False) #String or Int?
    title = db.Column(db.String(50), nullable = False)
    description = db.Column(db.Text, nullable = True)
    artist = db.Column(db.String(50), nullable = True)
