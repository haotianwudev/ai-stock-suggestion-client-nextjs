const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    // Path to the SOPHIE image
    const inputPath = path.join(__dirname, '../public/images/agents/SOPHIE.png');
    // Path to output favicon
    const outputPath = path.join(__dirname, '../src/app/favicon.ico');

    // Create a 32x32 favicon (standard size)
    await sharp(inputPath)
      .resize(32, 32)
      .toFile('temp-favicon.png');

    // Convert to ICO format using buffer
    const data = await sharp('temp-favicon.png')
      .toBuffer();

    // Write the buffer to the favicon.ico file
    fs.writeFileSync(outputPath, data);
    
    // Clean up temp file
    fs.unlinkSync('temp-favicon.png');

    console.log('Favicon successfully generated at:', outputPath);
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon(); 