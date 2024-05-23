# README

This README explains how to start and develop tpms-frontend with Docker.

## Basic Usage

Go to the folder "infrastructure/development"

    cd infrastructure/development/

If it is your first time, create an ".env"-file with:

    cp .example.env .env

Then run:

    docker compose up

Then visit:

    http://localhost:8080/

Or the value that is given to PORT_FRONTEND in the ".env"-file.

## Check current state

    docker container ps
    CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
    3e4d817d550c tpms-frontend-vue "docker-entrypoint.s…" About a minute ago Up 7 seconds 0.0.0.0:8080->8080/tcp, :::8080->8080/tcp tpms-frontend-vue-1

## Develop with Docker

### Add packages to vue-app

tpms-frontend is made with vue.js. Vue.js uses node and npm.

If you want to add a (node-)package, do this:

    docker compose run npm sh
    cd vue-app
    npm install name_of_package --save

This way, you don't have to install node and npm on your machine and you always have the correct version.

### Check for programmatic and stylistic erros

    docker compose run npm sh
    cd vue-app
    npm run lint --fix

### Synchronize shared-folders.

In order for tpms-frontend to display data, it needs an API from where tpms-frontend gets the data.

In development, the data comes from a Nest-app. To make sure that the data comes in the correct form, synchronize the shared-folders with the following command:

    cp -R ../../vue-app/src/shared/ ../../nest-app/src
