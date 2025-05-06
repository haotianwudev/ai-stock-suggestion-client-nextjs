const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateAppleIcon() {
  try {
    // Path to the SOPHIE image
    const inputPath = path.join(__dirname, '../public/images/agents/SOPHIE.png');
    // Path to output apple-icon
    const outputPath = path.join(__dirname, '../public/apple-icon.png');

    // Create a 180x180 apple icon (recommended size)
    await sharp(inputPath)
      .resize(180, 180)
      .toFile(outputPath);

    console.log('Apple icon successfully generated at:', outputPath);
  } catch (error) {
    console.error('Error generating apple icon:', error);
  }
}

generateAppleIcon(); 