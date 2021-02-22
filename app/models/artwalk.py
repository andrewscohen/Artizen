from .db import db
from .artwalk_location import Artwalk_Location

class ArtWalk(db.Model):
    __tablename__ = 'art_walks'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False,)
    name = db.Column(db.String(50), nullable = False)

    user = db.relationship("User", back_populates="art_walks")
    locations = db.relationship("Location",
                                secondary=Artwalk_Location,
                                back_populates="art_walks")
