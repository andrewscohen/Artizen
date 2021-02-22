from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False,)
    location_id = db.Column(db.Integer, db.ForeignKey("locations.id"), nullable = False,)
    comment = db.Column(db.Text, nullable = False)
    created_at = db.Column(db.Date, nullable = False)
    updated_at = db.Column(db.Date, nullable = False)

    user = db.relationship("User", back_populates="comments")
    location = db.relationship("Location", back_populates="comments")
