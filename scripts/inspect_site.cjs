const fs = require('fs');

function inspectPage(file) {
  if (!fs.existsSync(file)) return console.log('Missing', file);
  const html = fs.readFileSync(file, 'utf8');
  console.log('=== FILE:', file, '===');
  
  // Title
  const title = (html.match(/<title>(.*?)<\/title>/) || [])[1];
  console.log('Title:', title);
  
  // Price
  const prices = [...html.matchAll(/data-price-amount="([0-9.]+)"/g)].map(m => m[1]);
  const formattedPrices = [...html.matchAll(/\$([0-9]+\.[0-9]{2})/g)].map(m => m[0]);
  console.log('Prices found:', [...new Set(prices.concat(formattedPrices))].slice(0, 10));

  // Auto-delivery / subscription mentions
  const subMatches = [...html.matchAll(/(subscribe|subscription|recurring|auto-delivery|delivery|case of 12|wholesale|save [0-9]+%)/gi)].map(m => m[0]);
  console.log('Keywords found:', [...new Set(subMatches)].slice(0, 10));

  // Options / variants on page
  const options = [...html.matchAll(/<option[^>]*>([\s\S]*?)<\/option>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
  console.log('Select options found:', options.slice(0, 15));
}

inspectPage('product_cardboard_pack.html');
inspectPage('product_cardboard_case.html');
