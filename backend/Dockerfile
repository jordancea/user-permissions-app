FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

# wait for db, seed, then run server
CMD sh -c "npx wait-on tcp:db:3306 && npm run seed && npm run dev"
