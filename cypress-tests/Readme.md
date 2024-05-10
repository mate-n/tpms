First, go into cypress-tests folder:

    cd cypress-tests

For the first time, create an .env - file with this command:

    cp .example.env .env

Then start docker compose in the background:

    docker compose up -d --build --remove-orphans

Then run tests with:

    npx cypress run
