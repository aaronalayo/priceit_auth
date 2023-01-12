FROM alpine

RUN apk add --update nodejs npm

ENV PORT $PORT
ENV DOCKER_SERVER_PORT $DOCKER_SERVER_PORT

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]