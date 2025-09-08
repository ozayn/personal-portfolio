import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('=== RAILWAY ENVIRONMENT EXPLORATION ===');
console.log('__dirname:', __dirname);
console.log('process.cwd():', process.cwd());

// List all files in current directory
console.log('\nCurrent directory contents:');
try {
  const cwdContents = fs.readdirSync(process.cwd());
  console.log(cwdContents);
} catch (e) {
  console.log('Error reading cwd:', e.message);
}

// List all files in parent directory
console.log('\nParent directory contents:');
try {
  const parentContents = fs.readdirSync(path.resolve(process.cwd(), '..'));
  console.log(parentContents);
} catch (e) {
  console.log('Error reading parent:', e.message);
}

// Check if client directory exists
console.log('\nChecking for client directory:');
const clientPaths = [
  path.resolve(process.cwd(), 'client'),
  path.resolve(__dirname, '..', 'client'),
  path.resolve(process.cwd(), '..', 'client')
];

clientPaths.forEach((clientPath, i) => {
  const exists = fs.existsSync(clientPath);
  console.log(`  ${i + 1}. ${clientPath} - ${exists ? 'EXISTS' : 'NOT FOUND'}`);
  if (exists) {
    try {
      const contents = fs.readdirSync(clientPath);
      console.log(`     Contents: ${contents.join(', ')}`);
    } catch (e) {
      console.log(`     Error reading: ${e.message}`);
    }
  }
});

// Check if public directory exists anywhere
console.log('\nSearching for public directories:');
function findPublicDirs(dir, depth = 0) {
  if (depth > 3) return; // Limit depth
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name === 'public') {
        console.log(`  Found public directory: ${path.join(dir, entry.name)}`);
        try {
          const publicContents = fs.readdirSync(path.join(dir, entry.name));
          console.log(`    Contents: ${publicContents.join(', ')}`);
        } catch (e) {
          console.log(`    Error reading: ${e.message}`);
        }
      } else if (entry.isDirectory() && !entry.name.startsWith('.')) {
        findPublicDirs(path.join(dir, entry.name), depth + 1);
      }
    }
  } catch (e) {
    // Ignore permission errors
  }
}

findPublicDirs(process.cwd());
findPublicDirs(path.resolve(process.cwd(), '..'));

console.log('\n=== END EXPLORATION ===');
