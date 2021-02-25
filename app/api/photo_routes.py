from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import LocationForm
import boto3, botocore
from ..config import Config
from ..helpers import *
from datetime import datetime
from app.models import db, Photo
import json

photo_routes = Blueprint('photos', __name__)


@photo_routes.route('/', methods=["POST"])
@login_required
def add_photo():
    if "photo" not in request.files:
        return "No user_file key in request.files"

    file = request.files["photo"]

    # form['csrf_token'].data = request.cookies['csrf_token']

    # if file.filename == "":
    #     return "Please select a file"

    # if file and allowed_file(file.filename):
    if file:
        # file.filename = secure_filename(file.filename)
        photo_url = upload_file_to_s3(file, Config.S3_BUCKET)
        photo = Photo(
            user_id=request.form.get('user_id'),
            location_id=request.form.get('location_id'),
            url=photo_url,
            created_at=datetime.now()
        )
        db.session.add(photo)
       
        db.session.commit()

        return photo.to_dict()
    else:
        return redirect("/locations/new")