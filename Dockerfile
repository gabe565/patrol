FROM node:10.11-alpine as build-deps

WORKDIR /app
COPY package.json yarn.lock webpack.mix.js ./
COPY assets/ assets/
COPY public/ public/

RUN set -x \
    && yarn install \
        --frozen-lockfile \
        --no-cache \
        --no-progress \
    && yarn run production \
        --no-progress \
    && yarn cache clean

FROM nginx:1.14-alpine
LABEL maintainer="Gabe Cook <gabe565@gmail.com>"

RUN apk add --no-cache curl

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/health-check /
COPY --from=build-deps /app/public /usr/share/nginx/html

HEALTHCHECK --interval=1m --timeout=5s \
    CMD ["/health-check"]
