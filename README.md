
## Deployment

1. clone repository

```bash
  git clone https://github.com/ywauran/backend-sapajari

  cd backend-sapajari
  gcloud auth login
  gcloud components update
```

2. set up environtment
add Dockerfile

```bash
FROM node:16.18.0-alpine
WORKDIR /app
ENV PORT 5000
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm", "run", "start"]
```

add app.yaml
```bash
runtime: nodejs
env: flex
runtime_config:
  operating_system: ubuntu22

manual_scaling:
  instances: 1
resources:
  cpu: 1
  memory_gb: 0.5
  disk_size_gb: 10
```

3. docker tag

```bash
docker tag app gcr.io/sapajari/index
```
4. docker push
```bash
docker push gcr.io/sapajari/index
```

5. Deployment
```bash
gcloud app deploy
```