// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.website4test.com/pd/', {waitUntil: 'networkidle2'});
//   await page.pdf({path: 'document.pdf', format: 'A4', printBackground: true});
//   await browser.close();
// })();

const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/your-page', { waitUntil: 'networkidle2' });
        // await page.goto('https://www.website4test.com/pd/', { waitUntil: 'networkidle2' });
        const pdfBuffer = await page.pdf({ format: 'A4' });

        require('fs').writeFileSync('output.pdf', pdfBuffer);

        await browser.close();
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
})();
