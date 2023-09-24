FROM node:18-alpine
WORKDIR /app/client
COPY ./package.json yarn.lock ./
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
