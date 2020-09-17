FROM node:12.18.4-alpine3.9

WORKDIR /usr/app

COPY . .

RUN npm ci

RUN npm run build

RUN rm -rf src

CMD npm run start:prod