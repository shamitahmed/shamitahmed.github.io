const fs = require('fs');
const path = require('path');

const dir = 'e:/Portfolio/shamitahmed.github.io';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // For the green buttons: we can just remove the inline style entirely and replace it with class="btn-pill-green"
    // Wait, some have class="gradientButton". Let's replace class="gradientButton" style="..." with class="btn-pill btn-pill-green"
    // And for red ones, they don't have a class usually: style="..." replace with class="btn-pill btn-pill-red"
    
    // Regex for green button
    content = content.replace(/class="gradientButton"\s+href="([^"]+)"\s*(target="[^"]+")?\s*style="background-color:\s*rgb\(5,\s*154,\s*62\);\s*display:\s*inline-block;\s*border-radius:\s*4px;\s*font-size:\s*16px;\s*font-weight:\s*normal;\s*color:\s*white\s*!important\s*;\s*padding:\s*1%;"/g, 'href="$1" $2 class="btn-pill btn-pill-green"');
    
    // Regex for red button
    content = content.replace(/href="([^"]+)"\s*(target="[^"]+")?\s*style="background-color:\s*rgb\(199,\s*55,\s*39\);\s*display:\s*inline-block;\s*border-radius:\s*4px;\s*font-size:\s*16px;\s*font-weight:\s*normal;\s*color:\s*white\s*!important\s*;\s*padding:\s*1%;"/g, 'href="$1" $2 class="btn-pill btn-pill-red"');

    // Also the "View All Projects" button
    content = content.replace(/class="gradientButton"\s+href="projects\.html"\s+style="background-color:\s*rgb\(5,\s*154,\s*62\);\s+color:\s*white\s*!important;\s+font-size:\s*18px;\s+font-weight:\s*bold;\s+padding:\s*12px\s+24px;\s+border-radius:\s*6px;\s+text-decoration:\s*none;\s+display:\s*inline-block;\s*transition:\s*background-color\s*0\.3s\s*ease;"\s+onmouseover="this\.style\.backgroundColor='rgb\(4, 130, 50\)'"\s+onmouseout="this\.style\.backgroundColor='rgb\(5, 154, 62\)'"/g, 'href="projects.html" class="btn-pill btn-pill-green" style="font-size: 18px; padding: 12px 24px;"');

    // Clean up double spaces in class in case
    content = content.replace(/class="btn-pill btn-pill-green"\s+class="gradientButton"/g, 'class="btn-pill btn-pill-green"');

    // Fallback: if there are any remaining green buttons with that exact style but maybe slightly different attributes
    content = content.replace(/style="background-color:\s*rgb\(5,\s*154,\s*62\);\s*display:\s*inline-block;\s*border-radius:\s*4px;\s*font-size:\s*16px;\s*font-weight:\s*normal;\s*color:\s*white\s*!important\s*;\s*padding:\s*1%;"/g, 'class="btn-pill btn-pill-green"');
    content = content.replace(/style="background-color:\s*rgb\(199,\s*55,\s*39\);\s*display:\s*inline-block;\s*border-radius:\s*4px;\s*font-size:\s*16px;\s*font-weight:\s*normal;\s*color:\s*white\s*!important\s*;\s*padding:\s*1%;"/g, 'class="btn-pill btn-pill-red"');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Replaced inline styles in HTML files.");
