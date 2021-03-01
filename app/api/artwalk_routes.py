from flask import Blueprint, jsonify, json, request, Response
from flask_login import login_required
from app.models import db, ArtWalk, Location
from app.forms import ArtWalkForm


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
        # data = request.get_json()

        data = request.get_json()
        locations1 = data['artWalkList']
        json.dumps(locations1)
        location_ids = [location['id'] for location in locations1]

        artwalk = ArtWalk(
            user_id=form.data['user_id'],
            name=form.data['name'],
        )

        locations2 = Location.query.filter(Location.id.in_(location_ids)).all()
        print(locations2)

        for location in locations2:

            artwalk.locations.append(location)

        db.session.add(artwalk)

        db.session.commit()

        return artwalk.to_dict()
    # return form.errors


@artwalk_routes.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete_artwalk(id):
    artwalk = ArtWalk.query.get(id)

    db.session.delete(artwalk)
    db.session.commit()

    return "it worked"
