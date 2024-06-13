FROM node:20-alpine
WORKDIR /app-imli-client
COPY ./package.json ./yarn.lock ./
COPY . .

EXPOSE 3000

CMD yarn start
