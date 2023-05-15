FROM node:16-alpine as builder
WORKDIR /usr/src/frontend
COPY package.json package-lock.json /usr/src/frontend/
RUN apk add git && npm ci --legacy-peer-deps
COPY . .
ENV INLINE_RUNTIME_CHUNK false
CMD ["npm", "start"]