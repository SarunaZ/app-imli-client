FROM debian:latest

# Install NodeJS
RUN apt-get update && apt-get install -y curl \
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  apt-get install -y nodejs

FROM node:20-alpine
WORKDIR /client
COPY ./package.json yarn.lock wait-for-it.sh ./
COPY . .
EXPOSE 3000
