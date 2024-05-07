#!/bin/bash

CONTAINER_FIRST_STARTUP="CONTAINER_FIRST_STARTUP"
if [ ! -e /$CONTAINER_FIRST_STARTUP ]; then
    touch /$CONTAINER_FIRST_STARTUP

    echo "First startup: Initialize and start tpms-demo."
    #/bin/bash initialize-tpms-demo.sh
    #source ~/.bashrc
    #/bin/bash start-tpms-demo.sh
else
    echo "Not first startup, start tpms-demo."
    #source ~/.bashrc
    #/bin/bash start-tpms-demo.sh
fi



echo "Press [CTRL+C] to stop.."

while true
do
    sleep 1
done
