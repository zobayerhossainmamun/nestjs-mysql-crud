FROM node:18.15.0

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json package-lock.json ./
COPY .env.development ./.env

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev"]