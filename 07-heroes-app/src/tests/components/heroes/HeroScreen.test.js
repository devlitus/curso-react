import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Prueba en <HeroScreen />', () => {
  const historyMock = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };
  test('debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );
    expect(wrapper.find('Redirect').exists()).toBe(true);
  });

  test('debe de mostrar un hero si el praámetro existe y se encuentra', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route path='/hero/:heroeId' component={HeroScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find('.row').exists()).toBe(true);
  });

  test('debe de regresr al al pantalla con PUSH', () => {
    const historyMock = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path='/hero/:heroeId'
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').simulate('click');
    expect(historyMock.push).toHaveBeenCalledWith('/');
    expect(historyMock.goBack).not.toHaveBeenCalledWith();
  });

  test('debe de regresar a la pantalla enterior GOBACK', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={['/hero/marvel-spider']}>
          <Route
            path='/hero/:heroeId'
            component={() => <HeroScreen history={historyMock} />}
          />
        </MemoryRouter>
      );
  
      wrapper.find('button').simulate('click');
      expect(historyMock.push).not.toHaveBeenCalledWith('/');
      expect(historyMock.goBack).toHaveBeenCalledWith();
  });
  test('debe de llamar al redirect si el hero no existe', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={['/hero/marvel-spider13165161']}>
          <Route path='/hero/:heroeId' component={HeroScreen} />
        </MemoryRouter>
      );
      expect(wrapper.text()).toBe('');
  })
  
  
});
