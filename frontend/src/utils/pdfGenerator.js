import puppeteer from "puppeteer";

export const generatePdfFromHtml = async (html) => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "1.25in",
        right: "0.85in",
        bottom: "0.75in",
        left: "0.85in",
      },
    });

    return pdfBuffer;
  } finally {
    if (browser) await browser.close();
  }
};