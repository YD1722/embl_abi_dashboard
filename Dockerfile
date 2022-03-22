FROM node:16-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx:alpine
COPY --from=build-step /app/dist/embl_ebi_dashboard /usr/share/nginx/html
EXPOSE 4200:80
