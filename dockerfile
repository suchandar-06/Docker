# Use an official lightweight Node runtime
FROM node:22-alpine
# Set working directory
WORKDIR /usr/src/app
RUN rm -rf ./*
# Copy dependency manifests first for Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .
COPY chown=node:node . .
USER node
# Expose the API server port
EXPOSE 5000

# Set environment defaults
ENV PORT=5000

# Start the application
CMD ["node", "server.js"]
