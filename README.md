
# URL Shortener

Simple project to learn Node with express and MongoDB.

## API

> https://api.shrtco.de/v2/

## Getting Started

To get Node server running locally:

 - Clone this repo
 - `npm install` to install all required dependencies
 - `node index.js` to start the local server
## Code Overview

### Dependencies

 - [expressjs](https://www.npmjs.com/package/express) - The server for handling and routing HTTP requests.
 - [mongoose](https://www.npmjs.com/package/mongoose) - For modelling and mapping MongoDB data to JavaScript.
 - [body-parser](https://www.npmjs.com/package/body-parser) - Parse incoming request bodies in a middleware before your handlers.
 - [cors](https://www.npmjs.com/package/cors) - Enable CORS with various options.
 - [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
 - [node-fetch](https://www.npmjs.com/package/node-fetch) - A light-weight module than brings Fetch API to node.js
 - [valid-url](https://www.npmjs.com/package/valid-url) - URI validation function.
 - [nunjucks](https://www.npmjs.com/package/nunjucks) - Nunjucks is a full featured templating engine for javascript. It is heavily inspired by Jinja2.
- `etc...`

### Application Structure

 - `index.js` - The entry point to your application. This defines our express server and connects it to MongoDB using mongoose. it also requires the routes and models we'll be using in the application.
 - `routes/` - this folder contains the route definitions for our API
 - `models/` - this folder contains the schema definitions our Mongoose models.
 - `controllers/` - a contollers handles user request and returns a reponse.
 - `views/` - this folder contains HTML files for the application.
## Authors

- [@superiorkid](https://www.github.com/superiorkid)

