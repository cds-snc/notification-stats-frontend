FROM node:10-alpine

RUN set -ex && mkdir /app

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

ENV PORT=3000

ARG GIT_SHA
ENV GIT_SHA ${GIT_SHA}

CMD ["npm", "start"]
