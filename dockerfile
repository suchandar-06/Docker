FROM nginx
WORKDIR /usr/share/nginx/html
COPY index.html .
EXPOSE 80
MAINTAINER Suchandar
LABEL This is tour and travel webapp
