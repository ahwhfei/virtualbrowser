(function () {
    const messageType = require('./messages');
    const io = require('./io');
    const Browser = require('./browser');

    let browser;

    module.exports = (socket) => {
        // io.emit('this', { will: 'be received by everyone' });

        socket.on(messageType.domevent, (msg) => {
            console.log(messageType.domevent + ': ', msg);
        });

        socket.on(messageType.connected, (msg) => {
            console.log(messageType.connected + ': ', msg);
        });

        socket.on(messageType.newPage, async (msg) => {
            console.log(messageType.newPage + ': ', msg);
            await browser.newPage(msg);
        });

        socket.on(messageType.launchBrowser, async (msg) => {
            console.log(messageType.launchBrowser + ': ', msg);
            browser = new Browser(msg);
        });

        socket.on(messageType.disconnect, (msg) => {
            console.log(messageType.disconnect + ': ', msg);
            // io.emit('user disconnected');
        });
    };
})();
