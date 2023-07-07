FROM node:lts-alpine

WORKDIR /users

COPY package*.json .

# install project dependencies
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]