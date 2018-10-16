
FROM node:8
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV NODE_ENV=production
ENV SERVER_PORT=4455
ADD . /home/node
WORKDIR /home/node/phone-book
RUN npm i npm@latest -g
RUN npm i -g http-server @angular/cli
RUN npm i
RUN npm i --only=dev
RUN ng build --prod
CMD ["http-server", "./dist/phone-book", "--cors"]