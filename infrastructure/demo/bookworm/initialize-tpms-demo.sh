#!/bin/bash
npm install pm2@latest -g

echo "The frontend needs a base url to connect to the backend."
echo "If you are on http://localhost, you can just press enter."
echo "If not, you need to enter the base url of the backend."
echo "Example: http://192.168.50.117"

read -p "Please enter api_base_url: " api_base_url

if [[ -z "$api_base_url" ]]; then
    echo "Using default api_base_url:"
    api_base_url="http://localhost"
else
    echo "Using specified api_base_url:"
fi

api_base_url+=":3001/"
export VITE_API_BASE_URL=$api_base_url
echo $VITE_API_BASE_URL

/bin/bash initialize-nest-app.sh
/bin/bash initialize-vue-app.sh
