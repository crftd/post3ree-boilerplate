import config from 'config';

import {
  connect,
  createDbIfNotExists,
  createTableIfNotExists,
  closeConnection,
  dropTables,
} from './services';

const rethinkdb = config.get('rethinkdb');
const DBNAME = rethinkdb.db || 'boilerplate';
const TABLES = ['users'];

export const setupDB = () => {
  connect(rethinkdb)
    .then(conn => {
      console.log(' [-] DB Setup');
      return createDbIfNotExists(conn, DBNAME)
        .then(() => Promise.all(TABLES.map(table => createTableIfNotExists(conn, table, DBNAME))))
        .then(() => closeConnection(conn));
    });
};

export const dropDB = () => {
  connect(rethinkdb)
    .then(conn => {
      console.log(' [-] DB Drop');
      return dropTables(conn, DBNAME)
        .then(() => closeConnection(conn));
    });
};
