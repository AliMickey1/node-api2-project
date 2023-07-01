// require your server and launch it here
const server = require('./api/server');

const port = 8000;

// START YOUR SERVER HERE
server.listen(8000, () => {
    console.log('API running on port 8000')
})

