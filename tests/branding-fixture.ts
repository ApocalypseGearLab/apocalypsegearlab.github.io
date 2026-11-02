import assert from 'node:assert/strict';

/** Reverse only the approved branding edits before historical byte comparisons.
 * Every other byte in the existing layout/homepage remains protected. */
export function beforeBrandIntegration(file: string, bytes: Buffer): Buffer {
  let source = bytes.toString('latin1');
  const replaceExactlyOnce = (from: string, to: string) => {
    assert.equal(source.split(from).length - 1, 1, `Expected exact brand integration in ${file}`);
    source = source.replace(from, to);
  };
  if (file === 'src/layouts/BaseLayout.astro') {
    replaceExactlyOnce([
      '    <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />',
      '    <link rel="icon" href="/favicon-16.png" type="image/png" sizes="16x16" />',
      '    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />',
    ].join('\n'), '    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />');
  }
  if (file === 'src/pages/index.astro') {
    replaceExactlyOnce("import { BRAND } from '../config/branding';\n", '');
    replaceExactlyOnce(', logo: new URL(BRAND.schemaLogo, Astro.site).href', '');
  }
  return Buffer.from(source, 'latin1');
}
