/**
 * Created by nemaeska on 03.03.16.
 */
import r from 'rethinkdb';
import config from 'config';
import xss from 'xss';

function connect() {
    return r.connect(config.get('rethinkdb'));
}

export function addProject(project) {
    return connect()
        .then(conn => {
            project.created = new Date();
            project.text = xss(project.text);
            return r
                .table('projects')
                .insert(project).run(conn)
                .then(response => {
                    return Object.assign({}, project, {id: response.generated_keys[0]});
                });
        });
}

export function listProjects() {
    return connect()
        .then(conn => {
            return r
                .table('projects')
                .orderBy(r.desc('created')).run(conn)
                .then(cursor => cursor.toArray());
        });
}

// user CRU
export function findUserByEmail(mail, callback) {
    return connect()
        .then(conn => {
            return r
                .table('users')
                .filter({username: mail}).limit(1).run(conn)
                .then((cursor, err) => {
                    if (err) {
                        callback(err);
                    } else {
                        cursor.next(function (err, row) {
                            if (err) {
                                callback(null, null);
                            } else {
                                callback(null, row);
                            }
                        });
                    }
                });
        });
}

export function findUserById(userId, callback) {
    return connect()
        .then(conn => {
            return r
                .table('users')
                .get(userId).run(conn)
                .then((result, err) => {
                    if (err) {
                        callback(null, null);
                    } else {
                        callback(null, result);
                    }
                });
        });
}

export function saveUser(user, callback) {
    return connect()
        .then(conn => {
            user.regDate = new Date();
            return r
                .table('users')
                .insert(user).run(conn)
                .then((result, err) => {
                    if (err) {
                        callback(err);
                    } else {
                        if (result.inserted === 1) {
                            callback(null, true);
                        } else {
                            callback(null, false);
                        }
                    }
                })
        });
}

export function updateUser(user) {
    return connect()
        .then(conn => {
            return r
                .table('users')
                .get(user.id).update(user).run(conn);
        });
}

//tokens
export function saveToken(token, userId, callback) {
    return connect()
        .then(conn => {
            token.created = new Date();
            token.userId = userId;
            return r
                .table('rm_tokens')
                .insert(token).run(conn)
                .then((result, err) => {
                    if (err) {
                        callback(err);
                    } else {
                        callback();
                    }
                });
        });
}

export function consumeToken(token, callback) {
    return connect()
        .then(conn => {
            return r
                .table('rm_tokens')
                .filter({token}).limit(1).run(conn)
                .then((cursor, err) => {
                    if (err) {
                        callback(err);
                    } else {
                        cursor.next(function (err, row) {
                            if (err) {
                                callback(null, null);
                            } else {
                                callback(null, row.userId);
                                deleteToken(token);
                            }
                        });
                    }
                });
        });
}

export function deleteToken(token) {
    return connect()
        .then(conn => {
            return r
                .table('rm_tokens')
                .filter({token}).limit(1).delete().run(conn);
        });
}