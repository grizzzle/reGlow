const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function scrapeSkinSafeProducts() {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false for debugging
  const page = await browser.newPage();

  const url = 'https://www.skinsafeproducts.com/skin-treatments';
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Increase the timeout and wait for the product elements to load
  await page.waitForSelector('.product-container', { timeout: 60000 });

  // Debugging: Take a screenshot and save the HTML
  await page.screenshot({ path: 'page.png', fullPage: true });
  const pageContent = await page.content();
  fs.writeFileSync('page.html', pageContent);

  // Scrape the product data
  const products = await page.$$eval('.product-container', (containers) =>
    containers.map((container) => {
      const nameElement = container.querySelector('.search-results-productname');
      const linkElement = container.querySelector('.search-results-productname');
      const imgElement = container.querySelector('img');

      return {
        name: nameElement?.textContent?.trim() || '',
        link: linkElement?.href || '',
        image: imgElement?.src || '',
      };
    })
  );

  await browser.close();

  // Save the data to a JSON file
  const filePath = path.join(__dirname, 'skin_treatments.json');
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

  console.log(`Scraping complete. Data saved to ${filePath}`);
}

scrapeSkinSafeProducts().catch(console.error);
