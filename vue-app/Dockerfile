FROM node:21-alpine as development-stage

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

ARG VITE_API_BASE_URL

ENV VITE_API_BASE_URL $VITE_API_BASE_URL

ARG VITE_API_BASE_URL2

ENV VITE_API_BASE_URL2 $VITE_API_BASE_URL2

EXPOSE 8080

RUN npm run build

CMD ["npm", "run", "dev", "--", "--port",  "8080", "--host", "0.0.0.0"]

FROM node:21-alpine as integration-stage

RUN mkdir -p /vue-app-dist

COPY --from=development-stage /app/dist /vue-app-dist

COPY vue-app-integration-entrypoint-script.sh .
RUN chmod +x vue-app-integration-entrypoint-script.sh

RUN mkdir /shared-volume
RUN chown node:node /shared-volume

ENTRYPOINT ["sh", "vue-app-integration-entrypoint-script.sh"]


