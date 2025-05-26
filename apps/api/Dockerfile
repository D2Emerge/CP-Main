FROM node:20

WORKDIR /usr/src/cp-main

RUN corepack enable && corepack prepare yarn@4.9.1 --activate

RUN apt-get update && apt-get install -y procps

COPY package.json yarn.lock* .yarnrc.yml ./
COPY .yarn ./.yarn

COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

RUN yarn install

COPY . .

RUN yarn workspace @code-project/shared build

EXPOSE 9000

CMD ["yarn", "workspace", "@code-project/api", "start:dev"]
