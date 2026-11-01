export interface CatalogueRow { name: string; brand: string; sector: string; category: string }
export interface CatalogueFilters { query: string; sector: string; category: string }
const normalize = (text: string) => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('en-CA');
/** Shared pure matching keeps search literal, deterministic and inexpensive. */
export function filterCatalogue(rows: CatalogueRow[], filters: CatalogueFilters): boolean[] {
  const words = normalize(filters.query.trim()).split(/\s+/).filter(Boolean);
  return rows.map(row => (!filters.sector || row.sector === filters.sector)
    && (!filters.category || row.category === filters.category)
    && words.every(word => normalize(`${row.name} ${row.brand}`).includes(word)));
}
