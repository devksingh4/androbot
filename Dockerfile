FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i --legacy-deps
COPY . .
CMD [ "npm", "run", "start:prod" ]