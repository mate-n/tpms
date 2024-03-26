cd vue-app
npm install
npm install -g wait-on
#npm run serve & wait-on http://localhost:4173
#apt-get update -y
#apt-get apt-get install libatk1.0-0 libatk-bridge2.0-0 libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb
apt-get update -y && apt-get install -y dbus libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb libatk1.0-0 libatk-bridge2.0-dev
mkdir -p /var/run/dbus

dbus-daemon --config-file=/usr/share/dbus-1/system.conf --print-address
npm run dev -- --port 4173 & wait-on http://localhost:4173
node_modules/.bin/cypress run --headless --spec "cypress/e2e/example.cy.ts"

#node_modules/.bin/cypress run --spec "cypress/integration/nameOfTheTest.js"
