# INFS3202 - Event manager

## Available Scripts

In the directory 'frontend', you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# INFS3202 - Backend

## Start the server locally
* `cd backend` # Navigate to the backend folder

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
