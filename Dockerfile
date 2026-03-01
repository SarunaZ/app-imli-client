FROM node:24-alpine
WORKDIR /app-imli-client
COPY ./package.json ./yarn.lock ./
COPY . .

RUN corepack enable

EXPOSE 3000

CMD yarn start
