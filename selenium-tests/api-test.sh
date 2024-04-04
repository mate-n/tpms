#!/bin/bash
cd selenium-test
npm install
#npm run api-test
node compareJsonsFromMockServiceWithRealApi/profiles.spec.js
exit_code=$?
echo "Exit code: $exit_code"
if [[ $exit_code -eq 0 ]]; then
    echo "Api-Test was successful"
else
    echo "Script failed with return code $exit_code"
    exit 1
fi
