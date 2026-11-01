import assert from 'node:assert/strict';

/** Permit only the approved property before exact historical schema comparison. */
export function schemasBeforeBrandLogo(path: string, schemas: Record<string, unknown>[]) {
  if (path !== '/') return schemas;
  assert.equal(schemas.filter(schema => schema['@type'] === 'Organization').length, 1);
  return schemas.map(schema => {
    if (schema['@type'] !== 'Organization') return schema;
    assert.equal(schema.logo, 'https://apocalypsegearlab.github.io/brand/brand-logo-512.webp');
    const { logo: _approvedLogo, ...previous } = schema;
    return previous;
  });
}
