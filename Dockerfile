# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package*.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --production --silent

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build

# Set the environment variable to production
ENV NODE_ENV production

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]