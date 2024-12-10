const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDirectory = path.join(process.cwd(), 'public', 'blog', 'introducing-supabase', 'effects');

async function optimizeImage(filename) {
  const inputPath = path.join(imageDirectory, filename);
  const outputPath = path.join(imageDirectory, `optimized-${filename.replace(/\.[^/.]+$/, '.webp')}`);

  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .resize(1000, 1000, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toFile(outputPath);

    console.log(`Optimized ${filename} -> ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error);
  }
}

async function main() {
  const images = ['Santa.png', 'presents.png', 'dotted-world-white.png'];
  
  for (const image of images) {
    await optimizeImage(image);
  }
}

main().catch(console.error); 