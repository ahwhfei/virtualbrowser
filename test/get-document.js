const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log(new Date());
  await page.goto('https://jd.com');
  console.log(new Date());

  // Get the "viewport" of the page, as reported by the page.
  const doc1 = await page.evaluate(() => document.documentElement.outerHTML);
  console.log(new Date());


  // console.log('Document:', doc1);

  const doc2 = await page.evaluate(() => document.documentElement.outerHTML);
  console.log(new Date());

  await browser.close();
})();