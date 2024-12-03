# Use the official Node.js image as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (if present) to the container
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the app's source code to the container
COPY . .

# Run Prisma Generate to Generate types
RUN pnpx prisma generate

# Build the TypeScript code (if applicable)
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the app
CMD ["node", "dist/index.js"]
