from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import LocationForm
from app.models import db, User, Location, Photo
import json

location_routes = Blueprint('locations', __name__)


@location_routes.route('/', methods=["POST"])
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
      


@location_routes.route('/location')
def locations():
    locations = Location.query.all()
    return locations.to_dict()
