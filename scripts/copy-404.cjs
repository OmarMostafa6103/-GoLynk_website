const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "..", "dist");
const index = path.join(distDir, "index.html");
const dest = path.join(distDir, "404.html");

if (!fs.existsSync(distDir)) {
  console.error("dist directory not found. Run build first.");
  process.exit(1);
}

try {
  fs.copyFileSync(index, dest);
  console.log("Copied index.html -> 404.html");
} catch (err) {
  console.error("Failed to copy:", err);
  process.exit(2);
}
