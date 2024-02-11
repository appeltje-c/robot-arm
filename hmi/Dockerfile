#
# Copyright (C) 2024
#  Martijn Benjamin (appeltje-C)
#
# -----
# "Robotic Arm Study"
# -----
#
FROM node:lts-buster

WORKDIR /usr/src/hmi

COPY package.json /usr/src/hmi
COPY yarn.lock /usr/src/hmi
RUN yarn install

COPY . /usr/src/hmi

EXPOSE 3000

CMD ["npm", "start"]
