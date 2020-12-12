import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/login/LoginScreen';

import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';

describe('Prueba en <LoginScreen />', () => {
    const history = {replace: jest.fn()};
    const contexValue = {
        dispatch: jest.fn(),
    };
    const wrapper = mount(
        <AuthContext.Provider value={contexValue}>
            <LoginScreen history={history}/>
        </AuthContext.Provider>
    );
    test('debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();
    });
    
    test('debe de realizar el dispach y al navegación', () => {
        const handleClick = wrapper.find('button').prop("onClick");
        handleClick();
        expect(contexValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {name: 'Carles'}
        });
        expect(history.replace).toHaveBeenCalledWith("/");
        localStorage.setItem('lastPath', '/dc');
        handleClick();
        expect(history.replace).toHaveBeenCalledWith("/dc");
    });
    
    
})
