FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY next.config.js ./next.config.js
ENV NEXT_PUBLIC_SERVERSIDE_API_HOST=192.168.55.10:8000


ENV JWT_SECRET=$JWT_SECRET


CMD ["yarn","dev"]