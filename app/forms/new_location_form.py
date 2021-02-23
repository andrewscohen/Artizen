from flask_wtf import FlaskForm
from wtforms import StringField, TextField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class LocationForm(FlaskForm):
    title=StringField('title')
    artist=StringField('artist')
    street_address=StringField('street_address', validators=[DataRequired])
    city=StringField('city', validators=[DataRequired])
    state=StringField('state', validators=[DataRequired])
    zip_code=IntegerField('zip_code', validators=[DataRequired])
    description=TextField('description')
    