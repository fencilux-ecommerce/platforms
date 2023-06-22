# build
FROM node:18.16.1 as builder

WORKDIR /usr/src/app

COPY package.json ./
# COPY yarn.lock ./
RUN yarn --production
COPY src src
COPY static static
COPY tsconfig.json .

RUN yarn build

FROM node:18.16.1 as runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/static ./static
COPY --from=builder /usr/src/app/yarn.lock ./
RUN yarn --production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/static ./static
