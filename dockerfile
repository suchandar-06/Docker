FROM httpd
WORKDIR /usr/local/apache2/htdocs/
COPY index.html .
EXPOSE 80
MAINTAINER Suchandar
LABEL This is tour and travel webapp
