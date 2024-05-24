#!/bin/bash
echo "Copying files to: $1"

cp -r ../bookworm $1
cp -r ../../../nest-app $1
cp -r ../../../vue-app $1
cp -r ../bookworm/vue-app-express.cjs $1/vue-app
