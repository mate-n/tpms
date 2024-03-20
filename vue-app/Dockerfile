FROM node:21-alpine as development-stage

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG VITE_API_BASE_URL

ENV VITE_API_BASE_URL $VITE_API_BASE_URL

EXPOSE 8080

RUN npm run build

CMD ["npm", "run", "dev", "--", "--port",  "8080", "--host", "0.0.0.0"]
