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
* *Create a file called dbKeys.js inside the `config` folder and add your MongoDB connection strings in there.*
    - *The content of dbKeys.js should look like this (with your strings):*
    ```
    if(process.env.NODE_ENV === 'production') {
        module.exports = { mongoURI: '' }; // Add your remote db connection string here
    } else {
        module.exports = { mongoURI: '' }; // Add your local db connection string here
    }
    ```
* *Create another file inside the `config` folder called `sessionConfig.js`.*
    - *The content of this file should look like this (with whatever text you want as the value of "secret"):*
    ```
    module.exports = {
        secret: ''
    }
    ```
* *Port for the client: 3000. Port for the server and the proxy: 5000. If you have to change the port for the server or the proxy, remember to change both!*

### Version
1.0.0
