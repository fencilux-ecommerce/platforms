# build
FROM node:16 as builder

WORKDIR /usr/src/app

COPY package.json ./
# COPY yarn.lock ./
RUN yarn --production
COPY src .
COPY static static
COPY tsconfig.json .

# RUN yarn build

# FROM node:16.20-alpine3.18 as runner

# WORKDIR /usr/src/app

# COPY --from=builder /usr/src/app/package.json ./
# COPY --from=builder /usr/src/app/yarn.lock ./
# RUN yarn --production

# COPY --from=builder /usr/src/app/dist ./dist
# COPY --from=builder /usr/src/app/static ./static
