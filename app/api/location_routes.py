from flask import Blueprint
from flask_login import login_required
from app.forms import LocationForm
from app.models import db, User, Location, Photo

location_routes = Blueprint('locations', __name__)


@location_routes.route('/new', methods=['GET'])
@login_required
def get_location_form():
    form = LocationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    pass


@location_routes.route('/new', methods=['POST'])
@login_required
def add_location():
    pass