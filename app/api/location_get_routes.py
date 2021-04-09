from flask import Blueprint, request, Response
from flask_login import login_required
from app.models import db, Location, Comment
from app.forms import LocationForm
import json

location_get_routes = Blueprint("locations", __name__)


@location_get_routes.route("/get/<int:id>")
@login_required
def locations(id):
    location = Location.query.get(id)
    if location:
        return location.to_dict()
    else:
        return {'errors': 'Location does not exist'}, 404

@location_get_routes.route('/', methods=["POST"])
@login_required
def add_location():
    form = LocationForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        location = Location(
            user_id=form.data['user_id'],
            street_address=form.data['street_address'],
            city=form.data['city'],
            state=form.data['state'],
            zip_code=form.data['zip_code'],
            title=form.data['title'],
            description=form.data['description'],
            artist=form.data['artist'],
            lat=form.data['lat'],
            long=form.data['long'],
        )
        db.session.add(location)

        db.session.commit()

        return location.to_dict()
    return form.errors


@location_get_routes.route('/get/all')
def all_locations():
    locations = Location.query.all()
    data = [location.to_dict() for location in locations]
    res = json.dumps(data)
    return res


@location_get_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_location(id):
    location = Location.query.get(id)

    new_location_obj = request.get_json()

    location.title = new_location_obj["title"]
    location.artist = new_location_obj["artist"]
    location.description = new_location_obj["description"]
    location.street_address = new_location_obj["street_address"]
    location.city = new_location_obj["city"]
    location.state = new_location_obj["state"]
    location.zip_code = new_location_obj["zip_code"]
    location.lat = new_location_obj["lat"]
    location.long = new_location_obj["long"]

    db.session.commit()

    return location.to_dict()


@location_get_routes.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete_location(id):
    location = Location.query.get(id)

    Comment.query.filter(Comment.location_id == id).delete()

    db.session.delete(location)
    db.session.commit()

    return Response("{'a':'b'}", status=201, mimetype='application/json')
