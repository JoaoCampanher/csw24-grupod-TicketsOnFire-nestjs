FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma/schema.prisma ./prisma/

RUN npx prisma generate

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:migrate:prod" ]