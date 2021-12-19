FROM node:14

WORKDIR /src

COPY package*.json ./src/

RUN npm install

COPY . ./src/

CMD ["npm", "dev"]