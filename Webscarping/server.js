const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors'); // Import CORS middleware

const app = express();
const PORT = 3000;

async function scrapeData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.shalimarislamiccentre.ca/', { waitUntil: 'domcontentloaded' });

    const tableData = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('table.table tbody tr')).map(row =>
            Array.from(row.querySelectorAll('td')).map(cell => cell.textContent.trim())
        );
    });

    await browser.close();
    return tableData;
}

// API Endpoint
app.use(cors());
app.get('/data', async (req, res) => {
    try {
        const data = await scrapeData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to scrape data" });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
