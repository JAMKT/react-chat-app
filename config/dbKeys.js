if(process.env.NODE_ENV === 'production') {
    module.exports = { mongoURI: '' }; // Add your remote db connection string here
} else {
    module.exports = { mongoURI: '' }; // Add your local db connection string here
}