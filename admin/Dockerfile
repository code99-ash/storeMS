FROM node:16-alpine


# make the 'app' folder the current working directory
WORKDIR /admin

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]