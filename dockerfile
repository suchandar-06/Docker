# Use an official lightweight Node runtime
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependency manifests first for Docker caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the rest of the application files
COPY . .

# Expose the API server port
EXPOSE 5000

# Set environment defaults
ENV NODE_ENV=production
ENV PORT=5000

# Start the application
CMD ["node", "server.js"]