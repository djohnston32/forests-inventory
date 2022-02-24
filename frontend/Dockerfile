FROM node:16.13.2-alpine
WORKDIR /app/frontend
COPY package.json package-lock.json ./
RUN npm install 
COPY . ./
EXPOSE 3000
