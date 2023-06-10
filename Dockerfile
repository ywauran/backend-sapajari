FROM node:16.18.0-alpine
WORKDIR /app
ENV APP_PORT=5000 \
    SESS_SECRET=aksdbadbiaksd
COPY . .
RUN npm install
EXPOSE $APP_PORT
CMD ["npm", "run", "start"]
