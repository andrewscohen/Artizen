from flask import Blueprint, jsonify, json
from flask_login import login_required
from app.models import Comment, Location, db
from datetime import datetime

comment_routes = Blueprint("comments", __name__)


@comment_routes.route("/<int:location_id>")
@login_required
def comments(location_id):
    comments = Comment.query.filter(Comment.location_id == location_id).all()
    data = [comment.to_dict() for comment in comments]
    return json.dumps(data)


@comment_routes.route("/new/<int:location_id>/<int:user_id>", methods=["POST"])
@login_required
def add_comment(location_id, user_id):
    comment = Comment(
        user_id=user_id,
        location_id=location_id,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add(comment)

    db.session.commit()
