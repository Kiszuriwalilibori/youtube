const fs = require("fs");
const path = require("path");

// Read package.json to get the version
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8"));
const version = packageJson.version;

// Read the index.html file
const indexHtmlPath = path.resolve(__dirname, "../public/index.html");
let indexHtml = fs.readFileSync(indexHtmlPath, "utf8");

// Replace the version meta tag with the current version from package.json
indexHtml = indexHtml.replace(
    /<meta name="version" content="[^"]*" \/>/,
    `<meta name="version" content="${version}" />`
);

// Write the updated content back to index.html
fs.writeFileSync(indexHtmlPath, indexHtml);

console.log(`Updated version in index.html to ${version}`);
