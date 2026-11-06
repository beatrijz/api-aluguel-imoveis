FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY server.js ./
COPY src ./src

USER node

EXPOSE 8080

CMD ["node", "server.js"]
