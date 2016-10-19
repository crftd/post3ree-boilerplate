/**
 * Created by invader on 18.10.16.
 */

import React from 'react'
import configureStore from 'redux-mock-store'
import jest from 'jest'
import { mount, shallow, ShallowWrapper } from 'enzyme'
import ConnectedMain, { Main } from '../Main'

const mockStore = configureStore();

function setup() {
    const props = {
        isAuthenticated: false,
        payload: {
            sub: '',
            role: ''
        }
    };

    const enzymeWrapper = shallow(<Main {...props} />);

    return { props, enzymeWrapper }
}

describe('Main container', () => {
    describe('descr', () => {
        const { enzymeWrapper } = setup();

        it('Should render self and subcomponents', () => {
            expect(enzymeWrapper.find('div').isEmpty()).toBe(false)
        });
    });
});