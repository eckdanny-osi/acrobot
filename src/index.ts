import * as path from 'path';
import * as restify from 'restify';
import { Store } from './lib/store';
import { makeSearch } from './lib/search';
import { formatCSV } from './lib/formatter';

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.name = process.env.SERVER_NAME || 'Acrobot';

server.get('/', (req, res, next) => {
  res.json({ message: 'hello world' });
  return next();
});

server.post('/', function(req, res, next) {
  res.json(makeSearch(store.getAll())(req.params.s));
  return next();
});

server.post('/getAll', (req, res, next) => {
  res.json(store.getAll());
  return next();
});

server.get('/export', function(req, res) {
  res.setHeader('Content-disposition', 'attachment; filename=' + 'entries.csv');
  res.setHeader('Content-type', 'text/csv');
  res.write(formatCSV(store.getAll()));
  return res.end();
});

const store = new Store();
store.loadEntries(err => {
  if (err) console.error(err);
  server.listen(process.env.PORT || 3000, function() {
    console.log(
      '%s is now accepting searches against %s entries',
      server.name,
      store.length
    );
  });
});

// if (!process.env.token) {
//   console.log('Error: Specify token in environment');
//   process.exit(1);
// }
