cd vue-app
apt-get update -y
apt-get install libatk1.0-0 libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb
npm install
npm install -g wait-on
#npm run serve & wait-on http://localhost:4173
npm run dev -- --port 4173 & wait-on http://localhost:4173
node_modules/.bin/cypress run --headless --spec "cypress/e2e/example.cy.ts"

#node_modules/.bin/cypress run --spec "cypress/integration/nameOfTheTest.js"
