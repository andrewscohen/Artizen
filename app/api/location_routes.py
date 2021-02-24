from flask import Blueprint
from app.models import Location

location_routes = Blueprint('locations', __name__)

@location_routes.route('/location')
def locations():
    locations = Location.query.all()
    return locations.to_dict()
