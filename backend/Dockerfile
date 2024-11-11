FROM node:19 AS Production

ENV NODE_ENV=development

WORKDIR /app

COPY package.json .
# COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]