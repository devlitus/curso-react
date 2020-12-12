import React from 'react';
import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { AuthContext } from '../../auth/AuthContext';
import { MemoryRouter } from 'react-router-dom';


describe('Prueba en <DhasboardRoutes />', () => {
    const contextValue =  {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'yo'
        }
    };
    test('debe mostrar correctamente', () => {
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('yo');
    })
    
})
