const fs = require('fs');
const file = 'src/data/initialData.ts';
let data = fs.readFileSync(file, 'utf8');

// The Honey image ID is 1474979266404-7eaacbcd87c5
// The Oil image ID is 1587049352846-4a222e784d38

// Currently, Mustard oil (and cat-oil-ghee) uses 1474979266404
// Honey (and cat-honey) uses 1587049352846

// Let's swap them!
data = data.replace(/1474979266404-7eaacbcd87c5/g, '__TEMP__');
data = data.replace(/1587049352846-4a222e784d38/g, '1474979266404-7eaacbcd87c5');
data = data.replace(/__TEMP__/g, '1587049352846-4a222e784d38');

fs.writeFileSync(file, data, 'utf8');
console.log('Swapped Mustard Oil and Honey images.');
