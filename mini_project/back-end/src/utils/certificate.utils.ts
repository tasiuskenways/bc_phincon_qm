import puppeteer from "puppeteer";
import QRCode from "qrcode";
import { env } from "../config/env";
import { generateCertificateHtml } from "./../template/certificate.template";
import fs from "fs";
import path from "path";

export async function generatePdfBuffer(data: {
  id: string;
  name: string;
  score: number;
  issuedDate: string;
  startDate: string;
  endDate: string;
  title: string;
  code: string;
  type: string;
  userId: string;
}) {
  const outputPath = path.join(
    __dirname,
    "..",
    "generated",
    `certificate-${data.id}-${data.userId}.pdf`
  );
  try {
    const [qrBase64, browser] = await Promise.all([
      QRCode.toDataURL(`${env.URL_QR}/certificate/${data.id}/${data.userId}`),
      puppeteer.launch({ headless: true }),
    ]);

    const html = generateCertificateHtml({ ...data, qrBase64 });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdf = await page.pdf({ format: "A4", landscape: true });
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, pdf);

    await browser.close();
    return {
      path: outputPath,
      name: `certificate-${data.id}-${data.userId}.pdf`,
    };
  } catch (error: any) {
    console.error(error);
  }
}
