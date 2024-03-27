# README

This README explains how to start and develop tpms-frontend with Docker.

## Basic Usage

For the first time, create an .env - file with this command:

    cp .example.env .env

Then run:

    docker compose up

Then visit:

    http://localhost:8080/

Or the value that is given in .env to PORT_FRONTEND.

## Check current state

    docker container ps
    CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
    3e4d817d550c tpms-frontend-vue "docker-entrypoint.s…" About a minute ago Up 7 seconds 0.0.0.0:8080->8080/tcp, :::8080->8080/tcp tpms-frontend-vue-1

## Develop with Docker

tpms-frontend is made with vue.js and is using node and npm. If you want to add a (node-)package, do this:

    docker compose run npm sh
    cd vue-app
    npm install my_package --save

## Test Integration

To run tpms-frontend with centos, do this:

    docker compose -f docker-compose.integration.yml up --build

Then visit:

    http://localhost:8081/

Or the value that is given in .env to PORT_FRONTEND_INTEGRATION.
