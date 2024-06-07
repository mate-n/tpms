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

COPY entrypoint.sh .

COPY start-nest-app.sh .

COPY --from=root vue-app vue-app

ARG VITE_API_BASE_URL

ENV VITE_API_BASE_URL $VITE_API_BASE_URL

ARG BACKEND_PORT

ENV BACKEND_PORT $BACKEND_PORT

RUN cd vue-app && npm run build

COPY --from=root nest-app nest-app

RUN cd nest-app && npm run build

COPY vue-app.js vue-app

RUN chown -R tpms:tpms /home/tpms

USER tpms

EXPOSE 8000

EXPOSE 8001

ENTRYPOINT [ "bash", "entrypoint.sh" ]
