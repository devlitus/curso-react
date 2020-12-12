import '@testing-library/jest-dom';
import { finishLoading, removeError, setError, startLoading } from '../../actions/ui';
import { types } from '../../types/types';

describe('Prueba en ui-actions', () => {
  test('todos las acciones deben de funcionar', () => {
    const action = setError('HELP!!!!!');
    const removeErrorAction = removeError();
    const startLoadingAction = startLoading();
    const finishLoadingAction = finishLoading();

    expect(action).toEqual({
        type: types.uiSetError,
        payload: 'HELP!!!!!',
    });
    expect(removeErrorAction).toEqual({type: types.uiRemoveError});
    expect(startLoadingAction).toEqual({type: types.uiStartLoading});
    expect(finishLoadingAction).toEqual({type: types.uiFinishLoading});
  });
});
