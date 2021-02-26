from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Location
import json

location_routes = Blueprint("/locations", __name__)


@location_routes.route("/<int:id>")
@login_required
def location(id):
    location = Location.query.get(id)
    return location.to_dict()
