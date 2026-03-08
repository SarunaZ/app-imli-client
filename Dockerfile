FROM node:24-alpine
RUN apk add --no-cache bash curl git openssh
WORKDIR /app-imli-client
COPY ./package.json ./yarn.lock ./
COPY . .

RUN corepack enable
RUN yarn install
RUN yarn dlx @yarnpkg/sdks vscode

EXPOSE 3000

CMD ["yarn", "start"]
