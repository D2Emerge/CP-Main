FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat curl bash && \
    corepack enable && corepack prepare yarn@4.9.1 --activate

COPY package.json yarn.lock* .yarnrc.yml* ./

COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/

RUN yarn install

COPY apps/web/src/scripts/codegen.sh ./apps/web/src/scripts/codegen.sh
RUN chmod +x ./apps/web/src/scripts/codegen.sh

RUN mkdir -p ./apps/web/src/generated

ENV NODE_ENV=stage

RUN bash ./apps/web/src/scripts/codegen.sh stage ./apps/web/src/generated

COPY . .

RUN yarn workspace @code-project/shared build

RUN yarn workspace @code-project/web build

FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
#COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]