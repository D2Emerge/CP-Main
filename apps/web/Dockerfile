FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat && \
    corepack enable && corepack prepare yarn@4.9.1 --activate

COPY package.json yarn.lock* .yarnrc.yml ./
COPY .yarn ./.yarn

COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/

RUN yarn install

COPY . .

RUN yarn workspace @code-project/shared build

EXPOSE 3000

CMD ["yarn", "workspace", "@code-project/web", "dev"]
