# INFS3202 Backend

## Start the server locally
* `python3 -m venv venv` # Create environment

* `source venv/bin/activate` 

* `pip3 install -r requirements.txt` # Install all required modules

* `docker-compose up` # Starts the postgres database in a docker container

* `python manage.py migrate` # You will have to run this if you haven't migrated previously

* `python manage.py runserver`

Additionally, to create a superuser run
`python manage.py createsuperuser`

You can also use your own local PostgreSQL database instead of the dockerized version, but then you'll have to create the database 'infs3202' with the role 'infs3202'.