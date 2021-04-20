FROM node:14-alpine AS ui-build

WORKDIR /app
COPY ./client .
RUN npm i && npm run build

FROM node:14-alpine AS server-build
WORKDIR /app

ARG PORT=5000 
COPY --from=ui-build /app/build ./ui
COPY ./server/package*.json ./
RUN npm i
COPY ./server ./
RUN npm run build

EXPOSE $PORT

CMD ["node", "./build/index.js"]