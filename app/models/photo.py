from .db import db


class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    location_id = db.Column(db.Integer, db.ForeignKey("locations.id"), nullable = False)
    url = db.Column(db.String(255), nullable = False, unique = True)

    user = db.relationship("User", back_populates="photos")
    location = db.relationship("Location", back_populates="photos")
