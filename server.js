(function () {
    const io = require('./io');

    const connectionHandler = require('./connection-handler');
    io.on('connection', connectionHandler);

    const disconnectHandler = require('./disconnect-handler');
    io.on('disconnect', disconnectHandler);

})();
