#!/bin/bash
apt-get update
apt-get install git -y
git clone https://ankerdata_tpms@bitbucket.org/_realms/tpms-frontend.git
cd tpms-frontend
git fetch
git checkout -b feature/tpms-68-CreateScriptforDemo origin/feature/tpms-68-CreateScriptforDemo
/bin/bash copy-relevant-files-to-target-folder.sh ../tpms-frontend-demo
cd ../tpms-frontend-demo
