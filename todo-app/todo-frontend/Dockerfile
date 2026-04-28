FROM node:24

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=http://localhost:3000/

RUN npm ci

RUN npm run test

RUN npm run build

RUN npm install -g serve
CMD ["serve", "-n", "dist"]
