This Readme explains how to deploy to the Release Server.

Install "pv" with

    sudo apt-get install pv

Go to the folder "release".

    cd infrastructure/production/release

Create an .env-file by copying .example.env:

    cp .example.env .env

Run the deploy-script:

    ./deploy-to-release.sh

The deploy-script will deploy your present state to the Release Server.

Usually, it takes some time to upload the files, about 3-5 minutes.
