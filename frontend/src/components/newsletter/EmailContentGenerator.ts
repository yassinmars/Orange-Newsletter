import { Newsletter } from "@/types/newsletter";

export const generateEmailContent = (selectedItems: Newsletter[]): { subject: string, body: string } => {
  // Format the email content
  const subject = "Orange Newsletters - Latest Updates";
  
  // The HTML version will be kept for potential future use
  let htmlContent = ` 
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Orange Newsletters</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
    }
    .newsletter-container {
      padding: 20px;
    }
    .newsletter-item {
      margin-bottom: 30px;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
    }
    .newsletter-title {
      color: #ff7900;
      font-size: 22px;
      margin-bottom: 10px;
    }
    .newsletter-description {
      margin-bottom: 15px;
    }
    .newsletter-image {
      max-width: 100%;
      height: auto;
      margin: 15px 0;
      border-radius: 4px;
    }
    .newsletter-content {
      margin-bottom: 15px;
    }
    .newsletter-meta {
      font-size: 14px;
      color: #666;
      margin-bottom: 5px;
    }
    .newsletter-link {
      display: inline-block;
      color: #ff7900;
      text-decoration: none;
      font-weight: bold;
      margin-top: 10px;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #999;
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="newsletter-container">
    <h1 style="color: #ff7900; text-align: center;">Orange Newsletters</h1>`;
  
  // Create a plain text version for the email body
  let plainTextContent = "=== ORANGE NEWSLETTERS ===\n\n";
  
  selectedItems.forEach((item, index) => {
    // Add to HTML content
    htmlContent += `
    <div class="newsletter-item">
      <h2 class="newsletter-title">${item.title}</h2>
      ${item.description ? `<p class="newsletter-description">${item.description}</p>` : ''}
      ${item.image ? `<img class="newsletter-image" src="${item.image}" alt="${item.title}" />` : ''}
      ${item.content ? `<div class="newsletter-content">${item.content}</div>` : ''}
      ${item.author ? `<p class="newsletter-meta"><strong>Author:</strong> ${item.author}</p>` : ''}
      ${item.source ? `<p class="newsletter-meta"><strong>Source:</strong> ${item.source}</p>` : ''}
      ${item.link ? `<p><a class="newsletter-link" href="${item.link}" target="_blank">Read more →</a></p>` : ''}
    </div>`;
    
    // Add to plain text content
    plainTextContent += `NEWSLETTER #${index + 1}: ${item.title}\n`;
    plainTextContent += `${item.description ? `${item.description}\n` : ''}`;
    plainTextContent += `${item.content ? `${item.content}\n` : ''}`;
    plainTextContent += `${item.author ? `Author: ${item.author}\n` : ''}`;
    plainTextContent += `${item.source ? `Source: ${item.source}\n` : ''}`;
    plainTextContent += `${item.link ? `Read more: ${item.link}\n` : ''}`;
    plainTextContent += `\n${'-'.repeat(50)}\n\n`;
  });

  // Complete HTML content
  htmlContent += `
    <div class="footer">
      <p>© ${new Date().getFullYear()} Orange. All rights reserved.</p>
      <p>If you have any questions, please contact our support team.</p>
    </div>
  </div>
</body>
</html>`;

  // Add footer to plain text
  plainTextContent += `© ${new Date().getFullYear()} Orange. All rights reserved.\n`;
  plainTextContent += `If you have any questions, please contact our support team.\n`;

  return {
    subject,
    body: plainTextContent
  };
};

export const openEmailClient = (subject: string, body: string): void => {
  // Create a temporary link element
  const mailtoLink = document.createElement('a');
  
  // Use mailto: protocol with subject and body parameters
  mailtoLink.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Trigger the link click programmatically
  document.body.appendChild(mailtoLink);
  mailtoLink.click();
  
  // Clean up
  document.body.removeChild(mailtoLink);
};
