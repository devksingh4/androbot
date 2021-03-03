FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
CMD [ "yarn", "run", "start:prod" ]