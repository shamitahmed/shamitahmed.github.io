const fs = require('fs');
const path = require('path');

const dir = 'e:/Portfolio/shamitahmed.github.io';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.endsWith('.bak'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // For Purple (Github) buttons
    content = content.replace(/<a\s+([^>]*?)style="[^"]*rgb\(94,\s*5,\s*154\)[^"]*"([^>]*?)>/gi, (match, p1, p2) => {
        let newAttrs = p1 + p2;
        newAttrs = newAttrs.replace(/class="[^"]*"/gi, ''); // strip existing class to avoid duplicates
        return `<a class="btn-pill btn-pill-purple" ${newAttrs}>`;
    });

    // Clean up double spaces in tags
    content = content.replace(/<a\s+class="btn-pill btn-pill-purple"\s+/g, '<a class="btn-pill btn-pill-purple" ');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Replaced Github inline styles globally in all HTML files.");
