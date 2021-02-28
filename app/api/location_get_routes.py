from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Location
from app.forms import LocationForm

location_get_routes = Blueprint("locations", __name__)


@location_get_routes.route("/get/<int:id>")
@login_required
def locations(id):
    location = Location.query.get(id)

    return location.to_dict()

@location_get_routes.route('/', methods=["POST"])
@login_required
def add_location():
    form = LocationForm()
    # print(request.get_json())
    form['csrf_token'].data = request.cookies['csrf_token']
    print('add location before validation: ', form.data)
    if form.validate_on_submit():
        print('add location after validation: ')

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
    print(locations)
    return {"locations": [location.to_dict() for location in locations]}
