import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNote, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn(() => {
    return 'https://prueba-test/img.jpg';
  })
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'TESTING',
  },
  notes: {
    active: {
      id: 'olMH1ExLGqM5Ltg7eON5',
      title: 'hola',
      body: 'body'
    }
  }
}
let store = mockStore(initState);
describe('Prueba con acciones de note', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  test('debe de crear una nueva nota stratNewNote', async () => {
    await store.dispatch(startNewNote());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });
    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });
    const docId = actions[1].payload.id;
    await db.doc(`TESTING/journal/notes/${docId}`).delete();
  });

  test('startLoadingNotes debe cargar las notes', async () => {
    await store.dispatch(startLoadingNote('TESTING'));
    const action = store.getActions();
    expect(action[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array)
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number)
    };

    expect(action[0].payload[0]).toMatchObject(expected);
  });

  test('startSaveNote debe de actualizar la nota', async() => {
    const note = {
      id: 'olMH1ExLGqM5Ltg7eON5',
      title: 'titulo',
      body: 'body'
    };
    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
    expect(docRef.data().title).toBe(note.title);

  });

  test('stratUploading debe de actualizar el url del entry', async () => {
    const file = new File([], 'foto.png');
    await store.dispatch(startUploading(file));
    const docRef = await db.doc(`/TESTING/journal/notes/${initState.notes.active.id}`).get();

    expect(docRef.data().url).toBe('https://prueba-test/img.jpg');

  })
  
  
});
