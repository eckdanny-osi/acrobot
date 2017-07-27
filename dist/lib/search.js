"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fuse = require("fuse.js");
const defaults = {
    caseSensitive: false,
    distance: 10,
    includeScore: false,
    keys: ['key'],
    location: 0,
    maxPatternLength: 10,
    minMatchCharLength: 3,
    shouldSort: true,
    threshold: 0.3,
    tokenize: false,
};
function makeSearch(list, opts = {}) {
    const fuse = new Fuse(list, Object.assign({}, defaults, opts));
    return query => fuse.search(query);
}
exports.makeSearch = makeSearch;
function search(query, list, opts = {}) {
    return makeSearch(list, opts)(query);
}
exports.search = search;
