from flask.cli import AppGroup
from .users import seed_users, undo_users
from .locations import seed_locations, undo_locations
from .photos import seed_photos, undo_photos
from .comments import seed_comments, undo_comments
from .artwalks import seed_artwalks, undo_artwalks
from .artwalk_locations import seed_artwalk_locations, undo_artwalk_locations

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_photos()
    seed_locations()
    seed_artwalks()
    seed_artwalk_locations()
    seed_comments()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_artwalk_locations()
    undo_artwalks()
    undo_locations()
    undo_photos()
    undo_users()
    # Add other undo functions here
