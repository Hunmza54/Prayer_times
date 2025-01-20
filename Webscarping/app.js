const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser
    const browser = await puppeteer.launch();

    // Open a new page
    const page = await browser.newPage();

    // Navigate to the webpage (replace with your URL)
    await page.goto('https://www.shalimarislamiccentre.ca/', {
        waitUntil: 'domcontentloaded',
    });

    // Extract table data
    const tableData = await page.evaluate(() => {
        // Select all rows within the table body
        const rows = Array.from(document.querySelectorAll('table.table tbody tr'));

        // Extract data from each row
        return rows.map((row) => {
            // Get all cells (td elements) in the current row
            const cells = Array.from(row.querySelectorAll('td'));

            // Return the text content of each cell
            return cells.map((cell) => cell.textContent.trim());
        });
    });

    // Print the extracted table data
    console.log('Extracted Table Data:', tableData);

    // Close the browser
    await browser.close();
})();
