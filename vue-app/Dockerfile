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

ARG VITE_SHOW_API_STATUS

ENV VITE_SHOW_API_STATUS $VITE_SHOW_API_STATUS

ARG VITE_ENVIRONMENT_NAME

ENV VITE_ENVIRONMENT_NAME $VITE_ENVIRONMENT_NAME

ARG VITE_REDIRECT_TO_DEMO_URL

ENV VITE_REDIRECT_TO_DEMO_URL $VITE_REDIRECT_TO_DEMO_URL

ARG VITE_VERSION

ENV VITE_VERSION $VITE_VERSION

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

FROM nginx as production-stage

RUN mkdir /app

COPY --from=development-stage /app/dist /app

COPY nginx.conf /etc/nginx/nginx.conf
