const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    // Path to input PNG file
    const inputPath = path.join(__dirname, '../public/images/favicon.png');
    
    // Path to output favicon
    const outputPath = path.join(__dirname, '../public/favicon.ico');
    
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`);
    }
    
    // Get the original image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`Original image: ${metadata.width}x${metadata.height}`);
    
    // Create multiple sizes for ICO format
    const sizes = [16, 32, 48];
    const tempFiles = [];
    
    // Generate different sizes
    for (const size of sizes) {
      const tempFile = `temp-favicon-${size}.png`;
      await sharp(inputPath)
        .resize(size, size)
        .png()
        .toFile(tempFile);
      tempFiles.push(tempFile);
    }
    
    // For now, use the 32x32 version as the main favicon
    // (Most modern browsers accept PNG data in ICO files)
    const faviconData = await sharp(inputPath)
      .resize(32, 32)
      .png()
      .toBuffer();
    
    // Write the favicon
    fs.writeFileSync(outputPath, faviconData);
    
    // Clean up temporary files
    tempFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });
    
    console.log('Favicon successfully generated at:', outputPath);
    console.log('Converted from:', inputPath);
    console.log('Size: 32x32 pixels');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon(); 