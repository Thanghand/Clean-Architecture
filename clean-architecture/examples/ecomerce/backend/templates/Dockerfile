FROM node:14.15.5-alpine3.13 AS BUILD_IMAGE

ENV CONTAINER_PATH=/home/app
WORKDIR $CONTAINER_PATH

RUN npm i -g nest
RUN npm i -g @nestjs/cli

COPY ./package.json ./
COPY __npm-registry__ ./__npm-registry__
RUN npm install

COPY ./ ./


RUN ls
RUN nest build 

# remove development dependencies
RUN npm prune --production

FROM node:14.15.5-alpine3.13

ENV CONTAINER_PATH=/home/app
WORKDIR $CONTAINER_PATH

# copy from build image
COPY --from=BUILD_IMAGE /home/app/dist ./dist
COPY --from=BUILD_IMAGE /home/app/node_modules ./node_modules

EXPOSE 3000 9229

ENTRYPOINT node dist/main