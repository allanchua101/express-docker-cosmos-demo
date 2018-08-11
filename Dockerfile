# Base image is iron/node https://github.com/iron-io/dockers/tree/master/node
FROM iron/node

# Folder where the app will be copied 
# will be the target of the docker file commands
WORKDIR /app

# Copy package.json + package-lock.json files
COPY package*.json ./

# Installing dependencies
RUN npm install

# Bundle app source
COPY . .

# Exposes Port 3000
EXPOSE 3001

# Runs Server at container start
ENTRYPOINT [ "npm", "start" ]