FROM node:16-alpine

#create app directory
WORKDIR /app

#copy package.json and lock.json to app directory
COPY package*.json ./

RUN npm install

#Copy app souce code to app directory
COPY . .

#build app
RUN npx tsc

CMD ["npm", "start"]