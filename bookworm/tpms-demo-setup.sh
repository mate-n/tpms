#!/bin/bash
mkdir tpms-frontend-demo
apt-get update && apt-get install git -y
git clone https://ankerdata_tpms:ATBBbUP6LFDmChmSMcJn9pWVcT6K3F3EF006@bitbucket.org/\_realms/tpms-frontend.git
cd tpms-frontend
git checkout -b feature/tpms-68-CreateScriptforDemo origin/feature/tpms-68-CreateScriptforDemo
cd bookworm
/bin/bash copy-relevant-files-to-target-folder.sh ../../tpms-frontend-demo
cd ../../tpms-frontend-demo/bookworm
/bin/bash initialize-tpms-demo.sh
source ~/.bashrc
/bin/bash start-tpms-demo.sh
