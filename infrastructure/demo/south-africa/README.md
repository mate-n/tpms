This Readme explains how to deploy to the South African Server.

Install "pv" with

    sudo apt-get install pv

Go to the folder "south-africa".

    cd infrastructure/demo/south-africa

Create an .env-file by copying .example.env:

    cp .example.env .env

Run the deploy-script:

    ./deploy-to-south-africa.sh

The deploy-script will deploy your present state to the South African Server.

Note: Only the build values in the .env-file are actually important for the deployment. Some of them are:

API_BASE_URL
API_BASE_URL2

The other values have no impact, they are only there for development purposes (e.g. to see whether the builds work locally).

Usually, it takes some time to upload the files, about 3-5 minutes.
