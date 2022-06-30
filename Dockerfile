FROM node:14-alpine

WORKDIR /app
ADD . /app/
RUN apk update \
 && apk add --no-cache tzdata
ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app
RUN yarn install
RUN yarn run prisma:generate
RUN yarn build

RUN cp ./ecosystem.config.js ./build

EXPOSE 3000
# CMD ["pm2-runtime", "start", "app-pm2.json"]
CMD ["node_modules/pm2/bin/pm2-runtime", "start", "./build/ecosystem.config.js"]
