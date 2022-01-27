FROM node:latest

WORKDIR /usr/src/app

COPY --chown=node:node package* /usr/src/app/
COPY --chown=node:node ./dist ./dist

RUN npm install

USER node

CMD ["npm","run","start:prod"]