import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function copyStaticFiles() {
  return {
    name: 'copy-static-files',
    writeBundle() {
      const sourceDir = path.resolve(__dirname, '..', 'client', 'public');
      const destDir = path.resolve(__dirname, '..', 'dist', 'public');
      
      console.log('Copying static files from:', sourceDir);
      console.log('Copying static files to:', destDir);
      
      if (!fs.existsSync(sourceDir)) {
        console.log('Source directory does not exist:', sourceDir);
        return;
      }
      
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      function copyDir(src, dest) {
        const entries = fs.readdirSync(src, { withFileTypes: true });
        
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          
          if (entry.isDirectory()) {
            if (!fs.existsSync(destPath)) {
              fs.mkdirSync(destPath, { recursive: true });
            }
            copyDir(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      }
      
      copyDir(sourceDir, destDir);
      console.log('Static files copied successfully');
    }
  };
}
