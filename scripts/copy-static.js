import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('=== COPY STATIC FILES DEBUG ===');
console.log('__dirname:', __dirname);
console.log('process.cwd():', process.cwd());
console.log('Current working directory contents:');
try {
  const cwdContents = fs.readdirSync(process.cwd());
  console.log(cwdContents);
} catch (e) {
  console.log('Error reading cwd:', e.message);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`Source directory ${src} does not exist`);
    return;
  }
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  console.log(`Copying ${entries.length} items from ${src} to ${dest}`);
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      console.log(`Copying directory: ${entry.name}`);
      copyDir(srcPath, destPath);
    } else {
      console.log(`Copying file: ${entry.name}`);
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Try multiple possible source paths
const possiblePaths = [
  path.resolve(__dirname, '..', 'client', 'public'),
  path.resolve(process.cwd(), 'client', 'public'),
  path.resolve(__dirname, '..', '..', 'client', 'public'),
  path.resolve(process.cwd(), '..', 'client', 'public')
];

console.log('Checking possible source paths:');
possiblePaths.forEach((p, i) => {
  const exists = fs.existsSync(p);
  console.log(`  ${i + 1}. ${p} - ${exists ? 'EXISTS' : 'NOT FOUND'}`);
  if (exists) {
    try {
      const contents = fs.readdirSync(p);
      console.log(`     Contents: ${contents.join(', ')}`);
    } catch (e) {
      console.log(`     Error reading: ${e.message}`);
    }
  }
});

let sourceFound = false;
for (const srcPath of possiblePaths) {
  if (fs.existsSync(srcPath)) {
    console.log(`\nFound source directory: ${srcPath}`);
    const destPath = path.resolve(__dirname, '..', 'dist', 'public');
    console.log(`Copying to: ${destPath}`);
    
    // Check if dest exists
    if (fs.existsSync(destPath)) {
      console.log(`Destination exists. Contents before copy:`);
      const destContents = fs.readdirSync(destPath);
      console.log(destContents);
    }
    
    copyDir(srcPath, destPath);
    
    // Check if copy worked
    if (fs.existsSync(destPath)) {
      console.log(`Destination contents after copy:`);
      const destContents = fs.readdirSync(destPath);
      console.log(destContents);
    }
    
    sourceFound = true;
    break;
  }
}

if (!sourceFound) {
  console.log('\nNo source directory found. Tried paths:');
  possiblePaths.forEach(p => console.log(`  - ${p}`));
  process.exit(1);
}

console.log('\nStatic files copied successfully');
