#BUILD STAGE


FROM node:21.6.0-bookworm-slim AS build-stage

WORKDIR /usr/src/app/

COPY . .

RUN npm ci

RUN npm run build


#RUN STAGE


FROM node:21.6.0-bookworm-slim AS run-stage

WORKDIR /usr/src/app/

ENV NODE_ENV=production

COPY --chown=node:node --from=build-stage /usr/src/app/dist .
COPY --chown=node:node --from=build-stage /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=build-stage /usr/src/app/package*.json ./

RUN apt-get update -y && apt-get install -y openssl && apt-get install dumb-init

RUN npm ci --only=production

RUN npx prisma generate

USER node

CMD ["dumb-init", "node", "index.js"]
