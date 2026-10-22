const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
  const buffer = fs.readFileSync('./FeatureFilmRules.pdf');
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  fs.writeFileSync('./feature-rules-extracted.txt', result.text, 'utf8');
  console.log('Text length:', result.text.length);
  await parser.destroy();
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
