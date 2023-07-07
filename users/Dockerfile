FROM node:lts-apline

WORKDIR /users

COPY package*.json .

# install project dependencies
RUN npm install

COPY . .

RUN npm ci && npm cache clean --force

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000 
CMD ["npm" "run" "dev"]

# # Build the Nuxt.js app
# RUN npm run build

# # Specify the command to start the app
# CMD ["npm", "start"]