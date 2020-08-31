FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Export port 3001
EXPOSE 3001

# Start the application
CMD ["npm", 'start']