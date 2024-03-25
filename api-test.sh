#!/bin/bash
cd vue-app
npm install
#npm run api-test
node src/test/selenium/compareJsonsFromMockServiceWithRealApi/profiles.spec.js
exit_code=$?
if [[ $exit_code -eq 0 ]]; then
    echo "Api-Test was successful"
else
    echo "Script failed with return code $exit_code"
    exit(1)
fi
