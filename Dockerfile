FROM debian:latest

# Install NodeJS
RUN apt-get update && apt-get install -y curl \
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  apt-get install -y nodejs

FROM node:20-alpine

WORKDIR /app/client
COPY ./package.json yarn.lock ./
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
