import * as csv from 'csvtojson';
import * as request from 'request';
import { IRecord } from '../types';

export class Store {
  private _records: Array<IRecord>;

  constructor(records: Array<IRecord> = []) {
    this._records = records;
  }

  get length() {
    return this._records.length;
  }

  addRecord(record: IRecord) {
    this._records = [...this._records, record];
  }

  removeRecord(id: IRecord['id'], value?: IRecord['value']) {
    const hasMultipleValues = this._findRecordById(id);
    this._records = hasMultipleValues
      ? this._records.filter(record => id != record.id && value != record.value)
      : this._records.filter(record => id != record.id);
  }

  load(records: Array<IRecord>, noClobber = false): void {
    this._records = records;
  }

  loadEntries(callback) {
    const { FILE, FILE_URL } = process.env;
    if (!FILE && !FILE_URL) throw new Error('invalid options');
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

  _findRecordById(id: IRecord['id']): IRecord {
    return this._records.find(record => id === record.id);
  }

  getAll(): Array<IRecord> {
    return this._records;
  }
}
