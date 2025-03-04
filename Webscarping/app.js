const puppeteer = require('puppeteer');
var tableData;
(async () => {
    // Launch the browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the target webpage
    await page.goto('https://www.shalimarislamiccentre.ca/', {
        waitUntil: 'domcontentloaded',
    });

    // Extract table data
    tableData = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('table.table tbody tr'));
        return rows.map(row => {
            return Array.from(row.querySelectorAll('td')).map(cell => cell.textContent.trim());
        });
    });

    // Close the browser
    await browser.close();

    console.log(tableData);

})();


