import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('=== SIMPLE STATIC COPY ===');
console.log('__dirname:', __dirname);
console.log('process.cwd():', process.cwd());

// Try multiple possible source paths
const possibleSources = [
  path.resolve(__dirname, '..', 'client', 'public'),
  path.resolve(process.cwd(), 'client', 'public'),
  path.resolve(__dirname, '..', '..', 'client', 'public')
];

// Try multiple possible destination paths
const possibleDests = [
  path.resolve(__dirname, '..', 'dist', 'public'),
  path.resolve(process.cwd(), 'dist', 'public'),
  path.resolve(__dirname, '..', '..', 'dist', 'public')
];

console.log('Checking source paths:');
let sourcePath = null;
for (const src of possibleSources) {
  const exists = fs.existsSync(src);
  console.log(`  ${src} - ${exists ? 'EXISTS' : 'NOT FOUND'}`);
  if (exists && !sourcePath) {
    sourcePath = src;
  }
}

console.log('Checking destination paths:');
let destPath = null;
for (const dest of possibleDests) {
  const exists = fs.existsSync(dest);
  console.log(`  ${dest} - ${exists ? 'EXISTS' : 'NOT FOUND'}`);
  if (exists && !destPath) {
    destPath = dest;
  }
}

if (!sourcePath) {
  console.log('ERROR: No source directory found');
  process.exit(1);
}

if (!destPath) {
  console.log('ERROR: No destination directory found');
  process.exit(1);
}

console.log(`\nCopying from: ${sourcePath}`);
console.log(`Copying to: ${destPath}`);

// Simple copy function
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  console.log(`Copying ${entries.length} items`);
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      console.log(`  Directory: ${entry.name}`);
      copyDir(srcPath, destPath);
    } else {
      console.log(`  File: ${entry.name}`);
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  copyDir(sourcePath, destPath);
  console.log('\nSUCCESS: Static files copied');
  
  // Verify the copy worked
  const destContents = fs.readdirSync(destPath);
  console.log('Destination contents:', destContents);
} catch (error) {
  console.log('ERROR:', error.message);
  process.exit(1);
}
