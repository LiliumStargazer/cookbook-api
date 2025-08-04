FROM node:20
LABEL authors="Lilium"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/app.js"]