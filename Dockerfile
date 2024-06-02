FROM debian:latest

# Install NodeJS
RUN apt-get update && apt-get install -y curl \
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  apt-get install -y nodejs

FROM node:20-alpine
WORKDIR /app-imli-client
COPY ./package.json ./yarn.lock ./wait-for-it.sh ./
COPY . .

# Use a single RUN command to avoid creating multiple RUN layers
RUN chmod +x wait-for-it.sh

EXPOSE 3000
