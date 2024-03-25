#!/bin/bash
cd vue-app
npm install
#npm run api-test
node src/test/selenium/compareJsonsFromMockServiceWithRealApi/profiles.spec.js
rc=$?
echo $rc
[[ "$rc" -ne "0" ]] && exit(1)
