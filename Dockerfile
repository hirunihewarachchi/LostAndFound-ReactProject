FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
COPY public ./public
COPY src ./src
RUN yarn install --frozen-lockfile || yarn install
RUN yarn build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
