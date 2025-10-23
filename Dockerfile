# Use a base image suitable for the project's language/framework
FROM node:18-alpine 

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (for Node.js)
# This allows Docker to cache dependency installation, speeding up rebuilds
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the application listens on
EXPOSE 3000

# Define the command to run the application when the container starts
CMD ["node", "src/index.js"] 