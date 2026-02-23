#!/usr/bin/env node
/**
 * Generate high-res branding assets: icon.png, adaptive-icon.png, splash.png
 * Updated to the Signature organic blossom design.
 */

const { writeFileSync, unlinkSync } = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const ASSETS = path.join(__dirname, '..', 'assets');

// Theme colors
const BG_COLOR = '#0E0C0A';
const PETAL_COLOR = '#FFFFFF';
const GOLD_COLOR = '#C8923C';

function getFlowerSvg(size) {
  const scale = size / 200;
  // Refined slender petal shape
  const petalPath = "M100,100 C104,85 108,60 108,35 C108,15 104,8 100,5 C96,8 92,15 92,35 C92,60 96,85 100,100 Z";
  const veinPath = "M100,100 L100,65"; // Shortened vein
  
  let content = '';
  
  // 6 Petals with Veins (Borderless)
  [0, 60, 120, 180, 240, 300].forEach(angle => {
    content += `
      <g transform="rotate(${angle}, 100, 100)">
        <path d="${petalPath}" fill="${PETAL_COLOR}" fill-opacity="0.98" />
        <path d="${veinPath}" stroke="${GOLD_COLOR}" stroke-width="0.5" stroke-opacity="0.3" />
      </g>`;
  });

  // 6 Pointy Stamens - offset 30deg from petals
  [30, 90, 150, 210, 270, 330].forEach(angle => {
    content += `
      <g transform="rotate(${angle}, 100, 100)">
        <path d="M100,100 Q101,90 100,78 L101.5,75 L100,72 L98.5,75 L100,78" fill="${GOLD_COLOR}" fill-opacity="0.9" />
      </g>`;
  });

  return `
    <g transform="scale(${scale})">
      <circle cx="100" cy="100" r="12" fill="${PETAL_COLOR}" fill-opacity="0.1" />
      ${content}
      <circle cx="100" cy="100" r="6" fill="${PETAL_COLOR}" />
      <circle cx="100" cy="100" r="2.25" fill="${BG_COLOR}" />
    </g>
  `;
}

function generateAsset(name, size, flowerSize, bgColor = BG_COLOR) {
  const offset = (size - flowerSize) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <g transform="translate(${offset}, ${offset})">
      ${getFlowerSvg(flowerSize)}
    </g>
  </svg>`;

  const tempSvg = path.join(ASSETS, `${name}.svg`);
  const targetPng = path.join(ASSETS, `${name}.png`);

  writeFileSync(tempSvg, svg);
  try {
    execSync(`magick -background none -density 300 "${tempSvg}" "${targetPng}"`);
    console.log(`✓ assets/${name}.png generated (${size}x${size})`);
  } catch (err) {
    console.error(`Error generating ${name}:`, err.message);
  } finally {
    unlinkSync(tempSvg);
  }
}

console.log('Generating Signature branding assets...');
generateAsset('icon', 1024, 720);
generateAsset('adaptive-icon', 1024, 520);
generateAsset('splash', 2048, 650);
console.log('\nIdentity assets updated.');
