FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY index.html .
RUN adduser -D nginx
RUN chwon nginx:nginx /usr/share/nginx/html
USER nginx
EXPOSE 80
MAINTAINER Suchandar
LABEL This is tour and travel webapp
CMD ["nginx,"-g","daemon off;"]
