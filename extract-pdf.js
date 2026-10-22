const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
  // Single source of truth: the app-served copy in /public.
  const buffer = fs.readFileSync('./public/FinalGirl_Rules_Core.pdf');
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  fs.writeFileSync('./rules-extracted.txt', result.text, 'utf8');
  console.log('Text length:', result.text.length);
  await parser.destroy();
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
