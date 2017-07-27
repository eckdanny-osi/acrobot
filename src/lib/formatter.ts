import * as _ from "lodash";
import * as json2csv from 'json2csv';

export function formatCSV(items: Array<object>): string {
  return json2csv({
    data: _.sortBy(items, ['key']),
    fields: ['key', 'value'],
  });
}