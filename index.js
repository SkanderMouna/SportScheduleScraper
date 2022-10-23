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
    await page.goto("https://mall.industry.siemens.com/mall/en/WW/Catalog/Products/10229848?tree=CatalogTree");
    await page.waitForSelector('div', {timeout: 5000});

}

    start()