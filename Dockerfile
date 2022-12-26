#Create a Dockerfile for react app
FROM node:alpine
WORKDIR /src
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]