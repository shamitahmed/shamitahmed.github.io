const fs = require('fs');
const path = require('path');

const dir = 'e:/Portfolio/shamitahmed.github.io';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.endsWith('.bak'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // For Green buttons
    content = content.replace(/<a\s+([^>]*?)style="[^"]*rgb\(5,\s*154,\s*62\)[^"]*"([^>]*?)>/gi, (match, p1, p2) => {
        let newAttrs = p1 + p2;
        newAttrs = newAttrs.replace(/class="[^"]*"/gi, ''); // strip existing class to avoid duplicates
        return `<a class="btn-pill btn-pill-green" ${newAttrs}>`;
    });

    // For Red buttons
    content = content.replace(/<a\s+([^>]*?)style="[^"]*rgb\(199,\s*55,\s*39\)[^"]*"([^>]*?)>/gi, (match, p1, p2) => {
        let newAttrs = p1 + p2;
        newAttrs = newAttrs.replace(/class="[^"]*"/gi, '');
        return `<a class="btn-pill btn-pill-red" ${newAttrs}>`;
    });

    // Clean up double spaces in tags
    content = content.replace(/<a\s+class="btn-pill btn-pill-green"\s+/g, '<a class="btn-pill btn-pill-green" ');
    content = content.replace(/<a\s+class="btn-pill btn-pill-red"\s+/g, '<a class="btn-pill btn-pill-red" ');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Replaced inline styles globally in all HTML files.");
