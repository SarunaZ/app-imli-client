FROM node:22-alpine
RUN apk add --no-cache bash curl git openssh
WORKDIR /app-imli-client
COPY ./package.json ./yarn.lock ./

COPY . .

RUN corepack enable && corepack prepare yarn@4.12.0 --activate
RUN yarn --version

RUN yarn install
RUN yarn dlx @yarnpkg/sdks vscode

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
