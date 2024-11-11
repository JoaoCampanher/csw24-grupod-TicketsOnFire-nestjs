FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma/schema.prisma ./prisma/

RUN npx prisma generate

COPY . .

RUN npm run build

ENV DATABASE_URL="postgresql://postgres:postgres@database-1.c5cvujhpvpl2.us-east-1.rds.amazonaws.com:5432/postgres"

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "run", "start:migrate:prod" ]