const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    // Create a new solid-color image (placeholder for your actual favicon generation)
    
    // Path to output favicon
    const outputPath = path.join(__dirname, '../public/favicon.ico');
    
    // Create a 32x32 favicon (standard size)
    await sharp({
      create: { width: 32, height: 32, channels: 4, background: { r: 255, g: 165, b: 0, alpha: 1 } }
    })
    .toFile('temp-favicon.png');
    
    // Convert the PNG to ICO format
    const data = await sharp('temp-favicon.png')
      .toBuffer();
    
    // Write the buffer to the favicon.ico file
    fs.writeFileSync(outputPath, data);
    
    // Clean up the temporary file
    fs.unlinkSync('temp-favicon.png');
    
    console.log('Favicon successfully generated at:', outputPath);
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon(); 