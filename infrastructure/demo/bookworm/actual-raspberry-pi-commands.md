sudo apt-get update && sudo apt-get install git curl && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
exit
nvm install 21.0.0 && nvm use 21.0.0
chmod +x tpms-demo-setup.sh
./tpms-demo-setup.sh
cd realms/tpms-frontend-demo/bookworm
chmod +x show-status-of-tpms-demo.sh && chmod +x start-tpms-demo.sh && chmod +x stop-tpms-demo.sh
