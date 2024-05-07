## Bookworm integration

docker compose -f docker-compose.integration.bookworm.yml up --build

Insider bookworm-folder, run:

docker build -f Dockerfile .. -t bookworm

docker run -d -p 3000:3000 -p 3001:3001 --name bookworm --rm bookworm

docker exec -it bookworm bash

source ~/.bashrc

pm2 list

---

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

cd bookworm

/bin/bash copy-relevant-files-to-target-folder.sh /app/tpms-frontend-demo

cd /app/tpms-frontend-demo

/bin/bash initialize-tmps-demo.sh
/bin/bash start-tpms-demo.sh

https://support.atlassian.com/bitbucket-cloud/docs/set-up-personal-ssh-keys-on-linux/
