import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { MemoryRouter } from 'react-router-dom';
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from '../../../actions/auth';

jest.mock('../../../components/auth/LoginScreen', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const iniState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};
let store = mockStore(iniState);
store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);
describe('Prueba en <LoginScreen />', () => {
  beforeEach(() => {
    store = mockStore(iniState);
  });

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de disparar la action de startGoogleLogin', () => {
    wrapper.find('.google-btn').prop('onClick')();
    expect(startGoogleLogin).toHaveBeenCalledTimes(1);
  });

  test('debe de dispara el startLogin con los respectivos valores', () => {
    wrapper.find('form').prop('onSubmit')({ preventDefault() {} });
    expect(startLoginEmailPassword).toHaveBeenCalledTimes(1);
    expect(startLoginEmailPassword).toHaveBeenCalledWith(
      'carles@gmail.com',
      '123456'
    );
  });
});
