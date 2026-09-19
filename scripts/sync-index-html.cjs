const fs = require('node:fs');
const path = require('node:path');

async function syncIndexHtml() {
  const res = await fetch('http://127.0.0.1:3000/');
  const html = await res.text();

  // Find all stylesheet links: <link rel="stylesheet" href="/_next/static/css/..." /> or chunk css
  const cssMatches = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/gi)];
  let combinedCss = '';
  for (const match of cssMatches) {
    const cssPath = match[1];
    try {
      const cssRes = await fetch('http://127.0.0.1:3000' + cssPath);
      if (cssRes.ok) {
        combinedCss += '\n' + (await cssRes.text());
      }
    } catch (e) {
      console.warn('Could not fetch CSS:', cssPath, e.message);
    }
  }

  // Also append app/globals.css directly to ensure full coverage
  const globalsCss = fs.readFileSync(path.join(__dirname, '../app/globals.css'), 'utf8');
  combinedCss += '\n' + globalsCss;

  // Let's create an offline-ready standalone index.html
  let standaloneHtml = html;
  for (const match of cssMatches) {
    standaloneHtml = standaloneHtml.replace(match[0], '');
  }
  // Strip unused preload links for legacy scripts that would fail over file://
  standaloneHtml = standaloneHtml.replace(/<link[^>]*href="[^"]*\/legacy\/[^"]*"[^>]*>/gi, '');
  standaloneHtml = standaloneHtml.replace('</head>', `<style>\n${combinedCss}\n</style>\n</head>`);

  // Also inline all interactive scripts directly for offline and file:// compatibility
  const legacyScripts = ['home-stats.js', '09-calculator.js', '10-methodologie.js'];
  for (const scriptName of legacyScripts) {
    const scriptPath = path.join(__dirname, '../public/legacy', scriptName);
    if (fs.existsSync(scriptPath)) {
      const scriptCode = fs.readFileSync(scriptPath, 'utf8');
      const scriptTagRegex = new RegExp(`<script[^>]*src="[^"]*\\/legacy\\/${scriptName.replace('.', '\\.')}"[^>]*><\\/script>`, 'gi');
      standaloneHtml = standaloneHtml.replace(scriptTagRegex, `<script>\n/* ${scriptName} (inlined) */\n${scriptCode}\n</script>`);
    }
  }

  // If any script tags were not replaced, append them right before </body>
  const missingInlines = [];
  for (const scriptName of legacyScripts) {
    if (!standaloneHtml.includes(`/* ${scriptName} (inlined) */`)) {
      const scriptPath = path.join(__dirname, '../public/legacy', scriptName);
      if (fs.existsSync(scriptPath)) {
        missingInlines.push(fs.readFileSync(scriptPath, 'utf8'));
      }
    }
  }
  if (missingInlines.length > 0) {
    standaloneHtml = standaloneHtml.replace('</body>', `<script>\n${missingInlines.join('\n\n')}\n</script>\n</body>`);
  }

  fs.writeFileSync(path.join(__dirname, '../index.html'), standaloneHtml, 'utf8');
  console.log('Successfully synced standalone index.html with inlined scripts!');
}

syncIndexHtml().catch(console.error);
