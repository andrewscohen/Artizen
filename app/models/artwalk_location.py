from .db import db

Artwalk_Location = db.Table('artwalk_locations',
    db.Column('art_walk_id', db.Integer, db.ForeignKey("art_walks.id"), nullable = False, primary_key = True),
    db.Column('location_id', db.Integer, db.ForeignKey("locations.id"), nullable = False, primary_key = True)
)
