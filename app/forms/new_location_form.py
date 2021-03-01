from flask_wtf import FlaskForm
from wtforms import StringField, TextField, IntegerField, DecimalField, FileField
from wtforms.validators import DataRequired

class LocationForm(FlaskForm):

    user_id=IntegerField('user_id', validators=[DataRequired()])
    street_address=StringField('street_address', validators=[DataRequired()])
    city=StringField('city', validators=[DataRequired()])
    state=StringField('state', validators=[DataRequired()])
    zip_code=IntegerField('zip_code', validators=[DataRequired()])
    title=StringField('title')
    description=TextField('description')
    artist=StringField('artist')
    photo=FileField('photo')
    lat=DecimalField('lat', places=6, rounding=None, validators=[DataRequired()])
    long=DecimalField('long', places=6, rounding=None, validators=[DataRequired()])
