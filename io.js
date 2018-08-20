(function () {
    const port = process.env.PORT || '8080';

    const io = require('socket.io')(port);
    console.log(`Listening on port ${port}...`);

    module.exports = io;
})();

