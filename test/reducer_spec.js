/**
 * Created by hex22a on 16.03.16.
 */
// import { Map, fromJS } from 'immutable';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import { ADD_PROJECT_FAIL, LIST_PROJECT_FAIL } from '../universal/actions/constants';
import Reducers from '../universal/reducers';

describe('reducers', () => {
    it('Foo does not do anything', () => {
        const addPrjFailAction = { type: ADD_PROJECT_FAIL };
        const listPrjFailAction = { type: LIST_PROJECT_FAIL };
        const notAnAction = { foo: 'foo' };

        const initialState = 0;

        let stateAfter = Reducers.foo(initialState, addPrjFailAction);
        expect(stateAfter).to.equal(initialState);

        stateAfter = Reducers.foo(initialState, listPrjFailAction);
        expect(stateAfter).to.equal(initialState);

        stateAfter = Reducers.foo(initialState, notAnAction);
        expect(stateAfter).to.equal(initialState);
    });
});