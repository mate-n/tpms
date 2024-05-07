FROM debian:12

RUN apt-get update && apt-get install git curl -y

RUN adduser tpms

WORKDIR /home/tpms

COPY ./bookworm bookworm

RUN chown -R tpms bookworm

RUN chmod +x bookworm/tpms-demo-setup.sh

USER tpms


