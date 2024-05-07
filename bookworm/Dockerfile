FROM debian:12

# nvm requirements
#RUN apt-get update
#RUN echo "y" | apt-get install curl

# nvm env vars
#RUN mkdir -p /usr/local/nvm
#ENV NVM_DIR /usr/local/nvm

# IMPORTANT: set the exact version
#ENV NODE_VERSION v21.0.0
#RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
#RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"

# add node and npm to the PATH
#ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
#ENV PATH $NODE_PATH:$PATH

# check if npm and node are installed
#RUN npm -v
#RUN node -v

WORKDIR /app

#COPY ./vue-app vue-app
#COPY ./nest-app nest-app
COPY ./bookworm/bookworm-entrypoint.sh .
COPY ./bookworm/tpms-demo-setup.sh .
#COPY ./bookworm/initialize-nest-app.sh .
#COPY ./bookworm/initialize-tpms-demo.sh .
#COPY ./bookworm/initialize-vue-app.sh .
#COPY ./bookworm/start-tpms-demo.sh .
#COPY ./bookworm/stop-tpms-demo.sh .
#COPY ./bookworm/tpms-demo.config.js .
#COPY ./bookworm/vue-app-express.cjs vue-app

ENTRYPOINT [ "bash", "bookworm-entrypoint.sh" ]
