import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';

/* jest.mock('../../../components/auth/RegisterScreen', () => ({

})); */
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const iniState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    notes: [],
    active: null,
  },
};
let store = mockStore(iniState);
// store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe('Pruenba el <RegisterScreen />', () => {
  beforeEach(() => {
    store = mockStore(iniState);
  });
  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('debe de hacer el dispach de la acción respectiva', () => {
    const emailField = wrapper.find('input[name="email"]');
    emailField.simulate('change', { target: { value: '', name: 'email' } });
    wrapper.find('form').simulate('submit', { preventDefault() {} });

    const actions = store.getActions();
    console.log(actions);
  });
});
