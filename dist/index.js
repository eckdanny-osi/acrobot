"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const store_1 = require("./lib/store");
const search_1 = require("./lib/search");
const formatter_1 = require("./lib/formatter");
const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.name = process.env.SERVER_NAME || 'Acrobot';
server.get('/', (req, res, next) => {
    res.json({ message: 'hello world' });
    return next();
});
server.post('/', function (req, res, next) {
    res.json(search_1.makeSearch(store.getAll())(req.params.s));
    return next();
});
server.post('/getAll', (req, res, next) => {
    res.json(store.getAll());
    return next();
});
server.get('/export', function (req, res) {
    res.setHeader('Content-disposition', 'attachment; filename=' + 'entries.csv');
    res.setHeader('Content-type', 'text/csv');
    res.write(formatter_1.formatCSV(store.getAll()));
    return res.end();
});
const store = new store_1.Store();
store.loadEntries(err => {
    if (err)
        console.error(err);
    server.listen(process.env.PORT || 3000, function () {
        console.log('%s is now accepting searches against %s entries', server.name, store.length);
    });
});
// if (!process.env.token) {
//   console.log('Error: Specify token in environment');
//   process.exit(1);
// }
