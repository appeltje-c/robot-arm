#
# Copyright (C) 2024
#  Martijn Benjamin (https://github.com/appeltje-c)
#
# -----
# "Robotic Arm Study"
# -----
#
FROM node:lts-buster-slim

WORKDIR /usr/src/api

COPY package.json /usr/src/api/package.json
COPY yarn.lock /usr/src/api/yarn.lock
RUN yarn install

COPY . /usr/src/api

EXPOSE 3000

CMD [ "npm", "run", "watch" ]
