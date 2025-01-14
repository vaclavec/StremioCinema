const fs = require('fs');
const path = require('path');

function buildHtml(templatePath, data) {
    let template = fs.readFileSync(templatePath, 'utf8');
    for (const key in data) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        template = template.replace(regex, data[key]);
    }
    return template;
}

function saveHtml(outputPath, htmlContent) {
    fs.writeFileSync(outputPath, htmlContent, 'utf8');
}

module.exports = {
    buildHtml,
    saveHtml
}