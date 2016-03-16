/**
 * Created by nemaeska on 03.03.16.
 */
import * as service from './service/db'

export function addProject(req, res) {
    service.addProject(req.body)
        .then((project) => res.json(project))
        .catch(err => {
            res.status(400);
            res.json({error: err, project: req.body});
        });
}

export function listProjects(req, res) {
    service.listProjects()
        .then((project) => res.json(project))
        .catch(err => {
            res.status(400);
            res.json({error: err});
        });
}