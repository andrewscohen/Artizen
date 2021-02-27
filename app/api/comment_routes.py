from flask import Blueprint, jsonify, json, request, Response
from flask_login import login_required
from app.models import Comment, Location, db, User
from app.forms.comment_form import CommentForm
from datetime import datetime

comment_routes = Blueprint("comments", __name__)


@comment_routes.route("/<int:location_id>")
@login_required
def comments(location_id):
    comments = Comment.query.filter(
        Comment.location_id == location_id).all()
    data = [comment.to_dict() for comment in comments]
    return json.dumps(data)


@comment_routes.route("/new", methods=["POST"])
@login_required
def add_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    comment_obj = request.get_json()
    user_id = comment_obj["user_id"]
    location_id = comment_obj["location_id"]
    comment_content = comment_obj["comment"]

    if form.validate_on_submit():
        comment = Comment(
            user_id=user_id,
            location_id=location_id,
            comment=comment_content,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(comment)

        db.session.commit()

        comments = Comment.query.filter(
            Comment.location_id == location_id).all()
        data = [comment.to_dict() for comment in comments]
        return json.dumps(data)


@comment_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)

    location_id = request.get_json()["location_id"]

    db.session.delete(comment)
    db.session.commit()

    return Response("{'a':'b'}", status=201, mimetype='application/json')
