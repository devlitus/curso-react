import { db } from '../firebase/firebaseConfig';
import Swal from 'sweetalert2';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';

export const startNewNote = () => {
  return async (dispach, getState) => {
    const { uid } = getState().auth;
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };
    try {
      const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

      dispach(activeNote(doc.id, newNote));
      dispach(addnewNote(doc.id, newNote));
    } catch (error) {
      console.log(error);
    }
  };
};
export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: { id, ...note },
});
export const addnewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: { id, ...note },
});

export const startLoadingNote = (uid) => {
  return async (dispatch) => {
    const note = await loadNotes(uid);
    dispatch(setNote(note));
  };
};

export const setNote = (note) => ({
  type: types.notesLoad,
  payload: note,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    !note.url && delete note.url;
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    dispatch(refreshNote(note.id, note));
    Swal.fire('saved', note.title, 'success');
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: { id, note: { id, ...note } },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote));
    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    await db.doc(`${uid}/journal/notes/${id}`).delete();
    dispatch(deleteNote(uid));
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
