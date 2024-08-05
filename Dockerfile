FROM node:18

#Name home sapce
WORKDIR /dockerapp

#copy package json to folder
COPY package.json ./
RUN npm install

#copy full content to folder
COPY . .

#run on port 
EXPOSE 3000

#run server
CMD npm run dev
