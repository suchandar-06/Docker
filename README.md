# Docker
creation of docker files for prod level
# Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html/
RUN chown -R nginx:nginx /usr/share/nginx/html
EXPOSE 80
USER nginx
CMD ["nginx", "-g", "daemon off;"]



# httpd
FROM httpd:2.4-alpine
RUN rm -rf /usr/local/apache2/htdocs/*
COPY --chown=daemon:daemon . /usr/local/apache2/htdocs/
EXPOSE 80
USER daemon
CMD ["httpd-foreground"]



# node
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && \
npm cache clean --force
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD ["node", "index.js"]



# Python
FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 \
PYTHONUNBUFFERED=1 \
PIP_NO_CACHE_DIR=1
WORKDIR /app
COPY req.txt .
RUN pip install --no-cache-dir -r req.txt
COPY --chown=10001:10001 . .
RUN useradd \
--uid 10001 \
--create-home \
appuser
USER 10001
EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
