FROM node:21-alpine as build-vue-stage

WORKDIR /app

COPY --from=root vue-app vue-app

WORKDIR /app/vue-app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL $VITE_API_BASE_URL

ARG BACKEND_PORT
ENV BACKEND_PORT $BACKEND_PORT

RUN npm install
RUN npm run build

FROM node:21-alpine as build-nest-stage

WORKDIR /app

COPY --from=root nest-app nest-app

WORKDIR /app/nest-app

RUN npm install
RUN npm run build

FROM ubuntu:noble

RUN apt-get update && apt-get install git curl -y
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v21.0.0
RUN mkdir -p /usr/local/nvm && apt-get update && echo "y" | apt-get install curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH

RUN adduser tpms

WORKDIR /home/tpms

COPY --from=build-vue-stage /app/vue-app/dist vue-app/dist
COPY vue-app.mjs vue-app/vue-app.mjs
COPY --from=build-nest-stage /app/nest-app/dist nest-app/dist
COPY --from=build-nest-stage /app/nest-app/node_modules nest-app/dist/node_modules
COPY entrypoint.sh .
COPY start-nest-app.sh .

RUN chmod +x entrypoint.sh
RUN chmod +x start-nest-app.sh
RUN chown -R tpms:tpms /home/tpms

USER tpms

ARG BACKEND_PORT
ENV BACKEND_PORT $BACKEND_PORT

EXPOSE 8000
EXPOSE 8001

ENTRYPOINT [ "sh", "entrypoint.sh" ]
