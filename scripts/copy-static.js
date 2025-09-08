import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`Source directory ${src} does not exist`);
    return;
  }
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Try multiple possible source paths
const possiblePaths = [
  path.resolve(__dirname, '..', 'client', 'public'),
  path.resolve(process.cwd(), 'client', 'public'),
  path.resolve(__dirname, '..', '..', 'client', 'public')
];

let sourceFound = false;
for (const srcPath of possiblePaths) {
  if (fs.existsSync(srcPath)) {
    console.log(`Found source directory: ${srcPath}`);
    const destPath = path.resolve(__dirname, '..', 'dist', 'public');
    console.log(`Copying to: ${destPath}`);
    copyDir(srcPath, destPath);
    sourceFound = true;
    break;
  }
}

if (!sourceFound) {
  console.log('No source directory found. Tried paths:');
  possiblePaths.forEach(p => console.log(`  - ${p}`));
  process.exit(1);
}

console.log('Static files copied successfully');
