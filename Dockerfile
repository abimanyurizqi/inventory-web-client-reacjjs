# base image
FROM node:10.2.0-alpine

ARG BACKEND_URL
ENV REACT_APP_BACKEND_URL ${BACKEND_URL}
WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY configs/nginx.conf /etc/nginx.conf.d/default.conf