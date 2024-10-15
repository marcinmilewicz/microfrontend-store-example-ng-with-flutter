const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const packageName = args[0];

if (!packageName) {
  console.error('Usage: node update-flutter-element.js <package-name>');
  process.exit(1);
}

const destinationPath = path.join(process.cwd(), 'apps', 'store-example-ng-with-flutter', 'public', 'flutter-elements', packageName);
const startPath = path.join(process.cwd(), 'flutter', packageName, 'build', 'web');

try {
  fs.cpSync(startPath, destinationPath, {recursive: true});
} catch(error) {
  console.log('error during copy dir: ', error)
}


console.log(`Dir ${startPath} copied to ${destinationPath}`);
