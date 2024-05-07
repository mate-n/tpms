# TPMS-FRONTEND-DEMO

This manual explains how to start a demo of tpms-frontend.

## Installation

Create a folder where all the files necessary for the demo will be added to.

    mkdir tpms-frontend-demo

Install packages necessary to download the code of tpms-frontend.

    apt-get update && apt-get install git -y

Download the code of tpms-frontend. For this, you need to enter a password for bitbucket. If you don't have this password, contact us and ask for the BitBucketAppPassword.

    git clone https://ankerdata_tpms@bitbucket.org/\_realms/tpms-frontend.git

After downloading the code, you should now have a folder called "tpms-frontend". Go into that folder.

    cd tpms-frontend

We downloaded the code of tpms-frontend, but we need a different version of it. The following command gets you the correct version of the code.

    git checkout -b feature/tpms-68-CreateScriptforDemo origin/feature/tpms-68-CreateScriptforDemo

For the demo, we only need parts of the code. There is a script that copies all the relevant files to the folder we created in the beginning. The following two commands execute that script.

    cd bookworm
    /bin/bash copy-relevant-files-to-target-folder.sh ../../tpms-frontend-demo

After copying the files, we go to the folder we just copied the files to.

    cd ../../tpms-frontend-demo/bookworm

In order to run the demo, we first need to install some packages. The following commands install all the packages necessary to run the demo.

    /bin/bash initialize-tpms-demo.sh
    source ~/.bashrc

After that, we can start the demo with the following command:

    /bin/bash start-tpms-demo.sh

Visit http://localhost:3000/ to see the demo.

## Starting and Stopping

If you want to start and stop the demo, be sure that you are in the right folder.

You need to be in the folder that was created in the installation. Further, you need to be in the subfolder called "bookworm".

    cd tpms-frontend-demo/bookworm

Then, if you want to start the demo, run the following command:

        /bin/bash start-tpms-demo.sh

If you want to stop the demo, run the following command:

    /bin/bash stop-tpms-demo.sh

You can start the demo again with:

    /bin/bash start-tpms-demo.sh
