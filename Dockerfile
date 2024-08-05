FROM node:18

#Name home sapce
WORKDIR /dockerapp

#copy package json to dockerapp
COPY package.json ./
RUN npm install

#copy full content to dockerapp
COPY . .

#run on  port 3000
EXPOSE 3000

#run command
CMD npm run dev
