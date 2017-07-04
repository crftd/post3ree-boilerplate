import r from 'rethinkdb';

export const connect = options => r.connect(options);

export const createDbIfNotExists = (conn, dbName) =>
  getDbList(conn, dbName)
    .then(list => {
      if (isDbExist(list, dbName)) {
        console.log(` [!] DB already exists: ${dbName}`);
        return Promise.resolve(true);
      }
      return createDataBase(conn, dbName);
    });

export const createTableIfNotExists = (conn, tableName, dbName) =>
  getTableList(conn, dbName)
    .then(list => {
      if (isTableExist(list, tableName)) {
        console.log(` [!] Table already exists: ${tableName}`);
        return Promise.resolve(true);
      }
      return createTable(conn, tableName, dbName);
    });

export const dropTables = (conn, dbName) => r.dbDrop(dbName).run(conn);

export const closeConnection = conn => {
  console.log(' [x] Close connection!');
  return conn.close();
};

const isDbExist = (list, name) =>
  list.indexOf(name) !== -1;

const isTableExist = (list, name) =>
  list.indexOf(name) !== -1;

const getDbList = conn => r.dbList().run(conn);

const getTableList = (conn, name) => r.db(name).tableList().run(conn);

const createDataBase = (conn, name) => {
  console.log(` [-] Create DB: ${name}`);
  return r.dbCreate(name).run(conn);
};

const createTable = (conn, table, db) => {
  console.log(` [-] Create Table: ${table}`);
  return r.db(db).tableCreate(table).run(conn);
};
