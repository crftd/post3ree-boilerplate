import r from 'rethinkdb';
import config from 'config';

const rethinkdb = config.get('rethinkdb');
const DATABASE = rethinkdb.db;

r.connect(rethinkdb)
.then(conn => {
    console.log(' [-] Database Drop');
    return dropTables(conn)
    .then(() => closeConnection(conn));
});

function dropTables(conn) {
    return r.dbDrop(DATABASE).run(conn);
}

function closeConnection(conn) {
    console.log(' [x] Close connection!');
    return conn.close();
}