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
}) {
  try {
    const qrBase64 = await QRCode.toDataURL(
      `${env.CORS_ORIGIN}/certificate/${data.id}/${data.name}`
    );
    const html = generateCertificateHtml({ ...data, qrBase64 });

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdf = await page.pdf({ format: "A4", landscape: true });
    const dirPath = path.join(path.join(__dirname, ".."), "generated");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const outputPath = path.join(
      path.join(__dirname, ".."),
      "generated",
      `certificate-${data.id}-${data.name}.pdf`
    );
    fs.writeFileSync(outputPath, pdf);
    await browser.close();
    return {
      path: outputPath,
      name: `certificate-${data.id}-${data.name}.pdf`,
    };
  } catch (error: any) {
    console.error(error);
  }
}
