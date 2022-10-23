const puppeteer = require('puppeteer');
let browser;
let page;

async function start() {
    try {

        await launching()
        await getInformation()
        // await browser.close()
    } catch (e) {
        console.log(e)
        await browser.close()
    }
}

async function launching() {
    browser = await puppeteer.launch(
        {headless: true}
    );
    // page = await browser.newPage();
    page = (await browser.pages())[0];
    await page.goto("https://sport.aiv.hfoed.de/ords/f?p=41666:4:");
    await page.waitForSelector('div', {timeout: 5000});

    await page.screenshot({path: "img.png"})

}

async function getInformation() {
    await getDayInformation("Monday", "#report_R12610172541656757722")

}

async function getDayInformation(day, dayID) {

    let selector = dayID + ' > tbody > tr:nth-child(2) > td > table > tbody > tr'
    let rowSelector
    let columnSelector
    let getNumberOfPlans = await page.$$(selector)
    for (let i = 2; i < getNumberOfPlans.length; i++) {
        rowSelector = selector + ':nth-child(' + i.toString() + ')'
        columnSelector = rowSelector + '>td'
        await getColumnInformation(columnSelector)

    }
}

async function getColumnInformation(columnSelector) {
    let getSelector
    let getInformation
    let data = []
    let index = 0
    for (let i = 2; i <= 6; i++) {
        getSelector = await page.$(columnSelector + ':nth-child(' + i.toString() + ')')
        getInformation = await page.evaluate(el => el.textContent, getSelector)


        data[index] = getInformation
        index++
    }
    console.log(data.toString())
}

start()