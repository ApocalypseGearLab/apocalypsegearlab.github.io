export function collectionStructuredData(site: URL, path: string, name: string, products: { id: string; data: { name: string } }[]) {
  return [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: new URL('/', site).href },
      { '@type': 'ListItem', position: 2, name, item: new URL(path, site).href },
    ] },
    { '@context': 'https://schema.org', '@type': 'ItemList', '@id': new URL(path, site).href + '#equipment', name, numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({ '@type': 'ListItem', position: index + 1, name: product.data.name, url: new URL(`/gear/${product.id}/`, site).href })) },
  ];
}
