const fs = require('fs');
const path = require('path');

// Read the JSON data
const jsonPath = process.argv[2] || 'data/readme.json';
const outputPath = process.argv[3] || 'README.md';

console.log(`Reading data from: ${jsonPath}`);
console.log(`Will output to: ${outputPath}`);

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Generate README content
let readme = `# ${data.name}\n\n`;

if (data.tagline) {
  readme += `> ${data.tagline}\n\n`;
}

if (data.featured_image_gif) {
  readme += `![${data.name}](${data.featured_image_gif})\n\n`;
}

if (data.description) {
  readme += `## Description\n\n${data.description}\n\n`;
}

if (data.features && data.features.length > 0) {
  readme += `## Features\n\n`;
  data.features.forEach(feature => {
    readme += `- ${feature}\n`;
  });
  readme += `\n`;
}

if (data.installation_instructions) {
  readme += `## Installation\n\n${data.installation_instructions}\n\n`;
}

if (data.usage_instructions && data.usage_instructions.length > 0) {
  readme += `## Usage\n\n`;
  data.usage_instructions.forEach((instruction, index) => {
    readme += `${index + 1}. ${instruction}\n`;
  });
  readme += `\n`;
}

if (data.technologies && data.technologies.length > 0) {
  readme += `## Technologies\n\n`;
  readme += data.technologies.map(tech => `- ${tech}`).join('\n');
  readme += `\n\n`;
}

if (data.supported_operating_systems && data.supported_operating_systems.length > 0) {
  readme += `## Supported Operating Systems\n\n`;
  readme += data.supported_operating_systems.map(os => `- ${os.charAt(0).toUpperCase() + os.slice(1)}`).join('\n');
  readme += `\n\n`;
}

// Links section
readme += `## Links\n\n`;
if (data.github_repo_url) {
  readme += `- [GitHub Repository](${data.github_repo_url})\n`;
}
if (data.purchase_url) {
  readme += `- [Download](${data.purchase_url})\n`;
}
if (data.product_page_url) {
  readme += `- [Product Page](${data.product_page_url})\n`;
}
readme += `\n`;

// Support/Funding section
if (data.funding_links_github || data.funding_links_custom) {
  readme += `## Support\n\n`;
  if (data.funding_links_github && data.funding_links_github.length > 0) {
    readme += `Consider supporting the developers:\n`;
    data.funding_links_github.forEach(user => {
      readme += `- [GitHub Sponsors - @${user}](https://github.com/sponsors/${user})\n`;
    });
  }
  if (data.funding_links_custom && data.funding_links_custom.length > 0) {
    data.funding_links_custom.forEach(link => {
      readme += `- [Support Link](${link})\n`;
    });
  }
  readme += `\n`;
}

// License
readme += `## License\n\nSee [LICENSE.md](LICENSE.md) for details.\n\n`;

// Footer
readme += `---\n\n`;
readme += `*This README was auto-generated from [data/readme.json](${jsonPath})*\n`;

// Write the README file
fs.writeFileSync(outputPath, readme);
console.log(`README generated successfully at: ${outputPath}`);