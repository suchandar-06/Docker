# Use an official lightweight Node runtime
FROM node
# Set working directory
WORKDIR /usr/src/app

# Copy dependency manifests first for Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the API server port
EXPOSE 5000

# Set environment defaults
ENV PORT=5000

# Start the application
CMD ["node", "server.js"]
