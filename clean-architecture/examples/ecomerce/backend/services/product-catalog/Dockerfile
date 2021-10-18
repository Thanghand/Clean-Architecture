FROM node:14.15.5-alpine3.13 AS BUILD_IMAGE

ARG app
ENV CONTAINER_PATH=/home/app
ENV APP=$app
WORKDIR $CONTAINER_PATH

RUN npm i -g nest
RUN npm i -g @nestjs/cli

COPY ./package.json ./
COPY __npm-registry__ ./__npm-registry__

RUN npm install

COPY ./apps/$APP ./apps/$APP
COPY ./libs ./libs
  
COPY ["./tsconfig.json", "./tsconfig.build.json", "./nest-cli.json", "./"]

RUN ls
RUN nest build $APP

# remove development dependencies
RUN npm prune --production

FROM node:14.15.5-alpine3.13

ARG app
ENV CONTAINER_PATH=/home/app
ENV APP=$app
WORKDIR $CONTAINER_PATH

# copy from build image
COPY --from=BUILD_IMAGE /home/app/dist ./dist
COPY --from=BUILD_IMAGE /home/app/node_modules ./node_modules

EXPOSE 3000 9229

ENTRYPOINT node dist/apps/$APP/main.js