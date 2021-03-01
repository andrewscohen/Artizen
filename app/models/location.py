from .db import db
from .artwalk_location import Artwalk_Location


class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False,)
    street_address = db.Column(db.String(100), nullable = False,)
    city = db.Column(db.String(50), nullable = False)
    state = db.Column(db.String(25), nullable = False)
    zip_code = db.Column(db.Integer, nullable = False)
    lat = db.Column(db.Float, nullable = False)
    long = db.Column(db.Float, nullable = False)
    title = db.Column(db.String(50))
    description = db.Column(db.Text)
    artist = db.Column(db.String(50))

    user = db.relationship("User", back_populates="locations")
    photos = db.relationship("Photo", back_populates="location", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="location")
    art_walks = db.relationship("ArtWalk",
                                secondary=Artwalk_Location,
                                back_populates="locations")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "street_address": self.street_address,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code,
            "lat": self.lat,
            "long": self.long,
            "title": self.title,
            "description": self.description,
            "artist": self.artist,
            "photos": [photo.to_dict() for photo in self.photos]
        }
