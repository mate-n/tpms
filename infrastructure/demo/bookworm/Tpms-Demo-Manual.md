# TPMS-FRONTEND-DEMO

This manual explains how to start a demo of tpms-frontend.

## Installation

Install packages necessary to download the code of tpms-frontend.

    sudo apt-get update && sudo apt-get install git -y

Run the "tpms-demo-setup.sh"-script.

    chmod +x tpms-demo-setup.sh
    ./tpms-demo-setup.sh

You will be asked to enter a base url. Just press enter.

Visit http://localhost:3000/ to see the demo.

## Starting, Stopping and Getting Status

If you want to start and stop the demo, be sure that you are in the right folder.

You need to be in the folder that was created in the installation. Further, you need to be in the subfolder called "bookworm".

    cd realms/tpms-frontend-demo/bookworm

If you want to see, whether the demo is running or not, run:

    /bin/bash show-status-of-tpms-demo.sh

You see a table where you can see the status of "nest-app" and "vue-app". If both of them have the status "online", it means that the demo is running. If both of them have the status "stopped", it means that the demo is not running.

If you want to start the demo, run the following command:

        /bin/bash start-tpms-demo.sh

If you want to stop the demo, run the following command:

    /bin/bash stop-tpms-demo.sh

You can start the demo again with:

    /bin/bash start-tpms-demo.sh
