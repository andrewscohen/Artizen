from .db import db
from .artwalk_location import Artwalk_Location

class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False,)
    photo_id = db.Column(db.Integer, db.ForeignKey("photos.id"), nullable = False)
    street_address = db.Column(db.String(100), nullable = False,)
    city = db.Column(db.String(50), nullable = False)
    state = db.Column(db.String(25), nullable = False)
    zip_code = db.Column(db.Integer, nullable = False) #String or Int?
    lat = db.Column(db.Float, nullable = False)
    long = db.Column(db.Float, nullable = False)
    title = db.Column(db.String(50))
    description = db.Column(db.Text)
    artist = db.Column(db.String(50))

    user = db.relationship("User", back_populates="locations")
    photos = db.relationship("Photo", back_populates="location")
    comments = db.relationship("Comment", back_populates="location")
    art_walks = db.relationship("ArtWalk",
                                secondary=Artwalk_Location,
                                back_populates="locations")
