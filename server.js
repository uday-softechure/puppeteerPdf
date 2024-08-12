const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const cors = require('cors'); // Import cors package
const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to generate PDF
app.get('/generate-pdf', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send('URL parameter is required');
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
    res.setHeader('Content-Length', pdfBuffer.length); // Set content length
    res.setHeader('Content-Transfer-Encoding', 'binary'); // Add this line

    res.send(Buffer.from(pdfBuffer, 'binary')); // Convert to Buffer with binary encoding
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

// Additional route example
app.get('/generate-js', (req, res) => {
  res.send('This is the /generate-js endpoint.');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});