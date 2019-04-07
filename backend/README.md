# INFS3202 Backend

## Start the server locally
* `python3 -m venv venv`

* `source venv/bin/activate`

* `echo "from .development import *" > infs3202/settings/local.py`

* `pip install -r requirements/dev.txt`

* `docker-compose up` # Starts the postgres database

* `python manage.py runserver`


You will have to run `python manage.py migrate` if you have not migrated previously

One can also run the schell script
`./start_server.sh`
The first time running the shell script you will have to give it permissions.
For Linux systems run
`chmod +x start_server.sh`

Additionally, to create a superuser run
`python manage.py createsuperuser`