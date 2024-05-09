FROM node:21 as development-stage

WORKDIR /app

RUN apt update && apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y

COPY package.json .

COPY package-lock.json .

RUN npm install

RUN npx cypress install

COPY entrypoint.sh .

ENTRYPOINT ["sh", "entrypoint.sh"]
