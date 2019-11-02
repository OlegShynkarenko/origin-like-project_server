FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .her

EXPOSE 4000

CMD ["npm", "start"]