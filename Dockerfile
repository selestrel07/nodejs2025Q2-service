ARG NODE_VERSION=24.11.0
FROM node:${NODE_VERSION}-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE ${PORT}
CMD sh -c "npx prisma generate && npx prisma migrate deploy && npm run start:dev"
