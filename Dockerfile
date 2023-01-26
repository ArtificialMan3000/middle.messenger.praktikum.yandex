FROM node:16-alpine

WORKDIR /var/www

RUN yarn add ts-node -g

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD yarn ts-node server.ts
