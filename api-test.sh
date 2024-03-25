#!/bin/bash
cd vue-app
npm install
npm run api-test
rc=$?
echo $rc
[[ "$rc" -ne "0" ]] && exit(1)
