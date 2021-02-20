from .db import db
from .artwalk import ArtWalk
from .location import Location

class ArtWalkLocation(db.Model):
    __tablename__ = 'art_walk_locations'

    id = db.Column(db.Integer, primary_key = True)
    art_walk_id = db.Column(db.Integer, nullable = False, db.ForeignKey("art_walks.id"))
    location_id = db.Column(db.Integer, nullable = False, db.ForeignKey("locations.id"))
