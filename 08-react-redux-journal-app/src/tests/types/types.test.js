import '@testing-library/jest-dom';
import { types } from '../../types/types';

describe('Prueba con nuestros types', () => {
    test('debe de contener los tipos correctamente', () => {
        
        expect(types).toEqual({
            login: '[Auth] login',
            logout: '[Auth] logout',
        
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
        
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] finish loading',
        
            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load note',
            notesUpdated: '[Notes] Update note save',
            notesFileUrl: '[Notes] Update image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
        
        });

    })
    
})
