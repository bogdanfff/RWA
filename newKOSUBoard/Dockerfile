# Stage 1: build
FROM node:20-alpine AS build

WORKDIR /app

# install pnpm
RUN npm install -g pnpm

# copy lock + package
COPY package.json pnpm-lock.yaml ./

# install deps
RUN pnpm install --frozen-lockfile

# copy source
COPY . .

# build angular app
RUN pnpm run build


# Stage 2: serve
FROM node:20-alpine

WORKDIR /app

# install serve
RUN npm install -g serve

# copy build output
COPY --from=build /app/dist /app/dist

EXPOSE 80

CMD ["serve", "-s", "dist/new-kosuboard/browser", "-l", "80"]