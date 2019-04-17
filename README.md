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


# INFS3202 Backend

## Start the server locally
* `python3 -m venv venv` # Create environment

* `source venv/bin/activate`

* `pip install -r requirements.txt` # Install all required modules

* `docker-compose up` # Starts the postgres database in a docker container

* `python manage.py migrate` # You will have to run this if you haven't migrated previously

* `python manage.py runserver`

Additionally, to create a superuser run
`python manage.py createsuperuser`

You can also use your own local PostgreSQL database instead of the dockerized version, but then you'll have to create the database 'infs3202' with the role 'infs3202'.
