from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, ArtWalk
import json

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/artwalks')
@login_required
def artwalks(id):
    artwalks = ArtWalk.query.filter(ArtWalk.user_id == id).all()
    data = [artwalk.to_dict() for artwalk in artwalks]
    res = json.dumps(data)
    print("------------------------------------", res)
    return res
