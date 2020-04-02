const puppeteer = require('puppeteer')
const fs = require('fs');

const printPdf = async (url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();
    return pdf
};

const saveFile = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, (err) => {
            if (err) 
                reject(err);
            
            resolve(`The file ${filename} has been saved`);
          });
    });
}

const main = async () => {
    const pdf = await printPdf('https://www.backslash.site/');
    console.log("got pdf");
    const res = await saveFile("test.pdf", pdf)
    console.log(res);
};

main().catch((ex) => {
    console.log(ex);
});