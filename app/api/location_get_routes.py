from flask import Blueprint
from flask_login import login_required
from app.models import Location

location_get_routes = Blueprint("locations", __name__)


@location_get_routes.route("/<int:id>")
@login_required
def locations(id):
    location = Location.query.get(id)

    return location.to_dict()
