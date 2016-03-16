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