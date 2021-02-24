from flask import Blueprint
from flask_login import login_required
from app.forms import LocationForm
from app.models import db, User, Location, Photo

location_routes = Blueprint('locations', __name__)


@location_routes.route('/', methods=['POST'])
@login_required
def add_location():
    form = LocationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        location = Location(
            user_id=form.data['title'],
            street_address=form.data['street_address'],
            city=form.data['city'],
            state=form.data['state'],
            zip_code=form.data['zip_code'],
            title=form.data['title'],
            description=form.data['description'],
            artist=form.data['artist'],
            lat=form.data['lat'],
            long=form.data['long'],
            #TODO: user_id = user.id  <-- find way to grab User id
            #TODO: lat = converted coordinate
            #TODO: long = converted coordinate
        )
        db.session.add(location)
        db.session.commit()

        # upload_photo = form.data['photo'] #TODO send this to AWS storage
        # photo = Photo(
        #     user_id = user.id, TODO
        #     url = aws_url, TODO retrieve the AWS url
        #     location_id = location.id, TODO query db for newly create location and grab id 
        #     create_at = new Date() 
        # )
        #TODO: db.session.add(photo) 
        



