FROM debian:12

RUN adduser tpms

WORKDIR /home/tpms

COPY ./bookworm/tpms-demo-setup.sh .

RUN chown -R tpms bookworm

RUN chmod +x ./bookworm/tpms-demo-setup.sh

USER tpms


