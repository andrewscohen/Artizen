from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, ArtWalk
from app.forms import ArtWalkForm
import json

artwalk_routes = Blueprint('artwalks', __name__)

@artwalk_routes.route('/<int:id>')
@login_required
def artwalk(id):
    artwalk = ArtWalk.query.get(id)
    data = artwalk.to_dict()
    res = json.dumps(data)
    return res

@artwalk_routes.route('/', methods=['POST'])
@login_required
def create_art_walk():
    form = ArtWalkForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        artwalk = ArtWalk(
            user_id=form.data['user_id'],
            name=form.data['name'],
        )
        db.session.add(artwalk)

        db.session.commit()

        return artwalk.to_dict()
    return form.errors
