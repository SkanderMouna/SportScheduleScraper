const puppeteer = require('puppeteer');
let browser;
let page;

async function start() {
    try {

        await launching()
    }
    catch (e)
    {
    }
}
async function launching() {
    browser = await puppeteer.launch(
        {headless: true}
    );
    // page = await browser.newPage();
    page = (await browser.pages())[0];
    await page.goto("https://sport.aiv.hfoed.de/ords/f?p=41666:1");
    await page.waitForSelector('div', {timeout: 5000});

}

    start()