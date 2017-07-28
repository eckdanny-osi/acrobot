import * as Fuse from 'fuse.js';
import { IRecord } from '../types';

const defaults: Fuse.FuseOptions = {
  caseSensitive: false,
  distance: 10,
  includeScore: false,
  keys: ['key'],
  location: 0,
  maxPatternLength: 10,
  minMatchCharLength: 3,
  shouldSort: true,
  threshold: 0.3,
  tokenize: false
};

export function makeSearch(
  list: Array<object>,
  opts: Fuse.FuseOptions = {}
): (string) => IRecord[] {
  const fuse = new Fuse(list, { ...defaults, ...opts });
  return query => fuse.search(query);
}

export function search(
  query: string,
  list: Array<object>,
  opts: Fuse.FuseOptions = {}
) {
  return makeSearch(list, opts)(query);
}
