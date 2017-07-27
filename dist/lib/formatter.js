"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const json2csv = require("json2csv");
function formatCSV(items) {
    return json2csv({
        data: _.sortBy(items, ['key']),
        fields: ['key', 'value'],
    });
}
exports.formatCSV = formatCSV;
