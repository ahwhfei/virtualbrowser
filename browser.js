(() => {
    const puppeteer = require('puppeteer');
    const io = require('./io');
    const messageType = require('./messages');

    const defaultOptions = {
        headless: false
    };

    class Browser {
        constructor(options) {
            this._browser = null;
            const viewport = {
                args: [
                    `--window-size=${options.width},${options.height}`
                ],
                defaultViewport: {
                    width: options.width,
                    height: options.height,
                    deviceScaleFactor: options.devicePixelRatio
                }
            };

            this._options = {...viewport, ...defaultOptions, ...options};
        }

        async getBrowser() {
            if (!this._browser) {
                this._browser = await puppeteer.launch(this._options);
            }
            return this._browser;
        }

        async newPage(options) {
            const browser = await this.getBrowser();
            const page = await browser.newPage();
            let {width, height, url} = options;
            width || (width = this._options.width);
            height || (height = this._options.width);
            await page.setViewport({ width, height });
            await page.goto(url);
            const pageData = await page.evaluate(() => {
                return {
                    // documentElement: document.documentElement.innerHTML,
                    // doctype: document.doctype,
                    head: document.head.innerHTML,
                    body: document.body.innerHTML
                }
            });

            io.emit(messageType.pageDataServerToClient, pageData);
        }

        async close() {
            await this.getBrowser().close();
        }
    }

    module.exports = Browser;
})();
