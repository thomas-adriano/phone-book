
FROM node:8
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV NODE_ENV=production
ENV SERVER_PORT=4455
ADD . /home/node/app
WORKDIR /home/node/app
RUN npm i npm@latest -g
RUN npm i
CMD ["node", "index.js"]