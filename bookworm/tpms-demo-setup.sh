#!/bin/bash
TPMS_DEMO_DIR=/home/$(whoami)/realms

mkdir -p $TPMS_DEMO_DIR/tpms-frontend-demo
# The following command must run in Raspberry Pi.
#sudo apt-get update && sudo apt-get install git -y
cd $TPMS_DEMO_DIR
git clone https://ankerdata_tpms:ATBBbUP6LFDmChmSMcJn9pWVcT6K3F3EF006@bitbucket.org/\_realms/tpms-frontend.git
cd $TPMS_DEMO_DIR/tpms-frontend
git checkout -b feature/tpms-68-CreateScriptforDemo origin/feature/tpms-68-CreateScriptforDemo
#git checkout -b demo origin/demo
cd $TPMS_DEMO_DIR/tpms-frontend/bookworm
/bin/bash copy-relevant-files-to-target-folder.sh $TPMS_DEMO_DIR/tpms-frontend-demo
cd $TPMS_DEMO_DIR/tpms-frontend-demo/bookworm
/bin/bash initialize-tpms-demo.sh
source ~/.bashrc
/bin/bash start-tpms-demo.sh
