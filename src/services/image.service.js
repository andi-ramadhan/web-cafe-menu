const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

class ImageService {
  constructor() {
    // track files that need cleanup
    this.pendingCleanup = new Set();
    //start cleanup interval
    setInterval(() => this.cleanupFiles(), 5000);
  }
  
  async compressImage(file) {
    const filename = path.parse(file.filename).name;
    const outputPath = path.join(path.dirname(file.path), `${filename}.webp`);

    try {
      // compress and convert to WebP
      const transformer = sharp(file.path)
      .resize(800, 800, { // max dimensions
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: 80, // 0-100
        effort: 6 // 0-6, number of CPU for compressing
      });

      await transformer.toFile(outputPath);
      transformer.end();
      
      this.pendingCleanup.add(file.path);

      return {
        webpFilename: `${filename}.webp`,
        originalPath: file.path
      };
    } catch (err) {
      console.error('Compression error:', err);
      throw new Error(`Image compression failed: ${err.message}`);
    }
  }

  // Private method to handle file cleanup
  async cleanupFiles() {
    for (const filepath of this.pendingCleanup) {
      try {
        await fs.access(filepath);
        await fs.unlink(filepath);
        this.pendingCleanup.delete(filepath);
      } catch (err) {
        console.warn(`Cleanup attempt failed for ${filepath}:`, err.message);
        // Keep file in queue if deletion fails
      }
    }
  }

  async deleteImage(filename) {
    if (!filename) return;

    const filepath = path.join(process.cwd(), 'storage', 'images', filename);
    this.pendingCleanup.add(filepath);
  }
}

module.exports = new ImageService();