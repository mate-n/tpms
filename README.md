# README

This README explains how to start and develop tpms-frontend with Docker.

## Demo

If you want to see a demo of tpms-frontend you have two options:

1. Start a demo with Docker
2. Install everything needed to run the demo and then start the demo

### Start a demo with Docker.

First, you need to [install Docker](https://docs.docker.com/get-docker/).

Then, run the following command in the root folder of tpms-frontend (the same place where this README.md is):

    docker compose --project-directory infrastructure/demo/quick-demo/ --env-file=infrastructure/demo/quick-demo/.example.env up

Then visit [http://localhost:8080/](http://localhost:8080/)

### Install everything needed to run the demo and then start the demo

Read "Tpms-Demo-Manual.md" in "infrastructure/demo/bookworm".

## Development

If you want to further develop tpms-frontend, read the README.md in "infrastructure/development"
