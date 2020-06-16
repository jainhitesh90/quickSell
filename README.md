## Install Dependencies
1) run `npm install` in root folder to install dependencies
2) run `npm install` in /client folder to install dependencies

## Start Mongo instance 
3) In the root directory, run `mongod --dbpath {folder-path}` -> Starts mongo server locally (Create a product-name-db folder)

## Create dotenv file
4) Create .env file in root folder, from .env-sample file

## Launch Server 
5) In the root directory, run `npm run start` -> Runs the express app in the development mode at http://localhost:5000

## Launch Frontend React app 
6) In the client directory, run `npm run start-local` -> Runs the react app in the development mode at http://localhost:3000
