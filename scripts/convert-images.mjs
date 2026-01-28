import convert from "heic-convert";
import sharp from "sharp";
import { readdir, readFile, writeFile, copyFile, mkdir } from "fs/promises";
import { join, extname, basename } from "path";
import { existsSync } from "fs";

const ROOMS_DIR = "public/rooms";

const FOLDER_MAP = {
  "AREA COMUM": "area-comum",
  "AREA COMUM HOTEL AUTONOMO": "area-comum-autonomo",
  "CASAL": "casal",
  "CASAL AUTONOMO": "casal-autonomo",
  "DUPLO": "duplo",
  "DUPLO AUTONOMO": "duplo-autonomo",
  "UNICO": "unico",
  "UNICO AUTONOMO": "unico-autonomo",
};

async function convertImages() {
  console.log("Starting image conversion...\n");

  // Create uploads folder for future use
  await mkdir(join(ROOMS_DIR, "uploads"), { recursive: true });

  for (const [originalFolder, slugFolder] of Object.entries(FOLDER_MAP)) {
    const srcDir = join(ROOMS_DIR, originalFolder);
    const destDir = join(ROOMS_DIR, slugFolder);

    // Skip if source is same as dest (case-insensitive on Windows)
    if (originalFolder.toLowerCase() === slugFolder.toLowerCase()) {
      // Still need to process files within
    }

    // Create destination directory
    await mkdir(destDir, { recursive: true });

    let files;
    try {
      files = await readdir(srcDir);
    } catch {
      console.log(`Skipping ${originalFolder} - directory not found`);
      continue;
    }

    console.log(`Processing ${originalFolder} -> ${slugFolder} (${files.length} files)`);

    for (const file of files) {
      const ext = extname(file).toLowerCase();
      const name = basename(file, extname(file));
      const srcPath = join(srcDir, file);
      const destPath = join(destDir, `${name}.jpg`);

      // Skip if src and dest are the same file
      if (srcPath === destPath) {
        console.log(`  Skipped (same file): ${file}`);
        continue;
      }

      try {
        if (ext === ".heic") {
          // Read HEIC file
          const inputBuffer = await readFile(srcPath);

          // Convert HEIC to JPEG using heic-convert
          const outputBuffer = await convert({
            buffer: inputBuffer,
            format: "JPEG",
            quality: 0.85,
          });

          await writeFile(destPath, Buffer.from(outputBuffer));
          console.log(`  Converted: ${file} -> ${name}.jpg`);
        } else if (ext === ".jpg" || ext === ".jpeg") {
          // Copy existing JPGs to the slug-named folder
          if (srcDir !== destDir) {
            await copyFile(srcPath, destPath);
            console.log(`  Copied: ${file} -> ${slugFolder}/${name}.jpg`);
          } else {
            console.log(`  Already OK: ${file}`);
          }
        } else {
          console.log(`  Skipped: ${file} (unsupported format)`);
        }
      } catch (err) {
        console.error(`  ERROR converting ${file}: ${err.message}`);
      }
    }
    console.log("");
  }

  console.log("Image conversion complete!");
}

convertImages().catch(console.error);
