from flask import Blueprint, jsonify, json
from flask_login import login_required
from app.models import Comment, Location

comment_routes = Blueprint("comments", __name__)


@comment_routes.route("/<int:location_id>")
@login_required
def comments(location_id):
    comments = Comment.query.filter(Comment.location_id == location_id).all()

    return json.dumps(comments)
