FROM --platform=$BUILDPLATFORM node:18-alpine as build-deps
WORKDIR /app

COPY package.json package-lock.json webpack.mix.js ./
RUN npm ci

COPY static/ static/
COPY src/ src/
RUN npm run production --no-progress


FROM nginx:stable-alpine
LABEL maintainer="Gabe Cook <gabe565@gmail.com>"
LABEL org.opencontainers.image.source="https://github.com/gabe565/patrol"

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /app/dist /usr/share/nginx/html
