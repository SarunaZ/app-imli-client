FROM node:24-alpine
RUN apk add --no-cache bash curl git openssh
WORKDIR /app-imli-client
COPY ./package.json ./yarn.lock ./
COPY . .

RUN corepack enable
RUN yarn install
RUN yarn dlx @yarnpkg/sdks vscode

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["yarn", "start"]
