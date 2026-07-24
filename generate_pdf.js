const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Navigating to http://localhost:8888...');
  await page.goto('http://localhost:8888', { waitUntil: 'networkidle0' });
  
  // Wait for animations
  console.log('Waiting for animations...');
  await new Promise(r => setTimeout(r, 3000));
  
  console.log('Saving PDF...');
  await page.pdf({
    path: '/Users/merlin/Downloads/Bali_Expedition_Valery_Latypov.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });

  await browser.close();
  console.log('PDF saved successfully to Downloads.');
})();
