# Stage 1: build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# Stage 2: serve (NO nginx)
FROM node:20-alpine

WORKDIR /app

# install serve globally
RUN npm install -g serve

# copy build output (Angular 19)
COPY --from=build /app/dist /app/dist

# expose port
EXPOSE 80

# start serve
CMD ["serve", "-s", "dist/new-kosuboard/browser", "-l", "80"]