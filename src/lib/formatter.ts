import * as _ from 'lodash';
import * as json2csv from 'json2csv';
import { IRecord } from '../types';

export function formatCSV(items: Array<object>): string {
  return json2csv({
    data: _.sortBy(items, ['key']),
    fields: ['key', 'value'],
  });
}

function notFound() {
  return {
    text: 'No results! :tired_face:',
  };
}

export function formatResults(results: IRecord[]) {
  console.log(results);
  switch (results.length) {
    case 0:
      return notFound();
    // case 1: {
    //   const result = results[0];
    //   return {
    //     attachments: [
    //       {
    //         title: result.key,
    //         text: result.value
    //       }
    //     ]
    //   };
    // }
    default:
      return {
        attachments: results.map(result => {
          return {
            title: result.key,
            text: result.value,
          };
        }),
      };
  }
}
