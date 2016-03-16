/**
 * Created by x22a on 25.02.16.
 */
function foo(state = 0, action) {
    console.info(action);
    return state;
}

export default { foo }