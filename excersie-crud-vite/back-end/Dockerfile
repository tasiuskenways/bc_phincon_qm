FROM node:lts

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate
# RUN npx prisma migrate dev --name init
# RUN npx prisma seed

EXPOSE 3000

CMD ["npm", "run", "dev"]
