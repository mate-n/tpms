#!/bin/bash
apt-get update
apt-get install git vim openssh-client procps -y
ssh -V
eval $(ssh-agent)
mkdir .ssh
scp tpms-shared-documents@159.223.30.119:tpms-frontend.pub .ssh
scp tpms-shared-documents@159.223.30.119:tpms-frontend .ssh
ssh-add .ssh/tpms-frontend
git clone git@bitbucket.org:\_realms/tpms-frontend.git
cd tpms-frontend
git fetch
git checkout -b develop origin/develop
