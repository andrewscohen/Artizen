from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False,)
    location_id = db.Column(db.Integer, db.ForeignKey(
        "locations.id"), nullable=False,)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User", back_populates="comments")
    location = db.relationship("Location", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "location_id": self.location_id,
            "comment": self.comment,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "username": self.user.username
        }
