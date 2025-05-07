import fs from "fs";
import path from "path";
function getImageBase64(filePath: string): string {
  const image = fs.readFileSync(filePath);
  const ext = path.extname(filePath).slice(1); // e.g., "png"
  const base64 = image.toString("base64");
  return `data:image/${ext};base64,${base64}`;
}

export function generateCertificateHtml(data: {
  name: string;
  score: number;
  issuedDate: string;
  startDate: string;
  endDate: string;
  qrBase64: string;
  title: string;
  code: string;
  type: string;
}): string {
  const logoBase64 = getImageBase64(
    path.join(__dirname, "/assets/phindojo-logo.png")
  );
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 40px;
        background: white;
        color: black;
      }
      .certificate-container {
        border: 2px solid #000;
        padding: 60px 40px;
        max-width: 800px;
        margin: auto;
        position: relative;
      }
      .logo {
        width: 100px;
        margin-bottom: 20px;
      }
      h1 {
        margin: 0;
        font-size: 28px;
        letter-spacing: 1px;
      }
      .subheading {
        margin-top: 10px;
        font-size: 16px;
      }
      .name {
        font-size: 22px;
        font-weight: bold;
        margin: 20px 0 10px 0;
      }
      .description {
        max-width: 600px;
        margin: 0 auto 30px;
        font-size: 16px;
      }
      .details {
        display: flex;
        justify-content: space-around;
        margin-top: 40px;
        font-size: 14px;
      }
      .qr {
        position: absolute;
        bottom: 30px;
        right: 30px;
        width: 60px;
      }
    </style>
  </head>
  <body>
    <div class="certificate-container">
      <img src="${logoBase64}" alt="Logo" class="logo">
      <div class="content">
        <h1>CERTIFICATE OF COMPLETION</h1>
        <p class="subheading">This certifies that</p>
        <p class="name">${data.name}</p>
        <p class="description">
          has completed the necessary ${data.type} and passed the ${data.title}
        </p>
        <div class="details">
          <div>
            <strong>Score:</strong><br>
            ${data.score}%<br>
            <strong>Issued:</strong><br>
            ${data.issuedDate}
          </div>
          <div>
            <strong>Start Date:</strong><br>
            ${data.startDate}<br>
            <strong>End Date:</strong><br>
            ${data.endDate}
          </div>
        </div>
      </div>
      <img src="${data.qrBase64}" alt="QR Code" class="qr">
    </div>
  </body>
  </html>
  `;
}
