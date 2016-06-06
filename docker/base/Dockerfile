FROM node:6.2
RUN apt-get update; apt-get install -y rsync
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install --production
ONBUILD COPY . /usr/src/app
ONBUILD RUN npm install --production; \
  npm run build; \
  mv public docker-public

CMD [ "npm", "run", "docker-production" ]

# replace this with your application's default port
EXPOSE 3000
