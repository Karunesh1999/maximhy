const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure output directories exist
const productsDir = path.join(__dirname, '..', 'public', 'images', 'products');
const brandDir = path.join(__dirname, '..', 'public', 'images', 'brand');
fs.mkdirSync(productsDir, { recursive: true });
fs.mkdirSync(brandDir, { recursive: true });

const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
const xml = fs.readFileSync(sitemapPath, 'utf8');

// Parse all URLs with loc, title, and images
const urlRegex = /<url>([\s\S]*?)<\/url>/g;
let match;
const products = [];

while ((match = urlRegex.exec(xml)) !== null) {
  const block = match[1];
  const locMatch = /<loc>(.*?)<\/loc>/.exec(block);
  const loc = locMatch ? locMatch[1] : '';
  const imgMatches = [...block.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map(m => m[1]);
  const titleMatch = /<image:title>(.*?)<\/image:title>/.exec(block);
  const title = titleMatch ? titleMatch[1] : '';
  const captionMatch = /<image:caption>(.*?)<\/image:caption>/.exec(block);
  const caption = captionMatch ? captionMatch[1] : '';

  if (imgMatches.length > 0) {
    products.push({ loc, title, caption, images: imgMatches });
  }
}

console.log(`Found ${products.length} product blocks in sitemap`);

// Define key product lines we need to download authentic images for
const targets = [
  // Tampons
  { id: 'tampons-cardboard-reg', regex: /cardboard.*tampon.*regular.*pack/i },
  { id: 'tampons-cardboard-super', regex: /cardboard.*tampon.*super.*pack/i },
  { id: 'tampons-plastic-reg', regex: /plastic.*tampon.*regular.*pack/i },
  { id: 'tampons-plastic-super', regex: /plastic.*tampon.*super.*pack/i },
  { id: 'tampons-plastic-multi', regex: /plastic.*tampon.*multi.*pack/i },
  { id: 'tampons-nonapp-reg', regex: /non-applicator.*regular.*pack/i },
  { id: 'tampons-nonapp-super', regex: /non-applicator.*super.*pack/i },
  // Cases of tampons
  { id: 'tampons-cardboard-case', regex: /cardboard.*tampon.*case/i },
  { id: 'tampons-plastic-case', regex: /plastic.*tampon.*case/i },
  
  // Pads & Liners
  { id: 'pads-ultrathin-day', regex: /ultra thin.*day|pads.*daytime/i },
  { id: 'pads-ultrathin-night', regex: /ultra thin.*night|pads.*nighttime/i },
  { id: 'pads-classic-maxi', regex: /classic|natural cotton.*maxi/i },
  { id: 'pads-maxion', regex: /maxion|silver ion/i },
  { id: 'liners-wrapped', regex: /pantiliner.*wrapped|pantiliners.*wrapped/i },
  { id: 'liners-thong', regex: /thong.*liner/i },
  
  // Beauty & Cotton
  { id: 'beauty-cotton-rounds', regex: /cotton rounds/i },
  { id: 'beauty-cotton-balls', regex: /cotton balls/i },
  { id: 'beauty-cotton-swabs', regex: /cotton swabs/i },
  { id: 'beauty-baby-swabs', regex: /baby swabs/i },
  { id: 'beauty-cotton-pleats', regex: /cotton pleats/i },
  { id: 'beauty-travel-pack', regex: /travel pack/i },
  
  // Wipes
  { id: 'wipes-facial', regex: /facial.*wipe/i },
  { id: 'wipes-intimate', regex: /intimate.*wipe/i },
  { id: 'wipes-baby', regex: /baby.*wipe/i },
  
  // Maternity & Incontinence
  { id: 'maternity-nursing-pads', regex: /nursing pad/i },
  { id: 'maternity-incontinence-pads', regex: /incontinence|leak-proof/i },
  
  // Period Underwear & Combos
  { id: 'underwear-bikini', regex: /bikini/i },
  { id: 'underwear-boyshorts', regex: /boyshorts/i },
  { id: 'bundle-tampons-combo', regex: /tampon.*combo/i },
  { id: 'bundle-pads-combo', regex: /pad.*combo|pantiliners.*combo/i },
  { id: 'bundle-wipes-combo', regex: /wipes.*combo/i },
  { id: 'bundle-beauty-combo', regex: /facial.*wipes.*travel.*pack|rounds.*swabs.*combo/i }
];

const selectedDownloads = [];
const seenUrls = new Set();

for (const target of targets) {
  const match = products.find(p => target.regex.test(p.loc) || target.regex.test(p.title) || target.regex.test(p.caption));
  if (match && match.images.length > 0) {
    const imgUrl = match.images[0];
    if (!seenUrls.has(imgUrl)) {
      seenUrls.add(imgUrl);
      const ext = path.extname(new URL(imgUrl).pathname) || '.jpeg';
      selectedDownloads.push({
        id: target.id,
        title: match.title,
        url: imgUrl,
        filename: `${target.id}${ext}`,
        dest: path.join(productsDir, `${target.id}${ext}`)
      });
    }
  }
}

// Also get general top products if any missing
for (const p of products.slice(0, 30)) {
  const imgUrl = p.images[0];
  if (!seenUrls.has(imgUrl) && selectedDownloads.length < 35) {
    seenUrls.add(imgUrl);
    const slug = p.loc.split('/').filter(Boolean).pop().slice(0, 30);
    const ext = path.extname(new URL(imgUrl).pathname) || '.jpeg';
    selectedDownloads.push({
      id: slug,
      title: p.title,
      url: imgUrl,
      filename: `${slug}${ext}`,
      dest: path.join(productsDir, `${slug}${ext}`)
    });
  }
}

console.log(`Prepared ${selectedDownloads.length} authentic product images to download...`);

// Save mapping info for our app
fs.writeFileSync(
  path.join(__dirname, '..', 'public', 'images', 'products', 'manifest.json'),
  JSON.stringify(selectedDownloads, null, 2)
);

// Download each image using curl
let downloadedCount = 0;
for (const item of selectedDownloads) {
  try {
    console.log(`Downloading [${item.id}] -> ${item.url}`);
    execSync(`curl.exe -s -L "${item.url}" -o "${item.dest}"`, { timeout: 15000 });
    const stats = fs.statSync(item.dest);
    if (stats.size > 500) {
      downloadedCount++;
    } else {
      console.warn(`Warning: small file size for ${item.dest} (${stats.size} bytes)`);
    }
  } catch (err) {
    console.error(`Failed to download ${item.url}:`, err.message);
  }
}

console.log(`Successfully downloaded ${downloadedCount} / ${selectedDownloads.length} images.`);
