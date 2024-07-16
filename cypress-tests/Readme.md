First, go into cypress-tests folder:

    cd cypress-tests

For the first time, create an .env - file with this command:

    cp .example.env .env

Then start docker compose in the background:

    docker compose up -d --build --remove-orphans

For the first time, install the npm-packages:

    npm install

Then run tests with:

    npx cypress open

or without gui:

    npx cypress run

When you are finished, don't forget to close your docker instance afterwards.

    docker compose down
