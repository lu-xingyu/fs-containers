FROM node:24

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

RUN npm install -g nodemon

ENV DEBUG=todo-backend:*

USER node

CMD ["nodemon", "--legacy-watch", "src/index.js"]