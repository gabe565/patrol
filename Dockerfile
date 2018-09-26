FROM node:10.11-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache --production
COPY . ./
RUN yarn run production

FROM nginx:1.14-alpine
LABEL maintainer "Gabe Cook <gabe565@gmail.com>"
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/public /usr/share/nginx/html

