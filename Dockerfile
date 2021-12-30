FROM node:16-alpine

WORKDIR /app

ADD . .

RUN npm i

RUN npm run build

CMD npm start
