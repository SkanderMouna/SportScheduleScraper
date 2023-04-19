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
        //await browser.close()
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

  //  await page.screenshot({path: "img.png"})

}

async function getInformation() {
    await getDayInformation("Monday", "#report_R12610172541656757722")
    console.log("hehe")
    await getDayInformation("Tuesday", "#report_R12610186338540106932")
    console.log("hehe")
    await getDayInformation("Wensday", "#report_R12610187325857112688")

}

async function getDayInformation(day, dayID) {

    let selector = dayID + ' > tbody > tr:nth-child(2) > td > table > tbody > tr'
    let rowSelector
    let columnSelector
   // let getNumberOfPlans = await page.$$(selector)
let columnData=[]
    let index=0
    const getNumberOfPlans = await page.$$eval(selector, trs => trs.length);
    for (let i = 2; i <= getNumberOfPlans; i++) {
        rowSelector = selector + ':nth-child(' + i.toString() + ')'
        columnSelector = rowSelector + '>td'
     columnData[index]=   await getColumnInformation(columnSelector)
        //todo for everycolmn add to json file
        /*
        {"monday":[{begin:18:00,ende:19:00},{begin:19:00,ende:20:00}]
         */

        index++

    }
    setCSVFile(columnData)
    for (let i = 0; i <columnData.length ; i++) {
        console.log(columnData[i].start)

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
    //transform data table to an object
    let dataObj={start:data[0],
    end:data[1],
    art:data[2],
    ort:data[3],
    platz:data[4],
    beschreibung:0}
    return dataObj
}
/**
 * convert table of objects  (products) into csv file
 * make sure that there is no excessive comma
 * @param products
 * @returns {Promise<void>}
 */
async function setCSVFile(products) {

    const ObjectsToCsv = require('objects-to-csv')

    const csv = new ObjectsToCsv(products)

    await csv.toDisk('./plan.csv', {append: true})
}
start()