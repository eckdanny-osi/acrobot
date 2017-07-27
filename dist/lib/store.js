"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csv = require("csvtojson");
const request = require("request");
class Store {
    constructor(records = []) {
        this._records = records;
    }
    get length() {
        return this._records.length;
    }
    addRecord(record) {
        this._records = [...this._records, record];
    }
    removeRecord(id, value) {
        const hasMultipleValues = this._findRecordById(id);
        this._records = hasMultipleValues
            ? this._records.filter(record => id != record.id && value != record.value)
            : this._records.filter(record => id != record.id);
    }
    load(records, noClobber = false) {
        this._records = records;
    }
    loadEntries(callback) {
        const { FILE, FILE_URL } = process.env;
        if (!FILE && !FILE_URL)
            throw new Error('invalid options');
        if (FILE) {
            csv()
                .fromFile(process.env.FILE)
                .on('json', record => this.addRecord(record))
                .on('done', callback);
        }
        if (FILE_URL) {
            csv()
                .fromStream(request.get(FILE_URL))
                .on('json', record => this.addRecord(record))
                .on('done', callback);
        }
    }
    _findRecordById(id) {
        return this._records.find(record => id === record.id);
    }
    getAll() {
        return this._records;
    }
}
exports.Store = Store;
