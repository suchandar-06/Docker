# Production-style Flask Container Demo

## Project structure

```text
python-container-demo/
├── static/
│   └── style.css
├── templates/
│   └── index.html
├── app.py
├── requirements.txt
├── Dockerfile
├── .dockerignore
└── README.md
```

`requirements.txt` is the standard filename for the dependency file sometimes
called `req.txt`.

## Build the image

Run this command from the directory containing the Dockerfile:

```bash
docker build -t flask-web-app:v1 .
```

## Start the container

```bash
docker run -d \
  --name flask-web-container \
  --restart unless-stopped \
  -p 8000:8000 \
  flask-web-app:v1
```

Open <http://localhost:8000> in your browser.

## Verify the application

```bash
curl http://localhost:8000/health
docker ps
docker logs flask-web-container
```

The health endpoint should return:

```json
{"status":"healthy"}
```

## Access it on EC2 or another remote server

Allow inbound TCP port `8000` in the instance security group or server firewall,
then open:

```text
http://SERVER_PUBLIC_IP:8000
```

For production, place the container behind an application load balancer or
Nginx reverse proxy, terminate HTTPS there, and avoid exposing application ports
directly to the internet.

## Stop and remove the container

```bash
docker stop flask-web-container
docker rm flask-web-container
```
