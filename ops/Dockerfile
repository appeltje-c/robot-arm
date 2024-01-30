#
# Copyright (C) 2024 - Martijn Benjamin
#
# -----
# Written for the Monumental technical assessment
# "Visualizing a Robotic Crane"
# -----
#
FROM node:lts-buster

WORKDIR /usr/src/ops

COPY package.json /usr/src/ops
COPY yarn.lock /usr/src/ops
RUN yarn install

COPY . /usr/src/ops

EXPOSE 3000

CMD ["npm", "start"]
