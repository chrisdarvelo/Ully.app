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
  const YELLOW_GOLD = '#F5B041'; // Brighter yellowish gold
  // Widened base to eliminate gaps and connect petals naturally
  const petalPath = "M100,100 C115,98 108,60 108,35 C108,15 104,8 100,5 C96,8 92,15 92,35 C92,60 85,98 100,100 Z";
  const veinPath = "M100,100 L100,60";
  
  let content = '';
  
  // 6 Petals with Veins (Fused at base)
  [0, 60, 120, 180, 240, 300].forEach(angle => {
    content += `
      <g transform="rotate(${angle}, 100, 100)">
        <path d="${petalPath}" fill="${PETAL_COLOR}" fill-opacity="0.98" />
        <path d="${veinPath}" stroke="${YELLOW_GOLD}" stroke-width="0.5" stroke-opacity="0.4" />
      </g>`;
  });

  // 6 Pointy Stamens - Significantly bigger and yellow-ish
  [30, 90, 150, 210, 270, 330].forEach(angle => {
    content += `
      <g transform="rotate(${angle}, 100, 100)">
        <path d="M100,100 Q102,85 100,68 L103,64 L100,58 L97,64 L100,68" fill="${YELLOW_GOLD}" fill-opacity="0.95" />
      </g>`;
  });

  return `
    <defs>
      <radialGradient id="holeDepth" cx="100" cy="100" r="15" fx="100" fy="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.6" />
        <stop offset="40%" stop-color="#000000" stop-opacity="0.2" />
        <stop offset="100%" stop-color="${PETAL_COLOR}" stop-opacity="0" />
      </radialGradient>
    </defs>
    <g transform="scale(${scale})">
      ${content}
      <circle cx="100" cy="100" r="15" fill="url(#holeDepth)" />
      <circle cx="100" cy="100" r="4.2" fill="#000000" fill-opacity="0.7" />
      <circle cx="100" cy="100" r="2.5" fill="#000000" />
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
