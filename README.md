# Containerized API Server using Express JS + Cosmos SQL API.

This repository showcases how to build a containerized API server using Express JS and Cosmos DB. It also stands as a complementary repository for the article I wrote.

# Environment Setup

- NodeJS Installed ([Download Here](https://nodejs.org/en/download/))
- Express Generator ([Installation Guide Here](https://expressjs.com/en/starter/generator.html))
- Docker ([Download Here](https://www.docker.com/get-started))

# Build image on your machine

```sh
# Install NPM Dependencies First
npm install

# Compile image name
build --tag pogs/inventory-api .

# Verify that it not exists in your local repository
docker images --all

# Instantiate a container out of the image you built.
docker run -p 3000:3000 --name inventory-api pogs/inventory-api
```
