# Use the official Node.js image as the base image
FROM node:20.16.0

# Set the working directory in the container
WORKDIR /home/aurora/backend

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 15696

# Command to run the application
CMD [ "node", "dist/main.js" ]
