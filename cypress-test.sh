cd vue-app
npm install
npm install -g wait-on
#npm run serve & wait-on http://localhost:4173
npm run dev -- --port 4173 & wait-on http://localhost:4173
node_modules/.bin/cypress run --headless --spec "cypress/e2e/example.cy.ts"

#node_modules/.bin/cypress run --spec "cypress/integration/nameOfTheTest.js"
