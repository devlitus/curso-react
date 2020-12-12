import '@testing-library/jest-dom';
import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Prueba reducer authReducer', () => {
    test('debe realizar el login', () => {
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'yo'
            }
        };
        const state = authReducer(initState, action);
        expect(state).toEqual({uid: 'abc', name: 'yo'});
    });
    test('debe realizar el login', () => {
        const initState = {uid: 'abc', name: 'yo'};
        const action = {
            type: types.logout,
        };
        const state = authReducer(initState, action);
        expect(state).toEqual({});
    });
    test('no debe de hacer cambios en el state', () => {
        const initState = {uid: 'abcsdg6351465', name: 'yo'};
        const action = {
            type: 'abc',
        };
        const state = authReducer(initState, action);
        expect(state).toEqual(initState);
    });
    
})
