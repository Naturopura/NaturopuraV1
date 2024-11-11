FROM node:19 AS Production

ENV NODE_ENV=development

WORKDIR /app

COPY package.json .
# COPY package-lock.json .

RUN npm install

COPY . .

RUN npm build

EXPOSE 3001

CMD ["npm", "run", "dev"]