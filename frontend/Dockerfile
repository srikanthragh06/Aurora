# Base stage: set up working directory and install dependencies
FROM node:20.16.0 AS base
WORKDIR /home/aurora/frontend
COPY ./package.json ./
RUN npm install
COPY . .

# Dev stage: expose port and run in development mode
FROM base AS dev
EXPOSE 3000
CMD ["npm", "run", "dev"]

