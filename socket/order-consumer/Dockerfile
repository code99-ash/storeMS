# Base image
FROM node:16-alpine

# Set the working directory
WORKDIR /order_consumer

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose the port your Node.js application listens on
EXPOSE 5002

# Start the Node.js application
CMD ["npm", "start"]
