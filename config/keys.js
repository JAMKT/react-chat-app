// Check for environment
if(process.env.NODE_ENV === 'production') {
    module.exports = { mongoURI: '' }; // TODO: Add database connection string
} else {
    module.exports = { mongoURI: '' }; // TODO: Add database connection string
}