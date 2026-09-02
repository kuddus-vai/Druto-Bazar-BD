const Jimp = require('jimp');

const urls = [
  "1474979266404-7eaacbcd87c5", // 0
  "1587049352846-4a222e784d38", // 1
  "1631700611307-37dbcb89ef7e", // 2
  "1584308666744-24d5c474f2ae", // 3
  "1596040033229-a9821ebd058d", // 4
  "1622483767028-3f66f32aef97", // 5
  "1586201375761-83865001e31c", // 6
  "1556228720-195a672e8a03", // 7
  "1544787219-7f47ccb76574", // 8
  "1509358271058-acd22cc93898", // 9
  "1578985545062-69928b1d9587"  // 10
];

async function checkImage(i) {
  try {
    const url = `https://images.unsplash.com/photo-${urls[i]}?w=10&h=10&fit=crop`;
    const image = await Jimp.read(url);
    console.log(`Image ${i} (${urls[i]}): Success`);
  } catch (e) {
    console.log(`Image ${i} error`);
  }
}

async function run() {
  for (let i = 0; i < urls.length; i++) {
    await checkImage(i);
  }
}
run();
