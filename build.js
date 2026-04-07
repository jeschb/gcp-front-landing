/**
 * build.js — Script de compilación/empaquetado estático
 *
 * Copia los archivos de src/ a dist/, listo para subir a Cloud Storage.
 * No requiere dependencias externas; usa solo módulos nativos de Node.js.
 *
 * Uso:
 *   npm run build
 */

const fs   = require("fs");
const path = require("path");

const SRC  = path.join(__dirname, "src");
const DIST = path.join(__dirname, "dist");

// ── Utilidades ────────────────────────────────────────────────────────────────

function rmDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.rmSync(dir, { recursive: true, force: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath  = path.join(src,  entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  copied → ${path.relative(__dirname, destPath)}`);
    }
  }
}

// ── Build ─────────────────────────────────────────────────────────────────────

console.log("\n🔨 Build iniciado...\n");

if (!fs.existsSync(SRC)) {
  console.error("ERROR: La carpeta src/ no existe.");
  process.exit(1);
}

rmDir(DIST);
copyDir(SRC, DIST);

console.log(`\n✅ Build completado. Archivos en: dist/`);
console.log("   Para subir al bucket ejecuta: npm run deploy\n");
