import rdash from 'rethinkdbdash'
import config from 'config';

const r = rdash(config.get('rethinkdb'));


// user CRU
export async function getUser(userId) {
    return await r
        .table('users')
        .get(userId).run();
}


export function findToDeserialize(userId, done) {
    return r
        .table('users')
        .get(userId).run()
        .then((result, err) => {
            if (err) {
                done(null, null);
            } else {
                done(null, result);
            }
        });
}

export async function saveUser(user) {
    user.added = new Date();
    const qResult = await r
        .table('users')
        .insert(user).run();
    if (!qResult.inserted) {
        throw new Error(`Errors ${qResult.errors}`)
    } else {
        return user;
    }
}
