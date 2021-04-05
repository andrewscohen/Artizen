![artizen_logo_background](https://user-images.githubusercontent.com/70362985/113626190-74a82680-9627-11eb-951d-687670c2de16.png)


**Artizen** is an app that puts a public art spin on MapMyRide. Users can upload photos and locations of works of public art to a map and create walking routes to explore them. It leverages several different Google Maps API services to render art locations on a map and to generate and render routes for walks.

### Try the live site <a href=https://artizen.herokuapp.com/>here</a>. <b>|</b> View the database schema and feature list in the <a href="https://github.com/andrewscohen/Artizen/wiki">Wiki</a>.



# Tech Stack
Artizen uses the following tools, frameworks, and key packages:

### [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) (with [PostgreSQL](https://www.postgresql.org/))
### [Flask](https://flask.palletsprojects.com/en/1.1.x/)
### [React](https://reactjs.org/)
### [Redux](https://react-redux.js.org/)
### [AWS S3](https://aws.amazon.com/s3/)
### [react-google-maps/@api](https://www.npmjs.com/package/@react-google-maps/api)
### [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
### [react-modal](https://www.npmjs.com/package/react-modal)
### Hosted on [Heroku](https://www.heroku.com)




## Running Artizen Locally

1. Clone this repository

   ```bash
   git clone https://github.com/andrewscohen/Artizen
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary).
***


