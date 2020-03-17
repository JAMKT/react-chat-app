# React Chat App
Chat application developed using the MERN stack (MongoDB, Express.js, React.js and Node.js).

## Getting started
### Pre-requisites
Before starting to work on this project, you must have Node.js installed on your machine.

Also, check out the guidelines used in this project [here](https://github.com/JAMT-UCN/coding-guidelines).

### Quick start
``` 
# Install dependencies on the server side
npm install

# Install dependencies on the client side
npm client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

```

***Notes:*** 
* *Add your MongoDB connection strings in dbKeys.js (inside the `config` folder).*
    ```
    if(process.env.NODE_ENV === 'production') {
        module.exports = { mongoURI: '' }; // Add your remote db connection string here
    } else {
        module.exports = { mongoURI: '' }; // Add your local db connection string here
    }
    ```
* *Add your session secret key in `sessionConfig.js` (inside the `config` folder).*
    ```
    module.exports = {
        secret: ''
    }
    ```
* *Port for the client: 3000. Port for the server and the proxy: 5000. If you have to change the port for the server or the proxy, remember to change both!*

### Version
1.0.0
