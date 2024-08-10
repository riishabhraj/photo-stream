FROM node:14.16.1
WORKDIR /app
ADD . .
RUN npm install
RUN npm run build
CMD ["npm","start"]