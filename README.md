# Backend-Sapjari Documentation
Welcome to our Backend-SapaJari API

## Deployment

### 1. Clone Repository
Clone the BackendSapjari repository to your local machine using the following command:

```bash
  git clone https://github.com/ywauran/backend-sapajari
  cd backend-sapajari
  gcloud auth login
  gcloud components update
```

### 2. Set up Environtment
To set up the environment for the BackendSapjari application, create a Dockerfile. Open a text editor and add the following content to the file:

```bash
FROM node:16.18.0-alpine
WORKDIR /app
ENV PORT 5000
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm", "run", "start"]
```

Save the file as Dockerfile in the root directory of the cloned repository.

### 3. Docker Tag
Tag the Docker image with the desired repository and image name using the following command:
```bash
docker tag app gcr.io/sapajari/index
```

Replace sapajari with your desired repository name and index with the desired image name.

### 4. Docker Push
Push the Docker image to the Google Cloud Container Registry using the following command:
```bash
docker push gcr.io/sapajari/index
```

Again, replace sapajari with your repository name and index with the image name you want to use.

### 5. Deployment
Deploy the BackendSapjari application to Google Cloud App Engine by executing the following command:

```bash
gcloud app deploy
```

This command will deploy your application based on the configurations specified in the Dockerfile and other necessary files.

That's it! You have successfully deployed the BackendSapjari application using the provided steps.
